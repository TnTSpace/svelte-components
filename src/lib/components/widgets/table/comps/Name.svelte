<script lang="ts">
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	interface Props {
		image: string;
		top: string;
		bottom: string;
	}
	let { top, bottom, image }: Props = $props()

	let mounted = new Promise((resolve) => {
		onMount(() => resolve(true));
	});
</script>

{#await mounted}
	<div class="grid grid-cols-[32px_1fr] place-items-center gap-1">
		<Skeleton class="aspect-square h-8 w-8 rounded-full" />
		<div class="flex flex-col gap-1">
			<Skeleton class="aspect-square h-4 w-3/4 rounded-full" />
			<Skeleton class="aspect-square h-4 w-1/2 rounded-full" />
		</div>
	</div>
{:then value}
	<div class="grid grid-cols-[32px_1fr] place-items-center gap-1">
		<img src={image} alt="preview" class="aspect-square w-8 h-8 rounded-full" />
		<div class="flex flex-col justify-start text-start w-full leading-[1]">
			<p class="text-sm font-medium line-clamp-1">{top}</p>
			<p class="text-xs text-muted-foreground w-full text-ellipsis overflow-hidden line-clamp-1">{bottom}</p>
		</div>
	</div>
{/await}
