<script lang="ts">
	import { onMount } from 'svelte';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import '$lib/styles/app.css';
	import '$lib/styles/layout.css';
	import '$lib/styles/nprogress.css';
	import { SideBar, Modal, NewTimerForm } from '$lib/components';
	import type { Interface } from '$lib/types';
	import { interfaceStore, sideBarStore, addTimerModalStore, analyticsStore } from '$lib/stores';
	import { isMobile } from '$lib/utils';

	$: showModal = $addTimerModalStore;

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});
	$: {
		if ($navigating) {
			NProgress.start();
			if (isMobile()) {
				sideBarStore.set(false);
			}
		}
		if (!$navigating) {
			NProgress.done();
		}
	}

	onMount(() => {
		const unsubscribe = interfaceStore.subscribe((value: Interface) => {
			const { colorMode, animations }: Interface = value;

			document.documentElement.classList.toggle('dark', colorMode === 'dark');
			document.documentElement.classList.toggle('light', colorMode === 'light');

			document.documentElement.classList.toggle('dynamic', animations === 'enabled');
			document.documentElement.classList.toggle('static', animations === 'disabled');
		});
		return () => {
			unsubscribe();
		};
	});

	const closeModal = (): void => {
		addTimerModalStore.set(false);
	};
</script>

<svelte:head>
	{#if $analyticsStore}
		<script
			defer
			data-domain="emom.0ff.dev"
			src="https://plausible.dvmtn.com/js/script.js"
		></script>
	{/if}
</svelte:head>

<SideBar />
<div class="site">
	<slot />
</div>

<Modal bind:showModal onClose={() => addTimerModalStore.set(false)} title="New Timer">
	<NewTimerForm onSubmit={closeModal} />
</Modal>

<style>
	.site {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		transition: all 0.3s var(--ease-out-expo);

		@media (width > 768px) {
			transition-property: opacity, margin-inline-start;
		}

		& header {
			padding-inline-start: calc(var(--grid-size) - 1px);
			transition: padding-inline-start 0.3s var(--ease-out-expo);
		}
	}
	:global(.sb.sb--active + .site) {
		opacity: 0.5;
		pointer-events: none;

		@media (width > 768px) {
			margin-inline-start: var(--width-sidebar);
			transform: none;
			opacity: 1;
			filter: none;
			pointer-events: unset;
		}
		& header {
			padding-inline-start: 0;
		}
	}
</style>
