import Pyro from '../../interface/Pyro'
import characterImg from '../../img/다이루크.png'
import characterIcon from '../../img/icon/dilucIcon.png'

import { pyro_amplification, saltation } from '../../../element/src/elementReaction'

import { ensureObject } from '../../../util'

export class Diluc extends Pyro {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '다이루크'
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

  getImage() {
    return characterImg
  }

  getIcon() {
    return characterIcon
  }
}
