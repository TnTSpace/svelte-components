import type { iCloudinaryInfo, TUpload, iStatus, iUploadResource, iMedia } from '$lib/interface/index.js';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { deleteFileFromCloudinary, uploadToCloudinary, uploadUrlToCloudinary } from '$lib/server/index.js';
import { UploadType } from '$lib/constants/index.js';


export const POST: RequestHandler = async ({ request }) => {
  
  // Authentication Guard

  try {
    const formData = await request.formData()

    const type = formData.get('type') as TUpload

    let res: iCloudinaryInfo | null = null

    if (type === UploadType.UPLOAD) {
      const resource: iUploadResource = {
        file: formData.get('file') as File,
        folder: formData.get('folder') as string
      }
      res = await uploadToCloudinary(resource) as unknown as iCloudinaryInfo
    } else { 
      const resource: iUploadResource = {
        url: formData.get('url') as string,
        folder: formData.get('folder') as string
      }
      res = await uploadUrlToCloudinary(resource) as unknown as iCloudinaryInfo
    }
    
    const result: iStatus = { message: "Successfully uploaded file", status: "success", data: res }
    return new Response(JSON.stringify(result))
  } catch (error: any) {
    const result: iStatus = { message: error.message, status: "error" }
    return new Response(JSON.stringify(result))
  }
};

export const DELETE: RequestHandler = async ({ request }) => {
  
  // Authentication Guard

  const body = await request.json()
  const { public_id, type, resource_type, secure_url } = body
  const media: iMedia = { public_id, type, resource_type, secure_url }
  
  try {
    const response = await deleteFileFromCloudinary(media)
    const result: iStatus = { message: "successfully deleted file", status: "success", data: response }
    return json(result)
  } catch (error: any) {
    const result: iStatus = { message: error.message, status: "error" }
    return json(result)
  }
};