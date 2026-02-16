import './globals.css'

export const metadata = { 
  title: "BookSmart",
  description: "Smart Bookmark App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen antialiased">
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black">
          {children}
        </div>
      </body>
    </html>
  );
}
