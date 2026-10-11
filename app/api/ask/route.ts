// import { NextResponse } from "next/server";
// const CONTEXT = "You are the assistant for Google Developer Groups (GDG) on Campus at Ramdeobaba University (RBU), Nagpur. GDG RBU is a student community running workshops, hackathons, and mentorship in tech. Members join via the Join button and GDG Leads organise events and guide the chapter. Be brief (max 3 sentences) and friendly.";
// const FALLBACK = "GDG RBU is a student-led tech community at Ramdeobaba University. Check the Upcoming Event section or the FAQs below, or write to gdgrbu@rbunagpur.in.";
// export async function POST(req: Request) {
//   const { question } = await req.json();
//   const key = process.env.ANTHROPIC_API_KEY;
//   if (!key || !question) return NextResponse.json({ answer: FALLBACK });
//   try {
//     const r = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
//       body: JSON.stringify({ model: "claude-haiku-5-5", max_tokens: 300, system: CONTEXT, messages: [{ role: "user", content: String(question).slice(0, 500) }] }),
//     });
//     const d = await r.json();
//     return NextResponse.json({ answer: d.content?.[0]?.text ?? FALLBACK });
//   } catch { return NextResponse.json({ answer: FALLBACK }); }
// }


import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const CONTEXT =
  "You are the assistant for Google Developer Groups (GDG) on Campus at Ramdeobaba University (RBU), Nagpur. GDG RBU is a student community running workshops, hackathons, and mentorship in tech. Members join via the Join button and GDG Leads organise events and guide the chapter. Be brief (max 3 sentences) and friendly.";

const FALLBACK =
  "GDG RBU is a student-led tech community at Ramdeobaba University. Check the Upcoming Event section or the FAQs below, or write to gdgrbu@rbunagpur.in.";

export async function POST(req: Request) {
  const { question } = await req.json();

  const key = process.env.GEMINI_API_KEY;

  if (!key || !question) {
    return NextResponse.json({ answer: FALLBACK });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: key,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${CONTEXT}\n\nUser question: ${String(question).slice(0, 500)}`,
    });

    return NextResponse.json({
      answer: response.text ?? FALLBACK,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      answer: FALLBACK,
    });
  }
}