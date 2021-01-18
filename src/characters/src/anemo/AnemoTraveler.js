import Anemo from '../../interface/Anemo'
import characterImg from '../../img/여행자.png'
import characterIcon from '../../img/icon/travelerIcon.png'

import { ensureObject } from '../../../util'

export class AnemoTraveler extends Anemo {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '여행자 (바람)'
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
      ANEMO_DMG_BONUS: this.ANEMO_DMG_BONUS,
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
    this.setAnemoCharacterSpec(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getImage() {
    return characterImg
  }

  getIcon() {
    return characterIcon
  }
}
