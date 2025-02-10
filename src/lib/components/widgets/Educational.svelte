<script lang="ts">
	import MenuIcon from 'lucide-svelte/icons/menu';
	import XIcon from 'lucide-svelte/icons/x';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { iRoute } from '$lib/interface/index.js';
	import { cn } from '$lib/utils.js';
	import { Button } from '../ui/button/index.js';

	interface Section {
		id: string;
		title: string;
		content: string;
	}

	interface Props {
		title: string;
		groupTitle?: string;
		sections: Section[];
		lastUpdated: string;
		pages: iRoute[];
		top?: string;
		offset?: number;
	}

	let {
		title,
		sections,
		lastUpdated,
		pages,
		top,
		groupTitle = 'Help Center',
		offset = 64
	}: Props = $props();
	let location = $state(page.url);

	let activeSection = $state('');
	let isMobileNavOpen = $state(false);

	const handleScroll = () => {
		const sectionElements = sections.map((section) => document.getElementById(section.id));

		const currentSection = sectionElements.find((element) => {
			if (!element) return false;
			const rect = element.getBoundingClientRect();
			return rect.top <= 100 && rect.bottom > 100;
		});

		if (currentSection) {
			activeSection = currentSection.id;
		}
	};

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);

		if (element) {
			const offsetFromTop = offset; // Adjust this value to control the offset from the top
			const elementPosition = element.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({ top: elementPosition - offsetFromTop, behavior: 'smooth' });

			isMobileNavOpen = false;
		}
	};

	onMount(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="min-h-screen bg-background">
	<button
		onclick={() => (isMobileNavOpen = !isMobileNavOpen)}
		class="fixed right-2 top-1/2 z-50 -translate-y-1/2 rounded-md border bg-background p-2 md:hidden"
	>
		{#if isMobileNavOpen}
			<XIcon size={24} />
		{:else}
			<MenuIcon size={24} />
		{/if}
	</button>

	<nav
		class={cn(
			'fixed left-0 top-0 z-40 h-full w-64 transform border-r bg-background p-6 transition-transform duration-200 ease-in-out',
			'md:transform-none',
			isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
			top
		)}
	>
		<div class="space-y-6">
			<h2 class="text-xl font-bold">{groupTitle}</h2>
			<ul class="space-y-2">
				{#each pages as { href, name }, i}
					<li>
						<Button
							{href}
							variant="ghost"
							class={cn(
								'block rounded-md p-2 hover:bg-accent',
								location.pathname === href && 'bg-accent'
							)}
						>
							{name}
						</Button>
					</li>
				{/each}
			</ul>
		</div>
	</nav>

	<main class="mx-auto max-w-3xl px-4 py-8 md:ml-64 md:mr-64">
		<article class="prose dark:prose-invert">
			<h1 class="mb-6 text-4xl font-bold">{title}</h1>
			<p class="mb-8 text-sm text-muted-foreground">
				Last updated: {lastUpdated}
			</p>
			{#each sections as section, i}
				<section id={section.id} class="mb-8">
					<h2 class="mb-4 text-2xl font-semibold">{section.title}</h2>
					{@html section.content}
				</section>
			{/each}
		</article>
	</main>

	<nav
		class={cn(
			'fixed right-0 top-0 h-full w-64 transform border-l bg-background p-6 transition-transform duration-200 ease-in-out',
			'md:transform-none',
			isMobileNavOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0',
			top
		)}
	>
		<div class="sticky top-6">
			<h3 class="mb-4 text-lg font-semibold">On this page</h3>
			<ul class="space-y-2">
				{#each sections as section, i}
					<li>
						<button
							onclick={() => scrollToSection(section.id)}
							class={cn(
								'block w-full py-1 text-left text-sm transition-colors duration-200 hover:text-primary',
								activeSection === section.id ? 'font-medium text-primary' : 'text-muted-foreground'
							)}
						>
							{section.title}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>
