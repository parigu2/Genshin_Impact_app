import React, { useState, useEffect } from 'react'

import { Card, Popup } from 'semantic-ui-react'

import Enemy_Hilichurl_icon from '../../monsters/img/Enemy_Hilichurl_Icon.png'
import Enemy_Ruin_Guard_icon from '../../monsters/img/UI_MonsterIcon_Defender_Noner_01.png'
import Enemy_Fatui_Shield_icon from '../../monsters/img/Enemy_Fatui_Pyroslinger_Bracer_Icon.png'
import Enemy_Fatui_icon from '../../monsters/img/Enemy_Fatui_Geochanter_Bracer_Icon.png'

const MonsterSpec = ({
  monsterResistance,
  onChange = () => {}
}) => {
  const [selectedMonster, setSelectedMonster] = useState('츄츄족')

  useEffect(() => {
    onChange({
      monster_level,
      physical_resistance: 10,
      element_resistance: 10,
    })
    // eslint-disable-next-line
  }, [])

  const { monster_level } = monsterResistance || {}

  const selectedStyle = {
    borderStyle: 'solid',
    borderColor: 'green',
  }

  return (
    <Card.Group itemsPerRow={5}>
      <Popup
        trigger={<Card raised style={selectedMonster === '츄츄족' ? selectedStyle : {}} image={Enemy_Hilichurl_icon} onClick={() => {
          onChange({
            monster_level,
            physical_resistance: 10,
            element_resistance: 10,
          })
          setSelectedMonster('츄츄족')
        }}/>}
        content={<p><b>츄츄족 (소형)</b></p>}
        position='top center' />
      <Popup
        trigger={<Card raised style={selectedMonster === '가디언' ? selectedStyle : {}} image={Enemy_Ruin_Guard_icon} onClick={() => {
          onChange({
            monster_level,
            physical_resistance: 70,
            element_resistance: 10,
          })
          setSelectedMonster('가디언')
        }} />}
        content={<p><b>유적 가디언</b></p>}
        position='top center' />
      <Popup
        trigger={<Card raised style={selectedMonster === '우인단' ? selectedStyle : {}} image={Enemy_Fatui_icon} onClick={() => {
          onChange({
            monster_level,
            physical_resistance: -10,
            element_resistance: 10,
          })
          setSelectedMonster('우인단')
        }} />}
        content={<p><b>우인단 (실드 x)</b></p>}
        position='top center' />
      <Popup
        trigger={<Card raised style={selectedMonster === '우인단 실드' ? selectedStyle : {}} image={Enemy_Fatui_Shield_icon} onClick={() => {
          onChange({
            monster_level,
            physical_resistance: 76.2,
            element_resistance: 81.5,
          })
          setSelectedMonster('우인단 실드')
        }} />}
        content={<p><b>우인단 (실드 o)</b></p>}
        position='top center' />
    </Card.Group>
  )
}

export default MonsterSpec
