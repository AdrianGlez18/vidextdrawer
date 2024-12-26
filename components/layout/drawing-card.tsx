"use client"

import { PenLine, Trash2, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { deleteDrawing, Drawing, getDrawings } from "@/lib/storage";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Editor, exportToBlob, Tldraw } from "tldraw";
import { uiOverrides } from "./ui-overrides";
import { CustomShapeUtil, VidextShapeTool } from "../custom-shape";
import { createContext, useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const EditorContext = createContext({} as { editor: Editor });

const DrawingCard = ({ drawing, setDrawings }: { drawing: Drawing, setDrawings: any }) => {
    const router = useRouter()
    const [editor, setEditor] = useState<Editor | null>(null)

    const handleMount = (editor: Editor) => {
        setEditor(editor)
    }
    const handleDelete = (id: string) => {
        indexedDB.deleteDatabase(id);
        deleteDrawing(id)
        setDrawings(getDrawings())
    }
    const handleEdit = () => {
        router.push(`/canvas/${drawing.id}`)
    }

    const uploadMutation = trpc.image.uploadImage.useMutation();

    const handlePublish = async () => {
        const shapeIds = editor!.getCurrentPageShapeIds()
        if (shapeIds.size === 0) return alert('No shapes on the canvas')
        const blob = await exportToBlob({
            editor: editor!,
            ids: [...shapeIds],
            format: 'png',
            opts: { background: false },
        })
        const base64 = await blobToBase64(blob)
        uploadMutation.mutate(
            { name: Date.now().toString(), base64 },
            {
                onSuccess: () => {
                    toast.success('Image successfully uploaded');
                },
                onError: (error) => {
                    console.error('Mutation error:', error);
                    toast.error('Error uploading image');
                },
            }
        );
    }

    const blobToBase64 = async (blob: Blob) => {
        const reader = new FileReader();

        const readFile = new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

        reader.readAsDataURL(blob);

        return await readFile as string;
    };

    const customTools = [VidextShapeTool]
    const MyCustomShapeUtil = [CustomShapeUtil]

    return (
        <EditorContext.Provider value={{ editor: editor! }}>
            <Card key={drawing.id}>
                <CardHeader>
                    <CardTitle>{drawing.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-48 border rounded bg-gray-50 flex items-center justify-center">
                        <PenLine className="w-12 h-12 text-gray-300" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <span className="text-sm text-gray-500">{drawing.updatedAt}</span>
                    <div className="space-x-2">
                        <Button onClick={handleEdit} variant="outline" size="icon">
                            <PenLine className="w-4 h-4" />
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="success"
                                    size="icon"
                                >
                                    <Upload className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Publish Draw</DialogTitle>
                                    <DialogDescription className="text-center">
                                        The following drawing will be published.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="h-72 w-full">
                                    <Tldraw
                                        onMount={handleMount}
                                        shapeUtils={MyCustomShapeUtil}
                                        tools={customTools}
                                        overrides={uiOverrides}
                                        components={{ Toolbar: null }}
                                        persistenceKey={drawing.id}
                                    />
                                </div>
                                <p className="text-center text-sm text-gray-500 my-3">
                                    Are you sure you want to upload it to the public gallery? You will not be able to delete it afterwards
                                </p>

                                <DialogFooter className="flex items-center sm:justify-center gap-4 w-full">
                                    <DialogClose asChild>
                                        <Button type="button" variant="destructive">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button type="submit" variant={"success"} onClick={handlePublish}>Publish</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDelete(drawing.id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </EditorContext.Provider>
    )
}

export default DrawingCard