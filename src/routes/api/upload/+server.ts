import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request }) => {
  
  const formData = await request.formData()

  const entries = Object.fromEntries(formData.entries())

  console.log({ entries })
  return json({ fileId: "sneakers", id: 'sneakers', url: "https://www.beuzibahstores.com/sneakers.webp" })
};