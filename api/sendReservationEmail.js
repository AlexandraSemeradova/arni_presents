import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, presentName } = req.body;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "noreply@tvojadomena.sk",
      to: email,
      subject: "Potvrdenie rezervácie",
      html: `<p>Ďakujeme! Rezervoval si si: <strong>${presentName}</strong>.</p>`
    });

    return res.status(200).json({ status: "OK" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
