"use server"

import { z } from "zod"

// Define validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export type FormData = z.infer<typeof formSchema>

export async function sendEmail(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // In a real implementation, you would send an email here
    // For demonstration, we'll simulate a successful email send
    console.log("Email would be sent with:", validatedData)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return success
    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
      return { success: false, message: errorMessages }
    }

    // Handle other errors
    console.error("Failed to send email:", error)
    return { success: false, message: "Failed to send message. Please try again later." }
  }
}
