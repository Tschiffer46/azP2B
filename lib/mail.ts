import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendMemberConfirmation(member: {
  name: string
  email: string
  tier: string
}): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: member.email,
    subject: 'Välkommen till Padel to Business!',
    html: `
      <div style="background:#0a0a0a;color:#ffffff;font-family:Inter,sans-serif;padding:32px;max-width:600px;margin:0 auto;">
        <h1 style="color:#a3e635;margin-bottom:16px;">Välkommen, ${member.name}!</h1>
        <p>Din ansökan om <strong>${member.tier}</strong>-medlemskap har tagits emot.</p>
        <p>Vi återkommer till dig inom kort med mer information om nästa steg.</p>
        <p style="margin-top:32px;color:#a0a0a0;">Padel to Business<br/>info@padeltobusiness.se</p>
      </div>
    `,
  })
}

export async function sendBookingConfirmation(
  booking: { name: string; email: string },
  event: { title: string; date: Date; location: string }
): Promise<void> {
  const dateStr = new Date(event.date).toLocaleString('sv-SE', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: booking.email,
    subject: `Bokningsbekräftelse – ${event.title}`,
    html: `
      <div style="background:#0a0a0a;color:#ffffff;font-family:Inter,sans-serif;padding:32px;max-width:600px;margin:0 auto;">
        <h1 style="color:#a3e635;margin-bottom:16px;">Bokningsbekräftelse</h1>
        <p>Hej ${booking.name}!</p>
        <p>Din plats på <strong>${event.title}</strong> är bokad.</p>
        <ul style="list-style:none;padding:0;margin:16px 0;">
          <li>📅 <strong>Datum:</strong> ${dateStr}</li>
          <li>📍 <strong>Plats:</strong> ${event.location}</li>
        </ul>
        <p style="margin-top:32px;color:#a0a0a0;">Padel to Business<br/>info@padeltobusiness.se</p>
      </div>
    `,
  })
}
