export default async function handler(req, res) {
  // Set CORS headers for Next.js 15
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { url, score, violations, scanDate, email } = req.body;

    // For now, we'll just log the data and return success
    // In a real implementation, you would:
    // 1. Send email using a service like SendGrid, Mailgun, or AWS SES
    // 2. Store the email in your database for lead generation
    // 3. Generate and attach a PDF report
    
    console.log('Email report request:', {
      email,
      url,
      score: score.score,
      violationsCount: violations.length,
      scanDate
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, you would:
    // - Validate email format
    // - Send actual email with report
    // - Store lead in database
    // - Add to mailing list

    res.status(200).json({ 
      message: 'Report sent successfully',
      email: email,
      reportId: `report_${Date.now()}`
    });

  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send email report' });
  }
}
