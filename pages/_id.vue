<template lang="pug">
.v-application
  div.page
    .header
      .header__row
        .header__logo
        v-btn.primary(
          v-if="isTableAvailable"
          @click="callSomebody"
        ) Позвать официанта

    .content
      .menu
        .menu__row
          v-col(
            cols="12"
            sm="10"
            md="8"
            lg="3"
            v-for="(good, key) in goods" :key="key")
              v-card(theme--light)
                v-card-text
                  .good
                    .good__image
                      // v-img(:src="good.photo")
                    .good__content
                      h2.good__title {{good.name}}
                      .good__price {{good.price}}
                      .good__category Категория: {{good.category}}
                      .good__category(v-if="good.weight") Вес: {{good.weight}}
                      div(v-if="isTableAvailable")
                        v-btn(
                          @click="addToCart(good)"
                          v-if="cart.indexOf(good) == -1"
                        ) Добавить в заказ
                        v-btn(
                          @click="removeFromCart(good)"
                          v-if="cart.indexOf(good) > -1"
                        ) убрать

      .cart(v-if="cart.length")
        .cart__inner
          .cart__item(
            v-for="(good, key) in cart" :key="key")
            v-card(theme--light)
              v-card-text
                .good
                  .good__image
                    // v-img(:src="good.photo")
                  .good__content
                    h2.good__title {{good.name}}
                    .good__price {{good.price}}
                    .good__category Категория: {{good.category}}
                    .good__category(v-if="good.weight") Вес: {{good.weight}}
                    div(v-if="isTableAvailable")
                      v-btn(
                        @click="removeFromCart(good)"
                        v-if="cart.indexOf(good) > -1"
                      ) убрать
          .cart__btn
            v-btn.primary(
              @click="sentOrder"
            ) Подтвердить заказ ({{cart.length}})


</template>

<script>
export default {
  components: {},
  data() {
    return {
      isTableAvailable: false,
      goods: [
        {
          name: 'Пицца',
          photo: 'adas',
          category: 'Пицца',
          price: 10000,
        },
        {
          name: 'Шаверма',
          photo: 'adas',
          category: 'Шаверма',
          price: 12000,
        },
      ],
      cart: [],
    }
  },
  created() {
    const table = this.$nuxt.$route.query.table
    if (table) {
      this.isTableAvailable = true
    }
  },
  methods: {
    callSomebody() {
      console.log('Heeeey! ' + this.$nuxt.$route.query.table)
    },
    addToCart(good) {
      this.cart.push(good)
    },
    removeFromCart(good) {
      this.cart.splice(this.cart.indexOf(good), 1)
    },
    sentOrder() {
      console.log('sent')
    },
  },
}
</script>

<style lang="scss">
.page {
  width: 100%;
}

.header {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 50px;
  }

  &__logo {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #ccc;
  }
}

.content {
  padding-top: 50px;
}
.menu {
  &__row {
    display: flex;
    flex-wrap: wrap;
  }
}

.cart {
  position: fixed;
  z-index: 10;
  top: 50px;
  right: 0;
  bottom: 0;
  width: 350px;
  background-color: #fff;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);

  &__item {
    margin-bottom: 10px;
  }

  &__inner {
    height: calc(100vh - 50px);
    padding-bottom: 36px;
    overflow-y: scroll;
  }

  &__btn {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>
