'use server'

import { z } from "zod";

export async function SendIdeaToEmail(prevState, formData) {
    const data = {
        topic: await formData.get("topic"),
        details: await formData.get("details")
    }

    console.log(data)

    const schema = z.object({
        topic: z.string().min(1),
        details: z.string().optional()
    })

    const response = schema.safeParse(data);

    if (response.error) return { message: "No data provided." }

    return { message: "success" }
}