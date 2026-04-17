import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key', // Ensure there's a fallback or expect process.env.OPENAI_API_KEY
});

// Use edge runtime for faster responses if needed, but node is fine too.
export async function POST(req: Request) {
  try {
    const { answer, hint } = await req.json();

    if (!answer) {
      return NextResponse.json(
        { score: 0, feedback: "아무것도 작성하지 않았습니다." },
        { status: 200 }
      );
    }

    // System prompt engineered for speed and JSON output
    const systemPrompt = `You are a Korean writing grader. 
Evaluate the user's Korean description purely based on how rich, vivid, and fluent their expression is.
Do NOT evaluate whether the sentence strictly matches the provided HINT or is entirely relevant to the topic. Just evaluate their creativity and descriptive quality.
Grading criteria:
- Low score (0-50): Simple vocabulary, short, or lacks descriptive details.
- High score (80-100): Highly specific, vivid, sensory, and creative descriptions with varied vocabulary.
- Do NOT penalize for being unrelated to the original intention. We only care about how beautifully they write.
Output JSON only with keys "score" (number) and "feedback" (string, max 1 sentence in Korean).`;

    const userPrompt = `HINT: ${hint}\nUSER ANSWER: ${answer}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano", // fast and cheap
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_completion_tokens: 2000,
    });

    let resultText = completion.choices[0].message.content || '';
    
    // Extract JSON block from potential babble
    const jsonStart = resultText.indexOf('{');
    const jsonEnd = resultText.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      resultText = resultText.substring(jsonStart, jsonEnd + 1);
    }
    let parsed;
    try {
      parsed = JSON.parse(resultText);
    } catch (parseError) {
      console.error('JSON Parse Error. Raw text:', resultText);
      throw new Error("AI 응답을 JSON으로 변환할 수 없습니다.");
    }

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error('Grading error:', error);
    return NextResponse.json(
      { score: 0, feedback: `서버 오류: ${error.message || '알 수 없는 오류가 발생했습니다.'}` },
      { status: 500 }
    );
  }
}
