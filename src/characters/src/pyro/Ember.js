import Pyro from '../../interface/Pyro'
import characterImg from '../../img/엠버.png'
import characterIcon from '../../img/icon/emberIcon.png'

import { ensureObject } from '../../../util'

export class Ember extends Pyro {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '엠버'
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
      PYRO_DMG_BONUS: this.PYRO_DMG_BONUS,
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
    this.setPyroCharacterSpec(spec)
    this.SKILL_RATE = SKILL_RATE
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
