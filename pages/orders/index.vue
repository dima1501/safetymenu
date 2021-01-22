<template lang="pug">
.v-application
  .page
    h1 Заказы
    .goods
      v-col(
        cols="12"
        sm="10"
        md="8"
        lg="4"
        v-for="(order, key) in orders" :key="key")
          v-card(theme--light)
            v-card-text
              .good
                .good__content
                  h2.good__title Стол №{{order.table}}, статус: {{order.status}}
                  div(v-for="(good, key) in order.goods" :key="key").order__good
                    .good__title {{good.name}}
                    .good__price {{good.price}}
                    .good__category Категория: {{good.category}}
                    .good__category(v-if="good.weight") Вес: {{good.weight}}
                  v-btn(
                    v-if="order.status === 'ожидание'"
                    @click="applyOrder(key)"
                  ) подтвердить

</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          status: 'ожидание',
          table: 2,
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
        },
        {
          status: 'подтвержден',
          table: 4,
          goods: [
            {
              name: 'Пиво',
              photo: 'adas',
              category: 'Алкоголь',
              price: 5000,
            },
            {
              name: 'Орешки',
              photo: 'adas',
              category: 'Закуски',
              price: 8000,
            },
          ],
        },
      ],
    }
  },
  methods: {
    applyOrder() {},
  },
}
</script>

<style lang="scss">
.page {
  width: 100%;
}

.order {
  &__good {
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #000;
  }
}
</style>
