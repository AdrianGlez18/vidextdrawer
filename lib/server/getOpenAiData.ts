"use server"

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export const describeImage = async (url: string) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Describe the image in less than 50 words. Use a neutral tone." },
                    {
                        type: "image_url",
                        image_url: {
                            "url": url,
                        },
                    },
                ],
            },
        ],
    });

    return response.choices[0].message.content;
}

export const judgeImage = async (url: string) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "You are an art judge with a really realistic perspective. Judge the image in less than 50 words. " },
                    {
                        type: "image_url",
                        image_url: {
                            "url": url,
                        },
                    },
                ],
            },
        ],
    });

    return response.choices[0].message.content;
}