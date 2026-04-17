import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/components/GameProvider";

export const metadata: Metadata = {
  title: "이미지 글쓰기 챌린지",
  description: "이미지를 묘사하며 글쓰기 실력을 키워보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full antialiased bg-slate-950 text-slate-50"
    >
      <body className="min-h-full flex flex-col font-sans">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
