import nodemailer from "nodemailer";

// Vercel serverless function: POST /api/send
// Receives the letter PDF (base64) + recipient, and emails it from your Gmail.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST." });
  }

  const { to, employeeName, subject, message, pdfBase64, fileName } = req.body || {};

  if (!to || !pdfBase64) {
    return res.status(400).json({ error: "Missing recipient email or PDF." });
  }

  const user = process.env.GMAIL_USER;            // your gmail address
  const pass = process.env.GMAIL_APP_PASSWORD;    // 16-char app password
  const senderName = process.env.SENDER_NAME || "HR";

  if (!user || !pass) {
    return res.status(500).json({
      error: "Email not set up. Add GMAIL_USER and GMAIL_APP_PASSWORD in Vercel settings."
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: `"${senderName}" <${user}>`,
      to,
      subject: subject || `Experience Letter${employeeName ? " - " + employeeName : ""}`,
      text: message || "Please find your experience letter attached.",
      attachments: [
        {
          filename: fileName || "Experience-Letter.pdf",
          content: Buffer.from(pdfBase64, "base64"),
          contentType: "application/pdf"
        }
      ]
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Failed to send email." });
  }
}
