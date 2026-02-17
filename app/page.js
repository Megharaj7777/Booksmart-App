'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [])

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Background Glow Effects */}
      <div
  className="relative h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: "url('/bookmark-bg.jpg')" }}
></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md p-10 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">

        {/* Logo / Title */}
        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
          BookSmart
        </h1>

        <p className="text-center text-zinc-400 text-sm mb-10">
          Your bookmarks. Elevated.
        </p>

        {/* Google Button */}
        <button
          onClick={loginWithGoogle}
          className="group w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
          >
            <path fill="#EA4335" d="M24 9.5c3.3 0 6.3 1.1 8.7 3.2l6.5-6.5C34.9 2.5 29.8 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.6 5.9C12 13.1 17.5 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4 7.1-9.9 7.1-17.6z"/>
            <path fill="#FBBC05" d="M10.2 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-7.6-5.9C.9 17.4 0 20.6 0 24.5s.9 7.1 2.6 10.3l7.6-5.9z"/>
            <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.8l-7.6-5.9c-2.1 1.4-4.8 2.2-8.4 2.2-6.5 0-12-3.6-14.2-8.7l-7.6 5.9C6.5 42.6 14.6 48 24 48z"/>
          </svg>

          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 mt-8">
          Secure authentication powered by Supabase
        </p>

      </div>
    </div>
  )
}
