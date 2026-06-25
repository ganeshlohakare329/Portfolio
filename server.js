/* ==========================================================================
   Lohakare Ganesh - Secure SMTP Mail Server
   ========================================================================== */

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so client frontend (running on different port/file system) can communicate
app.use(cors({
    origin: '*' // Allow all origins for local portfolio testing
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SQL Injection and XSS Protection Middleware
function securitySanitizer(req, res, next) {
    const sanitize = (val) => {
        if (typeof val !== 'string') return val;
        
        // Remove typical SQL Injection strings (escaping quotes, blocking inline queries)
        let cleaned = val
            .replace(/'/g, "''")          // Escape single quotes for SQL databases
            .replace(/--/g, "")           // Remove SQL comments
            .replace(/UNION/gi, "")       // Remove UNION queries
            .replace(/SELECT/gi, "")      // Remove SELECT statements
            .replace(/DROP/gi, "")        // Remove DROP statements
            .replace(/DELETE/gi, "")      // Remove DELETE statements
            .replace(/INSERT/gi, "")      // Remove INSERT statements
            .replace(/OR 1=1/gi, "")      // Remove boolean bypasses
            .replace(/;/g, "");           // Remove query termination markers
            
        // Basic XSS Prevention (strip dangerous tags)
        cleaned = cleaned
            .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
            .replace(/<\/?[^>]+(>|$)/g, ""); // Strip general HTML tags
            
        return cleaned.trim();
    };

    if (req.body) {
        for (const key in req.body) {
            req.body[key] = sanitize(req.body[key]);
        }
    }
    next();
}

app.use(securitySanitizer);
const path = require("path");

// Serve static files
app.use(express.static(__dirname));

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Contact API Route
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Server-side validation check
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All form fields are required." });
    }

    // Configure SMTP transport using Gmail service
    // Note: Credentials are read securely from process.env, never exposed on client-side JS
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Formulate email content
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`, // From your sender address with sender name
        to: process.env.RECEIVER_EMAIL,              // Sent to your personal email
        replyTo: email,                              // Direct reply goes to recruiter
        subject: `[Portfolio Inquiry] ${subject}`,
        text: `You have received a new message from your portfolio website.\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Subject: ${subject}\n\n` +
              `Message:\n${message}\n`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 20px; color: #fff; text-align: center;">
                    <h2 style="margin: 0; font-size: 20px;">New Portfolio Contact</h2>
                </div>
                <div style="padding: 24px; background: #fff;">
                    <p style="margin-top: 0;"><strong>Sender Name:</strong> ${name}</p>
                    <p><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
                    <p><strong>Message Content:</strong></p>
                    <blockquote style="background: #f8fafc; border-left: 4px solid #0ea5e9; padding: 12px 18px; margin: 0; border-radius: 4px; font-style: italic;">
                        ${message.replace(/\n/g, '<br>')}
                    </blockquote>
                </div>
                <div style="background: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #64748b;">
                    Sent automatically from ganesh-portfolio backend.
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent from ${name} (${email})`);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Nodemailer transport error:", error);
        res.status(500).json({ error: "SMTP configuration error. Check your Google App Password settings." });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Secure contact server running on http://localhost:${PORT}`);
});
