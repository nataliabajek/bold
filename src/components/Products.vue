<style scoped>
    .products{
        background-color: #424242;
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
            <td v-for="product in products" :key="product['.key']" :class="product['.key']" class="products">
                <img :src="'../static/products/' + product.image">
                <button class="delete-btn" @click="removeElement(product['.key'])">X</button>
                <p>{{product.name}}</p> 
                <p class="price" :class="product.price.type">{{product.price.value}}</p>
                <button class="cart-btn" @click="addToCart">Koszyk</button>
                <button class="wishlist-btn" @click="addToWishlist" :data-name=product>Wishlista</button>
            </td>
        </tr>
        <tr v-for="(attName, attNameIndex) in attributes" :key="attName['.key']">
            <th>{{attName.name}}</th>
            <td v-for="(product, productIndex) in products" :key="product['.key']" :class="product['.key']">
                <span v-for="att in productAtt[productIndex][attNameIndex]" :key="att['.key']">
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
	            // debugger;
	            // this.wishlist.push(event.target);
	            // console.log(this.wishlist);
	        },
	        removeElement (product) {
	        	var itemsToDelete = document.getElementsByClassName(product);
	        	var rowsAmount = document.getElementsByTagName("tr").length;
	        	for (var i = 0; i < itemsToDelete.length; i++) {
	        		while (rowsAmount > 0) {
	        			itemsToDelete[i].parentNode.removeChild(itemsToDelete[i]);
	        			rowsAmount --;
	        		}
	        	};
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