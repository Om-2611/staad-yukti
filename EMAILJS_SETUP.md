# EmailJS Setup Instructions for Contact Form

The contact form is configured to send emails to `guptaom2622611@gmail.com`. Follow these steps to set up EmailJS:

## Option 1: Using EmailJS (Recommended for Production)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account: `guptaom2622611@gmail.com`
5. Note down the **Service ID**

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}} - STAAD Contact Form

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from the STAAD contact form.
```

4. Note down the **Template ID**

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**

### Step 5: Update Environment Variables
Update your `.env` file with the credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 6: Restart Development Server
```bash
npm run dev
```

## Option 2: Using Mailto Link (Current Fallback)

If EmailJS is not configured, the form will automatically fall back to opening the user's default email client with a pre-filled message. This works immediately without any setup but requires the user to have an email client configured.

## Testing the Contact Form

1. Navigate to the Contact page
2. Fill in all fields
3. Click "Send Message"
4. If EmailJS is configured: Email will be sent directly
5. If EmailJS is not configured: User's email client will open with pre-filled message

## Email Format

Emails sent to `guptaom2622611@gmail.com` will contain:
- Sender's name
- Sender's email address
- Subject line
- Message content

## Troubleshooting

### Emails not sending?
- Check that all environment variables are correctly set
- Verify EmailJS service is connected to the correct Gmail account
- Check EmailJS dashboard for error logs
- Ensure you haven't exceeded the free tier limit (200 emails/month)

### Mailto link not working?
- User needs to have a default email client configured
- Alternative: Display the email address and let users copy it

## Contact Information

- **Email**: guptaom2622611@gmail.com
- **Phone**: +91 8789418998 / +91 8889978781
- **Location**: Hyderabad Institute of Technology and Management, Telangana 501401
