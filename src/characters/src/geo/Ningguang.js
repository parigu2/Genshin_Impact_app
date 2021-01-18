import Geo from '../../interface/Geo'
import characterImg from '../../img/응광.png'
import characterIcon from '../../img/icon/ningguangIcon.png'

import { ensureObject } from '../../../util'

export class Ningguang extends Geo {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '응광'
  }

  getCharacterSpec() {
    return {
      LEVEL: this.LEVEL,
      ACSENTION: this.ACSENTION,
      ATK: this.ATK,
      ELEMENTAL_MASTERY: this.ELEMENTAL_MASTERY,
      CRIT_RATE: this.CRIT_RATE,
      CRIT_DMG: this.CRIT_DMG,
      GEO_DMG_BONUS: this.GEO_DMG_BONUS,
      SKILL_RATE: this.SKILL_RATE,
      SKILL_RATE_CHARGED: this.SKILL_RATE_CHARGED,
      SKILL_RATE_E: this.SKILL_RATE_E,
      SKILL_RATE_Q: this.SKILL_RATE_Q,
    }
  }

  setCharacterSpec({
    SKILL_RATE = this.SKILL_RATE,
    ...spec
  } = {}) {
    this.setGeoCharacterSpec(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getPhysicalDamage() {
    return null
  }

  getDamageNormal() {
    const { SKILL_RATE } = this.getCharacterSpec()

    return SKILL_RATE
      ? {
        ...this.getElementalDamage(this.SKILL_RATE),
        element: true,
      }
      : null
  }

  getDamageCharged() {
    const { SKILL_RATE_CHARGED } = this.getCharacterSpec()

    return SKILL_RATE_CHARGED
      ? {
        ...this.getElementalDamage(this.SKILL_RATE_CHARGED),
        element: true,
      }
      : null
  }

  getImage() {
    return characterImg
  }

  getIcon() {
    return characterIcon
  }
}
