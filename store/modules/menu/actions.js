const axios = require('axios').default

const addGood = async (store, data) => {
  try {
    const add = await axios({
      method: 'post',
      url: '/add-good',
      data,
    })

    if (add.data) {
      store.rootState.auth.user.goods.push(
        JSON.parse(JSON.stringify(data))
      )
    }

  } catch (error) {
    console.error(error)
  }
}

const removeGood = async (store, id) => {
  try {
    const remove = await axios({
      method: 'post',
      url: '/remove-good',
      data: {id},
    })

    if (remove.data) {
      store.rootState.auth.user.goods = store.rootState.auth.user.goods.filter(e => e.id !== id)
    }

  } catch (error) {
    console.error(error)
  }
}

export default {
  addGood,
  removeGood
}
