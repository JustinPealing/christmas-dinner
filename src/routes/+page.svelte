<script>
	import { items } from '$lib/stores';

	let itemName = '';
	let cookingTime = '';
	let offset = '0';

	// Reactive sorted items (longest cooking time + offset first)
	$: sortedItems = [...$items].sort((a, b) => {
		const totalA = a.cookingTime + (a.offset || 0);
		const totalB = b.cookingTime + (b.offset || 0);
		return totalB - totalA;
	});

	function addItem() {
		if (!itemName.trim() || !cookingTime || cookingTime < 1) return;

		items.update(current => [
			...current,
			{
				id: Date.now(),
				name: itemName.trim(),
				cookingTime: parseInt(cookingTime),
				offset: parseInt(offset) || 0
			}
		]);

		// Clear form
		itemName = '';
		cookingTime = '';
		offset = '0';
	}

	function deleteItem(id) {
		items.update(current => current.filter(item => item.id !== id));
	}
</script>

<svelte:head>
	<title>Christmas Dinner Planner</title>
	<meta name="description" content="Plan your Christmas dinner cooking schedule" />
</svelte:head>

<main>
	<h1>Christmas Dinner Planner</h1>

	<form on:submit|preventDefault={addItem}>
		<input
			type="text"
			bind:value={itemName}
			placeholder="Item name (e.g., Turkey)"
			required
		/>
		<input
			type="number"
			bind:value={cookingTime}
			placeholder="Cooking time (minutes)"
			min="1"
			required
		/>
		<input
			type="number"
			bind:value={offset}
			placeholder="Time offset (e.g., +5 minutes)"
		/>
		<button type="submit">Add Item</button>
	</form>

	<div class="items-list">
		{#if sortedItems.length === 0}
			<p class="empty-state">No items yet. Add your first dish!</p>
		{:else}
			<h2>Cooking Order (start with longest time first):</h2>
			{#each sortedItems as item, index (item.id)}
				<div class="item">
					<span class="order">{index + 1}.</span>
					<span class="name">{item.name}</span>
					<span class="time">
					{item.cookingTime} min
					{#if item.offset && item.offset !== 0}
						<span class="offset">+{item.offset} min</span>
					{/if}
				</span>
					<button type="button" on:click={() => deleteItem(item.id)}>Delete</button>
				</div>
			{/each}
		{/if}
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		background: #fafafa;
	}

	main {
		max-width: 600px;
		margin: 0 auto;
		padding: 1rem;
		min-height: 100vh;
	}

	h1 {
		text-align: center;
		color: #2d5016;
		font-size: 1.75rem;
		margin: 1.5rem 0;
	}

	h2 {
		font-size: 1.1rem;
		color: #333;
		margin-bottom: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 2rem;
		background: white;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	input {
		padding: 0.875rem;
		font-size: 1rem;
		border: 2px solid #ddd;
		border-radius: 6px;
		min-height: 44px;
		box-sizing: border-box;
	}

	input:focus {
		outline: none;
		border-color: #2d5016;
	}

	button {
		padding: 0.875rem;
		font-size: 1rem;
		background: #2d5016;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		min-height: 44px;
		font-weight: 600;
		transition: background 0.2s;
	}

	button:active {
		background: #1f3810;
	}

	.items-list {
		background: white;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem;
		background: #f5f5f5;
		margin-bottom: 0.75rem;
		border-radius: 6px;
		border-left: 4px solid #2d5016;
	}

	.item:last-child {
		margin-bottom: 0;
	}

	.item button {
		background: #c41e3a;
		margin-left: auto;
		padding: 0.5rem 1rem;
		min-height: 36px;
		font-size: 0.9rem;
	}

	.item button:active {
		background: #a01829;
	}

	.order {
		font-weight: bold;
		min-width: 2rem;
		color: #2d5016;
		font-size: 1.1rem;
	}

	.name {
		flex: 1;
		font-size: 1rem;
		color: #333;
	}

	.time {
		font-weight: bold;
		color: #2d5016;
		font-size: 0.95rem;
		white-space: nowrap;
	}

	.offset {
		font-size: 0.85rem;
		color: #666;
		margin-left: 0.25rem;
		font-weight: normal;
	}

	.empty-state {
		text-align: center;
		color: #666;
		padding: 2rem;
		font-size: 1rem;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		main {
			padding: 0.75rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.item {
			flex-wrap: wrap;
		}

		.item button {
			margin-left: 0;
			width: 100%;
			margin-top: 0.5rem;
		}
	}
</style>
