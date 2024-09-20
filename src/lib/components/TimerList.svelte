<script lang="ts">
	import type { Timer } from '$lib/types';
	import { getFormattedTime, getVerboseTime } from '$lib/utils';

	export let timers: Timer[];
	export let title: string = '';
</script>

<div class="tl">
	{#if title}
		<h2 class="tl__title">
			{title}{#if timers.length}&nbsp; ({timers.length}){/if}
		</h2>
	{/if}
	<ul class="tl__list">
		{#if timers.length}
			{#each timers as { seconds, rounds }}
				<li class="tl__list-item">
					<a href={`/${seconds}/${rounds}/0`} class="tl__link">
						<span class="tl__info">
							{getFormattedTime(seconds, false)} &times; {rounds}
						</span>
						<span class="tl__total">
							{getVerboseTime(seconds * rounds, true)}
						</span>
					</a>
				</li>
			{/each}
		{:else}
			<li class="tl__list-item tl__list-item--padded">No timers yet :(</li>
		{/if}
	</ul>
</div>

<style>
	.tl {
		display: flex;
		flex-direction: column;
	}
	.tl__title {
		font-size: 0.75rem;
		color: var(--color-medium);
		list-style: none;
		padding: 0.75rem 1rem 0.25rem;
		position: sticky;
		top: 0;
		background: var(--color-bg);
		text-transform: uppercase;
	}
	.tl__list {
		font-size: 0.75rem;
		flex: 1;
		overflow: auto;
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.tl__list-item {
		margin: 0;
	}
	.tl__list-item--padded {
		padding: 0.2875rem 1rem;
	}
	.tl__link {
		display: flex;
		justify-content: space-between;
		text-decoration: none;
		color: var(--color-fg);
		padding: 0.2875rem 1rem;

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background: var(--color-fg);
				color: var(--color-bg);
			}
		}
	}

	.tl__total {
		opacity: 0.6;
	}
</style>
