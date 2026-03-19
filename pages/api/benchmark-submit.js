// pages/api/benchmark-submit.js
// Sends benchmark submission data to Amy via Web3Forms
// No environment variables needed - uses the same Web3Forms key as the discover page

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { info, scores, zone, summary, practiceAreas, tools } = req.body;

  if (!info?.email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "084aac1f-48ea-409c-8de0-a1a2a4437153",
        subject: `New Benchmark: ${info.firm} — ${zone} Zone (${scores.overall}/5)`,
        from_name: "AI Readiness Benchmark",
        // Contact Info
        "Name": info.name,
        "Email": info.email,
        "Firm": info.firm,
        "Role": info.role,
        "Firm Size": info.firmSize,
        "Practice Areas": practiceAreas,
        "Platform": info.platform,
        "Additional Tools": tools || "None selected",
        // Scores
        "Overall Score": `${scores.overall} / 5`,
        "Zone": zone,
        "People Score": `${scores.people} / 5`,
        "Process Score": `${scores.process} / 5`,
        "Technology Score": `${scores.tech} / 5`,
        // Full Responses
        "Full Responses": summary,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      console.error("Web3Forms error:", data);
      return res.status(200).json({ success: false, error: "send_failed" });
    }
  } catch (e) {
    console.error("Submit error:", e);
    return res.status(200).json({ success: false, error: "exception" });
  }
}
