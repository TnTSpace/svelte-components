<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { Snippet } from 'svelte';
	import type { Editor } from '@tiptap/core';
	import type { Writable } from 'svelte/store';
	import { groups } from './utils/index.js';

	interface Props {
		children: Snippet;
		editor: Writable<Editor>;
	}

	let { children, editor }: Props = $props();
</script>

{#if $editor}
<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
		{@render children()}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56 max-h-96 md:max-h-full h-auto overflow-auto bg-white dark:bg-secondary">
		{#each groups as { groupName, menus }, i}
			<DropdownMenu.Group>
				<DropdownMenu.GroupHeading class="text-xs uppercase text-muted-foreground"
					>{groupName}</DropdownMenu.GroupHeading
				>
				<DropdownMenu.Group>
					{#each menus as { name, icon, submenus, onclick }, i}
						{#if submenus}
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger>
									{@const SubmenuIcon = submenus.trigger.icon}
									<SubmenuIcon class="mr-2 size-4" />
									<span>{submenus.trigger.name}</span>
								</DropdownMenu.SubTrigger>
								<DropdownMenu.SubContent class="bg-white dark:bg-secondary">
									{#each submenus.menus as { name, icon, onclick, ondisable }, i}
										{#if ondisable && ondisable($editor)}
										<DropdownMenu.Item onclick={() => onclick($editor)} disabled={ondisable($editor)}>
											{@const Icon = icon}
											<Icon class="mr-2 size-4" />
											<span>{name}</span>
										</DropdownMenu.Item>
										{:else}
										<DropdownMenu.Item onclick={() => onclick($editor)}>
											{@const Icon = icon}
											<Icon class="mr-2 size-4" />
											<span>{name}</span>
										</DropdownMenu.Item>
										{/if}
									{/each}
								</DropdownMenu.SubContent>
							</DropdownMenu.Sub>
						{:else}
							<DropdownMenu.Item onclick={() => onclick($editor)}>
								{@const Icon = icon}
								<Icon class="mr-2 size-4" />
								<span>{name}</span>
							</DropdownMenu.Item>
						{/if}
					{/each}
				</DropdownMenu.Group>
				{#if i !== groups.length - 1}
					<DropdownMenu.Separator />
				{/if}
			</DropdownMenu.Group>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
{/if}
