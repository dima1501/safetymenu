<template lang="pug">
.v-application
  .lk
    .lk__top
      .lk__image
        .lk__image-preview
        a.lk__image-edit Сменить фото
      .lk__name {{$store.state.auth.user.name}} <span class='lk__name-change'>изменить</span>
      // input(type='text' placeholder='Введите новое название')
      // v-btn.primary(
      //   @click="updateName"
      // ) Сохранить
      // v-btn.error(
      //   @click="stopUpdateName"
      // ) Отмена

      // .lk__link(v-bind="attrs" v-on="visible") Ваша ссылка <span class='lk__link-path'>https://safe-menu.com/gg32w</span>

      v-btn.primary(
        to="/menu"
      ) Меню

      .lk__qr
        .lk__qr-text
          .lk__qr-title Чтобы сгенерировать qr коды, введите количество столиков, в этом случае у посетителя будет возможность сделать заказ без официанта
          v-form(
            @submit.stop.prevent="loadQRForTables"
            v-model="isTablesCountValid"
          )
            v-text-field(
              :rules="[() => !!tablesCount || 'Введите количество столов']"
              v-model='tablesCount'
              name="code"
              label="Количество столов"
              type="number"
              required
            )
            v-btn.primary(
              type="submit"
              :disabled="!isTablesCountValid"
            ) Скачать qr коды
          .lk__qr-link либо<br> <a @click="loadSimpleQR">скачать</a> общий qr код, без возможности сделать заказ с сайта и позвать официанта

</template>

<script>
import QRCode from 'qrcode'

const fileDownload = require('js-file-download')

export default {
  components: {},
  data() {
    return {
      isTablesCountValid: true,
      visible: true,
      picture: '',
      tablesCount: null,
      pict: '',
    }
  },
  mounted() {},
  methods: {
    updateName() {
      console.log('update')
    },
    loadSimpleQR() {
      const id = this.$store.state.auth.user._id

      QRCode.toString(`https://safety-menu.com/${id}`)
        .then((url) => {
          fileDownload(url, `${id}_simple_qr.svg`)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    loadQRForTables() {
      const id = this.$store.state.auth.user._id

      for (let i = 0; i < parseInt(this.tablesCount); i++) {
        QRCode.toString(`https://safety-menu.com/${id}?table=${i}`)
          .then((url) => {
            fileDownload(url, `${i}_table_${id}.svg`)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
  },
}
</script>

<style lang="scss">
.lk {
  width: 100%;
  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 30px;
  }

  &__image {
    margin-bottom: 15px;
    &-preview {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      margin-bottom: 15px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: #ccc;
    }
  }

  &__name {
    margin-bottom: 15px;
    &-change {
      text-decoration: underline;
      color: rgb(19, 38, 216);
      cursor: pointer;
    }
  }

  &__link {
    margin: 5px 0;
    align-items: center;
    display: flex;
    &-path {
      margin: 0 5px;
      padding: 5px 10px;
      display: block;
      background-color: rgb(240, 240, 240);
      cursor: pointer;
      border-radius: 10px;
      transition: background-color 0.3s;

      &:hover {
        background-color: rgb(231, 231, 231);
      }
    }
  }

  &__qr {
    &-text {
      max-width: 380px;
      margin: 20px auto;
    }
  }
}
</style>
