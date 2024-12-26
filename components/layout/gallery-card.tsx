"use client"

import { Bot,  Lightbulb } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import { describeImage, judgeImage } from "@/lib/server/getOpenAiData";


const GalleryCard = ({ id, title, src, date }: { id: string, title: string, src: string, date: string }) => {
    const [aiResponse, setAiResponse] = useState<any>('The response will be here')

    const handleDescribe = async () => {
        try {
            setAiResponse('Loading...');
            const response = await describeImage(src);
            setAiResponse(response);
        } catch (error) {
            setAiResponse('Current OpenAI account without enough credits or disabled');
        }
    }

    const handleJudge = async () => {
        try {
            setAiResponse('Loading...');
            const response = await judgeImage(src);
            setAiResponse(response);
        } catch (error) {
            setAiResponse('Current OpenAI account without enough credits or disabled');
        }
    }
    return (
        <Card key={id}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-72 rounded bg-gray-50 flex items-center justify-center">

                <Image src={src} alt={title} width={192} height={108} />

            </CardContent>
            <CardFooter className="flex justify-between">
                <span className="text-sm text-gray-500">{date}</span>
                <div className="space-x-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="success"
                                size="icon"
                            >
                                <Bot className="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-center">Publish Draw</DialogTitle>
                                <DialogDescription className="text-center">
                                    The following drawing will be published.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="w-full flex flex-col items-center justify-center">
                                <div className="h-72 w-full flex items-center justify-center">
                                    <Image src={src} alt={title} width={192} height={108} />
                                </div>
                                <ScrollArea className="h-48 w-72 rounded-md border">
                                    <div className="p-4">
                                        {aiResponse}
                                    </div>
                                </ScrollArea>
                            </div>

                            <DialogFooter className="flex items-center sm:justify-center gap-4 w-full">
                                <Button variant={"success"} onClick={handleDescribe} className="flex gap-2">
                                    <Bot className="w-4 h-4" />
                                    Describe the image
                                </Button>
                                <Button variant={"success"} onClick={handleJudge} className="flex gap-2">
                                    <Lightbulb className="w-4 h-4" />
                                    What do you think?
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardFooter>
        </Card>
    )
}

export default GalleryCard