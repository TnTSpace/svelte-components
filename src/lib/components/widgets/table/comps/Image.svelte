<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { onMount } from 'svelte';

	interface Props {
		src: string;
	}

	let { src = '' }: Props = $props();

	let mounted = new Promise((resolve) => {
		onMount(() => resolve(true));
	});
</script>

{#await mounted}
	<Skeleton class="aspect-square w-12 max-w-12 rounded-lg" />
{:then value}
	<img {src} alt="preview" class="aspect-square w-12 max-w-12 rounded-lg" />
{/await}
