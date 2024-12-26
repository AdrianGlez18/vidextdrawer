'use client'

import { useState, useEffect, useRef, createContext } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { components, uiOverrides } from "@/components/layout/ui-overrides";
import { saveDrawing, getDrawingById } from '@/lib/storage'
import { Editor, Tldraw } from 'tldraw'
import { trpc } from '@/lib/trpc'
import { CustomShapeUtil, VidextShapeTool } from '@/components/custom-shape'

const EditorContext = createContext({} as { editor: Editor });

export default function CanvasPage({ params }: { params: { id: string } }) {
  const drawingId = params.id
  const router = useRouter()
  /* const publishEditor = useEditor() */
  const editor = useRef<Editor | null>(null);
  const [name, setName] = useState(`Draft-${drawingId}`)
  //const canvasRef = useRef<any>(null);

  useEffect(() => {
    if (drawingId) {
      const drawing = getDrawingById(drawingId)
      if (drawing) {
        setName(drawing.name)
      }
    }
  }, [drawingId])

  const handleSave = () => {
    saveDrawing(name, drawingId)
    router.push('/gallery')
  }

  const uploadMutation = trpc.image.uploadImage.useMutation();

  /* const handlePublish = async () => {
    const shapeIds = publishEditor.getCurrentPageShapeIds()
    if (shapeIds.size === 0) return alert('No shapes on the canvas')
    const blob = await exportToBlob({
      editor: publishEditor,
      ids: [...shapeIds],
      format: 'png',
      opts: { background: false },
    })
    const base64 = await blobToBase64(blob)
    uploadMutation.mutate(
      { name, base64 },
      {
        onSuccess: (data) => {
          alert(`Imagen subida: ${data.url}`);
        },
        onError: (error) => {
          alert(`Error: ${error.message}`);
        },
      }
    );
  } */


  /* const blobToBase64 = async (blob: Blob) => {
    const reader = new FileReader();
  
    const readFile = new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  
    reader.readAsDataURL(blob);

    return await readFile as string;
  }; */

  const customTools = [VidextShapeTool]
  const MyCustomShapeUtil = [CustomShapeUtil]

  return (
    <EditorContext.Provider value={{ editor: editor.current! }}>
      <div className="flex flex-col h-screen">
        <header className="border-b p-4 flex items-center justify-between">
          <Link href="/gallery" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Drawing name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-64"
            />
            <Button onClick={handleSave} className="space-x-2">
              <Save className="w-4 h-4" />
              <span>Save and exit</span>
            </Button>
            {/* <Button onClick={handlePublish} className="space-x-2 bg-green-500 hover:bg-green-600">
            <Save className="w-4 h-4" />
            <span>Publish</span>
          </Button> */}
          </div>
        </header>
        <div className="flex-1 bg-gray-50">
          <Tldraw
            shapeUtils={MyCustomShapeUtil}
            tools={customTools}
            overrides={uiOverrides}
            components={components}
            persistenceKey={drawingId}
          />
        </div>


      </div>
    </EditorContext.Provider>
  )
}