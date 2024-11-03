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