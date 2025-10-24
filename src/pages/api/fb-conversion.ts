import type { NextApiRequest, NextApiResponse } from 'next';

const FB_GRAPH_VERSION = 'v20.0';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const PIXEL_ID = process.env.FB_PIXEL_ID;
  const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Facebook Pixel ID or Access Token missing on server' });
  }

  try {
    const { event_name = 'PageView', event_time, event_source_url, event_id, user_data = {}, custom_data = {} } = req.body || {};

    const payload = {
      data: [
        {
          event_name,
          event_time: event_time || Math.floor(Date.now() / 1000),
          event_id,
          event_source_url,
          action_source: 'website',
          user_data, // Should include hashed emails/phones when available
          custom_data,
        },
      ],
    };

    const url = `https://graph.facebook.com/${FB_GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Facebook API error', details: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    return res.status(500).json({ error: 'Unexpected error', details: err?.message });
  }
}
