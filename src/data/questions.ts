export type Question = {
  id: number;
  imageUrl: string;
  answerHint: string;
  category: string;
  alt: string;
};

const getPollinationUrl = (prompt: string, seed: number) => {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true&seed=${seed}&width=800&height=600`;
};

export const questions: Question[] = [
  { id: 1, imageUrl: getPollinationUrl("Red ripe apple, high resolution photography", 1), answerHint: "빨갛게 익은 사과", category: "fruit", alt: "붉게 익은 사과" },
  { id: 2, imageUrl: getPollinationUrl("Sweet chocolate cake slice, dessert photography", 2), answerHint: "달콤한 초콜릿 케이크", category: "fruit", alt: "초콜릿 케이크 조각" },
  { id: 3, imageUrl: getPollinationUrl("Fresh yellow banana bunch, studio lighting", 3), answerHint: "싱싱한 바나나 다발", category: "fruit", alt: "노란 바나나" },
  { id: 4, imageUrl: getPollinationUrl("Warm coffee in a vintage mug, aesthetic", 4), answerHint: "따뜻한 아메리카노 커피 한 잔", category: "fruit", alt: "오래된 머그잔에 담긴 커피" },
  { id: 5, imageUrl: getPollinationUrl("Cheese combination pizza slice, food photography", 5), answerHint: "치즈가 듬뿍 올라간 피자", category: "fruit", alt: "조각난 콤비네이션 피자" },
  { id: 6, imageUrl: getPollinationUrl("Crispy french fries, fast food", 6), answerHint: "바삭바삭한 감자튀김", category: "fruit", alt: "감자튀김" },
  { id: 7, imageUrl: getPollinationUrl("Sliced watermelon triangle, fresh summer fruit", 7), answerHint: "시원한 수박 조각", category: "fruit", alt: "삼각형 수박 조각" },
  { id: 8, imageUrl: getPollinationUrl("Hot boiling ramen noodles in a bowl", 8), answerHint: "김이 모락모락 나는 라면", category: "fruit", alt: "그릇에 담긴 끓인 라면" },
  { id: 9, imageUrl: getPollinationUrl("Strawberry ice cream cone", 9), answerHint: "딸기가 올라간 아이스크림", category: "fruit", alt: "딸기 아이스크림 콘" },
  { id: 10, imageUrl: getPollinationUrl("Fresh salmon sushi on a wooden board", 10), answerHint: "신선한 연어 초밥", category: "fruit", alt: "도마 위의 연어 초밥" },

  { id: 11, imageUrl: getPollinationUrl("Beautiful white sand beach with blue ocean", 11), answerHint: "푸른 바다와 하얀 모래사장", category: "nature", alt: "해변가 풍경" },
  { id: 12, imageUrl: getPollinationUrl("Autumn forest path with colorful leaves", 12), answerHint: "단풍이 물든 깊은 가을 숲", category: "nature", alt: "가을 숲길" },
  { id: 13, imageUrl: getPollinationUrl("Majestic snow covered mountain peak", 13), answerHint: "눈 덮인 거대한 산봉우리", category: "nature", alt: "설산 풍경" },
  { id: 14, imageUrl: getPollinationUrl("Night sky full of stars and milky way", 14), answerHint: "별이 쏟아지는 선명한 밤하늘", category: "nature", alt: "은하수가 보이는 밤하늘" },
  { id: 15, imageUrl: getPollinationUrl("Peaceful green grassy meadow landscape", 15), answerHint: "넓게 펼쳐진 초록색 잔디밭", category: "nature", alt: "평화로운 초원" },
  { id: 16, imageUrl: getPollinationUrl("Refreshing valley waterfall stream", 16), answerHint: "콸콸 흐르는 시원한 계곡 물", category: "nature", alt: "계곡 폭포" },
  { id: 17, imageUrl: getPollinationUrl("Field of blooming sunflowers", 17), answerHint: "화려하게 피어난 해바라기 밭", category: "nature", alt: "해바라기 군락" },
  { id: 18, imageUrl: getPollinationUrl("Beautiful red sunset over the ocean", 18), answerHint: "해가 지는 붉은 저녁 노을", category: "nature", alt: "일몰 바다" },
  { id: 19, imageUrl: getPollinationUrl("Peaceful calm lake reflecting mountains", 19), answerHint: "고요하고 맑은 호수", category: "nature", alt: "산이 반사된 호수" },
  { id: 20, imageUrl: getPollinationUrl("Mysterious glowing light inside a dark cave", 20), answerHint: "어두운 동굴 속 신비로운 빛", category: "nature", alt: "동굴 풍경" },

  { id: 21, imageUrl: getPollinationUrl("Cute playful puppy running in grass", 21), answerHint: "장난치고 있는 귀여운 강아지", category: "animal", alt: "뛰어노는 강아지" },
  { id: 22, imageUrl: getPollinationUrl("Cat peacefully sleeping in sunlight", 22), answerHint: "햇살을 쬐며 낮잠 자는 고양이", category: "animal", alt: "햇빛 아래 고양이" },
  { id: 23, imageUrl: getPollinationUrl("Majestic eagle flying in the sky", 23), answerHint: "하늘을 날아가는 멋진 독수리", category: "animal", alt: "비행 중인 독수리" },
  { id: 24, imageUrl: getPollinationUrl("Peaceful flock of sheep grazing in meadow", 24), answerHint: "풀을 뜯어 먹는 평화로운 양", category: "animal", alt: "초원의 양 떼" },
  { id: 25, imageUrl: getPollinationUrl("Cute rabbit eating a carrot", 25), answerHint: "당근을 우물거리는 토끼", category: "animal", alt: "당근 먹는 토끼" },
  { id: 26, imageUrl: getPollinationUrl("Giant elephant in the african savanna", 26), answerHint: "긴 코를 뻗는 거대한 코끼리", category: "animal", alt: "사바나의 코끼리" },
  { id: 27, imageUrl: getPollinationUrl("Dolphin happily jumping out of water", 27), answerHint: "물살을 가르는 날렵한 돌고래", category: "animal", alt: "점프하는 돌고래" },
  { id: 28, imageUrl: getPollinationUrl("Tall giraffe eating leaves from a tree", 28), answerHint: "목이 아주 긴 기린", category: "animal", alt: "나뭇잎 먹는 기린" },

  { id: 29, imageUrl: getPollinationUrl("Colorful lego blocks scattered", 29), answerHint: "조립 중인 알록달록한 레고 블럭", category: "object", alt: "레고 블럭들" },
  { id: 30, imageUrl: getPollinationUrl("Vintage dusty film camera", 30), answerHint: "오래된 먼지 쌓인 필름 카메라", category: "object", alt: "빈티지 카메라" },
  { id: 31, imageUrl: getPollinationUrl("White fluffy teddy bear toy", 31), answerHint: "하얗고 푹신한 곰 인형", category: "object", alt: "곰 인형" },
  { id: 32, imageUrl: getPollinationUrl("Beautiful clear glass marble", 32), answerHint: "투명하고 둥근 예쁜 유리구슬", category: "object", alt: "유리구슬" },
  { id: 33, imageUrl: getPollinationUrl("Shiny red toy car", 33), answerHint: "바퀴가 달려있는 빨간 장난감 자동차", category: "object", alt: "장난감 자동차" },
  { id: 34, imageUrl: getPollinationUrl("Soft glowing bedside mood lamp", 34), answerHint: "은은한 빛이 나는 무드등", category: "object", alt: "침실 무드등" },
  { id: 35, imageUrl: getPollinationUrl("Open old vintage book with text", 35), answerHint: "글씨가 가득 적힌 낡은 책", category: "object", alt: "펼쳐진 오래된 책" },
  { id: 36, imageUrl: getPollinationUrl("Pencil case filled with colored pencils", 36), answerHint: "색연필들이 꽂혀 있는 필통", category: "object", alt: "색연필과 필통" },

  { id: 37, imageUrl: getPollinationUrl("Happy smiling child playing", 37), answerHint: "신나게 활짝 웃고 있는 어린아이", category: "person", alt: "웃는 아이" },
  { id: 38, imageUrl: getPollinationUrl("Student throwing a basketball", 38), answerHint: "열심히 농구공을 던지는 학생", category: "person", alt: "농구하는 학생" },
  { id: 39, imageUrl: getPollinationUrl("Person sitting quietly on a park bench reading", 39), answerHint: "조용히 벤치에 앉아 책을 읽는 사람", category: "person", alt: "공원 벤치 독서" },
  { id: 40, imageUrl: getPollinationUrl("Old couple holding hands walking", 40), answerHint: "서로 손을 잡고 걷는 할아버지 할머니", category: "person", alt: "노부부 산책" },
  { id: 41, imageUrl: getPollinationUrl("Dancer performing gracefully on stage", 41), answerHint: "무대 위에서 춤을 추는 댄서", category: "person", alt: "춤추는 사람" },
  { id: 42, imageUrl: getPollinationUrl("Chef cooking in a professional kitchen", 42), answerHint: "앞치마를 두르고 요리하는 요리사", category: "person", alt: "요리사 주방" },
  { id: 43, imageUrl: getPollinationUrl("Child wearing raincoat jumping in a puddle", 43), answerHint: "비옷을 입고 물웅덩이를 밟는 아이", category: "person", alt: "우비 입고 뛰는 아이" },
  { id: 44, imageUrl: getPollinationUrl("Crowd of people cheering and clapping", 44), answerHint: "함께 모여 박수 치고 환호하는 사람들", category: "person", alt: "응원하는 관중" },

  { id: 45, imageUrl: getPollinationUrl("Raindrops on a clear glass window", 45), answerHint: "투명한 유리창 밖으로 내리는 비", category: "weather", alt: "비 내리는 창밖" },
  { id: 46, imageUrl: getPollinationUrl("Tree branches swaying in strong gust of wind", 46), answerHint: "거센 바람에 흔들리는 나뭇가지", category: "weather", alt: "바람 부는 나무" },
  { id: 47, imageUrl: getPollinationUrl("Heavy snow falling on a winter street", 47), answerHint: "함박눈이 펑펑 쏟아지는 겨울 거리", category: "weather", alt: "눈 내리는 거리" },
  { id: 48, imageUrl: getPollinationUrl("Cozy and warm bedroom interior", 48), answerHint: "포근하고 아늑한 분위기의 방", category: "weather", alt: "따뜻한 분위기 침실" },
  { id: 49, imageUrl: getPollinationUrl("Foggy and mysterious morning road", 49), answerHint: "으스스하고 축축한 안개 낀 아침", category: "weather", alt: "안개 무성한 길" },
  { id: 50, imageUrl: getPollinationUrl("Bright sunny afternoon street with beautiful sunlight", 50), answerHint: "맑은 하늘 아래 햇살이 가득 퍼지는 기분 좋은 오후", category: "weather", alt: "햇살 비치는 화창한 길" },
];

