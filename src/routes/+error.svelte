<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container">
	<div class="content slim">
		<div class="prose">
			<h1>{$page?.error?.message} 💀</h1>
			<p>
				<strong><em>Oops!</em></strong> Well this is embrassing. It looks like you found a bug or to
				access a page that doesn't exist! It’s bound to happen from time to time. Sorry about that.
			</p>
		</div>
	</div>
</div>
