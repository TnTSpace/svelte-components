<script lang="ts">
	import { cn } from "../../utils.js";

	let className: string = ""

	export let borderColor: "primary" | "white" = "primary"

	const defaultClass = borderColor === "white"
	? "border-white border-l-transparent border-r-transparent bg-transparent dark:border-primary dark:!border-r-transparent dark:border-l-transparent"
	: "border-primary border-l-transparent border-r-transparent bg-transparent dark:border-white dark:!border-r-transparent dark:border-l-transparent"

	export { className as class }
</script>

<div
	class={cn("spin-loader inline-flex self-center !size-4 rounded-full border-2", defaultClass, className)}
></div>

<style>
	.spin-loader {
		animation: spinLoader 0.3s infinite linear;
	}
	@keyframes spinLoader {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
