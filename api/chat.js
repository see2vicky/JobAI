export default async function handler(req, res) {
  const { message } = req.body;

  const systemPrompt = `
You are a helpful AI chatbot for the AI Job Hacker Kit.
Only answer based on:
1. ₹999 kit with resume prompts, AI tools, templates
2. Made for Indian job seekers
3. Instant delivery via WhatsApp/email
4. 7-day refund available
Be short, clear, helpful. Avoid guessing.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
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

  const data = await response.json();
  res.status(200).json({ reply: data.choices?.[0]?.message?.content });
}
