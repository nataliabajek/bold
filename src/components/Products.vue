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
      <td v-for="product in productsList" :key="product['.key']" :class="product['.key']" class="products">
        <img :src="'../static/products/' + product.image">
        <button class="delete-btn" @click="removeElement(product)">X</button>
        <p>{{product.name}}</p>
        <p class="price" :class="product.price.type">{{product.price.value}}</p>
        <button class="cart-btn" @click="addToCart(product, )">Koszyk</button>
        <button class="wishlist-btn" @click="addToWishlist(product)" :data-name=product>Wishlista</button>
      </td>
    </tr>
    <tr v-for="(attName, attNameIndex) in attributes" :key="attName['.key']">
      <th>{{attName.name}}</th>
      <td v-for="(product, productIndex) in productsList" :key="product['.key']" :class="product['.key']">
        <span v-for="att in productAtt[productIndex][attNameIndex]" :key="att['.key']">
          {{attValue[attNameIndex][att-1]}}
        </span>
      </td>
    </tr>
  </table>
</template>

<script>
  import { products, attributes, attributesIdValue } from '../../config/firebase.js'
  export default {
      data () {
          return {
              productsList: [],
              attValue: [],
              productAtt: [],
              cart: [],
              wishlist: []
          }
      },
      mounted () {
          this.attributesIdValue.forEach(id => {
              this.attValue.push(id['.value'].split('|'))
          })
          this.products.forEach(id => {
              let tempAttributes = []
              id['attributes'].forEach((attribute, i) => {
                  tempAttributes.push(attribute.split('|'))
                  if (i === 5) {
                      this.productAtt.push(tempAttributes)
                      tempAttributes = []
                  }
              })
              this.productsList.push(id)
          })
      },
      methods: {
          addToCart (product) {
              let thisCart = this.cart
              let counter = 0
              if (thisCart.length > 0) {
                  for (let index in thisCart) {
                      if (thisCart[index][0] === product.name) {
                          thisCart[index][1]++
                          break
                      } else {
                          counter++
                          if (counter === thisCart.length) {
                              thisCart.push([product.name, 1, product.price.value])
                              break
                          } else {
                              continue
                          }
                      }
                  }
              } else {
                  thisCart.push([product.name, 1, product.price.value])
              }
          },
          addToWishlist (product) {
              let thisWishlist = this.wishlist
              let counter = 0
              if (thisWishlist.length > 0) {
                  for (let index in thisWishlist) {
                      if (thisWishlist[index][0] === product.name) {
                          break
                      } else {
                          counter++
                          if (counter === thisWishlist.length) {
                              thisWishlist.push([product.name, product.price.value])
                              break
                          } else {
                              continue
                          }
                      }
                  }
              } else {
                  thisWishlist.push([product.name, 1])
              }
          },
          removeElement (product) {
              // let itemsToDelete = document.getElementsByClassName(key)
              // let rowsAmount = document.getElementsByTagName('tr').length
              // for (let i = 0; i < itemsToDelete.length; i++) {
              //     while (rowsAmount > 0) {
              //         itemsToDelete[i].parentNode.removeChild(itemsToDelete[i])
              //         rowsAmount--
              //     }
              // }
              this.productsList.splice(this.productsList.indexOf(product), 1)
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
