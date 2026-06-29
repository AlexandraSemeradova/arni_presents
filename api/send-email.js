export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, presentName, presentLink, presentMall, presentPrice } = req.body;

  if (!email || !presentName) {
    return res.status(400).json({ error: "Chýbajú povinné údaje" });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Arni Present", email: "semeradova.alex@gmail.com" },
        to: [{ email }],
        subject: `🎁 Rezervácia darčeka: ${presentName}`,
        htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px 0; color: #1a1a18;">
          <p style="font-size: 12px; color: #888780; margin: 0 0 32px 0; letter-spacing: 0.05em; text-transform: uppercase;">
            Arni Present
          </p> 

          <h1 style="font-size: 22px; font-weight: 500; margin: 0 0 8px 0;">Rezervácia potvrdená! 🎉</h1>
          <p style="font-size: 15px; color: #5f5e5a; margin: 0 0 32px 0;">
            Úspešne si si rezervoval/a darček pre Arnolda.
          </p>

          <div style="border-top: 1px solid #e5e4de; border-bottom: 1px solid #e5e4de; padding: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="color: #888780; padding: 8px 0; width: 120px;">Darček</td>
                <td style="color: #1a1a18; padding: 8px 0; font-weight: 500;">${presentName}</td>
              </tr>
              <tr>
                <td style="color: #888780; padding: 8px 0;">Obchod</td>
                <td style="color: #1a1a18; padding: 8px 0;">${presentMall}</td>
              </tr>
              <tr>
                <td style="color: #888780; padding: 8px 0;">Cena</td>
                <td style="color: #1a1a18; padding: 8px 0;">${presentPrice} €</td>
              </tr>
            </table>
          </div>

          <div style="margin-top: 28px;">
            <a href="${presentLink}"
              style="display: inline-block; background: #1a6fd4; color: #ffffff;
                      padding: 10px 22px; border-radius: 6px; text-decoration: none;
                      font-size: 14px; font-weight: 500;">
              Kúpiť darček
            </a>
          </div>

        </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Brevo error:", error);
      return res.status(500).json({ error: "Nepodarilo sa odoslať email" });
    }

    return res.status(200).json({ status: "OK" });

  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Nepodarilo sa odoslať email" });
  }
}