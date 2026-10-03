import { EmailTemplate } from "@/components/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body" },
      { status: 400 }
    );
  }

  const { name, email, message, projectType, timeline, honeypot } = body || {};

  // Honeypot check (bots will fill this hidden field)
  if (honeypot) {
    return NextResponse.json(
      { error: "Spam detected" },
      { status: 400 }
    );
  }

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Validate input lengths
  if (
    name.length > 100 ||
    email.length > 250 ||
    message.length > 5000 ||
    (projectType && projectType.length > 100) ||
    (timeline && timeline.length > 100)
  ) {
    return NextResponse.json(
      { error: "Input text exceeds maximum allowed limit" },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Validate message length
  if (message.trim().length < 30) {
    return NextResponse.json(
      { error: "Message should be at least 30 characters long" },
      { status: 400 }
    );
  }

  // Block disposable email providers
  const blockList = ["tempmail", "mailinator", "10minutemail", "guerrillamail"];
  const domain = email.split("@")[1];
  if (domain && blockList.some((blocked) => domain.includes(blocked))) {
    return NextResponse.json(
      { error: "Temporary email addresses are not allowed" },
      { status: 403 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_TO_EMAIL || "contact@example.com";

  // DEV MODE GRACEFUL FALLBACK:
  // If RESEND_API_KEY is missing, placeholder, or not a real live key, log form data and return success
  const isPlaceholderKey =
    !apiKey ||
    apiKey === "your_resend_api_key_here" ||
    apiKey.startsWith("your_");

  if (isPlaceholderKey) {
    console.log("----------------------------------------");
    console.log("[DEV MODE] Contact form submission received:");
    console.log("Recipient:", recipientEmail);
    console.log("Sender Name:", name);
    console.log("Sender Email:", email);
    console.log("Project Type:", projectType || "N/A");
    console.log("Timeline:", timeline || "N/A");
    console.log("Message:\n", message);
    console.log("----------------------------------------");

    return NextResponse.json({
      success: true,
      data: { id: "dev-mock-id" },
      note: "Dev mode: Form submission logged to server console (no live Resend key configured).",
    });
  }

  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `New Message from Portfolio - ${projectType || "General Inquiry"}`,
      react: EmailTemplate({ name, email, message, projectType, timeline, yourName: "Vivek Singh" }),
    });

    if (error) {
      console.error("[Resend Error in send-email]:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    console.error("[Email Error]:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
