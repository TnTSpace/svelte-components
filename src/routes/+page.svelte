<script lang="ts">
  import CloudinaryApiImageUploadBtn from "$lib/components/widgets/CloudinaryApiImageUploadBtn.svelte";
  // import CloudinaryApiFileUpload from "$lib/components/widgets/CloudinaryApiFileUpload.svelte";
  import type { iMedia } from "$lib/index.js";
  import Tiptap from "$lib/components/widgets/editor/Tiptap.svelte";
  import DataTable from "$lib/components/widgets/table/DataTable.svelte";
	import type { iChild } from "$lib/interface/index.js";
	import { childrenColumns } from "$lib/components/widgets/table/children-columns.svelte.js";
	import { children } from "$lib/constants/index.js";
  import TelInput from "$lib/components/widgets/TelInput.svelte";

  const onUpload = (media: iMedia) => {
    console.log({ media, action: "uploaded" })
  }

  const onDelete = (media: iMedia) => {
    console.log({ media, action: "deleted" })
  }

  const getcontent = (content: string) => {
    console.log({ content })
  }
  
  const filterKeys: (keyof iChild)[] = [
    'birthday', 'codeName', 'location', 'name', 'gender'
  ]
</script>

<!-- <CloudinaryApiImageUploadBtn { onUpload } { onDelete } folder="test" /> -->
 <!-- <Tiptap title="What's on your mind" { getcontent } /> -->
  
<div class="p-4">
	<!-- <DataTable columns={childrenColumns} data={children} {filterKeys} /> -->
   <TelInput />
</div>


<!-- <div class="p-4">
  <TiptapEditor />
</div> -->