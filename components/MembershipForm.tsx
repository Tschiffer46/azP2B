'use client'

import { useState } from 'react'

interface MembershipFormProps {
  t: {
    membership: {
      formHeadline: string
      name: string
      namePlaceholder: string
      email: string
      emailPlaceholder: string
      company: string
      companyPlaceholder: string
      industry: string
      industryPlaceholder: string
      tier: string
      tierStandard: string
      tierExclusive: string
      submit: string
      submitting: string
      success: string
      errorRequired: string
      errorEmail: string
      errorGeneric: string
      errorDuplicate: string
    }
  }
}

export default function MembershipForm({ t }: MembershipFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [industry, setIndustry] = useState('')
  const [tier, setTier] = useState('STANDARD')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (
      !name.trim() ||
      !email.trim() ||
      !company.trim() ||
      !industry.trim()
    ) {
      setError(t.membership.errorRequired)
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(t.membership.errorEmail)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, industry, tier }),
      })
      if (res.status === 409) {
        setError(t.membership.errorDuplicate)
      } else if (!res.ok) {
        setError(t.membership.errorGeneric)
      } else {
        setSuccess(true)
      }
    } catch {
      setError(t.membership.errorGeneric)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-p2b-darker rounded-xl p-8 border border-p2b-lime/40">
        <p className="text-p2b-lime font-semibold">{t.membership.success}</p>
      </div>
    )
  }

  return (
    <div className="bg-p2b-darker rounded-xl p-8 border border-white/10">
      <h2 className="text-p2b-white font-bold text-2xl mb-6">
        {t.membership.formHeadline}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label className="block text-p2b-grey text-sm mb-1">
            {t.membership.name}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.membership.namePlaceholder}
            className="w-full bg-p2b-dark border border-white/10 rounded-lg px-4 py-3 text-p2b-white text-sm focus:outline-none focus:border-p2b-lime"
            required
          />
        </div>
        <div>
          <label className="block text-p2b-grey text-sm mb-1">
            {t.membership.email}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.membership.emailPlaceholder}
            className="w-full bg-p2b-dark border border-white/10 rounded-lg px-4 py-3 text-p2b-white text-sm focus:outline-none focus:border-p2b-lime"
            required
          />
        </div>
        <div>
          <label className="block text-p2b-grey text-sm mb-1">
            {t.membership.company}
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={t.membership.companyPlaceholder}
            className="w-full bg-p2b-dark border border-white/10 rounded-lg px-4 py-3 text-p2b-white text-sm focus:outline-none focus:border-p2b-lime"
            required
          />
        </div>
        <div>
          <label className="block text-p2b-grey text-sm mb-1">
            {t.membership.industry}
          </label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder={t.membership.industryPlaceholder}
            className="w-full bg-p2b-dark border border-white/10 rounded-lg px-4 py-3 text-p2b-white text-sm focus:outline-none focus:border-p2b-lime"
            required
          />
        </div>
        <div>
          <label className="block text-p2b-grey text-sm mb-1">
            {t.membership.tier}
          </label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="w-full bg-p2b-dark border border-white/10 rounded-lg px-4 py-3 text-p2b-white text-sm focus:outline-none focus:border-p2b-lime"
          >
            <option value="STANDARD">{t.membership.tierStandard}</option>
            <option value="EXCLUSIVE">{t.membership.tierExclusive}</option>
          </select>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-p2b-lime text-p2b-black font-bold py-3 rounded-lg hover:bg-lime-300 transition-colors text-sm disabled:opacity-50"
        >
          {loading ? t.membership.submitting : t.membership.submit}
        </button>
      </form>
    </div>
  )
}
