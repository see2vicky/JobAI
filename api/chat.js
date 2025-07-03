export const config = {
  api: {
    bodyParser: true,
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const systemPrompt = `
You are a helpful AI chatbot for the AI Job Hacker Kit.
Only answer based on this:
1. ₹999 kit with resume prompts, AI tools, templates
2. Made for Indian job seekers
3. Instant delivery via WhatsApp/email
4. 7-day refund available
Keep answers friendly and concise.
  `;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || "OpenAI didn't return a reply.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ reply: "Server error while connecting to AI." });
  }
}
