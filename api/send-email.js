import nodemailer from 'nodemailer';

// Simple in-memory rate limiter (5 requests per 15 mins per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();

  // Inline cleanup of expired IP records (replaces top-level setInterval for serverless)
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }

  const userRecord = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

  if (now > userRecord.resetTime) {
    userRecord.count = 1;
    userRecord.resetTime = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(ip, userRecord);
    return false;
  }

  if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  userRecord.count += 1;
  rateLimitMap.set(ip, userRecord);
  return false;
}

// HTML sanitization helper function
function sanitizeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Strip newlines to prevent Header Injection
function stripNewlines(str = '') {
  return String(str).replace(/[\r\n]/g, ' ').trim();
}

export default async function handler(req, res) {
  // 1. Strict Method Check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. IP Rate Limiting
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1')
    .split(',')[0]
    .trim();

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Too many transmissions sent. Please wait 15 minutes before trying again.'
    });
  }

  const { name, email, service, message, website_url_hp } = req.body || {};

  // 3. Honeypot Anti-Bot Trap (If filled out, pretend success without sending)
  if (website_url_hp && website_url_hp.length > 0) {
    return res.status(200).json({ success: true, message: 'Transmission dispatched successfully!' });
  }

  // 4. Input Presence Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // 5. Input Length Caps (Prevent Buffer Overflow / DoS payloads)
  if (name.length > 100 || email.length > 100 || message.length > 3000) {
    return res.status(400).json({ error: 'Input payload exceeds maximum character limits.' });
  }

  // 6. Strict Email Syntax Check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address format.' });
  }

  // 7. Sanitize all user inputs
  const safeName = sanitizeHtml(stripNewlines(name));
  const safeEmail = stripNewlines(email);
  const safeService = sanitizeHtml(stripNewlines(service || 'General Inquiry'));
  const safeMessage = sanitizeHtml(message);

  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpUser = process.env.SMTP_USER?.trim();
    // Auto-strip spaces from App Password (e.g. "zizd jdfz cvvn hskg" -> "zizdjdfzcvvnhskg")
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, '').trim();
    const toEmail = process.env.TO_EMAIL?.trim() || 'haneypavagadhi1234@gmail.com';

    if (!smtpUser || !smtpPass) {
      return res.status(500).json({ 
        error: 'SMTP credentials missing on server. Please check Vercel Environment Variables.'
      });
    }

    // Configure Nodemailer transporter optimized for Vercel Serverless
    const transporterConfig = smtpHost.includes('gmail')
      ? {
          service: 'gmail',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 8000,
          greetingTimeout: 8000,
          socketTimeout: 8000,
        }
      : {
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 8000,
          greetingTimeout: 8000,
          socketTimeout: 8000,
        };

    const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
      from: `"Stark Comms Terminal" <${smtpUser}>`,
      to: toEmail,
      replyTo: safeEmail,
      subject: `[Portfolio Signal] Message from ${safeName} (${safeService})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #050b17; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #00F0FF;">
          <h2 style="color: #00F0FF; margin-top: 0;">// NEW TRANSMISSION RECEIVED</h2>
          <p><strong>Agent / Client Name:</strong> ${safeName}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${safeEmail}" style="color: #38bdf8;">${safeEmail}</a></p>
          <p><strong>Service / Matrix:</strong> ${safeService}</p>
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 20px 0;" />
          <h4 style="color: #38bdf8;">SPECIFICATIONS:</h4>
          <p style="white-space: pre-wrap; background: #030712; padding: 16px; border-radius: 8px; border-left: 4px solid #00F0FF; color: #e2e8f0;">${safeMessage}</p>
          <br />
          <span style="font-size: 11px; color: #64748b;">STARK HUD &bull; AUTOMATED ENCRYPTED TRANSMISSION PROTOCOL</span>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Transmission dispatched successfully!' });
  } catch (error) {
    console.error('SMTP Transmission Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to send email transmission. Please try again later.'
    });
  }
}
