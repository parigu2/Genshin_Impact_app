import Base from './base'

import { saltation } from '../../element/src/elementReaction'
import anemo_icon from '../../element/img/anemo_35.png'

import {
  ensureObject,
  percentToNumber,
  calculateAmplificationReaction,
  calculateSaltationReaction,
  calculateBaseDamage,
} from '../../util'

export default class Anemo extends Base {
  constructor(spec) {
    super(spec)
    const {
      ANEMO_DMG_BONUS = null,
      swirl = null,
    } = ensureObject(spec)
    this.ANEMO_DMG_BONUS = ANEMO_DMG_BONUS
    this.swirl = swirl
    this.element_icon = anemo_icon
  }

  setAnemoCharacterSpec({
    ANEMO_DMG_BONUS = this.ANEMO_DMG_BONUS,
    ...spec
  } = {}) {
    this.setBaseCharacterSpec(spec)
    this.ANEMO_DMG_BONUS = ANEMO_DMG_BONUS
  }

  getElementIcon() {
    return this.element_icon
  }

  getElementSpec() {
    return {
      swirl: this.swirl,
    }
  }

  getElementReaction() {
    const { swirl } = saltation
    return {
      saltation: {
        swirl,
      },
    }
  }

  setElementalReactionEffection({
    swirl = this.swirl,
  }) {
    this.swirl = swirl
  }

  getElementalDamage(skill_rate) {
    const { ANEMO_DMG_BONUS } = this.getCharacterSpec()
    const { attack, maxAttack, averageAttack } = this.getAverageDamage(skill_rate)

    const element_damage_rate = 1 + percentToNumber(ANEMO_DMG_BONUS)

    return {
      attack: Math.floor(attack * element_damage_rate),
      maxAttack: Math.floor(maxAttack * element_damage_rate),
      averageAttack: Math.floor(averageAttack * element_damage_rate),
    }
  }

  getElementReactionDamage(skill_rate) {
    const { LEVEL, ELEMENTAL_MASTERY, ACSENTION } = this.getCharacterSpec()

    const { amplification, saltation } = this.getElementReaction()
    const { attack, maxAttack, averageAttack } = this.getElementalDamage(skill_rate)
    const calculatedAmpliificationReaction = Object.entries(ensureObject(amplification)).reduce((previousReaction, [reaction, ratio]) => {
      const calculatedRatio = calculateAmplificationReaction({
        ratio,
        ELEMENTAL_MASTERY,
        additionalEffect: this[reaction]
      })

      return {
        ...previousReaction,
        [reaction]: {
          attack: Math.floor(attack * calculatedRatio),
          maxAttack: Math.floor(maxAttack * calculatedRatio),
          averageAttack: Math.floor(averageAttack * calculatedRatio),
        }
      }
    }, {})

    const calculatedSaltationReaction = Object.entries(ensureObject(saltation)).reduce((previousReaction, [reaction, ratios]) => {
      const base_dmg = calculateBaseDamage(LEVEL, ratios, ACSENTION)
      const calculatedReactionDMG = calculateSaltationReaction({
        base_dmg,
        ELEMENTAL_MASTERY,
        additionalEffect: this[reaction]
      })
      return {
        ...previousReaction,
        [reaction]: Math.floor(calculatedReactionDMG),
      }
    }, {})
    
    return {
      amplification: calculatedAmpliificationReaction,
      saltation: calculatedSaltationReaction,
    }
  }

  getDamageE() {
    const { SKILL_RATE_E } = this.getCharacterSpec()

    return SKILL_RATE_E
      ? {
        ...this.getElementalDamage(this.SKILL_RATE_E),
        element: true,
      }
      : null
  }

  getDamageQ() {
    const { SKILL_RATE_Q } = this.getCharacterSpec()

    return SKILL_RATE_Q
      ? {
        ...this.getElementalDamage(this.SKILL_RATE_Q),
        element: true,
      }
      : null
  }
}
