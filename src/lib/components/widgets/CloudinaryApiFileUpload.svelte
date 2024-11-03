<script lang="ts">
	import { Button, buttonVariants } from '../ui/button/index.js';
	import { Input } from '../ui/input/index.js';
	import type { iCloudinaryInfo, iMedia, iStatus, TUpload } from '../../interface/index.js';
	import { CloudUploadIcon, TrashIcon, ArrowRightIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import SpinLoader from './SpinLoader.svelte';
	import MediaPreview from './MediaPreview.svelte';
	import { Card } from '../ui/card/index.js';
	import { cn } from '../../utils.js';
	import { UploadType } from '../../constants/index.js';
	// import { createEventDispatcher } from 'svelte';

	// const dispatcher = createEventDispatcher();

	interface Props {
		media?: iMedia;
		folder: string;
		onUpload: (media: iMedia) => void;
		onDelete: (media: iMedia) => void;
	}

	let button: HTMLButtonElement | undefined = $state()

	let { media, folder = "", onUpload, onDelete }: Props = $props()

	// export let media: iMedia | undefined = undefined
	// export let folder: string = ""
	// export let onUpload: (media: iMedia) => Promise<iStatus>;
	// export let onDelete: () => Promise<iStatus>;

	let showWidget = $state(!media);
	let showUrl = $state(false);
  let loading = $state(false)

	// $: showWidget = showWidget;
	// $: media = media;
	// $: showUrl = showUrl;
	// $: loading = loading;

	const onSubmit = async (evt: SubmitEvent, type: TUpload) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		formData.append('folder', folder);
		formData.append('type', type);

		try {
			loading = true;

			const options: RequestInit = { method: 'post', body: formData };

			const url = `/api/cloudinary`;
			const response = await fetch(url, options);
			const { message, status, data } = (await response.json()) as iStatus;

			if (status === 'error') {
				toast.error(message);
				return;
			}

			const info = data as iCloudinaryInfo;
			media = {
				public_id: info.public_id,
				resource_type: info.resource_type,
				secure_url: info.secure_url,
				type: info.type
			};

			// dispatcher("upload", media)
			onUpload(media)


			showWidget = false;
			loading = false;
			toast.success(message);
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const removeMedia = async () => {
		try {
			loading = true; 
			const options: RequestInit = {
				method: 'delete',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					public_id: (media as iMedia).public_id,
					type: (media as iMedia).type,
					resource_type: (media as iMedia).resource_type,
					secure_url: (media as iMedia).secure_url
				})
			};
			const response = await fetch('/api/cloudinary', options);
			const { status, message } = (await response.json()) as iStatus;

			status === "error" && toast.error(message)

			// dispatcher("delete", media)
			onDelete(media as iMedia)
			showWidget = true
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const onChange = () => button?.click();
	// const authorized = profile.id === post.profileId;
</script>

<Card class="bg-white dark:bg-secondary">
	{#if showWidget}
		<div class="w-full overflow-hidden">
			<div
				class="relative flex aspect-video h-full items-center justify-center bg-secondary/30 py-4 md:py-12 lg:py-16"
			>
				{#if loading}
					<SpinLoader
						class="border-primary border-l-transparent border-r-transparent bg-transparent dark:border-white dark:!border-r-transparent dark:border-l-transparent"
					/>
				{:else}
					<div class="flex w-full flex-col items-center gap-2">
						<div class="text-center">
							<div class="flex flex-col items-center gap-2">
								<form onsubmit={(evt) => onSubmit(evt, UploadType.UPLOAD)}>
									<input
										type="file"
										id="upload"
										onchange={onChange}
										name="file"
										accept="image/*"
										class="hidden"
									/>
									<label
										for="upload"
										class={cn(
											'flex cursor-pointer items-center gap-2',
											buttonVariants({ variant: 'outline' })
										)}
									>
										<CloudUploadIcon class="size-4" />
										<span>Upload file</span>
									</label>
									<button type="submit" bind:this={button} aria-label="Submit"></button>
								</form>
								<span>or</span>
								<form
									onsubmit={(evt) => onSubmit(evt, UploadType.URL)}
									class="grid w-full grid-cols-[1fr_40px] gap-1"
								>
									<Input name="url" placeholder="Paste URL" type="text" />
									<Button size="icon" type="submit" variant="outline">
										<ArrowRightIcon class="size-4" />
									</Button>
								</form>
							</div>
							<span class="mx-auto max-w-[300px] whitespace-pre-wrap text-sm text-muted-foreground"
								>Image must be less than 1.5MB in size</span
							>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="relative w-full overflow-hidden rounded-lg">
			{#if loading}
				<Button
					size="icon"
					variant="outline"
					class="pointer-events-none absolute right-0 top-0 rounded-full"
				>
					<SpinLoader
						class="border-red-500 border-l-transparent border-r-transparent bg-transparent dark:border-white dark:!border-l-transparent dark:!border-r-transparent"
					/>
				</Button>
			{:else}
				<Button
					onclick={removeMedia}
					size="icon"
					variant="outline"
					class="absolute right-0 top-0 rounded-full "
				>
					<TrashIcon class="h-4 w-4 stroke-red-500" />
				</Button>
			{/if}
			<MediaPreview title={media?.public_id} url={media?.secure_url} class="aspect-video" />
		</div>
	{/if}
</Card>
