<script lang="ts">
  import CloudinaryApiImageUploadBtn from "$lib/components/widgets/CloudinaryApiImageUploadBtn.svelte";
  // import CloudinaryApiFileUpload from "$lib/components/widgets/CloudinaryApiFileUpload.svelte";
  import type { iMedia } from "$lib/index.js";
  import TiptapEditor from "$lib/components/widgets/TiptapEditor.svelte";

  const onUpload = (media: iMedia) => {
    console.log({ media, action: "uploaded" })
  }

  const onDelete = (media: iMedia) => {
    console.log({ media, action: "deleted" })
  }
</script>

<CloudinaryApiImageUploadBtn { onUpload } { onDelete } folder="test" />

<!-- <div class="p-4">
  <TiptapEditor />
</div> -->