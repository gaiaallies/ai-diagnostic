// pages/api/subscribe.js
// Beehiiv subscriber API route for AI Readiness Benchmark
// Proxies the Beehiiv API call so the API key stays server-side

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "ai_readiness_benchmark",
          utm_medium: "diagnostic",
          custom_fields: [
            // Add custom fields in Beehiiv first, then reference them here
            // { name: "first_name", value: name?.split(" ")[0] || "" },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Beehiiv error:", data);
      return res.status(response.status).json({ error: "Subscription failed" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Beehiiv API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
