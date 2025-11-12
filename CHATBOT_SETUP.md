# 🤖 AI Chatbot Integration Guide

This project includes support for free AI chatbot services. Follow the steps below to set up your preferred chatbot.

## 🎯 Recommended: Crisp (Free Tier with AI)

Crisp offers a free tier with AI chatbot capabilities, making it perfect for support automation.

### Setup Steps:

1. **Sign up for Crisp**
   - Go to [https://crisp.chat](https://crisp.chat)
   - Create a free account

2. **Create a Website**
   - After logging in, create a new website
   - Enter your website name and URL

3. **Get Your Website ID**
   - Go to **Settings** → **Website Settings**
   - Copy your **Website ID** (it looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

4. **Enable AI Features (Optional but Recommended)**
   - Go to **Settings** → **AI**
   - Enable AI chatbot features
   - Configure your AI assistant's personality and responses

5. **Add Environment Variable**
   - Create a `.env.local` file in your project root (if it doesn't exist)
   - Add the following line:
     ```
     NEXT_PUBLIC_CRISP_WEBSITE_ID=your-website-id-here
     ```
   - Replace `your-website-id-here` with your actual Website ID

6. **For Vercel Deployment**
   - Go to your Vercel project dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add a new variable:
     - **Name**: `NEXT_PUBLIC_CRISP_WEBSITE_ID`
     - **Value**: Your Crisp Website ID
     - **Environment**: Production, Preview, Development (select all)
   - Click **Save**

7. **Restart Your Development Server**
   ```bash
   npm run dev
   ```

8. **Test the Chatbot**
   - Visit your website
   - You should see a chat widget in the bottom-right corner
   - Click it to test the chatbot

---

## 🔄 Alternative: Tawk.to (Completely Free, No AI)

Tawk.to is completely free but doesn't have built-in AI features. You can still use it for live chat support.

### Setup Steps:

1. **Sign up for Tawk.to**
   - Go to [https://www.tawk.to](https://www.tawk.to)
   - Create a free account

2. **Create a Property**
   - After logging in, create a new property
   - Enter your website details

3. **Get Your Property ID and Widget ID**
   - Go to **Administration** → **Channels** → **Chat Widget**
   - You'll see your Property ID and Widget ID in the installation code
   - The format is: `https://embed.tawk.to/PROPERTY_ID/WIDGET_ID`

4. **Add Environment Variables**
   - Create or edit `.env.local` file:
     ```
     NEXT_PUBLIC_TAWK_PROPERTY_ID=your-property-id
     NEXT_PUBLIC_TAWK_WIDGET_ID=your-widget-id
     ```

5. **For Vercel Deployment**
   - Add both environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_TAWK_PROPERTY_ID`
     - `NEXT_PUBLIC_TAWK_WIDGET_ID`

6. **Restart and Test**
   - Restart your dev server
   - The chat widget should appear on your site

---

## ⚙️ Configuration Priority

The chatbot component will use Crisp if `NEXT_PUBLIC_CRISP_WEBSITE_ID` is set, otherwise it will fall back to Tawk.to if `NEXT_PUBLIC_TAWK_PROPERTY_ID` is set.

**Priority order:**
1. Crisp (if `NEXT_PUBLIC_CRISP_WEBSITE_ID` is set)
2. Tawk.to (if `NEXT_PUBLIC_TAWK_PROPERTY_ID` is set)
3. No chatbot (if neither is set)

---

## 🎨 Customization

### Crisp Customization
- Go to Crisp dashboard → **Settings** → **Chatbox**
- Customize colors, position, and appearance
- Set up automated messages and AI responses

### Tawk.to Customization
- Go to Tawk.to dashboard → **Administration** → **Channels** → **Chat Widget**
- Customize widget appearance, colors, and position
- Set up automated messages and triggers

---

## 🐛 Troubleshooting

### Chatbot not appearing?
1. Check that environment variables are set correctly
2. Make sure you've restarted your dev server after adding env variables
3. Check browser console for any errors
4. Verify your Website ID/Property ID is correct

### For Vercel deployment:
- Make sure environment variables are added in Vercel dashboard
- Redeploy your application after adding variables
- Check that variables are set for the correct environment (Production/Preview/Development)

### Still having issues?
- Check the browser console (F12) for JavaScript errors
- Verify the chatbot script is loading in the Network tab
- Make sure you're not blocking third-party scripts with an ad blocker

---

## 📝 Notes

- The chatbot component is already integrated into `pages/_app.js`
- No additional code changes are needed once environment variables are set
- The chatbot will appear on all pages automatically
- Both services offer mobile-responsive chat widgets

