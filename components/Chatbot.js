import { useEffect } from 'react';

/**
 * Chatbot Component
 * 
 * Supports multiple chatbot services:
 * - Crisp (recommended for AI features) - Free tier available
 * - Tawk.to (completely free, no AI)
 * 
 * To use Crisp (Recommended for AI):
 * 1. Sign up at https://crisp.chat (free account)
 * 2. Create a website in Crisp dashboard
 * 3. Get your website ID from Settings > Website Settings > Website ID
 * 4. Add NEXT_PUBLIC_CRISP_WEBSITE_ID=your-website-id to your .env.local file
 * 5. Enable AI features in Crisp dashboard (Settings > AI)
 * 
 * To use Tawk.to (Free, no AI):
 * 1. Sign up at https://www.tawk.to (free account)
 * 2. Create a property and get your Property ID
 * 3. Add NEXT_PUBLIC_TAWK_PROPERTY_ID=your-property-id to your .env.local file
 */
export default function Chatbot() {
  useEffect(() => {
    // Crisp Chatbot Integration (Recommended - has AI features)
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
      
      (function() {
        const d = document;
        const s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
      
      return; // Don't load Tawk.to if Crisp is configured
    }
    
    // Tawk.to Chatbot Integration (Free alternative)
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID) {
      const tawkPropertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
      const tawkWidgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
      
      if (!tawkWidgetId) {
        console.warn('Tawk.to Widget ID is required. Please set NEXT_PUBLIC_TAWK_WIDGET_ID in your environment variables.');
        return;
      }
      
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      
      (function() {
        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = `https://embed.tawk.to/${tawkPropertyId}/${tawkWidgetId}`;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();
    }
  }, []);

  return null; // This component doesn't render anything visible
}

