import Base from './base'

import { pyro_amplification, saltation } from '../../element/src/elementReaction'
import pyro_icon from '../../element/img/pyro_35.png'

import {
  ensureObject,
  percentToNumber,
  calculateAmplificationReaction,
  calculateSaltationReaction,
  calculateBaseDamage,
} from '../../util'

export default class Pyro extends Base {
  constructor(spec) {
    super(spec)
    const {
      PYRO_DMG_BONUS = null,
      vaporize = null,
      melt = null,
      overloaded = null,
    } = ensureObject(spec)
    this.PYRO_DMG_BONUS = PYRO_DMG_BONUS
    this.vaporize = vaporize
    this.melt = melt
    this.overloaded = overloaded
    this.element_icon = pyro_icon
  }

  setPyroCharacterSpec({
    PYRO_DMG_BONUS = this.PYRO_DMG_BONUS,
    ...spec
  } = {}) {
    this.setBaseCharacterSpec(spec)
    this.PYRO_DMG_BONUS = PYRO_DMG_BONUS
  }

  getElementIcon() {
    return this.element_icon
  }

  getElementSpec() {
    return {
      vaporize: this.vaporize,
      melt: this.melt,
      overloaded: this.overloaded,
    }
  }

  getElementReaction() {
    const { overloaded } = saltation
    return {
      amplification: pyro_amplification,
      saltation: {
        overloaded,
      },
    }
  }

  setElementalReactionEffection({
    vaporize = this.vaporize,
    melt = this.melt,
    overloaded = this.overloaded,
  }) {
    this.vaporize = vaporize
    this.melt = melt
    this.overloaded = overloaded
  }

  getElementalDamage(skill_rate) {
    const { PYRO_DMG_BONUS } = this.getCharacterSpec()
    const { attack, maxAttack, averageAttack } = this.getAverageDamage(skill_rate)

    const element_damage_rate = 1 + percentToNumber(PYRO_DMG_BONUS)

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
