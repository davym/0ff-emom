<script lang="ts">
	import { ArrowRight } from '$lib/icons';
	type Link = {
		label: string;
		href: string;
		rel?: string;
		target?: string;
		description?: string;
	};
	export let links: Link[];
</script>

<ul class="lbl">
	{#each links as { label, href, rel, target, description }}
		<li class="lbl__list-item">
			<a {href} {rel} {target} class="lbl__link">
				<div class="lbl__label">
					{label}
					{#if description}
						<small class="lbl__desc">{description}</small>
					{/if}
				</div>
				<div class="lbl__icon">
					<ArrowRight height="2em" />
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	.lbl {
		list-style: none !important;
		padding: 0 !important;
		text-align: left;
	}

	.lbl__list-item {
		margin-block-start: -1px !important;
	}

	.lbl__link {
		position: relative;
		z-index: 1;
		display: flex;
		padding: 0.75em 1em;
		font-weight: 700;
		border: 1px solid var(--color-border);
		text-decoration: none;
		gap: 1.5rem;
		align-items: center;

		@media (hover: hover) and (pointer: fine) {
			transition: all 0.1s ease-out;
			&:hover {
				z-index: 2;
				border-color: var(--color-accent-primary);
				background: var(--color-accent-primary);
				color: var(--color-bg);

				& .lbl__desc {
					color: inherit;
				}
			}
		}
	}

	.lbl__label {
		flex: 1;
	}

	.lbl__desc {
		font-size: 0.8125em;
		line-height: 1.25;
		color: var(--color-muted);
		font-weight: 400;
		display: block;
	}
</style>
