<script lang="ts">
	import { onDestroy, afterUpdate } from 'svelte';
	import { fly } from 'svelte/transition';
	import { backIn, backOut } from 'svelte/easing';
	import { Confetti } from 'svelte-confetti';
	import { ScreenWakeLock } from 'svelte-screen-wake-lock';
	import { page } from '$app/stores';
	import { replaceState } from '$app/navigation';

	import { ButtonSection } from '$lib/components';
	import { interfaceStore, favoriteTimersStore, recentTimersStore } from '$lib/stores';
	import beep from '$lib/assets/beep.mp3';
	import boop from '$lib/assets/boop.mp3';
	import {
		Audio,
		CaretLeft,
		Mute,
		Next,
		Play,
		Prev,
		Refresh,
		StarFill,
		StarOutline,
		Stop
	} from '$lib/icons';
	import type { PageData } from './$types';
	import { getFormattedTime, getTimeArray, navigateBack, getVerboseTime } from '$lib/utils';
	import type { Timer } from '$lib/types';

	type TimerPageData = { seconds: number; rounds: number; progress: number };

	export let data: PageData;

	const celebrationEmoji: string[] = ['🎉', '👏', '🥳', '🎊', '🙌', '💥'];

	let beepAudio: HTMLAudioElement;
	let boopAudio: HTMLAudioElement;
	let isActive: boolean = false;
	let interval: number | undefined = undefined;
	let isElapsedDisplayed: boolean = false;
	let favoriteTimers: Timer[] = [];
	let isFavorited = false;

	const unsubscribe = favoriteTimersStore.subscribe((value) => {
		favoriteTimers = value;
	});

	$: ({ seconds, rounds, progress } = data);
	$: totalTime = seconds * rounds;
	$: isFavorited = favoriteTimers.some(
		(timer) => timer.seconds === seconds && timer.rounds === rounds
	);
	$: pathArray = $page.url.pathname.split('/');
	if (pathArray) {
		pathArray.pop();
		pathArray.push('0');
	}
	$: canonical = pathArray ? pathArray.join('/') : null;
	$: time = totalTime - progress;
	$: currentRound = rounds - Math.ceil(time / seconds) + 1;
	$: roundTime = ((time - 1) % seconds) + 1;
	$: formattedRoundTime = getFormattedTime(roundTime);
	$: minimallyFormattedRoundTime = getFormattedTime(roundTime, true);
	$: formattedElapsedTime = getFormattedTime(totalTime - time);
	$: formattedRemainingTime = `-${getFormattedTime(time)}`;
	$: timerArray = getTimeArray(roundTime);
	$: offset = `-${isFinished ? 2.26 : roundTime < 600 ? (roundTime < 60 ? (roundTime < 10 ? 1.835 : 1.335) : 0.5) : 0}ch`;
	$: isFinished = time < 1;
	$: isFavorited = favoriteTimers.some(
		(timer) => timer.seconds === seconds && timer.rounds === rounds
	);

	$: {
		if (isActive && !interval) {
			interval = setInterval(incrementTimer, 1000);
		} else if (!isActive && interval) {
			nukeInterval();
		}
	}

	const incrementTimer = (): void => {
		if (roundTime <= 4 || roundTime - 1 === seconds) {
			playAudio();
		}
		if (time >= 1) {
			time = Math.max(0, time - 1);
			replaceState(`./${String(totalTime - time)}`, {});
		} else {
			nukeInterval();
		}
	};

	const nukeInterval = (): void => {
		clearInterval(interval);
		interval = undefined;
		isActive = false;
	};

	const toggleTimer = (): void => {
		isActive = !isActive;
	};

	const resetTimer = (): void => {
		isActive = false;
		time = totalTime;
		replaceState(`./${String(totalTime - time)}`, {});
	};

	const resetRoundTime = (): void => {
		isActive = false;
		time = (rounds - currentRound + 1) * seconds;
		replaceState(`./${String(totalTime - time)}`, {});
	};

	const isFaded = (index: number): boolean => {
		if (index === 0 && roundTime < 600) {
			return true;
		}
		if ((index === 1 || index === 2) && roundTime < 60) {
			return true;
		}
		if (index === 3 && roundTime < 10) {
			return true;
		}
		return false;
	};

	$: title =
		currentRound > rounds
			? '🎉'
			: time < totalTime
				? `${isActive ? '⚡️' : '✋'}${minimallyFormattedRoundTime} (${currentRound}/${rounds})`
				: `${minimallyFormattedRoundTime}⨉${rounds}`;

	const playAudio = (): void => {
		if ($interfaceStore.sound === 'enabled' && time) {
			if (roundTime === 1) {
				boopAudio.currentTime = 0;
				boopAudio.play();
			} else {
				beepAudio.currentTime = 0;
				beepAudio.play();
			}
		}
	};

	const handleFavoriting = (): void => {
		favoriteTimersStore.toggle({ rounds, seconds });
	};

	afterUpdate((): void => {
		recentTimersStore.add({ seconds, rounds });
	});

	onDestroy((): void => {
		nukeInterval();
		unsubscribe();
	});
</script>

<svelte:head>
	<title>{title} - EMoM</title>
	<meta
		name="description"
		content="Interval timer for {rounds} rounds of {getVerboseTime(
			seconds
		)}. It will take {getVerboseTime(totalTime)} to complete in full."
	/>
	<link rel="canonical" href={canonical} />
</svelte:head>

<audio src={beep} preload="auto" bind:this={beepAudio}></audio>
<audio src={boop} preload="auto" bind:this={boopAudio}></audio>

<header>
	<ButtonSection isFixedSize={true}>
		<a href="/" on:click={navigateBack}>
			<CaretLeft height="37.5%" />
		</a>
	</ButtonSection>
	<ButtonSection isFixedSize={true}>
		<button
			on:click={() => {
				interfaceStore.update((state) => ({
					...state,
					sound: state.sound === 'enabled' ? 'disabled' : 'enabled'
				}));
			}}
			aria-label={`${$interfaceStore.sound === 'enabled' ? 'Mute' : 'Unmute'} sounds`}
		>
			{#if $interfaceStore.sound === 'enabled'}
				<Audio height="37.5%" />
			{:else}
				<Mute height="37.5%" />
			{/if}
		</button>
	</ButtonSection>
</header>
<main>
	{#if isFinished}
		<div class="confetti">
			<Confetti
				x={[-5, 5]}
				y={[0, 0.1]}
				delay={[0, 1500]}
				infinite
				duration={5000}
				amount={200}
				fallDistance="100vh"
				colorArray={['#0ff', '#f0f', '#ff0', '#0ff']}
				disableForReducedMotion={true}
			/>
		</div>
	{/if}

	{#if isActive}
		<ScreenWakeLock />
	{/if}

	<div class="timer" aria-label={formattedRoundTime}>
		<div class={isFinished ? 'visually-hidden' : 'rounds'}>
			<div class="label">Round</div>
			<p>
				{#if currentRound === rounds}
					FINAL
				{:else}
					{currentRound}/{rounds}
				{/if}
			</p>
		</div>
		<button
			class="screen"
			style="transform: translateX({offset});{isFinished ? ' align-self: center;' : ''}"
			aria-hidden="true"
			on:click={time <= 0 ? resetTimer : toggleTimer}
		>
			{#each timerArray as digit, i (`${currentRound}-${digit}-${i}`)}
				<span
					in:fly={{
						y: isActive ? 20 : 50,
						opacity: 0,
						delay:
							$interfaceStore.animations === 'disabled'
								? 0
								: isActive
									? (timerArray.length - 1 - i) * 10
									: (timerArray.length - 1 - i) * 30 + 200,
						duration: $interfaceStore.animations === 'disabled' ? 0 : 200,
						easing: backOut
					}}
					out:fly={{
						y: isActive ? -20 : -50,
						opacity: 0,
						delay:
							$interfaceStore.animations === 'disabled'
								? 0
								: isActive
									? (timerArray.length - 1 - i) * 10
									: (timerArray.length - 1 - i) * 30,
						duration: $interfaceStore.animations === 'disabled' ? 0 : 200,
						easing: isActive ? undefined : backIn
					}}
					class="d{i} {isFaded(i) ? 'faded' : ''} {roundTime < 4
						? `final final--${roundTime}`
						: ''}"
				>
					{time > 0 ? digit : celebrationEmoji[Math.floor(Math.random() * celebrationEmoji.length)]}
				</span>
			{/each}
		</button>

		<div class={isFinished ? 'visually-hidden' : 'times'}>
			<button on:click={() => (isElapsedDisplayed = !isElapsedDisplayed)} class="time-type">
				{isElapsedDisplayed ? formattedElapsedTime : formattedRemainingTime}
				<div class="label">{isElapsedDisplayed ? 'elapsed' : 'remaining'}</div>
			</button>
		</div>
	</div>
</main>
<footer>
	<ButtonSection>
		<button on:click={resetTimer} disabled={isActive || time === totalTime} aria-label="Reset">
			<Refresh height="37.5%" />
		</button>
	</ButtonSection>
	<ButtonSection>
		<button
			disabled={currentRound < 2 || isFinished}
			on:click={() => {
				currentRound--;
				resetRoundTime();
			}}
			aria-label="Previous round"
		>
			<Prev height="37.5%" />
		</button>
		<button on:click={toggleTimer} disabled={time <= 0} aria-label={isActive ? 'Pause' : 'Play'}>
			{#if isActive}
				<Stop height="37.5%" />
			{:else}
				<Play height="37.5%" />
			{/if}
		</button>
		<button
			disabled={currentRound >= rounds || isFinished}
			on:click={() => {
				currentRound++;
				resetRoundTime();
			}}
			aria-label="Next round"
		>
			<Next height="37.5%" />
		</button>
	</ButtonSection>
	<ButtonSection>
		<button aria-label="Favorite this timer" on:click={handleFavoriting}>
			{#if isFavorited}
				<StarFill height="37.5%" />
			{:else}
				<StarOutline height="37.5%" />
			{/if}
		</button>
	</ButtonSection>
</footer>
{#if roundTime === seconds && currentRound > 1 && isActive && $interfaceStore.animations === 'enabled'}
	<div class="flash"></div>
{/if}

<style>
	.confetti {
		position: fixed;
		top: -50px;
		left: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		overflow: hidden;
		pointer-events: none;
	}
	.timer {
		position: absolute;
		inset: 0;
		z-index: 2;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		text-align: center;

		@media (height > 480px) {
			flex-direction: column;
			justify-content: center;
		}
	}

	.screen {
		font-size: clamp(4rem, -2.857rem + 22.86vw, 10rem);
		font-weight: 700;
		height: 1em;
		line-height: 1;
		position: relative;
		transition:
			transform 0.5s var(--ease-out-expo),
			opacity 0.1s ease-out;

		@media (height > 480px) {
			font-size: clamp(4.5rem, -1.786rem + 31.43vw, 10rem);
		}

		@media (height > 480px) {
			width: 100%;
		}

		& > span {
			position: absolute;
			width: 1ch;
			left: 50%;
			top: 0;

			&.d0 {
				margin-inline-start: -2.35ch;
			}
			&.d1 {
				margin-inline-start: -1.35ch;
			}
			&.d2 {
				margin-inline-start: -0.5ch;
				color: var(--color-muted);
				transform: none !important;
			}
			&.d3 {
				margin-inline-start: 0.35ch;
			}
			&.d4 {
				margin-inline-start: 1.35ch;
			}

			&.faded {
				opacity: 0;
			}

			&.final {
				transition: all 0.3s ease-out;
				transition-property: filter, text-shadow;
				color: var(--color-medium);
				filter: drop-shadow(0 0 0.75em currentColor);
				text-shadow: 0 0 0.5em currentColor;
			}
			&.final--3 {
				color: var(--color-accent-tertiary);
			}
			&.final--2 {
				color: var(--color-accent-secondary);
			}
			&.final--1 {
				color: var(--color-accent-primary);
			}
		}
	}

	.label {
		text-transform: uppercase;
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-medium);
	}

	.flash {
		background: var(--color-accent-primary);
		position: fixed;
		inset: 0;
		animation: 0.99s var(--ease-out-expo) 0s forwards flash;
		z-index: 9999;
		pointer-events: none;
	}

	.times,
	.rounds {
		width: 25%;
		@media (height > 480px) {
			width: auto;
		}
	}

	.time-type {
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				color: var(--color-accent-primary);
			}
		}
	}

	footer {
		@media (width < 768px) {
			justify-content: space-evenly;
		}
	}
</style>
