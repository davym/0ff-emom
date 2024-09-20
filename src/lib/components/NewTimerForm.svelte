<script lang="ts">
	import { goto } from '$app/navigation';
	export let onSubmit: Function = () => {};
	let minutes: number;
	let seconds: number;
	let rounds: number;
	let form: HTMLFormElement;

	$: totalSeconds = (seconds || 0) + (minutes || 0) * 60;

	const handleSubmit = (e: SubmitEvent): void => {
		e.preventDefault();
		onSubmit();
		goto(`/${totalSeconds}/${rounds}/0`);
		if (form) {
			form.reset();
		}
	};
</script>

<form class="ntf" on:submit={handleSubmit} bind:this={form}>
	<fieldset class="ntf__fieldset">
		<legend class="ntf__legend">
			<label class="ntf__label" for="minutes"><abbr title="Minutes">MM</abbr></label>:<label
				class="ntf__label"
				for="seconds"><abbr title="Seconds">SS</abbr></label
			>
		</legend>
		<div class="ntf__input-group">
			<input
				class="ntf__input"
				id="minutes"
				type="number"
				min="0"
				max="59"
				step="1"
				bind:value={minutes}
				placeholder="00"
				size="2"
				required={!seconds}
				pattern="[0-9]*"
				inputmode="numeric"
			/>
			<span class="ntf__colon">:</span>
			<input
				class="ntf__input"
				id="seconds"
				type="number"
				min="0"
				max="59"
				step="1"
				bind:value={seconds}
				placeholder="00"
				size="2"
				required={!minutes}
				pattern="[0-9]*"
				inputmode="numeric"
			/>
		</div>
	</fieldset>
	<div class="ntf__x">&times;</div>
	<fieldset class="ntf__fieldset">
		<legend class="ntf__legend">
			<label class="ntf__label" for="rounds">Rnds</label>
		</legend>
		<div class="ntf__input-group">
			<input
				class="ntf__input"
				id="rounds"
				type="number"
				min="1"
				max="100"
				step="1"
				bind:value={rounds}
				required
				placeholder="0"
				size="3"
				pattern="[0-9]*"
				inputmode="numeric"
			/>
		</div>
	</fieldset>
	<button class="ntf__button button" type="submit" aria-label="Submit">+</button>
</form>

<style>
	.ntf {
		display: flex;
		font-size: 1.375rem;
		gap: 0.75rem;
		align-items: flex-end;
	}

	.ntf__input-group {
		display: flex;
		border: solid 0.125rem var(--color-fg);
		align-items: center;

		&:has(.ntf__input[type='number']:user-invalid) {
			border-color: var(--color-negative);

			& .ntf__input[type='number'] {
				color: var(--color-negative);
			}
		}
	}

	.ntf__fieldset {
		border: none;
	}

	.ntf__legend {
		padding-inline: 0;
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		margin-block-end: 0.25rem;
	}

	.ntf__input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
		background: transparent;
		color: inherit;
		border: none;
		text-align: center;
		outline: 0;
		padding: 0.5rem;
		font-weight: 700;

		&:focus {
			background: var(--color-faded);
		}

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}

	.ntf__x {
		font-size: 2rem;
		font-weight: bold;
		line-height: 3.5rem;
	}

	.ntf__button {
		height: 1.6875em;
		padding: 0;
		aspect-ratio: 1;
		font-weight: 700;
		font-size: 2rem;
		text-align: center;
		justify-content: center;
		line-height: 1;
	}
</style>
