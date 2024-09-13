'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronRight, Github, Twitter, Linkedin } from 'lucide-react'

const artists = [
  { id: 1, name: 'Artist 1', image: '/placeholder.svg?height=400&width=400' },
  { id: 2, name: 'Artist 2', image: '/placeholder.svg?height=400&width=400' },
  { id: 3, name: 'Artist 3', image: '/placeholder.svg?height=400&width=400' },
  { id: 4, name: 'Artist 4', image: '/placeholder.svg?height=400&width=400' },
  { id: 5, name: 'Artist 5', image: '/placeholder.svg?height=400&width=400' },
  { id: 6, name: 'Artist 6', image: '/placeholder.svg?height=400&width=400' },
]

export function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    (<div className="min-h-screen bg-black text-white font-sans">
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black">
            HYP
            <span className="text-blue-500">ME!</span>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#artists" className="hover:text-blue-500 transition-colors">Artists</a></li>
              <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
            </ul>
          </nav>
          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav
            className="md:hidden bg-black bg-opacity-90 backdrop-filter backdrop-blur-lg">
            <ul className="flex flex-col items-center py-4">
              <li className="py-2"><a href="#artists" onClick={() => setIsMenuOpen(false)}>Sanatçılar</a></li>
              <li className="py-2"><a href="#contact" onClick={() => setIsMenuOpen(false)}>İletişime geç</a></li>
            </ul>
          </nav>
        )}
      </header>
      <main className="pt-20">
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Müziğin Geleceğini Keşfet.</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12">İnovasyonun ritmi ile birleşince, <span className="text-blue-500">HYPME!</span>  sanatçıları geleceğin şarkılarını şekillendiriyor.</p>
        </section>

        <section id="artists" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <Link key={artist.id} href={`/artist/${artist.id}`} className="block group">
                <div
                  className="relative aspect-square overflow-hidden rounded-lg transition-all duration-300 transform group-hover:scale-105">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-300 group-hover:opacity-75" />
                  <div
                    className="absolute inset-0 flex items-end justify-between p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-semibold">{artist.name}</h3>
                    <ChevronRight className="text-blue-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="contact" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">İletişime geç!</h2>
          <form className="max-w-md mx-auto">
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">Adınız</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">Mail Adresiniz</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-sm font-medium">Mesajınız</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
              Mesaj Gönder
            </button>
          </form>
        </section>
      </main>
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-2xl font-bold">
                HYP<span className="text-blue-500">ME!</span>
              </Link>
              <p className="mt-2 text-sm text-gray-400">Müziğin geleceğini şekillendirir.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div
            className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            &copy; 2024 ME! Records. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>)
  );
}