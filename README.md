# Svelte Components

It makes use of the following technologies
- [`shadcn-svelte`](https://next.shadcn-svelte.com/)
- [`svelte 5`](https://svelte.dev/)
- [`tailwindcss`](https://tailwindcss.com/)


## Vite Configuration
Update your vite.config.ts file in your sveltekit application with the following

```typescript
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: [
        'dist',          // Allow access to the dist folder
        '.',             // Allow access to the project root
        'src'            // Allow access to src if needed
      ]
    }
  }
});
```

## SpinLoader

If you're seeing this, you've probably already done this step. Congrats!

```svelte
<script lang="ts">
  import SpinLoader from "@toolsntuts/SpinLoader.svelte"
</script>

<SpinLoader />
```

## SpinLoader Configuration

- class: Tailwindcss classes to be added as class props
- borderColor: primary or white. Default is primary

```svelte
<script lang="ts">
  import SpinLoader from "@toolsntuts/SpinLoader.svelte"
</script>

<SpinLoader class="size-4" borderColor="white" />
```

## CloudinaryApiFileUpload

```svelte
<script lang="ts">
  import CloudinaryApiFileUpload from "$lib/components/widgets/CloudinaryApiFileUpload.svelte";
	import type { iMedia } from "$lib/interface/index.js";

  const onUpload = (media: iMedia) => {
    console.log({ media, action: "uploaded" })
  }

  const onDelete = (media: iMedia) => {
    console.log({ media, action: "deleted" })
  }
</script>

<CloudinaryApiFileUpload { onUpload } { onDelete } folder="test" />
```

## CloudinaryApiFileUpload Configuration

In your .env file add your cloudinary environment variables

```typescript
PUBLIC_CLOUDINARY_UPLOAD_PRESET=
PUBLIC_CLOUDINARY_CLOUD_NAME=
PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=
```

Then create your post and delete api routes

```typescript
import type { iCloudinaryInfo, TUpload, iStatus, iUploadResource, iMedia } from '$lib/interface/index.js';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { deleteFileFromCloudinary, uploadToCloudinary, uploadUrlToCloudinary } from '$lib/server/index.js';
import { UploadType } from '$lib/constants/index.js';


export const POST: RequestHandler = async ({ request }) => {
  
  // Your authentication logic

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
  
  // Your authentication logic

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
```