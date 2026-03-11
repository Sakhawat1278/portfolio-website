import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // ─── CORS HANDLING ───────────────────────────────────────────────────────
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for the contact form
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message, sent_time } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // ─── SMTP CONFIG ──────────────────────────────────────────────────────────
    // These should be set in your Vercel Dashboard (Settings > Environment Variables)
    const SMTP_USER = process.env.SMTP_USER || 'contact@sohanux.com';
    const SMTP_PASS = process.env.SMTP_PASSWORD; // CRITICAL: Need this to work
    const SMTP_HOST = 'smtp.hostinger.com';
    const SMTP_PORT = 465;

    if (!SMTP_PASS) {
        console.error('SMTP_PASSWORD is not set in environment variables');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    try {
        // 1. ADMIN NOTIFICATION TEMPLATE
        const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0d0d;min-height:100vh;">
        <tr>
            <td align="center" style="padding:48px 16px;">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;background:#141414;border:1px solid rgba(255,255,255,0.06);">
                    <tr><td style="background:linear-gradient(135deg,#ff4212 0%,#ff6b35 100%);height:4px;"></td></tr>
                    <tr>
                        <td style="padding:36px 40px 28px;">
                            <table width="100%">
                                <tr>
                                    <td><span style="font-size:18px;font-weight:800;color:#ffffff;text-transform:uppercase;">SOHAN<span style="color:#ff4212;">UX</span></span></td>
                                    <td align="right"><span style="font-size:10px;color:rgba(255,255,255,0.25);letter-spacing:0.2em;font-weight:600;">ADMIN UPLINK</span></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr><td style="padding:0 40px;"><div style="height:1px;background:rgba(255,255,255,0.06);"></div></td></tr>
                    <tr>
                        <td style="padding:36px 40px 12px;">
                            <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.25em;color:#ff4212;">INCOMING TRANSMISSION</p>
                            <h1 style="margin:0;font-size:32px;font-weight:800;color:#ffffff;line-height:1.1;">New Contact<br/><span style="color:rgba(255,255,255,0.35);">Message Received.</span></h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:20px 40px;">
                            <table width="100%" style="background:#1a1a1a;border-radius:10px;border:1px solid rgba(255,255,255,0.05);">
                                <tr>
                                    <td style="padding:20px 24px;">
                                        <p style="margin:0 0 4px;font-size:9px;color:rgba(255,255,255,0.3);text-transform:uppercase;font-weight:700;">SENDER_ID</p>
                                        <p style="margin:0 0 14px;font-size:16px;font-weight:700;color:#ffffff;">${name}</p>
                                        <p style="margin:0 0 4px;font-size:9px;color:rgba(255,255,255,0.3);text-transform:uppercase;font-weight:700;">COMM_CHANNEL</p>
                                        <p style="margin:0 0 14px;font-size:14px;color:#ff4212;">${email}</p>
                                        <p style="margin:0 0 4px;font-size:9px;color:rgba(255,255,255,0.3);text-transform:uppercase;font-weight:700;">TIMESTAMP</p>
                                        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.55);">${sent_time}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:4px 40px 28px;">
                            <p style="margin:0 0 12px;font-size:9px;color:rgba(255,255,255,0.3);text-transform:uppercase;font-weight:700;">MISSION_OBJECTIVES</p>
                            <div style="background:#1a1a1a;border-left:3px solid #ff4212;padding:20px 24px;">
                                <p style="margin:0;font-size:15px;line-height:1.75;color:rgba(255,255,255,0.8);">${message}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0 40px 36px;">
                            <a href="mailto:${email}" style="display:inline-block;padding:14px 32px;background:#ff4212;border-radius:50px;color:#ffffff;text-decoration:none;font-size:11px;font-weight:800;text-transform:uppercase;">REPLY TO SENDER →</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        // 2. SENDER REPLY TEMPLATE
        const replyHtml = `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0d0d0d;min-height:100vh;">
        <tr>
            <td align="center" style="padding:48px 16px;">
                <table width="600" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;background:#141414;border:1px solid rgba(255,255,255,0.06);">
                    <tr><td style="background:linear-gradient(90deg,#ff4212 0%,#ff6b35 50%,#ff4212 100%);height:4px;"></td></tr>
                    <tr>
                        <td style="padding:48px 40px 36px;text-align:center;">
                            <div style="display:inline-block;width:72px;height:72px;border-radius:50%;background:rgba(255,66,18,0.1);line-height:72px;text-align:center;margin-bottom:24px;"><span style="font-size:28px;">⚡</span></div>
                            <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#ff4212;text-transform:uppercase;">UPLINK_CONFIRMED</p>
                            <h1 style="margin:0 0 16px;font-size:34px;font-weight:800;color:#ffffff;">Your message<br/><span style="color:rgba(255,255,255,0.3);">has been received.</span></h1>
                            <p style="margin:0 auto;font-size:15px;color:rgba(255,255,255,0.45);line-height:1.65;max-width:400px;">Hey <strong>${name}</strong> — your transmission landed successfully. I'll respond within <span style="color:#ff4212;">24–48 hours</span>.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0 40px 32px;">
                            <table width="100%" style="background:#1a1a1a;border-radius:10px;border:1px solid rgba(255,255,255,0.05);padding:20px;">
                                <tr><td><p style="margin:0;font-size:14px;color:rgba(255,255,255,0.6);font-style:italic;">"${message}"</p></td></tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        // 3. EXECUTE MAILING
        // Send to Admin
        await transporter.sendMail({
            from: `"SOHAN UX" <${SMTP_USER}>`,
            to: SMTP_USER,
            subject: `⚡ New Transmission from ${name}`,
            html: adminHtml,
        });

        // Send Auto-Reply to User
        await transporter.sendMail({
            from: `"Sakhawat Hossain Sohan" <${SMTP_USER}>`,
            replyTo: SMTP_USER,
            to: email,
            subject: `Message Received — Sakhawat Hossain Sohan`,
            html: replyHtml,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Mail Error:', error);
        return res.status(500).json({ error: 'Failed to send transmission' });
    }
}
