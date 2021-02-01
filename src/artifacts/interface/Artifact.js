export default class Artifact {
  constructor() {
    this.BASE_ATK = null
  }

  setBaseATK(BASE_ATK = this.BASE_ATK) {
    this.BASE_ATK = BASE_ATK
  }

  getBaseATK() {
    return this.BASE_ATK
  }
}
