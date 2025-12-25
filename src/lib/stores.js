import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'christmas-dinner-items';

// Initialize from localStorage or empty array
const initialValue = browser
	? JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
	: [];

// Create writable store
const itemsStore = writable(initialValue);

// Auto-save to localStorage on every update (only in browser)
if (browser) {
	itemsStore.subscribe(value => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	});
}

export const items = itemsStore;
