import {
  ensureObject,
  ensureNumeric,
  percentToNumber,
} from '../../util'

export default class Base {
  constructor(spec) {
    const {
      LEVEL = null,
      MAX_HP = null,
      ATK = null,
      DEF = null,
      ELEMENTAL_MASTERY = null,
      CRIT_RATE = null,
      CRIT_DMG = null,
      HEALING_BONUS = null,
      ENERGY_RECOVERY = null,
      PHYSICAL_DMG_BONUS = null,
      // LEVEL = 1,
      // MAX_HP = 0,
      // ATK = 0,
      // DEF = 0,
      // ELEMENTAL_MASTERY = 0,
      // CRIT_RATE = 0,
      // CRIT_DMG = 0,
      // HEALING_BONUS = 0,
      // ENERGY_RECOVERY = 0,
      // PHYSICAL_DMG_BONUS = 0,
      ACSENTION = false,
      SKILL_RATE = null,
      SKILL_RATE_CHARGED = null,
      SKILL_RATE_E = null,
      SKILL_RATE_Q = null,
    } = ensureObject(spec)
    this.LEVEL = LEVEL
    this.MAX_HP = MAX_HP
    this.ATK = ATK
    this.DEF = DEF
    this.ELEMENTAL_MASTERY = ELEMENTAL_MASTERY
    this.CRIT_RATE = CRIT_RATE
    this.CRIT_DMG = CRIT_DMG
    this.HEALING_BONUS = HEALING_BONUS
    this.ENERGY_RECOVERY = ENERGY_RECOVERY
    this.PHYSICAL_DMG_BONUS = PHYSICAL_DMG_BONUS
    this.ACSENTION = ACSENTION
    this.SKILL_RATE = SKILL_RATE
    this.SKILL_RATE_CHARGED = SKILL_RATE_CHARGED
    this.SKILL_RATE_E = SKILL_RATE_E
    this.SKILL_RATE_Q = SKILL_RATE_Q
    this.artifacts = [undefined, undefined]
  }
  
  getCharacterSpec() {
    return this
  }

  getElementIcon() {
    return null
  }

  getAcsention() {
    return this.ACSENTION
  }

  setAcsention(ACSENTION) {
    if (typeof ACSENTION === 'boolean') {
      this.ACSENTION = ACSENTION
    }
  }

  setArtifacts(artifacts) {
    this.artifacts = artifacts
  }

  getArtifacts() {
    return this.artifacts
  }

  setBaseCharacterSpec({
    LEVEL = this.LEVEL,
    MAX_HP = this.MAX_HP,
    ATK = this.ATK,
    DEF = this.DEF,
    ELEMENTAL_MASTERY = this.ELEMENTAL_MASTERY,
    CRIT_RATE = this.CRIT_RATE,
    CRIT_DMG = this.CRIT_DMG,
    HEALING_BONUS = this.HEALING_BONUS,
    ENERGY_RECOVERY = this.ENERGY_RECOVERY,
    PHYSICAL_DMG_BONUS = this.PHYSICAL_DMG_BONUS,
    ACSENTION = this.ACSENTION,
    SKILL_RATE = this.SKILL_RATE,
    SKILL_RATE_CHARGED = this.SKILL_RATE_CHARGED,
    SKILL_RATE_E = this.SKILL_RATE_E,
    SKILL_RATE_Q = this.SKILL_RATE_Q,
  } = {}) {
    this.LEVEL = LEVEL
    this.MAX_HP = MAX_HP
    this.ATK = ATK
    this.DEF = DEF
    this.ELEMENTAL_MASTERY = ELEMENTAL_MASTERY
    this.CRIT_RATE = ensureNumeric(CRIT_RATE) >= 100
      ? 100
      : CRIT_RATE
    this.CRIT_DMG = CRIT_DMG
    this.HEALING_BONUS = HEALING_BONUS
    this.ENERGY_RECOVERY = ENERGY_RECOVERY
    this.PHYSICAL_DMG_BONUS = PHYSICAL_DMG_BONUS
    this.setAcsention(ACSENTION)
    this.SKILL_RATE = SKILL_RATE
    this.SKILL_RATE_CHARGED = SKILL_RATE_CHARGED
    this.SKILL_RATE_E = SKILL_RATE_E
    this.SKILL_RATE_Q = SKILL_RATE_Q
  }

  getElementSpec() {
    return null
  }

  getAverageDamage(skill_rate) {
    const {
      ATK,
      CRIT_RATE,
      CRIT_DMG,
      SKILL_RATE,
    } = this.getCharacterSpec()
    const attack = ensureNumeric(ATK) * percentToNumber(skill_rate || SKILL_RATE)
    const maxAttack = attack * (1 + percentToNumber(CRIT_DMG))
    const criticalRate = percentToNumber(CRIT_RATE)
    const averageAttack = attack * (1 - criticalRate) + maxAttack * criticalRate

    return {
      attack: Math.floor(attack),
      maxAttack: Math.floor(maxAttack),
      averageAttack: Math.floor(averageAttack),
    }
  }

  getPhysicalDamage(skill_rate) {
    const { PHYSICAL_DMG_BONUS } = this.getCharacterSpec()
    const { attack, maxAttack, averageAttack } = ensureObject(this.getAverageDamage(skill_rate))

    const physical_damage_rate = 1 + percentToNumber(PHYSICAL_DMG_BONUS)

    return {
      attack: Math.floor(attack * physical_damage_rate),
      maxAttack: Math.floor(maxAttack * physical_damage_rate),
      averageAttack: Math.floor(averageAttack * physical_damage_rate),
    }
  }

  getDamageNormal() {
    const { SKILL_RATE } = this.getCharacterSpec()

    return SKILL_RATE
      ? this.getPhysicalDamage(this.SKILL_RATE)
      : null
  }

  getDamageCharged() {
    const { SKILL_RATE_CHARGED } = this.getCharacterSpec()

    return SKILL_RATE_CHARGED
      ? this.getPhysicalDamage(this.SKILL_RATE_CHARGED)
      : null
  }
}
