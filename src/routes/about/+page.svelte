<script lang="ts">
	import { Modal, LinkButtonList } from '$lib/components';
	import { getFormattedTime, getVerboseTime } from '$lib/utils';
	import type { Timer } from '$lib/types';

	let showModal: boolean = false;
	const exampleTimers: Timer[] = [
		{ seconds: 180, rounds: 10 },
		{ seconds: 300, rounds: 5 },
		{ seconds: 60, rounds: 10 }
	];
</script>

<svelte:head>
	<title>About EMoM Interval Timer</title>
	<meta
		name="description"
		content="EMoM is the world’s simplest app to create “every minute on the minute” style interval timers."
	/>
</svelte:head>

<div class="container">
	<div class="content slim">
		<div class="prose">
			<h1>EMoM</h1>
			<h2>The world’s simplest interval timer application</h2>
			<p>
				<abbr title="Every minute on the minute">EMoM</abbr> stands for
				<em>
					<b><u>e</u></b>very <b><u>m</u></b>inute <b><u>o</u></b>n the <b><u>m</u></b>inute
				</em>. It is a simple interval timing protocol with a variety of uses. It‘s not bloated with
				features like variable interval lengths or labels that just make things complicated and
				slow. You simply pick the length of your interval and how many times you want it to repeat
				and go!
			</p>
			<p>
				While EMoM can be used for anything, I find it most useful for workouts. I like doing
				circuit style routines and this keeps me honest and on track. An example full body
				bpdyweight routine might be:
			</p>
			<blockquote>
				<p>
					I start a <a href="/180/10/0">3:00 ⨉ 10 round timer</a> in which I do 10 reps of pull-ups,
					10 reps of dips, and 30 reps of air squats. I have 3 minutes to complete my reps of all the
					exercises. Let‘s say I can typically get my reps done in 2 minutes. This leaves 1 minute for
					rest before the time goes off and I start my next set.
				</p>
			</blockquote>
			<p>I like this approach for a few reasons...</p>
			<ul>
				<li>
					I can set my workout length <em>exactly</em> to the minute (30 minutes in the above example).
				</li>
				<li>
					The amount of time I get to rest is dictated by how dilligent I am in cranking out my
					reps.
				</li>
				<li>
					Removing variables like "time between exercises" helps me more accurately track progress
					of rep max or weight lifted increases/decreases, etc. This helps with more accurately
					assessing progression or stagnation/regression.
				</li>
			</ul>
			<h3>Want to start started?</h3>
			<p>Here are a few timers I have found useful:</p>
			<LinkButtonList
				links={exampleTimers.map(({ seconds, rounds }) => ({
					label: `${getFormattedTime(seconds, true)} x ${rounds}`,
					href: `/${seconds}/${rounds}`,
					description: `Total time: ${getVerboseTime(seconds * rounds)}`
				}))}
			/>
			<hr />
			<h2>Offline and Private</h2>
			<p>
				EMoM is a <a
					href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
					target="_blank"
					rel="noopener noreferrer">progressive web application (PWA)</a
				>. This allows this website to be “installed” on your device to use entirely offline. This
				means it can be used on iOS, Android, MacOS, Windows, etc. without the need to download it
				through proprietary app stores.
			</p>
			<p>
				It also can be run in any web browser. All data is stored locally on your device's browser
				in what as known as <code>localStorage</code>. <code>localStorage</code> is not a
				<code>cookie</code>, and
				<strong><em>no data from it is ever sent to the server</em></strong>. It stays entirely on
				you device. It is not trackable, traceable, or identifiable in any way as nothing but your
				web browser has access to it.
			</p>
			<p>
				<button
					class="button small"
					on:click={() => {
						showModal = true;
					}}>A word about analytical data</button
				>
			</p>
		</div>
	</div>
</div>

<Modal bind:showModal title="Analytical Data">
	<p>
		While this website/application can run 100% offline—beyond initially downloading to your device
		to install (again, this is optional)—usage data is collected via <a
			href="https://plausible.io/"
			target="_blank"
			rel="noopener noreferrer">Plausible</a
		>.
	</p>
	<p>
		Plausible is an <em>extremely</em> basic web traffic analytics application that only collects
		100% annonymous website usage data like page visits, session, duration, etc. It is not
		<a href="https://plausible.io/vs-google-analytics" target="_blank" rel="noopener noreferrer"
			>Google Analytics that tracks literally everything about you</a
		>, and is borderline illegal in many countries.
	</p>
	<p>
		I only run it to see how much traffic I'm getting and what pages are being visited. I only use
		this to help improve the app, and again, it tells me nothing of you. That being said, if you are
		still uncomfortable with that, you can always <a href="/settings">opt out</a> on the settings page.
	</p>
</Modal>

<style>
	h1 + h2 {
		margin-block-start: 0.75rem;
	}
</style>
