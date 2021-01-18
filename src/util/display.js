export const ensureString = (string) => string ? `${string}` : ''

export const ensureNumeric = (string) => Number(ensureString(string).replace(/[^0-9.-]/gi, ''))

export const ensureArray = (array = []) => !array ? [] : Array.isArray(array) ? array : [array]

export const ensureObject = (object) => object || {}

export const objectEmpty = (object) => {
  return !object || !Object.keys(object).length
}

export const objectNotEmpty = (object) => {
  return !objectEmpty(object)
}

export const arrayEmpty = (array) => {
  // eslint-disable-next-line eqeqeq
  return !array || !array.length || array[0] == undefined
}

export const arrayNotEmpty = (array) => {
  // eslint-disable-next-line eqeqeq
  return !arrayEmpty(array) && array[0] != undefined
}

export const numberToPercent = (number) => ensureNumeric(
  (ensureNumeric(number) * 100).toFixed(1)
)

export const percentToNumber = (percent) => ensureNumeric(
  (ensureNumeric(percent) / 100).toFixed(3)
)

export const calculateAmplificationReaction = ({
  ratio,
  ELEMENTAL_MASTERY,
  additionalEffect,
}) => {
  const elemental_mastery_rate = ensureNumeric(ELEMENTAL_MASTERY) >= 100
    ? 0.181
    : 0.195
  return (1 + percentToNumber(additionalEffect) + percentToNumber(elemental_mastery_rate * ELEMENTAL_MASTERY)) * ratio
}

export const calculateSaltationReaction = ({
  base_dmg,
  ELEMENTAL_MASTERY,
  additionalEffect,
}) => {
  const elemental_mastery_rate = ensureNumeric(ELEMENTAL_MASTERY) >= 100
    ? 0.433
    : 0.466
  return base_dmg * (1 + percentToNumber(elemental_mastery_rate * ELEMENTAL_MASTERY) + percentToNumber(additionalEffect))
}

export const calculateBaseDamage = (level, base_dmg_list, ascent = false) => {
  const isAscented = ascent ? 1 : 0
  let base_dmg
  if (isAscented + (ensureNumeric(level)) > 80) {
    base_dmg = base_dmg_list[90]
  } else if (isAscented + (ensureNumeric(level)) > 70) {
    base_dmg = base_dmg_list[80]
  } else if (isAscented + (ensureNumeric(level)) > 60) {
    base_dmg = base_dmg_list[70]
  } else if (isAscented + (ensureNumeric(level)) > 50) {
    base_dmg = base_dmg_list[60]
  } else if (isAscented + (ensureNumeric(level)) > 40) {
    base_dmg = base_dmg_list[50]
  } else if (ensureNumeric(level) > 30) {
    base_dmg = base_dmg_list[40]
  } else if (isAscented + (ensureNumeric(level)) > 20) {
    base_dmg = base_dmg_list[30]
  } else if (ensureNumeric(level) > 10) {
    base_dmg = base_dmg_list[20]
  } else if (ensureNumeric(level) > 1) {
    base_dmg = base_dmg_list[10]
  } else {
    base_dmg = base_dmg_list[1]
  }

  return base_dmg
}

export const calculateDefenceRate = (characterLevel, monsterLevel = characterLevel) => {
  return (ensureNumeric(characterLevel) + 100) / (ensureNumeric(characterLevel) + ensureNumeric(monsterLevel) + 200)
}

export const labelTranslator = (spec) => {
  let label
  switch (spec) {
      case 'ATK':
          label = '공격력'
          break
      case 'CRIT_RATE':
          label = '치명타 확률'
          break
      case 'CRIT_DMG':
          label = '치명타 피해'
          break
      case 'ELEMENTAL_MASTERY':
          label = '원소 마스터리'
          break
      case 'PHYSICAL_DMG_BONUS':
          label = '물리 피해 보너스'
          break
      case 'PYRO_DMG_BONUS':
          label = '불 원소 피해 보너스'
          break
      case 'HYDRO_DMG_BONUS':
          label = '물 원소 피해 보너스'
          break
      case 'CRYO_DMG_BONUS':
          label = '얼음 원소 피해 보너스'
          break
      case 'ELECTRO_DMG_BONUS':
          label = '전기 원소 피해 보너스'
          break
      case 'ANEMO_DMG_BONUS':
          label = '바람 원소 피해 보너스'
          break
      case 'GEO_DMG_BONUS':
          label = '바위 원소 피해 보너스'
          break
      case 'SKILL_RATE':
          label = '일반공격 계수'
          break
      case 'SKILL_RATE_CHARGED':
        label = '강공격 계수'
        break
      case 'SKILL_RATE_E':
        label = 'E스킬 계수'
        break
      case 'SKILL_RATE_Q':
        label = 'Q스킬 계수'
        break
      case 'LEVEL':
          label = '레벨'
          break
      case 'vaporize':
        label = '증발'
        break
      case 'melt':
        label = '융해'
        break
      case 'overloaded':
        label = '과부하'
        break
      case 'superConduct':
        label = '초전도'
        break
      case 'electroCharged':
        label = '감전'
        break
      case 'shattered':
        label = '쇄빙'
        break
      case 'swirl':
        label = '확산'
        break
      default:
          label = spec
          break
  }

  return label
}

export const isPercent = (spec) => {
  return [
    'CRIT_RATE',
    'CRIT_DMG',
    'PHYSICAL_DMG_BONUS',
    'PYRO_DMG_BONUS',
    'HYDRO_DMG_BONUS',
    'CRYO_DMG_BONUS',
    'ELECTRO_DMG_BONUS',
    'ANEMO_DMG_BONUS',
    'GEO_DMG_BONUS',
    'SKILL_RATE',
    'SKILL_RATE_CHARGED',
    'SKILL_RATE_E',
    'SKILL_RATE_Q',
    'vaporize',
    'melt',
    'overloaded',
    'superConduct',
    'electroCharged',
    'shattered',
    'swirl',
  ].includes(spec)
}

export const isAscentable = (level) => {
  let ascentable = false
  switch (true) {
    // eslint-disable-next-line
    case level == 90:
      ascentable = false
      break
    // eslint-disable-next-line
    case level == 30:
      ascentable = false
      break
    // eslint-disable-next-line
    case level == 10:
      ascentable = false
      break
    // eslint-disable-next-line
    case level == 0:
      ascentable = false
      break
    // eslint-disable-next-line
    case level == undefined:
      ascentable = false
      break
    // eslint-disable-next-line
    case level % 10 === 0:
      ascentable = true
      break
    default:
      break
  }

  return ascentable
}

export const ATKCalculatorInfoLabel = (spec) => {
  let label
  switch (spec) {
    case 'ATK':
      label = '총 공격력 / 케릭창 - 속성 에서 확인'
      break
    case 'CRIT_RATE':
      label = '케릭창 - 속성/상세정보 에서 확인'
      break
    case 'CRIT_DMG':
      label = '케릭창 - 속성/상세정보 에서 확인'
      break
    case 'ELEMENTAL_MASTERY':
      label = '총 원소 마스터리 / 케릭창 - 속성 에서 확인'
      break
    case 'PHYSICAL_DMG_BONUS':
    case 'PYRO_DMG_BONUS':
    case 'HYDRO_DMG_BONUS':
    case 'CRYO_DMG_BONUS':
    case 'ELECTRO_DMG_BONUS':
    case 'ANEMO_DMG_BONUS':
    case 'GEO_DMG_BONUS':
      label = '케릭창 - 속성/상세정보 에서 확인'
      break
    case 'SKILL_RATE':
      label = '특성 스킬 계수 (일반 공격)'
      break
    case 'SKILL_RATE_CHARGED':
      label = '특성 스킬 계수 (강공격)'
      break
    case 'SKILL_RATE_E':
      label = '특성 스킬 계수 (E 스킬)'
      break
    case 'SKILL_RATE_Q':
      label = '특성 스킬 계수 (Q 스킬)'
      break
    default:
        label = spec
        break
  }

  return label
}

export const progressStatus = (valueProgress) => {
  if (valueProgress > 85) {
    return 'green'
  } else if (valueProgress > 70) {
    return 'blue'
  } else if (valueProgress > 50) {
    return 'yellow'
  } else if (valueProgress > 35) {
    return 'orange'
  } else {
    return 'red'
  }
}

export const criticalRatio = (ratio) => {
  const _ratio = Math.abs(ensureNumeric(ratio) - 1)
  if (_ratio < .15) {
    return 'green'
  } else if (_ratio < .3) {
    return 'blue'
  } else if (_ratio < .5) {
    return 'yellow'
  } else if (_ratio < .75) {
    return 'orange'
  } else {
    return 'red'
  }
}
