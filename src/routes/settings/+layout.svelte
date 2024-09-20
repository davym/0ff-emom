<script lang="ts">
	import { navigateBack } from '$lib/utils';
	import { ButtonSection } from '$lib/components';
	import { CaretLeft } from '$lib/icons';
</script>

<header>
	<ButtonSection isFixedSize={true}>
		<a href="/" on:click={navigateBack}>
			<CaretLeft height="37.5%" />
		</a>
	</ButtonSection>
	<ButtonSection isFixedSize={true}></ButtonSection>
</header>

<main>
	<slot />
</main>
