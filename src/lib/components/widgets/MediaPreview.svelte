<script lang="ts">
  import { mediaUrlFormat } from "@toolsntuts/utils";
  import { cn } from "../../utils.js";
  import { imagePreviewableFormats, iframePreviewableFormats, audioPreviewableFormats } from "../utils/index.js";

  export let className: string = "";
  export let url: string = '';
  export let title: string = '';
  export let href: string = "#";

  const format = mediaUrlFormat(url);
</script>

{#if imagePreviewableFormats.includes(format.toLowerCase())}
  <a {href}>
    <img class={cn("w-full aspect-auto object-cover rounded-lg", className)} src={url} alt={title} />
  </a>
{:else if iframePreviewableFormats.includes(format.toLowerCase())}
  <iframe class={cn("w-full aspect-video object-cover rounded-lg", className)} src={url} frameborder="0" {title}></iframe>
{:else if audioPreviewableFormats.includes(format.toLowerCase())}
  <audio controls preload="metadata" class={cn("w-full rounded-lg", className)}>
    <source src={url} type="audio/{format}">  Your browser does not support the audio element.
  </audio>
{/if}