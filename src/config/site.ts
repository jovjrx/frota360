export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Frota360';
export const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'contacto@frota360.pt';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '351000000000';

export const MAIL_TO = process.env.MAIL_TO || COMPANY_EMAIL;
export const MAIL_FROM = process.env.MAIL_FROM || `Website ${SITE_NAME} <no-reply@${(process.env.NEXT_PUBLIC_DOMAIN || 'frota360.pt')}>`;

export const RESEND_SMTP_HOST = process.env.RESEND_SMTP_HOST || 'smtp.resend.com';
export const RESEND_SMTP_PORT = Number(process.env.RESEND_SMTP_PORT || 587);
export const RESEND_SMTP_USER = process.env.RESEND_SMTP_USER || 'resend';
export const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
