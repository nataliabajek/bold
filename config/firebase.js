import { initializeApp } from 'firebase';

const app = initializeApp({
	apiKey: 'AIzaSyAs4yqbLgAjf8jkCsW8Mp-DSVdMvPUBrHc',
	authDomain: 'vueapp-16eb6.firebaseapp.com',
	databaseURL: 'https://vueapp-16eb6.firebaseio.com',
	projectId: 'vueapp-16eb6',
	storageBucket: 'vueapp-16eb6.appspot.com',
	messagingSenderId: '388866802369'
});

export const db = app.database();
export const products = db.ref('products');
export const attributes = db.ref('attributes');
export const attributesIdValue = db.ref('attributesIdValue');