import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { MAIL_FROM, MAIL_TO, RESEND_API_KEY, SITE_NAME } from '@/config/site';

function validateEmail(email: string) {
  return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { name, email, phone, company, fleetSize, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields', fields: { name: !name, email: !email, message: !message } });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);

    const subject = `[${SITE_NAME}] Nova solicitação de demonstração`;
    const html = `
      <h2 style="margin:0 0 12px 0;font-family:Segoe UI,Arial,sans-serif;color:#0f172a">Nova solicitação de demonstração</h2>
      <div style="font-family:Segoe UI,Arial,sans-serif;color:#0f172a;line-height:1.5">
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone || '-'} </p>
        <p><strong>Empresa:</strong> ${company || '-'} </p>
        <p><strong>Tamanho da Frota:</strong> ${fleetSize || '-'} </p>
        <p><strong>Mensagem:</strong><br/>${(message || '').replace(/\n/g, '<br/>')}</p>
      </div>
    `;

    await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('Email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
