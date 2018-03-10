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
      			<td v-for="beer in products" v-bind:key="beer['.key']">
	      			<img v-bind:src="'../static/products/' + beer.image">
				      <p>{{beer.name}}</p> 
				      <p>{{beer.price.value}}</p>
				      <button>Koszyk</button>
				      <button>Wishlista</button>
      			</td>
      		</tr>
      		<tr v-for="attrName in attributes" v-bind:key="attrName['.key']">
      			<th>{{attrName.name}}</th>
      			<td v-for="beer in products" v-bind:key="beer['.key']">{{beer.attributes[0]}}</td>
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
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: Menu,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    navigateTo (nav) {
      this.$router.push({
        path: nav
      })
    }
  },
  name: 'AppDark',
	  firebase: {
  	products: products,
  	attributes: attributes,
  	attributesIdValue: attributesIdValue
  }
}
</script>