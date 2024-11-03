<script lang="ts">
	import { mediaUrlFormat } from "@toolsntuts/utils"
	import { cn } from "../../utils.js";
	import { imagePreviewableFormats, iframePreviewableFormats } from "../utils/index.js";

	let className:string = ""
	export { className as class }
	export let url: string = '';
	export let title: string = '';
	export let href: string = "#"
	
	const format = mediaUrlFormat(url)
</script>

{#if imagePreviewableFormats.includes(format.toLowerCase())}
	<a {href}>
		<img class={cn("w-full aspect-auto object-cover rounded-lg", className)} src={url} alt={title} />
	</a>
{/if}
{#if iframePreviewableFormats.includes(format.toLowerCase())}
	<iframe class={cn("w-full aspect-video object-cover rounded-lg", className)} src={url} frameborder="0" {title}></iframe>
{/if}
