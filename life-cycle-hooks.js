var APP_LOG_LIFECYCLE_EVENTS = true;
    var webstore = new Vue({
      el: '#app',
      data: {
        sitename: "LessonCart",
        showProduct: true,
        a: false,
        states: {
          AL: 'Alabama',
          AK: 'Alaska',
          AR: 'Arizona',
          CA: 'California',
          NV: 'Nevada'
        },
        order: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          zip: '',
          state: '',
          method: 'Home Address',
          business: 'Business Address',
          home: 'Home Address',
          gift: '',
          sendGift: 'Send As A Gift',
          dontSendGift: 'Do Not Send As A Gift'
        },
        products: {},
        cart: []
      },
      methods: {
        checkRating(n, myProduct) {
          return myProduct.rating - n >= 0;
        },
        addToCart(aProduct) {
          this.cart.push(aProduct.id);
        },
        showCheckout() {
          this.showProduct = this.showProduct ? false : true;
        },
        submitForm() {
          alert('Submitted');
        },
        canAddToCart(aProduct) {
          //return this.product.availableInventory > this.cartItemCount;
          return aProduct.availableInventory > this.cartCount(aProduct.id);
        },
        canCheckout() {
          return this.cart.length > 0;
        },
        cartCount(id) {
          let count = 0;
          for (var i = 0; i < this.cart.length; i++) {
            if (this.cart[i] === id) {
              count++;
            }
          }
          return count;
        }
      },
      computed: {
        cartItemCount() {
          return this.cart.length || '';
        },
        sortedProducts() {
          if (this.products.length > 0) {
            let productsArray = this.products.slice(0);
            console.log(productsArray);
            console.log(this.products);
            function compare(a, b) {
              if (a.subject.toLowerCase() < b.subject.toLowerCase())
                return -1;
              if (a.subject.toLowerCase() > b.subject.toLowerCase())
                return 1;
              return 0;
            }
            return productsArray.sort(compare);
          }

        }
      },
      filters: {
        formatPrice(price) {	//#B
          if (!parseInt(price)) { return ""; }	//#C
          if (price > 99999) {	//#D
            var priceString = (price / 100).toFixed(2);	//#E
            var priceArray = priceString.split("").reverse();	//#F
            var index = 3;	//#F
            while (priceArray.length > index + 3) {	//#F
              priceArray.splice(index + 3, 0, ",");	//#F
              index += 4;	//#F
            }	//#F
            return "£" + priceArray.reverse().join("");	//#G
          } else {
            return "£" + (price / 100).toFixed(2);	//#H
          }
        }

      },
      beforeCreate: function () {	//#B
        if (APP_LOG_LIFECYCLE_EVENTS) {	//#B
          console.log("beforeCreate");	//#B
        }	//#B
      },	//#B
      created: function () {	//#C
        axios.get('./products.json')
          .then((response) => {
            this.products = response.data.products;
            console.log(this.products);
          });
      },	//#C
      beforeMount: function () {	//#D
        if (APP_LOG_LIFECYCLE_EVENTS) {	//#D
          console.log(" beforeMount");	//#D
        }	//#D
      },	//#D
      mounted: function () {	//#E
        if (APP_LOG_LIFECYCLE_EVENTS) {	//#E
          console.log(" mounted"); 	//#E
        } 	//#E
      },	//#E
      beforeUpdate: function () { 	//#F
        if (APP_LOG_LIFECYCLE_EVENTS) { 	//#F
          console.log("beforeUpdate"); 	//#F
        } 	//#F
      },	//#F
      updated: function () { 	//#G
        if (APP_LOG_LIFECYCLE_EVENTS) { 	//#G
          console.log("updated"); 	//#G
        } 	//#G
      },	//#G
      beforeDestroyed: function () { 	//#H
        if (APP_LOG_LIFECYCLE_EVENTS) { 	//#H
          console.log("beforeDestroyed "); 	//#H
        } 	//#H
      },	//#H
      destroyed: function () { 	//#I
        if (APP_LOG_LIFECYCLE_EVENTS) { 	//#I
          console.log("destroyed"); 	//#I
        } 	//#I
      }	//#I
    });