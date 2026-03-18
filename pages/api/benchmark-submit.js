// pages/api/benchmark-submit.js
// Handles: HubSpot contact creation + note attachment + email notification to Amy
//
// Environment variables needed in Vercel:
//   HUBSPOT_API_KEY        — HubSpot Private App access token
//   RESEND_API_KEY         — Resend API key (free at resend.com/signup)
//   NOTIFICATION_EMAIL     — Where to send notifications (amy@gaiaallies.com)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { info, scores, zone, summary, practiceAreas, tools } = req.body;

  if (!info?.email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const results = { hubspot: null, email: null };

  /* ═══════════════════════════════════════
     1. CREATE OR UPDATE HUBSPOT CONTACT
     ═══════════════════════════════════════ */
  try {
    // Search for existing contact by email
    const searchRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{ propertyName: "email", operator: "EQ", value: info.email }],
        }],
      }),
    });
    const searchData = await searchRes.json();
    let contactId;

    if (searchData.total > 0) {
      // Update existing contact
      contactId = searchData.results[0].id;
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({
          properties: {
            firstname: info.name?.split(" ")[0] || "",
            lastname: info.name?.split(" ").slice(1).join(" ") || "",
            company: info.firm,
            jobtitle: info.role,
            numemployees: info.firmSize,
          },
        }),
      });
    } else {
      // Create new contact
      const createRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({
          properties: {
            email: info.email,
            firstname: info.name?.split(" ")[0] || "",
            lastname: info.name?.split(" ").slice(1).join(" ") || "",
            company: info.firm,
            jobtitle: info.role,
            numemployees: info.firmSize,
          },
        }),
      });
      const createData = await createRes.json();
      contactId = createData.id;
    }

    /* ═══ 2. ATTACH NOTE WITH FULL SUMMARY ═══ */
    if (contactId) {
      // Create a note (engagement) with the full benchmark summary
      const noteRes = await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({
          properties: {
            hs_timestamp: new Date().toISOString(),
            hs_note_body: summary,
          },
          associations: [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: "HUBSPOT_DEFINED",
                  associationTypeId: 202, // Note to Contact
                },
              ],
            },
          ],
        }),
      });

      results.hubspot = noteRes.ok ? "success" : "note_failed";
    }
  } catch (e) {
    console.error("HubSpot error:", e);
    results.hubspot = "error";
  }

  /* ═══════════════════════════════════════
     3. EMAIL NOTIFICATION TO AMY
     ═══════════════════════════════════════ */
  try {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "AI Ready Benchmark <benchmark@diagnostic.gaiaallies.com>",
        to: [process.env.NOTIFICATION_EMAIL || "amy@gaiaallies.com"],
        subject: `New Benchmark: ${info.firm} — ${zone} Zone (${scores.overall}/5)`,
        text: summary,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
            <div style="background: linear-gradient(165deg, #1a2332 0%, #2d3b4a 40%, #3a4f3a 100%); padding: 24px 28px; border-radius: 8px 8px 0 0;">
              <p style="color: #c4993c; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px;">NEW BENCHMARK SUBMISSION</p>
              <h2 style="color: #fff; font-size: 22px; margin: 0; font-weight: normal;">${info.firm}</h2>
              <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 6px 0 0;">${info.name} — ${info.role}</p>
            </div>

            <div style="background: #f4f2ed; padding: 20px 28px; border: 1px solid #e8e4de;">
              <div style="display: flex; gap: 16px; text-align: center;">
                <div style="flex: 1;">
                  <p style="font-size: 24px; font-weight: 700; color: #c4993c; margin: 0;">${scores.overall}</p>
                  <p style="font-size: 11px; color: #8a8a8a; text-transform: uppercase; letter-spacing: 1px; margin: 2px 0 0;">Overall</p>
                </div>
                <div style="flex: 1;">
                  <p style="font-size: 24px; font-weight: 700; color: #6B4C9A; margin: 0;">${scores.people}</p>
                  <p style="font-size: 11px; color: #8a8a8a; text-transform: uppercase; letter-spacing: 1px; margin: 2px 0 0;">People</p>
                </div>
                <div style="flex: 1;">
                  <p style="font-size: 24px; font-weight: 700; color: #4a6741; margin: 0;">${scores.process}</p>
                  <p style="font-size: 11px; color: #8a8a8a; text-transform: uppercase; letter-spacing: 1px; margin: 2px 0 0;">Process</p>
                </div>
                <div style="flex: 1;">
                  <p style="font-size: 24px; font-weight: 700; color: #c4993c; margin: 0;">${scores.tech}</p>
                  <p style="font-size: 11px; color: #8a8a8a; text-transform: uppercase; letter-spacing: 1px; margin: 2px 0 0;">Technology</p>
                </div>
              </div>
              <div style="text-align: center; margin-top: 12px;">
                <span style="background: #1a2332; color: #c4993c; font-size: 12px; font-weight: 600; letter-spacing: 1px; padding: 4px 14px; border-radius: 4px; text-transform: uppercase;">${zone} Zone</span>
              </div>
            </div>

            <div style="background: #fff; padding: 24px 28px; border: 1px solid #e8e4de; border-top: none;">
              <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #8a8a8a; width: 140px;">Email</td><td style="padding: 6px 0; color: #1a1a2e;"><a href="mailto:${info.email}" style="color: #4a6741;">${info.email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #8a8a8a;">Firm Size</td><td style="padding: 6px 0; color: #1a1a2e;">${info.firmSize}</td></tr>
                <tr><td style="padding: 6px 0; color: #8a8a8a;">Practice Areas</td><td style="padding: 6px 0; color: #1a1a2e;">${practiceAreas}</td></tr>
                <tr><td style="padding: 6px 0; color: #8a8a8a;">Platform</td><td style="padding: 6px 0; color: #1a1a2e;">${info.platform}</td></tr>
                <tr><td style="padding: 6px 0; color: #8a8a8a;">Additional Tools</td><td style="padding: 6px 0; color: #1a1a2e;">${tools || "None selected"}</td></tr>
              </table>
            </div>

            <div style="background: #fff; padding: 24px 28px; border: 1px solid #e8e4de; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #c4993c; margin: 0 0 12px;">FULL RESPONSES</p>
              <pre style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 13px; color: #6b6b6b; line-height: 1.7; white-space: pre-wrap; margin: 0; background: #f4f2ed; padding: 16px; border-radius: 6px;">${summary}</pre>
            </div>
          </div>
        `,
      }),
    });

    results.email = emailRes.ok ? "success" : "failed";
  } catch (e) {
    console.error("Resend error:", e);
    results.email = "error";
  }

  return res.status(200).json(results);
}
