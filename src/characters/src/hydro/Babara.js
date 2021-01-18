import Hydro from '../../interface/Hydro'
import characterImg from '../../img/바바라.png'
import characterIcon from '../../img/icon/babaraIcon.png'

import { ensureObject } from '../../../util'

export class Babara extends Hydro {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '바바라'
  }

  getCharacterSpec() {
    return {
      LEVEL: this.LEVEL,
      ACSENTION: this.ACSENTION,
      ATK: this.ATK,
      ELEMENTAL_MASTERY: this.ELEMENTAL_MASTERY,
      CRIT_RATE: this.CRIT_RATE,
      CRIT_DMG: this.CRIT_DMG,
      HYDRO_DMG_BONUS: this.HYDRO_DMG_BONUS,
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
    this.setHydroCharacterSpec(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getPhysicalDamage() {
    return null
  }

  getDamageNormal() {
    const { SKILL_RATE } = this.getCharacterSpec()
    const { amplification } = this.getElementReactionDamage(SKILL_RATE)

    return SKILL_RATE
      ? {
        ...this.getElementalDamage(this.SKILL_RATE),
        ...amplification && { amplification },
        element: true,
      }
      : null
  }

  getDamageCharged() {
    const { SKILL_RATE_CHARGED } = this.getCharacterSpec()
    const { amplification } = this.getElementReactionDamage(SKILL_RATE_CHARGED)

    return SKILL_RATE_CHARGED
      ? {
        ...this.getElementalDamage(this.SKILL_RATE_CHARGED),
        ...amplification && { amplification },
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
