var APP_LOG_LIFECYCLE_EVENTS = true;
var webstore = new Vue({
  el: '#app',
  data: {
    sitename: "LessonCart",
    showProduct: true,
    a: false,
    order: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      validation: {
        firstNameInvalid: false,
        lastNameInvalid: false,
        emailInvalid: false,
        phoneInvalid: false
      }
    },
    products: {},
    cart: []
  },
  methods: {
    getDefaultOrderDetails() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        validation: {
          firstNameInvalid: false,
          lastNameInvalid: false,
          emailInvalid: false,
          phoneInvalid: false
        }
      };
    },
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },
    removeFromCart(aProduct) {
      var index = this.cart.indexOf(aProduct.id);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
      if (this.cart.length < 1) {
        this.showProduct = true;
      }
      return;
    },
    showCheckout() {
      this.showProduct = this.showProduct ? false : true;
    },
    submitForm() {
      alert('Order Placed Successfully');
      this.cart =[];
      this.showProduct = true;
      this.order = this.getDefaultOrderDetails();
    },
    canAddToCart(aProduct) {
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },
    canPlaceOrder() {
      const lettersOnlyRegex = /^[a-z]+$/i;
      const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const phoneRgex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      var isValid = true;

      if (this.order.firstName == '' || !lettersOnlyRegex.test(this.order.firstName)){
        this.order.validation.firstNameInvalid = true;
        isValid = false;
      }else{
        this.order.validation.firstNameInvalid = false;
      }
      if (this.order.lastName == '' || !lettersOnlyRegex.test(this.order.lastName)){
        this.order.validation.lastNameInvalid = true;
        isValid = false;
      }else{
        this.order.validation.lastNameInvalid = false;
      }
      if (this.order.email == '' || !emailRegex.test(this.order.email)){
        this.order.validation.emailInvalid = true;
        isValid = false;
      }else{
        this.order.validation.emailInvalid = false;
      }
      if (this.order.phone == '' || !phoneRgex.test(this.order.phone)){
        this.order.validation.phoneInvalid = true;
        isValid = false;
      }else{
        this.order.validation.phoneInvalid = false;
      }
      
      return isValid;
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
    },
    findLesson(id) {
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          return this.products[i];
        }
      }
      return;
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
    },
    cartProducts() {
      if (this.cart.length > 0) {
        let cartArray = [];
        for (var i = 0; i < this.cart.length; i++) {
          cartArray.push(this.findLesson(this.cart[i]))
        }

        function compare(a, b) {
          if (a.subject.toLowerCase() < b.subject.toLowerCase())
            return -1;
          if (a.subject.toLowerCase() > b.subject.toLowerCase())
            return 1;
          return 0;
        }
        return cartArray.sort(compare);
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