import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Fraunces, Inter, JetBrains_Mono, Caveat } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })
const caveat = Caveat({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-hand' })

export default async function PremiumSuccess({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  const { status, customer_details } = session
  const customerEmail = customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  const cardNumber = session_id.replace('cs_test_', '').slice(0, 4).toUpperCase()

  // ==================== UPGRADE TO PREMIUM ====================
  if (status === 'complete' && customerEmail) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      
      await fetch(`${baseUrl}/api/users/premium/${customerEmail}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error("Failed to upgrade user to premium:", error)
      // Don't block the success page even if upgrade fails
    }
  }
  // ===========================================================

  if (status === 'complete') {
    return (
      <div
        className={`${fraunces.variable} ${inter.variable} ${mono.variable} ${caveat.variable} min-h-screen bg-[#1B2119] flex items-center justify-center px-4 py-12 overflow-hidden`}
      >
        <style>{`
          @keyframes cardPull { 0% { opacity: 0; transform: translateY(30px) rotate(2deg) scale(0.92); } 100% { opacity: 1; transform: translateY(0) rotate(-0.6deg) scale(1); } }
          @keyframes tabPop { 0% { opacity: 0; transform: translateY(-12px) scale(0.8); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes checkPop { 0% { transform: scale(0.3) rotate(-12deg); } 60% { transform: scale(1.15) rotate(8deg); } 100% { transform: scale(1) rotate(0); } }
          .recipe-card { animation: cardPull 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
          .file-tab { animation: tabPop 0.6s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
        `}</style>

        <section className="recipe-card relative w-full max-w-md">
          {/* File tab */}
          <div
            className="file-tab absolute -top-9 right-8 px-6 py-2.5 rounded-t-xl text-xs font-bold tracking-[0.5px] shadow-lg z-10"
            style={{
              background: '#6B7A3A',
              color: '#F6EFDD',
              fontFamily: 'var(--font-mono)',
            }}
          >
            ⭐️ PREMIUM ACTIVATED
          </div>

          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: '#F6EFDD',
              boxShadow: '0 30px 70px -15px rgba(0,0,0,0.75)',
            }}
          >
            <div className="h-2 bg-gradient-to-r from-[#B23A2E] via-[#6B7A3A] to-[#B23A2E]" />

            <div className="px-12 pt-12 pb-10">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-[#B23A2E] rounded-full flex items-center justify-center shadow-xl"
                     style={{ animation: 'checkPop 0.7s 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}>
                  <span className="text-5xl">🎉</span>
                </div>
              </div>

              <h1 className="text-4xl leading-none font-semibold mb-8 text-center" 
                  style={{ fontFamily: 'var(--font-display)', color: '#211C13' }}>
                Welcome to<br />Premium Kitchen
              </h1>

              <div className="mb-10">
                <p className="uppercase text-xs tracking-[1px] mb-4 font-bold" 
                   style={{ fontFamily: 'var(--font-mono)', color: '#6B7A3A' }}>
                  YOUR ACCOUNT HAS BEEN UPGRADED
                </p>
              </div>

              <Link
                href="/dashboard"
                className="block w-full bg-[#211C13] hover:bg-black text-[#F6EFDD] font-semibold py-4 rounded-xl text-center text-[15px] tracking-wide transition-all active:scale-95"
              >
                Go to Dashboard →
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return redirect('/')
}