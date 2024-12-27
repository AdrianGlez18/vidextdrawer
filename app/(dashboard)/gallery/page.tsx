'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PenLine, PlusIcon } from 'lucide-react'
import { getDrawings, createDrawing } from '@/lib/storage'
import { Drawing } from '@/lib/storage'
import DrawingCard from '@/components/layout/drawing-card'
import { useRouter } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { trpc } from '@/lib/trpc'
import GalleryCard from '@/components/layout/gallery-card'

export default function GalleryPage() {
  const router = useRouter()
  const [drawings, setDrawings] = useState<Drawing[]>([])
  const [activeTab, setActiveTab] = useState('personal')
  const drawingId = Date.now().toString();
  const canvasPath = `/canvas/${drawingId}`;

  useEffect(() => {
    setDrawings(getDrawings())
  }, [])

  const handleCreateNewDrawing = () => {
    createDrawing(drawingId)
    router.push(canvasPath)
  }

  const publicGallery = trpc.image.fetchImages.useQuery().data;

  return (
    <div className="min-h-screen p-4">
      <header className="border-b w-screen flex items-center justify-center">
        <div className="container flex items-center justify-between h-16 px-4 mx-4">
          <Link href="/" className="flex items-center space-x-2">
            <PenLine className="w-6 h-6" />
            <span className="font-bold">VidextDrawer</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/gallery">Gallery</Link>
            <Button onClick={handleCreateNewDrawing}>Create New Drawing</Button>
          </nav>
        </div>
      </header>
      <main className="flex w-full items-center justify-center">
        <div className=" flex flex-col items-center w-full">
          <h1 className="text-3xl font-bold italic sm:text-4xl my-2">VidextDrawer Art Gallery</h1>
          <Tabs defaultValue="personal" className='w-full' onValueChange={setActiveTab}>
            <TabsList className='flex items-center justify-center gap-4 font-bold my-4'>
              <TabsTrigger value="personal" className={`${activeTab === 'personal' ? 'active-tab' : ''}`}>Your Drawings</TabsTrigger>
              <TabsTrigger value="public" className={`${activeTab === 'public' ? 'active-tab' : ''}`}>Public Gallery</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className='flex flex-col items-center w-full'>
              {drawings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No drawings saved yet.</p>
                  <Button onClick={handleCreateNewDrawing} className="mt-4">Create New Drawing</Button>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full xl:max-w-screen-lg 2xl:max-w-screen-xl">
                  {drawings.map((drawing) => (
                    <DrawingCard key={drawing.id} drawing={drawing} setDrawings={setDrawings} />
                  ))}
                  <Card key='new'>
                    <CardContent className="flex items-center justify-center w-full h-full cursor-pointer">
                      <PlusIcon className="w-12 h-12 text-gray-300" onClick={handleCreateNewDrawing} />
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
            <TabsContent value="public" className='flex flex-col items-center w-full'>
              {!publicGallery || publicGallery.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No drawings saved yet.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full xl:max-w-screen-lg 2xl:max-w-screen-xl">
                  {publicGallery.map((drawing) => (
                    <GalleryCard key={drawing.id} id={drawing.id.toString()} title={drawing.name} src={drawing.url} date={drawing.createdAt}  />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>


        </div>
      </main>
    </div>
  )
}

