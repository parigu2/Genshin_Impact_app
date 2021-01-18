import React from 'react'
import {
  Divider,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react'

import { objectNotEmpty, labelTranslator } from '../../util'

import DamageReporterTable from './DamageReporterTable'

const DamageReporter = ({
  title = '',
  attack = 0,
  maxAttack = 0,
  averageAttack = 0,
  resistance_rate = 0,
  amplification,
  saltation = false,
  element,
  icon,
}) => {

  return (
    <Segment>
      {saltation ? (
        <Grid divided>
          <Grid.Row verticalAlign='middle' columns={2}>
            <Grid.Column>
              <Header size='large' textAlign='center' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 32 }}>{`${labelTranslator(title)}${title === 'electroCharged' ? ' x 2' : ''}`}</Header>
            </Grid.Column>
            <Grid.Column>
              <Header size='large' textAlign='center' style={{ fontFamily: 'Noto Sans CJK KR', fontSize: 24 }}>{attack}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Grid>
          <DamageReporterTable
            title={title}
            resistance_rate={resistance_rate}
            attack={attack}
            maxAttack={maxAttack}
            averageAttack={averageAttack}
            icon={element ? icon : null} />
          {objectNotEmpty(amplification) && (
            <Divider />
          )}
          {objectNotEmpty(amplification) && Object.entries(amplification).map(([reaction, damage]) => {
              return (
                <DamageReporterTable
                    title={reaction}
                    resistance_rate={resistance_rate}
                    icon={element ? icon : null}
                    {...damage} />
              )
          })}
        </Grid>
      )}
    </Segment>
  )
}

export default DamageReporter
