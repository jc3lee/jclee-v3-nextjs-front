import path, { basename } from 'path'
import { createReadStream } from 'fs'
import { SanityClient } from '@sanity/client'

export const uploadFileToSanity = async (client: SanityClient, type: "image" | "file", filePath: string,) => {
  try {
    const readStream = createReadStream(filePath)
    readStream.on("error", (err) => {
      console.log(`error creating readStream ${err}`);
    })
    const res = await client.assets.upload(type, readStream as unknown as ReadableStream<any>, {
      filename: basename(filePath),
    })
    console.log("asset res", res);
  } catch (error) {
    console.log("Could not upload file to Sanity", error);
  }
}