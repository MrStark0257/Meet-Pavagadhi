import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Allow CORS options if needed or check method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, service, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.TO_EMAIL || 'haneypavagadhi1234@gmail.com';

    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ 
        error: 'SMTP credentials not configured on server.',
        hint: 'Please set SMTP_USER and SMTP_PASS environment variables in Vercel settings.'
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Stark Comms Terminal" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio Signal] Message from ${name} (${service})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #050b17; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #00F0FF;">
          <h2 style="color: #00F0FF; margin-top: 0;">// NEW TRANSMISSION RECEIVED</h2>
          <p><strong>Agent / Client Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
          <p><strong>Service / Matrix:</strong> ${service}</p>
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
          <h4 style="color: #38bdf8;">SPECIFICATIONS:</h4>
          <p style="white-space: pre-wrap; background: #030712; padding: 16px; border-radius: 8px; border-left: 4px solid #00F0FF; color: #e2e8f0;">${message}</p>
          <br />
          <span style="font-size: 11px; color: #64748b;">STARK HUD &bull; AUTOMATED TRANSMISSION PROTOCOL</span>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Transmission dispatched successfully!' });
  } catch (error) {
    console.error('SMTP Transmission Error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email transmission.', 
      details: error.message 
    });
  }
}
