<style scoped>
    .products{
        background-color: #424242;
        width: 500px;
        position: relative;
    }
    button {
        padding: 5px 8px;
    }
    .delete-btn {
    	position: absolute;
    	top: 0;
    	right: 0;
    	background-color: #626262;
    }
    .cart-btn {
        background-color: firebrick;
    }
    .wishlist-btn {
        background-color: dodgerblue;
    }
    .price {
        padding: 5px 8px;
    }
    .special {
        background-color: yellow;
        color: black;
    }
</style>

<template>
	 <table>
        <tr>
            <th>Minicart</th>
            <td v-for="product in products" v-bind:key="product['.key']" class="products">
                <img v-bind:src="'../static/products/' + product.image">
                <button class="delete-btn" v-on:click="removeElement(product)">X</button>
                <p>{{product.name}}</p> 
                <p class="price" :class="product.price.type">{{product.price.value}}</p>
                <button class="cart-btn" v-on:click="addToCart">Koszyk</button>
                <button class="wishlist-btn" v-on:click="addToWishlist" :data-name=product>Wishlista</button>
            </td>
        </tr>
        <tr v-for="(attName, attNameIndex) in attributes" v-bind:key="attName['.key']">
            <th>{{attName.name}}</th>
            <td v-for="(beer, beerIndex) in products" v-bind:key="beer['.key']">
                <span v-for="att in productAtt[beerIndex][attNameIndex]" v-bind:key="att['.key']">
                    {{attValue[attNameIndex][att-1]}}
                </span>
            </td>
        </tr>
    </table>
</template>

<script>
	import { products } from '../../config/firebase.js'
	import { attributes } from '../../config/firebase.js'
	import { attributesIdValue } from '../../config/firebase.js'

	export default {
		data () {
			return {
				attValue: [],
	            productAtt: [],
	            cart: [],
	            wishlist: []
			}
		},
		mounted () {
	        this.attributesIdValue.forEach(id => {
	            this.attValue.push(id['.value'].split('|'))
	        }),
	        this.products.forEach(id => {
	            let tempAttributes = [];
	            id["attributes"].forEach((attribute, i) => {
	                tempAttributes.push(attribute.split("|"));
	                if (i === 5) {
	                    this.productAtt.push(tempAttributes);
	                    tempAttributes = [];
	                }
	            });
	        })
	    },
	    methods: {
	    	addToCart (event) {
            // let formData = Object(event.target)
            // formData.productName = String(formData.('productName'))
            // this.cart.dispatch('addToCart', productName)
            // formData = []
            // console.log(this.cart)
        },
	        addToWishlist (event) {
	            debugger;
	            this.wishlist.push(event.target);
	            console.log(this.wishlist);
	        },
	        removeElement(product) {
	            this.products.$remove(product);
	        }
	    },
	    firebase () {
	        return {
	            products: products,
	            attributes: attributes,
	            attributesIdValue: attributesIdValue
	        }
	    }
	}

</script>