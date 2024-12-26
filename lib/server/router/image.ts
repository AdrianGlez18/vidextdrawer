import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { db } from '../db';

export const imageRouter = createTRPCRouter({
  uploadImage: publicProcedure
    .input(
      z.object({
        name: z.string(),
        base64: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, base64 } = input;

      try {
        console.log("Image: ", base64.slice(22));

        const formData = new URLSearchParams();
        formData.append("image", base64.slice(22));

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGDB_PRIVATE_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          
          body: formData.toString(),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error en ImgDB:', errorText);
          throw new Error(`Error de ImgDB: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        const imageUrl = result.data.url;

        const image = await db.imageModel.create({
          data: {
            name,
            url: imageUrl,
          },
        }); 

        return image; 
      } catch (error) {
        console.error('Error en uploadImage:', error);
        throw new Error('Error interno al subir la imagen');
      }
    }),
    fetchImages: publicProcedure.query(async () => {
      const images = await db.imageModel.findMany();
      return images
    })
});
