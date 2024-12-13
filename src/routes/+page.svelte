<script lang="ts">
  import CloudinaryApiImageUploadBtn from "$lib/components/widgets/CloudinaryApiImageUploadBtn.svelte";
  // import CloudinaryApiFileUpload from "$lib/components/widgets/CloudinaryApiFileUpload.svelte";
  import type { iMedia } from "$lib/index.js";
  import Tiptap from "$lib/components/widgets/editor/Tiptap.svelte";

  const onUpload = (media: iMedia) => {
    console.log({ media, action: "uploaded" })
  }

  const onDelete = (media: iMedia) => {
    console.log({ media, action: "deleted" })
  }

  const getcontent = (content: string) => {
    console.log({ content })
  }
</script>

<!-- <CloudinaryApiImageUploadBtn { onUpload } { onDelete } folder="test" /> -->
 <Tiptap title="What's on your mind" { getcontent } />

<!-- <div class="p-4">
  <TiptapEditor />
</div> -->