import React, { useMemo, useState } from 'react'
import {
  Button,
  Checkbox,
  Dropdown,
  Header,
  Modal,
  Rating,
} from 'semantic-ui-react'

import { artifactsList } from '../../artifacts'
import { ensureObject } from '../../util'

const artifactOptions = Object.entries(artifactsList).map(([name, artifact]) => ({ key: artifact.getName(), text: artifact.getName(), value: name }))

const ArtifactInputField = ({
  artifacts,
  onChange = () => {},
}) => {
  const [open, setOpen] = useState(false)
  const [option1Value, setOption1Value] = useState({})
  const [option2Value, setOption2Value] = useState({})
  console.log("🚀 ~ file: ArtifactInputField.js ~ line 23 ~ option2Value", option2Value)

  const [set1, set2] = artifacts
  console.log("🚀 ~ file: ArtifactInputField.js ~ line 22 ~ artifacts", artifacts)

  const {
    option1,
    option2,
    set_1,
    set_2,
    set_1_option,
    set_2_option,
  } = useMemo(() => {
    let option1, option2, set_1, set_2, set_1_option, set_2_option

    if (set1) {
      option1 = set1.getName()
      set_1 = set1.set[2]
      const {
        default: _default,
        description,
        label,
        ...option
      } = ensureObject(set_1)
      set_1_option = Object.entries(ensureObject(option))
    }

    if (set2) {
      option2 = set2.getName()
      set_2 = set2.set[option1 === option2 ? 4 : 2]
      const {
        default: _default,
        description,
        label,
        ...option
      } = ensureObject(set_2)
      set_2_option = Object.entries(ensureObject(option))
    }

    return {
      option1,
      option2,
      set_1,
      set_1_option,
      set_2,
      set_2_option,
    }
    // eslint-disable-next-line
  }, [artifacts])

  return (
    <Modal
      // basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button compact size='mini' color='olive'>성유물 효과</Button>} >
        <Header>성유물 효과</Header>
        <Modal.Content>
          <Dropdown
            placeholder='성유물 2세트'
            search
            selection
            text={option1}
            noResultsMessage='해당 성유물이 없습니다'
            options={artifactOptions}
            onChange={(event, { value: artifactName }) => {
              const artifact = artifactsList[artifactName]
              onChange([artifact, set2])
            }} />
          <Dropdown
            placeholder='성유물 4세트'
            search
            selection
            text={option2}
            noResultsMessage='해당 성유물이 없습니다'
            options={artifactOptions}
            onChange={(event, { value: artifactName }) => {
              const artifact = artifactsList[artifactName]
              onChange([set1, artifact])
            }} />
          {set_1 && (
            <div>
              <p>{set_1.description}</p>
              {set_1_option.map(([label, option]) => {
                const { type, maxStack, helper } = ensureObject(option)
                let component
                switch (type) {
                  case 'input':
                    component = <input
                      type='number'
                      value={option1Value[label]}
                      onChange={({ target: { value } }) => {
                        helper(Number(value))
                        setOption1Value({
                          ...option2Value,
                          [label]: value
                        })
                      }} />
                    break
                  case 'boolean':
                    component = <Checkbox
                      checked={option1Value[label]}
                      onClick={(event, { checked }) =>{
                        helper(checked)
                        setOption1Value({
                          ...option2Value,
                          [label]: checked
                        })
                      }} />
                    break
                  case 'stack':
                    component = <Rating
                      icon='star'
                      maxRating={maxStack}
                      clearable
                      value={option1Value[label]}
                      onRate={(event, { rating }) => {
                        helper(rating)
                        setOption1Value({
                          ...option2Value,
                          [label]: rating
                        })
                      }} />
                    break
                  default:
                    break
                }
                return (
                  <div>
                    {label}
                    {component}
                  </div>
                )
              })}
            </div>
          )}
          {set_2 && (
            <div>
              <p>{set_2.description}</p>
              {set_2_option.map(([label, option]) => {
                console.log("🚀 ~ file: ArtifactInputField.js ~ line 102 ~ {set_2_option.map ~ option", option)
                const { type, maxStack, helper } = ensureObject(option)
                let component
                switch (type) {
                  case 'input':
                    component = <input
                      type='number'
                      value={option2Value[label]}
                      onChange={({ target: { value } }) => {
                        helper(Number(value))
                        setOption2Value({
                          ...option2Value,
                          [label]: value
                        })
                      }} />
                    break
                  case 'boolean':
                    component = <Checkbox
                      checked={option2Value[label]}
                      onClick={(event, { checked }) =>{
                        helper(checked)
                        setOption2Value({
                          ...option2Value,
                          [label]: checked
                        })
                      }} />
                    break
                  case 'stack':
                    component = <Rating
                      icon='star'
                      maxRating={maxStack}
                      clearable
                      value={option2Value[label]}
                      onRate={(event, { rating }) => {
                        helper(rating)
                        setOption2Value({
                          ...option2Value,
                          [label]: rating
                        })
                      }} />
                    break
                  default:
                    break
                }
                return (
                  <div>
                    {label}
                    {component}
                  </div>
                )
              })}
            </div>
          )}
          {/* <p>{artifacts.noblesseOblige.set[2].description}</p>
          <p>{artifacts.noblesseOblige.set[4].description}</p>
          {console.log(artifacts.noblesseOblige.set[4].Q_SKILL_USED.helper(763))}
          {console.log(artifacts.noblesseOblige)} */}
        </Modal.Content>
    </Modal>
  )
}

export default ArtifactInputField
