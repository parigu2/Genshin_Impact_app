import Pyro from '../../interface/Pyro'
import characterImg from '../../img/클레.png'
import characterIcon from '../../img/icon/kleeIcon.png'

import { pyro_amplification, saltation } from '../../../element/src/elementReaction'

import { ensureObject } from '../../../util'

export class Klee extends Pyro {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '클레'
  }

  getCharacterSpec() {
    return {
      LEVEL: this.LEVEL,
      ACSENTION: this.ACSENTION,
      ATK: this.ATK,
      ELEMENTAL_MASTERY: this.ELEMENTAL_MASTERY,
      CRIT_RATE: this.CRIT_RATE,
      CRIT_DMG: this.CRIT_DMG,
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

  setElementalReactionEffection({
    vaporize = this.vaporize,
    melt = this.melt,
    overloaded = this.overloaded,
    shattered = this.shattered,
  }) {
    this.vaporize = vaporize
    this.melt = melt
    this.overloaded = overloaded
    this.shattered = shattered
  }

  getElementSpec() {
    return {
      vaporize: this.vaporize,
      melt: this.melt,
      overloaded: this.overloaded,
      shattered: this.shattered,
    }
  }

  getElementReaction() {
    const { overloaded, shattered } = saltation
    return {
      amplification: pyro_amplification,
      saltation: {
        overloaded,
        shattered,
      },
    }
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
