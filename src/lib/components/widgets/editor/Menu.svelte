<script lang="ts">
	import MoreMenu from './MoreMenu.svelte';
	import type { Editor } from '@tiptap/core';
	import type { Writable } from 'svelte/store';
	import {
		StrikethroughIcon,
		Underline,
		Italic,
		Bold,
		ImageIcon,
		MoreHorizontalIcon,
		YoutubeIcon,
		Link2Icon
	} from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Button } from '$lib/components/ui/button';
	import {
	onBlockquote,
		onBold,
		onIframe,
		onImage,
		onItalic,
		onLink,
		onParagraph,
		onStrikeThrough,
		onUnderline
	} from './utils/functions.js';
	import type { iMedia, iSubmenu } from './utils/types.js';
	import ImageDialog from './ImageDialog.svelte';
	import IframeDialog from './IframeDialog.svelte';
	import Text from './icons/Text.svelte';
	import Blockquote from './icons/Blockquote.svelte';
	import DropdownMenu from './DropdownMenu.svelte';
	import { alignment, headings, lists } from './utils/index.js';

	interface Props {
		editor: Writable<Editor>;
		title?: string
	}

	let { editor, title = "What's on your mind?" }: Props = $props();

	const onUpload = (media: iMedia) => {
		onImage($editor, media.secure_url)
	}

	const getUrl = (url: string) => {
		console.log({ url })
		onIframe($editor, url)
	}

	const onDelete = () => {}
</script>

<div class="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-secondary border-b w-full md:gap-4">
	<p class="pt-2 md:pt-0 md:pl-2 line-clamp-1">{title}</p>
	<ScrollArea orientation="horizontal">
		<div class="flex w-fit items-center whitespace-nowrap">
			<Button variant="ghost" size="icon" onclick={() => onBold($editor)}>
				<Bold class="size-4" />
			</Button>
			<Button variant="ghost" size="icon" onclick={() => onItalic($editor)}>
				<Italic class="size-4" />
			</Button>
			<Button variant="ghost" size="icon" onclick={() => onBlockquote($editor)}>
				<Blockquote class="size-4" />
			</Button>
			<!-- <Button variant="ghost" size="icon" onclick={() => onStrikeThrough($editor)}>
				<StrikethroughIcon class="size-4" />
			</Button> -->
			<Button variant="ghost" size="icon" onclick={() => onParagraph($editor)}>
				<Text class="size-4" />
			</Button>
			<DropdownMenu submenu={(headings.submenus as iSubmenu)} { editor }  />
			<DropdownMenu submenu={(lists.submenus as iSubmenu)} { editor }  />
			<DropdownMenu submenu={(alignment.submenus as iSubmenu)} { editor }  />
			<!-- <Button variant="ghost" size="icon" onclick={() => onLink($editor)}>
				<Link2Icon class="size-4" />
			</Button> -->
			<!-- <ImageDialog {onUpload} {onDelete} title="Upload Image">
				<ImageIcon class="size-4" />
			</ImageDialog> -->
			<!-- <IframeDialog {getUrl}>
				<YoutubeIcon class="size-4" />
			</IframeDialog> -->
			<!-- <MoreMenu {editor}>
				<MoreHorizontalIcon class="size-4" />
			</MoreMenu> -->
		</div>
	</ScrollArea>
</div>
