import { ExplainRequest } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

if(!apiKey) {
    throw new Error('Missing GEMINI_API_KEY env variable');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: NextRequest) {
    try {
        const { code }: ExplainRequest = await request.json();
        if(!code){
            return NextResponse.json({ error: "Code is required"}, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
        const prompt = `Explain the following code in detail: \n\n${code}\n\nExplaination:`;
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) { 
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}