import Base from './base'

import { cryo_amplification, saltation } from '../../element/src/elementReaction'
import cryo_icon from '../../element/img/cryo_35.png'

import {
  ensureObject,
  percentToNumber,
  calculateAmplificationReaction,
  calculateSaltationReaction,
  calculateBaseDamage,
} from '../../util'

export default class Cryo extends Base {
  constructor(spec) {
    super(spec)
    const {
      CRYO_DMG_BONUS = null,
      melt = null,
      superConduct = null,
      shattered = null,
    } = ensureObject(spec)
    this.CRYO_DMG_BONUS = CRYO_DMG_BONUS
    this.melt = melt
    this.superConduct = superConduct
    this.shattered = shattered
    this.element_icon = cryo_icon
  }

  setCryoCharacterSpec({
    CRYO_DMG_BONUS = this.CRYO_DMG_BONUS,
    ...spec
  } = {}) {
    this.setBaseCharacterSpec(spec)
    this.CRYO_DMG_BONUS = CRYO_DMG_BONUS
  }

  getElementIcon() {
    return this.element_icon
  }

  getElementSpec() {
    return {
      melt: this.melt,
      superConduct: this.superConduct,
    }
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

  setElementalReactionEffection({
    melt = this.melt,
    superConduct = this.superConduct,
    shattered = this.shattered
  }) {
    this.melt = melt
    this.superConduct = superConduct
    this.shattered = shattered
  }

  getElementalDamage(skill_rate) {
    const { CRYO_DMG_BONUS } = this.getCharacterSpec()
    const { attack, maxAttack, averageAttack } = this.getAverageDamage(skill_rate)

    const element_damage_rate = 1 + percentToNumber(CRYO_DMG_BONUS)

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
    const { amplification } = this.getElementReactionDamage(SKILL_RATE_E)

    return SKILL_RATE_E
      ? {
        ...this.getElementalDamage(this.SKILL_RATE_E),
        ...amplification && { amplification },
        element: true,
      }
      : null
  }

  getDamageQ() {
    const { SKILL_RATE_Q } = this.getCharacterSpec()
    const { amplification } = this.getElementReactionDamage(SKILL_RATE_Q)

    return SKILL_RATE_Q
      ? {
        ...this.getElementalDamage(this.SKILL_RATE_Q),
        ...amplification && { amplification },
        element: true,
      }
      : null
  }
}
