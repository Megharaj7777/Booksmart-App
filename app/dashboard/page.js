'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
    const [user, setUser] = useState(null)
    const [bookmarks, setBookmarks] = useState([])
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    // ✅ Fetch bookmarks
    const fetchBookmarks = async (userId) => {
        const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (error) {
            console.log('Fetch error:', error)
            return
        }

        setBookmarks(data || [])
    }

    // ✅ Get logged in user
    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser()

            if (!data.user) {
                router.push('/')
            } else {
                setUser(data.user)
            }

            setLoading(false)
        }

        getUser()
    }, [router])

    // ✅ Realtime + Initial Fetch
    useEffect(() => {
        if (!user) return

        fetchBookmarks(user.id)

        const channel = supabase
            .channel('bookmarks-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    console.log('Realtime update:', payload)
                    fetchBookmarks(user.id)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user])

    const addOrUpdateBookmark = async () => {
        if (!title || !url) return

        let formattedUrl = url.trim().replace(/\s+/g, '')

        if (!/^https?:\/\//i.test(formattedUrl)) {
            formattedUrl = `https://${formattedUrl}`
        }

        if (editingId) {
            await supabase
                .from('bookmarks')
                .update({ title, url: formattedUrl })
                .eq('id', editingId)

            setEditingId(null)
        } else {
            await supabase.from('bookmarks').insert({
                title,
                url: formattedUrl,
                user_id: user.id,
            })
        }

        setTitle('')
        setUrl('')
    }

const deleteBookmark = async (id) => {
    const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id)

    if (!error) {
        setBookmarks((prev) => prev.filter((b) => b.id !== id))
    }
}



    const editBookmark = (bookmark) => {
        setTitle(bookmark.title)
        setUrl(bookmark.url)
        setEditingId(bookmark.id)
    }

    const logout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>
    }

return (
  <div className="relative min-h-screen px-6 py-16 bg-black overflow-hidden">

    {/* Background Glow Effects */}
      <div
  className="relative h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: "url('/bookmark-bg.jpg')" }}
></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            My Bookmarks
          </h1>
          <p className="text-sm text-zinc-400 mt-2">
            Logged in as {user?.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {/* Add / Edit Form */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          className="flex-1 p-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition"
          placeholder="Bookmark Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="flex-1 p-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={addOrUpdateBookmark}
          className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition-transform shadow-lg"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Bookmarks List */}
      {bookmarks.length === 0 ? (
        <div className="text-center text-zinc-500 py-16 border border-dashed border-zinc-700 rounded-xl">
          No bookmarks yet.
          <div className="text-sm mt-2 opacity-60">
            Add your first one and build your collection 🚀
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="group flex justify-between items-center p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-cyan-400 transition-all duration-300"
            >
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 font-medium group-hover:underline break-all"
              >
                {b.title}
              </a>

              <div className="flex gap-5 text-sm">
                <button
                  onClick={() => editBookmark(b)}
                  className="text-yellow-400 hover:text-yellow-300 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteBookmark(b.id)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
)
}
