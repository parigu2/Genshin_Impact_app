import Base from './base'

import { hydro_amplification, saltation } from '../../element/src/elementReaction'
import hydro_icon from '../../element/img/hydro_35.png'

import {
  ensureObject,
  percentToNumber,
  calculateAmplificationReaction,
  calculateSaltationReaction,
  calculateBaseDamage,
} from '../../util'

export default class Hydro extends Base {
  constructor(spec) {
    super(spec)
    const {
      HYDRO_DMG_BONUS = null,
      vaporize = null,
      electroCharged = null,
    } = ensureObject(spec)
    this.HYDRO_DMG_BONUS = HYDRO_DMG_BONUS
    this.vaporize = vaporize
    this.electroCharged = electroCharged
    this.element_icon = hydro_icon
  }

  setHydroCharacterSpec({
    HYDRO_DMG_BONUS = this.HYDRO_DMG_BONUS,
    ...spec
  } = {}) {
    this.setBaseCharacterSpec(spec)
    this.HYDRO_DMG_BONUS = HYDRO_DMG_BONUS
  }

  getElementIcon() {
    return this.element_icon
  }

  getElementReaction() {
    const { electroCharged } = saltation
    return {
      amplification: hydro_amplification,
      saltation: {
        electroCharged,
      },
    }
  }

  getElementSpec() {
    return {
      vaporize: this.vaporize,
      electroCharged: this.electroCharged,
    }
  }

  setElementalReactionEffection({
    vaporize = this.vaporize,
    electroCharged = this.electroCharged,
  }) {
    this.vaporize = vaporize
    this.electroCharged = electroCharged
  }

  getElementalDamage(skill_rate) {
    const { HYDRO_DMG_BONUS } = this.getCharacterSpec()
    const { attack, maxAttack, averageAttack } = this.getAverageDamage(skill_rate)

    const element_damage_rate = 1 + percentToNumber(HYDRO_DMG_BONUS)

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
