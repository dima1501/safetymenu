<template lang="pug">
  div.page(v-if="$store.state.auth.user")
    v-row(class="justify-center")
      v-col(
        cols="12"
        sm="10"
        md="8"
        lg="3")
        .menu
          .menu__top
            v-btn.primary(
              @click="enableAddGood"
            ) Добавить товар
            v-card(
              v-if="createGood"
              theme--light)
              v-form(
                v-model="isNewGoodFormValid"
              )
                v-card-text
                  v-text-field(
                    ref="name"
                    v-model="newGood.name"
                    :rules="[() => !!newGood.name || 'Введите название']"
                    label="Название товара"
                    required)
                  v-file-input(
                    chips
                    small-chips
                    v-model="newGood.photo"
                    accept="image/*"
                    label="Фото товара")
                  v-text-field(
                    ref="category"
                    v-model="newGood.category"
                    :rules="[() => !!newGood.category || 'Введите категорию']"
                    label="Категория"
                    required)
                  v-text-field(
                    :rules="[() => !!newGood.price || 'Введите стоимость']"
                    v-model='newGood.price'
                    name="price"
                    label="Стоимость"
                    type="number"
                    required)
                  v-text-field(
                    v-model='newGood.weight'
                    name="price"
                    label="Вес (не обязательное поле)"
                    type="number")

                v-btn(
                  @click="disableAddGood"
                ) Отмена
                v-btn.primary(
                  :disabled="!isNewGoodFormValid"
                  @click="saveNewGood"
                ) Сохранить

    .goods
      h2(v-if="!$store.state.auth.user.goods.length") Нету товаров, как же так???
      v-col(
        cols="12"
        sm="10"
        md="8"
        lg="3"
        v-if="$store.state.auth.user.goods.length"
        v-for="(good, key) in $store.state.auth.user.goods" :key="key")
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
                  v-btn(
                    @click="removeGood(good)"
                  ) удалить

</template>

<script>
const { nanoid } = require('nanoid')

export default {
  components: {},
  data() {
    return {
      isNewGoodFormValid: true,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      createGood: false,
      newGood: {
        id: nanoid(),
        name: null,
        photo: null,
        category: null,
        price: null,
        weight: null,
      },
    }
  },
  created() {},
  methods: {
    enableAddGood() {
      this.newGood.name = this.newGood.photo = this.newGood.category = this.newGood.price = this.newGood.weight = null
      this.newGood.id = nanoid()
      this.createGood = true
    },
    disableAddGood() {
      this.createGood = false
      this.newGood.name = this.newGood.photo = this.newGood.category = this.newGood.price = this.newGood.weight = null
    },
    saveNewGood() {
      this.createGood = false
      this.$store.dispatch('menu/addGood', this.newGood)
    },
    removeGood(good) {
      this.$store.dispatch('menu/removeGood', good.id)
    },
  },
}
</script>

<style lang="scss">
.page {
  width: 100%;
}

.goods {
  display: flex;
  flex-wrap: wrap;
}

.good {
  display: flex;

  &__image {
    width: 80px;
    margin-right: 20px;
    flex-shrink: 0;

    img {
      max-width: 100%;
    }
  }
}
</style>
