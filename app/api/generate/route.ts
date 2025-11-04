import { GenerateRequest } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

if(!apiKey) {
    throw new Error('Missing GEMINI_API_KEY env variable');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: NextRequest) {
    try {
        const { description, language }: GenerateRequest = await request.json();
        if(!description){
            return NextResponse.json({ error: "Description is required"}, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
        const prompt = `Generate ${language || "javascript"} code for the following description: \n\n${description}\n\nCode:`;
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return NextResponse.json({ data: response }, { status: 200 });
    } catch (error) { 
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}