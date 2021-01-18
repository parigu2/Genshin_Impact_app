import Electro from '../../interface/Electro'
import characterImg from '../../img/레이저.png'
import characterIcon from '../../img/icon/razorIcon.png'

import { saltation } from '../../../element/src/elementReaction'

import { ensureObject } from '../../../util'

export class Razor extends Electro {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '레이저'
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

  setElementalReactionEffection({
    overloaded = this.overloaded,
    superConduct = this.superConduct,
    electroCharged = this.electroCharged,
    shattered = this.shattered,
  }) {
    this.overloaded = overloaded
    this.superConduct = superConduct
    this.electroCharged = electroCharged
    this.shattered = shattered
  }

  getElementSpec() {
    return {
      overloaded: this.overloaded,
      superConduct: this.superConduct,
      electroCharged: this.electroCharged,
      shattered: this.shattered,
    }
  }

  getElementReaction() {
    const { overloaded, superConduct, electroCharged, shattered } = saltation
    return {
      saltation: {
        overloaded,
        superConduct,
        electroCharged,
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
