import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, presentName, presentLink, presentMall, presentPrice } = req.body;

  if (!email || !presentName) {
    return res.status(400).json({ error: "Chýbajú povinné údaje" });
  }

  try {
    await resend.emails.send({
      from: "Arni Present <noreply@tvoja-domena.com>",
      to: email,
      subject: `🎁 Rezervácia darčeka: ${presentName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Ďakujeme za rezerváciu! 🎉</h1>
          <p>Úspešne si si rezervoval/a darček pre Arnolda:</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin: 0 0 10px 0;">${presentName}</h2>
            <p style="margin: 5px 0;">🏪 <strong>Obchod:</strong> ${presentMall}</p>
            <p style="margin: 5px 0;">💰 <strong>Cena:</strong> ${presentPrice} €</p>
          </div>

          <a href="${presentLink}" 
             style="display: inline-block; background: #4CAF50; color: white; 
                    padding: 12px 24px; border-radius: 6px; text-decoration: none;
                    font-weight: bold; margin: 10px 0;">
            🛒 Kúpiť darček
          </a>

          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            Arni Present • Zoznam darčekov pre Arnolda
          </p>
        </div>
      `,
    });

    return res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Nepodarilo sa odoslať email" });
  }
}