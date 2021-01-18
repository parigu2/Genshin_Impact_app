import Base from './base'

import { saltation } from '../../element/src/elementReaction'
import electro_icon from '../../element/img/electro_35.png'

import {
  ensureObject,
  percentToNumber,
  calculateAmplificationReaction,
  calculateSaltationReaction,
  calculateBaseDamage,
} from '../../util'

export default class Electro extends Base {
  constructor(spec) {
    super(spec)
    const {
      ELECTRO_DMG_BONUS = null,
      overloaded = null,
      superConduct = null,
      electroCharged = null,
    } = ensureObject(spec)
    this.ELECTRO_DMG_BONUS = ELECTRO_DMG_BONUS
    this.overloaded = overloaded
    this.superConduct = superConduct
    this.electroCharged = electroCharged
    this.element_icon = electro_icon
  }

  setElectroCharacterSpec({
    ELECTRO_DMG_BONUS = this.ELECTRO_DMG_BONUS,
    ...spec
  } = {}) {
    this.setBaseCharacterSpec(spec)
    this.ELECTRO_DMG_BONUS = ELECTRO_DMG_BONUS
  }

  getElementIcon() {
    return this.element_icon
  }

  getElementSpec() {
    return {
      overloaded: this.overloaded,
      superConduct: this.superConduct,
      electroCharged: this.electroCharged,
    }
  }

  getElementReaction() {
    const { overloaded, superConduct, electroCharged } = saltation
    return {
      saltation: {
        overloaded,
        superConduct,
        electroCharged,
      },
    }
  }

  setElementalReactionEffection({
    overloaded = this.overloaded,
    superConduct = this.superConduct,
    electroCharged = this.electroCharged,
  }) {
    this.overloaded = overloaded
    this.superConduct = superConduct
    this.electroCharged = electroCharged
  }

  getElementalDamage(skill_rate) {
    const { ELECTRO_DMG_BONUS } = this.getCharacterSpec()
    const { attack, maxAttack, averageAttack } = this.getAverageDamage(skill_rate)

    const element_damage_rate = 1 + percentToNumber(ELECTRO_DMG_BONUS)

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
