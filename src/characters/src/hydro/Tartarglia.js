import Hydro from '../../interface/Hydro'
import characterImg from '../../img/타르탈리아.png'
import characterIcon from '../../img/icon/tartargliaIcon.png'

import { ensureObject } from '../../../util'

export class Tartarglia extends Hydro {
  constructor(spec) {
    super(spec)
    const { SKILL_RATE = null } = ensureObject(spec)
    this.SKILL_RATE = SKILL_RATE
  }

  getName() {
    return '타르탈리아'
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
      HYDRO_DMG_BONUS: this.HYDRO_DMG_BONUS,
      SKILL_RATE: this.SKILL_RATE,
      // SKILL_RATE_CHARGED: this.SKILL_RATE_CHARGED,
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

  getImage() {
    return characterImg
  }

  getIcon() {
    return characterIcon
  }
}
