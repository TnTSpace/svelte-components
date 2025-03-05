<script lang="ts">
	import CloudinaryApiImageUploadBtn from '$lib/components/widgets/CloudinaryApiImageUploadBtn.svelte';
	// import CloudinaryApiFileUpload from "$lib/components/widgets/CloudinaryApiFileUpload.svelte";
	import type { iMedia } from '$lib/index.js';
	import Tiptap from '$lib/components/widgets/editor/Tiptap.svelte';
	import DataTable from '$lib/components/widgets/table/DataTable.svelte';
	import type { iChild, iPhone, iUpload } from '$lib/interface/index.js';
	import { childrenColumns } from '$lib/components/widgets/table/children-columns.svelte.js';
	import { children } from '$lib/constants/index.js';
	import TelInput from '$lib/components/widgets/TelInput.svelte';
	import { writable, type Writable } from 'svelte/store';
	import type { E164Number } from 'svelte-tel-input/types';
	import UploadWidget from '$lib/components/widgets/upload/UploadWidget.svelte';

	const onUpload = (media: iMedia) => {
		console.log({ media, action: 'uploaded' });
	};

	const onDelete = (media: iMedia) => {
		console.log({ media, action: 'deleted' });
	};

	const getcontent = (content: string) => {
		console.log({ content });
	};

	const filterKeys: (keyof iChild)[] = ['birthday', 'codeName', 'location', 'name', 'gender'];

	let value = $state('+2348156629272');
	const getvalue = (iphone: iPhone) => {
		console.log({ iphone });
	};

	let uploads = $state<iUpload[]>([]);

	const oncomplete = (response: any) => {
		
		const imgs = response.successful.map((item: any) => ({
			fileId: item.response.body.fileId,
			id: item.response.body.id,
			url: item.response.body.url
		}));

		uploads = [...uploads, ...imgs]

		console.log({ uploads })
	};

	const onAdd = () => {}
</script>

<UploadWidget height="120px" id="upload" name="upload" {uploads} {oncomplete} endpoint="/api/upload" />

<!-- <CloudinaryApiImageUploadBtn { onUpload } { onDelete } folder="test" /> -->
<Tiptap title="What's on your mind" {getcontent} />

<div class="p-4">
	<input type="text" bind:value />
	<DataTable {onAdd} columns={childrenColumns} data={children} {filterKeys} />
	<!-- <TelInput {getvalue} /> -->
</div>
