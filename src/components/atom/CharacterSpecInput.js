import React from 'react'
import {
  Icon,
  Image,
  Form,
  Popup,
} from 'semantic-ui-react'

import {
  ensureObject,
  isPercent,
  labelTranslator,
  ATKCalculatorInfoLabel,
} from '../../util'

import atkInfo from '../../util/img/atk_calculation_info.png'
import criticalInfo from '../../util/img/crit_calculation_info.png'
import dmgInfo from '../../util/img/dmg_bonus_calculation_info.png'
import elemInfo from '../../util/img/elem_mastery_calculation_info.png'
import normalSkillInfo from '../../util/img/skill_calculation_info.png'
import chargedSkillInfo from '../../util/img/charged_skill_calculation_info.png'
import E_SkillInfo from '../../util/img/e_skill_calculation_info.png'
import Q_SkillInfo from '../../util/img/q_skill_calculation_info.png'

const CharacterSpecInput = ({
  specs,
  onChange = () => {},
}) => {
  const {
    spec,
    value,
  } = ensureObject(specs)

  let infoImg
  switch (spec) {
    case 'ATK':
      infoImg = atkInfo
      break
    case 'CRIT_RATE':
    case 'CRIT_DMG':
      infoImg = criticalInfo
      break
    case 'ELEMENTAL_MASTERY':
      infoImg = elemInfo
      break
    case 'SKILL_RATE':
      infoImg = normalSkillInfo
      break
    case 'SKILL_RATE_CHARGED':
      infoImg = chargedSkillInfo
      break
    case 'SKILL_RATE_E':
      infoImg = E_SkillInfo
      break
    case 'SKILL_RATE_Q':
      infoImg = Q_SkillInfo
      break
    default:
      infoImg = dmgInfo
      break
  }

  return (
    <Form.Field style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 16 }}>
      <label>
          <label style={{ paddingRight: 10 }}>{`${labelTranslator(spec)}${isPercent(spec) ? ' (%)': ''}`}</label>
          <Popup
              flowing
              trigger={<Icon name='info' color='teal' size='small' circular />}
              content={
                <div>
                  <p style={{ paddingBottom: 8 }}><b>{ATKCalculatorInfoLabel(spec)}</b></p>
                  <Image src={infoImg} size='medium' rounded />
                </div>
              }
              position='right center' />
      </label>
      <input
          type='number'
          placeholder={labelTranslator(spec)}
          min={0}
          value={value !== null ? value : ''}
          onChange={({ target: { value: inputValue } }) => onChange(spec, inputValue)} />
    </Form.Field>
  )
}

export default CharacterSpecInput
