import Cryo from '../../interface/Cryo'
import characterImg from '../../img/케이아.png'
import characterIcon from '../../img/icon/kaeyaIcon.png'

import { ensureObject } from '../../../util'

export class Kaeya extends Cryo {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '케이아'
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

  setCharacterSpec({
    SKILL_RATE = this.SKILL_RATE,
    ...spec
  } = {}) {
    this.setCryoCharacterSpec(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getImage() {
    return characterImg
  }

  getIcon() {
    return characterIcon
  }
}
