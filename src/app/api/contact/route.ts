import { NextRequest, NextResponse } from 'next/server'
import { MAIL_FROM, MAIL_TO, RESEND_API_KEY, SITE_NAME } from '@/config/site'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, message, company, fleet_size } = body || {}
    if (!email || !message) {
      return NextResponse.json({ ok: false, error: 'Missing email or message' }, { status: 400 })
    }

    const subject = `[${SITE_NAME}] Novo pedido de demonstração`
    const text = `Novo pedido de contato\n\nNome: ${name || ''}\nEmpresa: ${company || ''}\nTamanho da frota: ${fleet_size || ''}\nEmail: ${email}\nTelefone: ${phone || ''}\n\nMensagem:\n${message}`
    const html = `
      <h2>Novo pedido de demonstração</h2>
      <p><strong>Nome:</strong> ${name || ''}</p>
      <p><strong>Empresa:</strong> ${company || ''}</p>
      <p><strong>Tamanho da frota:</strong> ${fleet_size || ''}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${phone || ''}</p>
      <p><strong>Mensagem:</strong></p>
      <pre style="white-space:pre-wrap">${message || ''}</pre>
    `

    if (!RESEND_API_KEY) {
      // No email provider configured – accept for now.
      console.warn('RESEND_API_KEY not set. Skipping real send. Payload:', body)
      return NextResponse.json({ ok: true, simulated: true })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        subject,
        text,
        html,
        reply_to: email,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ ok: false, error: err }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ ok: true, id: data.id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 })
  }
}
