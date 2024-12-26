"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, PenLine, Save, Layout, Share, Plane, Bot } from 'lucide-react'
import { createDrawing } from '@/lib/storage';
import { useRouter } from 'next/navigation'

export default function Home() {
  const drawingId = Date.now().toString();
  const canvasPath = `/canvas/${drawingId}`;
  const router = useRouter()

  const handleCreateNewDrawing = () => {
    createDrawing(drawingId)
    router.push(canvasPath)
  }
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">

      <header className="border-b w-screen flex items-center justify-center">
        <div className="container flex items-center justify-between h-16 px-4 mx-4">
          <Link href="/" className="flex items-center space-x-2">
            <PenLine className="w-6 h-6" />
            <span className="font-bold">VidextDrawer</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/gallery">Gallery</Link>
            <Button onClick={handleCreateNewDrawing}>Start Drawing!</Button>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center">

        <section className="container px-4 py-4 md:py-8 xl:py-12 4xl:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl">
              Draw and save your ideas
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl">
              VidextDrawer lets you create and save your sketches locally or participate in a global art gallery.
              Start drawing now and access your work anytime!
            </p>

              <Button size="lg" className="space-x-2" onClick={handleCreateNewDrawing}>
                <span>Start Drawing</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

          </div>
        </section>

        <section className="container px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-4">
              <PenLine className="w-8 h-8" />
              <h3 className="font-semibold">Draw and Create</h3>
              <p className="text-gray-500">Create sketches with our intuitive drawing tools.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Save className="w-8 h-8" />
              <h3 className="font-semibold">Auto-Save</h3>
              <p className="text-gray-500">Your work is automatically saved to local storage.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Layout className="w-8 h-8" />
              <h3 className="font-semibold">Gallery View</h3>
              <p className="text-gray-500">Access all your saved drawings in one place.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Share className="w-8 h-8" />
              <h3 className="font-semibold">Share your art</h3>
              <p className="text-gray-500">Publish your drawings so everyone can see them!</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Plane className="w-8 h-8" />
              <h3 className="font-semibold">Discover Amazing Drawings</h3>
              <p className="text-gray-500">Discover amazing drawings from people around the world!</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <Bot className="w-8 h-8" />
              <h3 className="font-semibold">AI judges</h3>
              <p className="text-gray-500">Learn what AI thinks about your art.</p>
            </div>
          </div>
        </section>

      </main>

    </div>
  )
}

