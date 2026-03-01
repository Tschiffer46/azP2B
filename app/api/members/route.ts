import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendMemberConfirmation } from '@/lib/mail'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown
      email?: unknown
      company?: unknown
      industry?: unknown
      tier?: unknown
    }

    const { name, email, company, industry, tier } = body

    if (!name || !email || !company || !industry) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const validTiers = ['STANDARD', 'EXCLUSIVE']
    const safeTier =
      typeof tier === 'string' && validTiers.includes(tier)
        ? (tier as 'STANDARD' | 'EXCLUSIVE')
        : 'STANDARD'

    const member = await prisma.member.create({
      data: {
        name: String(name),
        email: String(email),
        company: String(company),
        industry: String(industry),
        tier: safeTier,
      },
    })

    try {
      await sendMemberConfirmation({ name: member.name, email: member.email, tier: member.tier })
    } catch {
      // Email failure should not block response
    }

    return NextResponse.json(member, { status: 201 })
  } catch (err: unknown) {
    const e = err as { code?: string }
    if (e.code === 'P2002') {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
