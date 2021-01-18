import Electro from '../../interface/Electro'
import characterImg from '../../img/피슬.png'
import characterIcon from '../../img/icon/fischlIcon.png'

import { ensureObject } from '../../../util'

export class Fischl extends Electro {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '피슬'
  }

  getCharacterSpec() {
    return {
      LEVEL: this.LEVEL,
      ACSENTION: this.ACSENTION,
      ATK: this.ATK,
      ELEMENTAL_MASTERY: this.ELEMENTAL_MASTERY,
      CRIT_RATE: this.CRIT_RATE,
      CRIT_DMG: this.CRIT_DMG,
      PHYSICAL_DMG_BONUS: this.PHYSICAL_DMG_BONUS,
      ELECTRO_DMG_BONUS: this.ELECTRO_DMG_BONUS,
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
    this.setElectroCharacterSpec(spec)
    this.SKILL_RATE = SKILL_RATE
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
