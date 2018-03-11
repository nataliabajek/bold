<style scoped>
    .products{
        background-color: #424242;
    }
    button {
        padding: 5px 8px;
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

<v-app id="inspire" dark>
    <v-navigation-drawer clipped fixed v-model="drawer" app>
        <v-list dense>
            <v-list-tile v-for="(item, i) in items" :key="i" @click="navigateTo(item.target)">
                <v-list-tile-action>
                    <v-icon v-html="item.icon"></v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Bold FE hackathon#1</v-toolbar-title>
    </v-toolbar>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center align-center>
                <table>
                    <tr>
                        <th>Minicart</th>
                        <td v-for="product in products" v-bind:key="product['.key']" class="products">
                            <img v-bind:src="'../static/products/' + product.image">
                            <p>{{product.name}}</p> 
                            <p class="price" :class="product.price.type">{{product.price.value}}</p>
                            <button class="cart-btn" v-on:click="addToCart">Koszyk</button>
                            <button class="wishlist-btn" v-on:click="addToWishlist">Wishlista</button>
                        </td>
                    </tr>
                    <tr v-for="(attName, attNameIndex) in attributes" v-bind:key="attName['.key']">
                        <th>{{attName.name}}</th>
                        <td v-for="beer in products" v-bind:key="beer['.key']">
                            {{beer.attributes[attNameIndex]}}
                            <!-- <span v-for="attValue in attValue">{{attValue[beer.attributes[attNameIndex]]}}</span> -->
                        </td>
                    </tr>
                </table>
            </v-layout>
        </v-container>
    </v-content>
    <v-footer app fixed>
        <span>&copy; 2018</span>
    </v-footer>
</v-app>

</template>

<script>
import Menu from '../config/menu.js'
import { products } from '../config/firebase.js'
import { attributes } from '../config/firebase.js'
import { attributesIdValue } from '../config/firebase.js'
export default {
    mounted () {
        this.attributesIdValue.forEach(data => {
            this.attValue.push(data['.value'].split('|'))
        })
        console.log(this.attValue),
        this.products.forEach(data => {
            this.productAtt.push(data['attributes'].forEach(data2 => {
                data2.split('|')
            }))
        })
        console.log(this.productAtt)
    },
    data () {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: Menu,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js',
            counter: 0,
            attValue: [],
            productAtt: [],
            cart: [],
            wishlist: []
        }
    },
    methods: {
        navigateTo (nav) {
            this.$router.push({
                path: nav
            })
        },
        addToCart () {
            this.cart.push(this.counter)
            this.counter++
            console.log(this.cart)
        },
        addToWishlist () {
            this.wishlist.push({name: this.id})
        }
    },
    name: 'AppDark',
    firebase () {
        return {
            products: products,
            attributes: attributes,
            attributesIdValue: attributesIdValue
        }
    }
}
    // attributesIdValue = function(){
    //    var result = [];
    //    for(var i=0; i<attributesIdValue.length; i++){
    //        result.push(attributesIdValue[i].split("|"))
    //    }
    //    return result
    //   }
</script>