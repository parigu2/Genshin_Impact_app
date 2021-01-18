import React, { useState, useEffect, useMemo } from 'react'
import {
    Button,
    Dropdown,
    Icon,
    Input,
    Image,
    Form,
    Grid,
    Header,
    List,
    Label,
    Modal,
    Segment,
    Popup,
    Progress,
} from 'semantic-ui-react'
import { characters } from '../characters'

import {
    ensureObject,
    ensureNumeric,
    objectNotEmpty,
    objectEmpty,
    arrayNotEmpty,
    percentToNumber,
    calculateDefenceRate,
    criticalRatio,
    labelTranslator,
    isAscentable,
} from '../util'

import effectInfo from '../util/img/additional_effect_calculation_info.png'

import CharacterSpecInput from '../components/atom/CharacterSpecInput'
import DamageReporter from '../components/atom/DamageReporter'
import MonsterSpec from '../components/atom/MonsterSpec'

const charactersList = Object.entries(characters).map(([name, character]) => ({  text: character.getName(), value: name,  image: { avatar: true, src: character.getIcon() } }))

const AverageATKCalculator = () => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedCharacter, setSelectedCharacter] = useState()
    const [inputValue, setInputValue] = useState()
    const [monsterResistance, setMonsterResistance] = useState({
        monster_level: undefined,
        physical_resistance: 10,
        element_resistance: 10
    })

    useEffect(() => {
        if (selectedCharacter) {
            setInputValue(selectedCharacter.getCharacterSpec())
        }
    }, [selectedCharacter])

    const characterSpec = selectedCharacter ? selectedCharacter.getCharacterSpec() : null

    const {
        LEVEL,
        CRIT_RATE,
        CRIT_DMG,
        NORMAL_ATTACK_DAMAGE,
        CHARGED_ATTACK_DAMAGE,
        E_SKILL_DAMAGE,
        Q_SKILL_DAMAGE,
        amplification,
        saltation,
        isDisabled,
    } = useMemo(() => {
        if (selectedCharacter) {
            const { LEVEL, ATK, CRIT_RATE, CRIT_DMG } = selectedCharacter.getCharacterSpec()
            const { amplification, saltation } = selectedCharacter.getElementReactionDamage()
            const NORMAL_ATTACK_DAMAGE = selectedCharacter.getDamageNormal()
            const CHARGED_ATTACK_DAMAGE = selectedCharacter.getDamageCharged()
            const E_SKILL_DAMAGE = selectedCharacter.getDamageE()
            const Q_SKILL_DAMAGE = selectedCharacter.getDamageQ()
            // eslint-disable-next-line 
            const isDisabled = objectEmpty(NORMAL_ATTACK_DAMAGE) && objectEmpty(CHARGED_ATTACK_DAMAGE) && objectEmpty(E_SKILL_DAMAGE) && objectEmpty(Q_SKILL_DAMAGE) || !ATK

            return {
                ...LEVEL && { LEVEL },
                ...CRIT_RATE && { CRIT_RATE },
                ...CRIT_DMG && { CRIT_DMG },
                damage: selectedCharacter.getAverageDamage(),
                physical_damage: selectedCharacter.getPhysicalDamage(),
                element_damage: selectedCharacter.getElementalDamage(),
                NORMAL_ATTACK_DAMAGE,
                CHARGED_ATTACK_DAMAGE,
                E_SKILL_DAMAGE,
                Q_SKILL_DAMAGE,
                amplification,
                saltation,
                isDisabled,
            }
        }

        return {}
    // eslint-disable-next-line
    }, [inputValue, selectedCharacter])

    const { monster_level, physical_resistance, element_resistance } = ensureObject(monsterResistance)

    const {
        physical_resistance_rate,
        element_resistance_rate,
    } = useMemo(() => {
        const def_rate = LEVEL ? calculateDefenceRate(LEVEL, monster_level) : 0.5
        return {
            physical_resistance_rate: def_rate * (1 - percentToNumber(physical_resistance)),
            element_resistance_rate: def_rate * (1 - percentToNumber(element_resistance)),
        }
    }, [LEVEL, monster_level, physical_resistance, element_resistance])

    const handleInputValueChange = (spec, value) => {
        if (Math.floor(value) >= 0) {
            setInputValue({
                ...inputValue,
                [spec]: value
            })

            selectedCharacter.setCharacterSpec({
                [spec]: value
            })
        } else if (spec === 'ACSENTION') {
            setInputValue({
                ...inputValue,
                [spec]: !selectedCharacter.getAcsention()
            })

            selectedCharacter.setCharacterSpec({
                ACSENTION: !selectedCharacter.getAcsention()
            })
        }
    }

    const handleAdditionalEffectChange = (spec, value) => {
        if (Math.floor(value) >= 0) {
            setInputValue({
                ...inputValue,
                [spec]: value
            })

            selectedCharacter.setElementalReactionEffection({
                [spec]: value
            })
        }
    }

    const {
        general: generalSpec,
        skill: skillSpec,
        damage: damageSpec,
        critical: criticalSpec,
    } = useMemo(() => {
        if (characterSpec) {
            return Object.entries(characterSpec).reduce(({
                general: previousGeneral,
                skill: previousSkill,
                damage: previousDamage,
                critical: previousCritical,
            }, [spec, value]) => {
            const currentGeneral = []
            const currentSkill = []
            const currentDamage = []
            const currentCritical = []

            if (['ATK', 'ELEMENTAL_MASTERY'].includes(spec)) {
                currentGeneral.push({ spec, value })
            } else if (['SKILL_RATE', 'SKILL_RATE_CHARGED', 'SKILL_RATE_E', 'SKILL_RATE_Q'].includes(spec)) {
                currentSkill.push({ spec, value })
            } else if (['PHYSICAL_DMG_BONUS', 'PYRO_DMG_BONUS', 'HYDRO_DMG_BONUS', 'CRYO_DMG_BONUS', 'ELECTRO_DMG_BONUS', 'ANEMO_DMG_BONUS', 'GEO_DMG_BONUS'].includes(spec)) {
                currentDamage.push({ spec, value })
            } else if (['CRIT_RATE', 'CRIT_DMG'].includes(spec)) {
                currentCritical.push({ spec, value })
            }

            return {
                general: [
                    ...previousGeneral,
                    ...currentGeneral,
                ],
                skill: [
                    ...previousSkill,
                    ...currentSkill,
                ],
                damage: [
                    ...previousDamage,
                    ...currentDamage,
                ],
                critical: [
                    ...previousCritical,
                    ...currentCritical,
                ]
            }
        }, { general: [], skill: [], damage: [], critical: [] })}

        return {}
    }, [characterSpec])

    return (
        <Segment compact textAlign='center' padded='very'>
            <Grid>
                <Grid.Row columns={selectedCharacter && selectedCharacter.getName ? 2 : 1}>
                    {selectedCharacter && selectedCharacter.getName && (
                        <Grid.Column>
                            <h2 style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 36 }}>
                                <Image src={selectedCharacter.getElementIcon()} style={{ display: 'flex', position: 'absolute'}} />
                                {selectedCharacter.getName()}
                            </h2>
                            <Image src={selectedCharacter.getImage()} size='large' alt={selectedCharacter.getName()} rounded />
                        </Grid.Column>
                    )}
                    <Grid.Column stretched>
                        <Grid.Row>
                            {!selectedCharacter && (
                                <Header as='h2' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 36 }}>원신 데미지 계산기</Header>
                            )}
                            <Dropdown
                                text='케릭터 선택'
                                search
                                selection
                                noResultsMessage='해당 케릭터가 없습니다'
                                options={charactersList}
                                onChange={(event, { value: characterName }) => {
                                    const character = characters[characterName]
                                    setSelectedCharacter(character)
                                    if (selectedCharacter) {
                                        character.setCharacterSpec(selectedCharacter.getCharacterSpec())
                                    }
                                }} />
                            {!selectedCharacter && (
                                <List bulleted style={{ fontFamily: 'Noto Sans CJK KR', fontWeight:500, fontSize: 16 }}>
                                    <List.Item content='공격력과 하나 이상의 스킬 퍼센트 계수는 필수 항목입니다'/>
                                    <List.Item content='일반공격/강공격/E스킬/Q스킬 중 채워진 부분만 계산기에 보여지게 됩니다' />
                                    <List.Item content='각 칸마다 i 아이콘을 누르시면 자세한 정보를 보실 수 있습니다'/>
                                    <br />
                                    <List.Item content='성유물 세트효과 (공격력 퍼센트, xx피해 보너스)는 속성 페이지에 이미 적용되어 있습니다'/>
                                    <List.Item content='증폭효과 (증발/융해)는 원소 마스터리를 입력하시면 더 정확한 수치를 얻으실 수 있습니다'/>
                                    <List.Item content='격변효과 (과부하/초전도/감전/쇄빙)은 레벨을 입력하시면 더 정확한 수치를 얻으실 수 있습니다'/>
                                    <br />
                                    <List.Item content='무기/성유물의 특수효과는 적용되지 않습니다 예) 마녀 4세트 E스킬 사용 후 7.5%의 불 원소 피해 추가'/>
                                    <List.Item content='무기/성유물의 특수효과를 적용하시려면 각 속성 (%)에 더해주시면 계산이 됩니다'/>
                                    <List.Item content='예) 총 불 원소피해 = 90.6%, 마녀 3스택 = 22.5% / 기입 = 113.1%' />
                                </List>
                            )}
                        </Grid.Row>
                        {characterSpec && (
                            <Grid.Row>
                                <Grid.Column>
                                    <label style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 16 }}><b>레벨</b></label>
                                </Grid.Column>
                                <Grid.Column>
                                    <Input
                                        size='tiny'
                                        type='number'
                                        placeholder='LEVEL'
                                        min={0}
                                        onChange={({ target: { value: inputValue } }) => handleInputValueChange('LEVEL', inputValue)}
                                    />
                                </Grid.Column>
                                <Grid.Column style={{ ...!isAscentable(characterSpec.LEVEL) && { visibility: 'hidden' }, fontFamily: 'Noto Sans CJK KR', fontSize: 12, fontWeight: 500 }}>
                                    <Form.Field label='돌파' control='input' type='checkbox' onClick={() => handleInputValueChange('ACSENTION')} />
                                </Grid.Column>
                            </Grid.Row>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form size='small'>
                <Form.Group widths='equal'>
                    {arrayNotEmpty(generalSpec) && generalSpec.map((specs) => (
                            <CharacterSpecInput
                                specs={specs}
                                onChange={handleInputValueChange} />
                        ))}
                </Form.Group>
                <Form.Group widths='equal'>
                    {arrayNotEmpty(skillSpec) && skillSpec.map((specs) => (
                        <CharacterSpecInput
                            specs={specs}
                            onChange={handleInputValueChange} />
                    ))}
                </Form.Group>
                <Form.Group widths='equal'>
                    {arrayNotEmpty(damageSpec) && damageSpec.map((specs) => (
                        <CharacterSpecInput
                            specs={specs}
                            onChange={handleInputValueChange} />
                    ))}
                </Form.Group>
                <Form.Group widths='equal'>
                    {arrayNotEmpty(criticalSpec) && criticalSpec.map((specs) => (
                        <CharacterSpecInput
                            specs={specs}
                            onChange={handleInputValueChange} />
                    ))}
                </Form.Group>
                <Form.Group widths='equal'>
                    {objectNotEmpty(amplification) && Object.keys(amplification).map((reaction) => {
                        const spec = selectedCharacter.getElementSpec()

                        return (
                            <Form.Field style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 16 }}>
                                <label>
                                    <label style={{ paddingRight: 10 }}>{`${labelTranslator(reaction)} (%)`}</label>
                                    <Popup
                                        trigger={<Icon name='info' color='teal' size='small' circular />}
                                        content={
                                            <div>
                                                <p style={{ paddingBottom: 8 }}><b>성유물 추가 효과</b></p>
                                                <Image src={effectInfo} size='medium' rounded />
                                            </div>
                                        }
                                        position='right center' />
                                </label>
                                <input
                                    type='number'
                                    placeholder={labelTranslator(reaction)}
                                    min={0}
                                    value={ensureObject(spec)[reaction] || ''}
                                    onChange={({ target: { value: inputValue } }) => handleAdditionalEffectChange(reaction, inputValue)} />
                            </Form.Field>
                        )
                    })}
                </Form.Group>
                <Form.Group widths='equal'>
                    {objectNotEmpty(saltation) && Object.keys(saltation).map((reaction) => {
                        const spec = selectedCharacter.getElementSpec()

                        return (
                            <Form.Field style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 16 }}>
                                <label>
                                    <label style={{ paddingRight: 10 }}>{`${labelTranslator(reaction)} (%)`}</label>
                                    <Popup
                                        trigger={<Icon name='info' color='teal' size='small' circular />}
                                        content={
                                            <div>
                                                <p style={{ paddingBottom: 8 }}><b>성유물 추가 효과</b></p>
                                                <Image src={effectInfo} size='medium' rounded />
                                            </div>
                                        }
                                        position='right center' />
                                </label>
                                <input
                                    type='number'
                                    placeholder={labelTranslator(reaction)}
                                    min={0}
                                    value={ensureObject(spec)[reaction] || ''}
                                    onChange={({ target: { value: inputValue } }) => handleAdditionalEffectChange(reaction, inputValue)} />
                            </Form.Field>
                        )
                    })}
                </Form.Group>
            </Form>
            {selectedCharacter && (
                <Modal
                    onClose={() => setOpenModal(false)}
                    onOpen={() => setOpenModal(true)}
                    open={openModal}
                    trigger={
                        <Button
                            primary
                            disabled={isDisabled}
                            onClick={() => setInputValue(selectedCharacter.getCharacterSpec())}>
                            계산!
                        </Button>
                    }>
                    <Modal.Header style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 28 }}>
                        <Image src={selectedCharacter.getIcon()} avatar />
                        {selectedCharacter.getName()}
                    </Modal.Header>
                    <Modal.Content>
                        {!isDisabled && (
                            <div>
                                <Grid centered>
                                    <Grid.Row columns={1}>
                                        <Header size='medium' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 24 }}>크리티컬 배율</Header>
                                        <Popup 
                                            wide
                                            trigger={<Icon name='info' color='teal' size='small' circular />}
                                            content={
                                                <div style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 16 }}>
                                                    가운데에 근접할 수록 <br/>이상적인 배율입니다
                                                </div>
                                            }
                                            position='bottom center' />
                                    </Grid.Row>
                                    <Grid.Row columns={2} className='damage-tag-row'>
                                        <Grid.Column className='damage-tag'>
                                            <Label color='teal' pointing='below' attached='bottom left' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 20 }}>치명타 확률</Label>
                                        </Grid.Column>
                                        <Grid.Column className='damage-tag'>
                                            <Label color='orange' pointing='below' attached='bottom right' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 20 }}>치명타 피해</Label>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row className='damage-procress'>
                                        <Grid.Column>
                                            <Progress
                                                progress='value'
                                                value={CRIT_RATE ? (ensureNumeric(CRIT_DMG) / (ensureNumeric(CRIT_RATE) * 2)).toFixed(2) : 0}
                                                color={criticalRatio(ensureNumeric(CRIT_DMG) / (ensureNumeric(CRIT_RATE) * 2))}
                                                total={Math.max(2, ensureNumeric(CRIT_DMG) / (ensureNumeric(CRIT_RATE) * 2))} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                {objectNotEmpty(NORMAL_ATTACK_DAMAGE) && (
                                    <DamageReporter
                                        title='일반공격 데미지'
                                        resistance_rate={physical_resistance_rate}
                                        icon={selectedCharacter.getElementIcon()}
                                        {...NORMAL_ATTACK_DAMAGE} />
                                )}
                                {objectNotEmpty(CHARGED_ATTACK_DAMAGE) && (
                                    <DamageReporter
                                        title='강공격 데미지'
                                        resistance_rate={physical_resistance_rate}
                                        icon={selectedCharacter.getElementIcon()}
                                        {...CHARGED_ATTACK_DAMAGE} />
                                )}
                                {objectNotEmpty(E_SKILL_DAMAGE) && (
                                    <DamageReporter
                                        title='E 스킬 데미지'
                                        resistance_rate={element_resistance_rate}
                                        icon={selectedCharacter.getElementIcon()}
                                        {...E_SKILL_DAMAGE} />
                                )}
                                {objectNotEmpty(Q_SKILL_DAMAGE) && (
                                    <DamageReporter
                                        title='Q 스킬 데미지'
                                        resistance_rate={element_resistance_rate}
                                        icon={selectedCharacter.getElementIcon()}
                                        {...Q_SKILL_DAMAGE} />
                                )}
                                {objectNotEmpty(saltation) && Object.entries(saltation).map(([reaction, damage]) => {
                                    return (
                                        <DamageReporter
                                            saltation
                                            title={reaction}
                                            attack={damage} />
                                    )
                                })}
                                {LEVEL && (
                                    <Grid centered>
                                        <Grid.Row style={{ paddingBottom: 0 }}>
                                            <Header as='h4' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 24 }}>
                                                몬스터 레벨: {monster_level || LEVEL}
                                            </Header>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Icon
                                                style={{ alignSelf: 'center' }}
                                                name='arrow alternate circle left outline'
                                                size='big'
                                                color='teal'
                                                onClick={() => setMonsterResistance({
                                                    ...monsterResistance,
                                                    monster_level: Math.max(1, ensureNumeric(monster_level || LEVEL) - 1)
                                                })} />
                                            <Input
                                                type='range'
                                                min={0}
                                                max={90}
                                                value={monster_level || LEVEL}
                                                onChange={({ target: { value } }) => setMonsterResistance({
                                                    ...monsterResistance,
                                                    monster_level: value,
                                                })} />
                                            <Icon
                                                style={{ alignSelf: 'center' }}
                                                name='arrow alternate circle right outline'
                                                size='big'
                                                color='teal'
                                                onClick={() => setMonsterResistance({
                                                    ...monsterResistance,
                                                    monster_level: Math.min(90, ensureNumeric(monster_level || LEVEL) + 1)
                                                })} />
                                        </Grid.Row>
                                    </Grid>
                                )}
                                <MonsterSpec
                                    characterLevel={LEVEL}
                                    monsterResistance={monsterResistance}
                                    onChange={setMonsterResistance} />
                            </div>
                        )}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={() => setOpenModal(false)}>
                            닫기
                        </Button>
                    </Modal.Actions>
                </Modal>
            )}
        </Segment>
    )
}

export default AverageATKCalculator
