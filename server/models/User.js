const User = class User {
  constructor(name, password, email, goods) {
    this.name = name
    this.password = password
    this.email = email
    this.goods = goods
  }
}

module.exports = User
