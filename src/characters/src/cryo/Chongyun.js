import Cryo from '../../interface/Cryo'
import characterImg from '../../img/중운.png'
import characterIcon from '../../img/icon/chongyunIcon.png'

import { cryo_amplification, saltation } from '../../../element/src/elementReaction'

import { ensureObject } from '../../../util'

export class Chongyun extends Cryo {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '중운'
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
      CRYO_DMG_BONUS: this.CRYO_DMG_BONUS,
      SKILL_RATE: this.SKILL_RATE,
      SKILL_RATE_CHARGED: this.SKILL_RATE_CHARGED,
      SKILL_RATE_E: this.SKILL_RATE_E,
      SKILL_RATE_Q: this.SKILL_RATE_Q,
    }
  }

  getElementSpec() {
    return {
      melt: this.melt,
      superConduct: this.superConduct,
      shattered: this.shattered,
    }
  }

  setCharacterSpec({
    SKILL_RATE = this.SKILL_RATE,
    ...spec
  } = {}) {
    this.setCryoCharacterSpec(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getElementReaction() {
    const { superConduct, shattered } = saltation
    return {
      amplification: cryo_amplification,
      saltation: {
        superConduct,
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
