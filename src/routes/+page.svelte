<script lang="ts">
	import { Hourglass } from '$lib/icons';
	import { LinkButtonList } from '$lib/components';
	import { favoriteTimersStore, recentTimersStore, addTimerModalStore } from '$lib/stores';
	import { getFormattedTime, getVerboseTime } from '$lib/utils';
</script>

<svelte:head>
	<title>EMoM</title>
	<meta
		name="description"
		content="An awesome & super simple “every minute on the minute” interval timer by #0FF"
	/>
</svelte:head>

<main>
	<div class="container">
		<div class="content slim">
			<div class="prose">
				<h1>
					<Hourglass height="1em" />
					<abbr title="Every Minute on the Minute">EMoM</abbr>
				</h1>
				<p class="tagline">
					<a href="/about">
						Awesome <em>
							<b><u>e</u></b>very <b><u>m</u></b>inute <b><u>o</u></b>n the <b><u>m</u></b>inute
						</em>
						interval timers
					</a>
				</p>
				<p>
					<button
						class="button"
						on:click={() => {
							addTimerModalStore.set(true);
						}}
					>
						<Hourglass height="1lh" />
						Create a new timer
					</button>
				</p>
				{#if $favoriteTimersStore.length}
					<hr />
					<h3>Favorite Timers</h3>
					<LinkButtonList
						links={$favoriteTimersStore.map(({ seconds, rounds }) => ({
							label: `${getFormattedTime(seconds, true)} x ${rounds}`,
							href: `/${seconds}/${rounds}`,
							description: `Total time: ${getVerboseTime(seconds * rounds)}`
						}))}
					/>
				{/if}
				{#if $recentTimersStore.length}
					<h3>Recent Timers</h3>
					<LinkButtonList
						links={$recentTimersStore.map(({ seconds, rounds }) => ({
							label: `${getFormattedTime(seconds, true)} x ${rounds}`,
							href: `/${seconds}/${rounds}`,
							description: `Total time: ${getVerboseTime(seconds * rounds)}`
						}))}
					/>
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
	h1 {
		line-height: 1;
		font-size: clamp(3rem, 2.286rem + 3.57vw, 4rem);
		text-align: center;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		transform: rotate(3deg);
		background: var(--color-fg);
		color: var(--color-bg);
		position: relative;
		z-index: 2;
		padding: 0.25rem 1rem;

		& svg {
			background: var(--color-accent-primary);
			padding: 0.5rem;
			margin: -1rem 0 0 -2.5rem;
			transform: rotate(-8deg);
		}
	}

	.tagline {
		margin-block-start: 0.25rem;
		line-height: 1.9;
		text-wrap: balance;
		transform: skew(0, -1.5deg);
		position: relative;
		z-index: 1;

		& > a {
			background: var(--color-accent-primary);
			text-decoration: none;
			color: var(--color-bg);
			padding: 0.25em 0.75em;

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					animation: colorCycle 6s ease-in-out infinite;
				}
			}
		}
	}

	.prose {
		text-align: center;
		padding-block: 5vh;
	}

	@keyframes -global-colorCycle {
		0% {
			background: var(--color-accent-primary);
		}

		33% {
			background: var(--color-accent-secondary);
		}

		66% {
			background: var(--color-accent-tertiary);
		}

		100% {
			background: var(--color-accent-primary);
		}
	}
</style>
