import React from 'react'

import {
  Image,
  Grid,
  Message,
  Header,
} from 'semantic-ui-react'

import { labelTranslator } from '../../util'

const DamageReporterTable = ({
  title = '',
  attack = 0,
  maxAttack = 0,
  averageAttack = 0,
  resistance_rate = 0,
  icon,
}) => {

  return (
    <Grid.Row verticalAlign='middle' columns={2}>
      <Grid.Column>
        <Grid.Row>
          {icon && (
            <Image src={icon} avatar style={{
              display: 'flex',
              position: 'absolute',
              left: 30,
            }} />
          )}
          <Header size='large' textAlign='center' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 32 }}>{labelTranslator(title)}</Header>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column>
        <Message attached floating>
          <Grid.Row style={{ margin: 16 }}>
            <Header as='h2' textAlign='center' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 24 }}>데미지: {Math.floor(attack * resistance_rate)}</Header>
          </Grid.Row>
          <Grid.Row style={{ margin: 16 }}>
            <Header as='h2' color='orange' textAlign='center' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 24 }}>크리티컬: {Math.floor(maxAttack * resistance_rate)}</Header>
          </Grid.Row>
          <Message info>
            <Header as='h2' textAlign='center' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 28 }}>평균: {Math.floor(averageAttack * resistance_rate)}</Header>
          </Message>
        </Message>
      </Grid.Column>
    </Grid.Row>
  )
}

export default DamageReporterTable
