<script lang="ts">
	import {
		interfaceStore,
		favoriteTimersStore,
		recentTimersStore,
		analyticsStore
	} from '$lib/stores';
	import { fadeImage } from '$lib/utils';
	import why from '$lib/assets/why.gif';

	const handleInterfaceChange = (event: Event): void => {
		const selectElement = event.target as HTMLSelectElement;
		const key: string | null = selectElement.getAttribute('name');
		if (!key) {
			return;
		}
		interfaceStore.update((state) => ({
			...state,
			[key]: selectElement.value as 'light' | 'dark'
		}));
	};
</script>

<svelte:head>
	<title>Settings - EMoM</title>
	<meta name="description" content="Manage your EMoM interface and data settings." />
</svelte:head>

<div class="container">
	<div class="content narrow">
		<div class="prose">
			<h1>Settings</h1>
			<section>
				<h2>Interface</h2>
				<section>
					<h3>Color Mode</h3>
					<div class="prose">
						<p>
							<select
								bind:value={$interfaceStore.colorMode}
								on:change={handleInterfaceChange}
								class="select small"
								name="colorMode"
							>
								<option value="dark">Dark Mode</option>
								<option value="light">Light Mode</option>
							</select>
						</p>
						{#if $interfaceStore.colorMode === 'light'}
							<p>
								<img
									src={why}
									width="360"
									height="202"
									loading="lazy"
									alt="But why?"
									use:fadeImage
								/>
							</p>
						{/if}
					</div>
				</section>
				<section>
					<h3>Animations</h3>
					<div class="prose">
						<p>
							<select
								bind:value={$interfaceStore.animations}
								on:change={handleInterfaceChange}
								class="select small"
								name="animations"
							>
								<option value="enabled">Enabled</option>
								<option value="disabled">Disabled</option>
							</select>
						</p>
					</div>
				</section>
				<section>
					<h3>Sound</h3>
					<div class="prose">
						<p>
							<select
								bind:value={$interfaceStore.sound}
								on:change={handleInterfaceChange}
								class="select small"
								name="sound"
							>
								<option value="enabled">Enabled</option>
								<option value="disabled">Disabled</option>
							</select>
						</p>
					</div>
				</section>
			</section>
			<section>
				<h2>Data</h2>
				<section>
					<h3>Delete Data</h3>
					<div class="prose">
						<p>
							<button
								class="button warning small"
								on:click={() => {
									favoriteTimersStore.set([]);
								}}
								disabled={!$favoriteTimersStore.length}>Delete All Favorites</button
							>
						</p>
						<p>This will remove all of your favorited timers.</p>
						<p>
							<button
								class="button warning small"
								on:click={() => {
									recentTimersStore.set([]);
								}}
								disabled={!$recentTimersStore.length}>Delete All Recent Timers</button
							>
						</p>
						<p>This will remove all of your recently used timers.</p>
						<p>
							<button
								class="button danger small"
								on:click={() => [recentTimersStore.set([]), favoriteTimersStore.set([])]}
								disabled={!$recentTimersStore.length && !$favoriteTimersStore.length}
								>Delete All Data</button
							>
						</p>
						<p>
							This will completely reset the application. It will remove all favorites, recent
							timers, and interface settings. Use with caution.
						</p>
					</div>
				</section>
				<section>
					<h3>Analytics</h3>
					<div class="prose">
						<p>
							<button
								class="button small {$analyticsStore ? 'danger' : 'success'}"
								on:click={() => {
									analyticsStore.update((state) => !state);
								}}>Opt {$analyticsStore ? 'Out' : 'In'}</button
							>
						</p>
						{#if $analyticsStore}
							<p>
								<strong>Remember: No identifiable information is ever collected or stored.</strong> Please
								consider leaving this enabled.
							</p>
						{:else}
							<p>
								<strong>No identifiable information is ever collected or stored.</strong> Please consider
								enabling/opting-in to analytics by clicking above to help improve this app.
							</p>
						{/if}
					</div>
				</section>
			</section>
		</div>
	</div>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		& > section {
			padding-block: 2rem;
			border-block-start: 0.125em solid var(--color-border);
			font-size: 0.875rem;
			line-height: 1.5;

			@media (width > 540px) {
				flex-direction: row;

				& > h3 {
					flex: 1;
				}
				& > div {
					flex: 3;
				}
			}
		}
	}
</style>
