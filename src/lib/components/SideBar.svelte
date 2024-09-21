<script lang="ts">
	import { Gear, Info, Hash, Menu, Close, Hourglass } from '$lib/icons';
	import {
		sideBarStore,
		favoriteTimersStore,
		recentTimersStore,
		addTimerModalStore
	} from '$lib/stores';
	import { ButtonSection, TimerList } from '$lib/components';
</script>

<div class={$sideBarStore ? 'sb sb--active' : 'sb'}>
	<button
		aria-label="{$sideBarStore ? 'Close' : 'Open'} Menu"
		on:click={() => sideBarStore.set(!$sideBarStore)}
		class="sb__toggle"
	>
		{#if !$sideBarStore}
			<Menu width="62.5%" height="62.5%" />
		{:else}
			<Close width="62.5%" height="62.5%" />
		{/if}
	</button>
	<h1 class="sb__title">
		<a href="/">
			<Hourglass height="1.125rem" />
			<span>EMoM</span>
		</a>
	</h1>
	<section class="sb__new">
		<button
			class="sb__new-button button small"
			on:click={() => {
				addTimerModalStore.set(true);
			}}>+ New Timer</button
		>
	</section>
	<section class="sb__lists">
		<TimerList title="Favorites" timers={$favoriteTimersStore} />
		<TimerList title="Recent" timers={$recentTimersStore} />
	</section>
	<section class="sb__utils">
		<ButtonSection isFixedSize={true}>
			<a href="/settings" aria-label="Settings">
				<Gear height="37.5%" />
			</a>
			<a href="/about" aria-label="About EMoM">
				<Info height="37.5%" />
			</a>
			<a href="https://0ff.dev/" target="_blank" rel="noopener" aria-label="0ff">
				<Hash height="37.5%" />
			</a>
		</ButtonSection>
	</section>
</div>

<style>
	.sb {
		position: fixed;
		left: 0;
		top: 0;
		width: var(--width-sidebar);
		height: 100%;
		display: flex;
		flex-direction: column;
		transform: translateX(-100%);
		z-index: 999;
		transition: all 0.3s var(--ease-out-expo);
		background: var(--color-bg);
		border-inline-end: 1px solid var(--color-border);

		&.sb--active {
			transform: translateX(0);
			box-shadow: 0 0 7rem 3.5rem var(--color-bg);
		}

		@media (min-width: 768px) {
			box-shadow: none !important;
			z-index: 3;
		}
	}

	.sb__title {
		font-size: 1.25rem;
		height: var(--grid-size);
		line-height: 1;
		box-shadow: 0 1px 0 var(--color-border);

		& a {
			padding-inline: 1rem;
			text-decoration: none;
			color: inherit;
			display: flex;
			align-items: center;
			gap: 0.375rem;
			height: 100%;
			transition: color 0.2s ease-out;

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					color: var(--color-accent-primary);
				}
			}
		}
	}

	.sb__toggle {
		position: absolute;
		top: 0;
		left: 100%;
		background: var(--color-bg);
		border: none;
		line-height: 1;
		font-size: 1.25rem;
		cursor: pointer;
		width: var(--grid-size);
		height: var(--grid-size);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-fg);
		transition: all 0.3s var(--ease-out-expo);
		border-inline-end: 1px solid var(--color-border);
		box-shadow: 0 1px 0 var(--color-border);
		z-index: 10;

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background-color: var(--color-fg);
				color: var(--color-bg);
			}
		}
	}

	.sb--active .sb__toggle {
		transform: translateX(-100%);
		border-inline-start: 1px solid var(--color-border);
		border-inline-end: none;
	}

	.sb__new {
		padding: 1rem;
	}

	.sb__new-button {
		justify-content: center;
		display: flex;
		width: 100%;
	}

	.sb__lists {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		border-block-start: 1px solid var(--color-border);
	}

	.sb__utils {
		box-shadow: 0 -1px 0 var(--color-border);
	}
</style>
