import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Image, Menu, Segment } from 'semantic-ui-react'

import faimonIcon from '../util/img/faimonIcon.png'

const Nav = () => {
  const [active, setActive] = useState('calculator')

  return (
    <Segment inverted>
      <Menu inverted stackable pointing secondary>
        <Menu.Item>
          <Image src={faimonIcon} size='tiny' avatar />
        </Menu.Item>
        <Link
          to='/'
          style={{
            fontFamily: 'Noto Sans CJK KR',
            fontWeight: 500,
            fontSize: 24,
            display: 'flex',
            alignSelf: 'baseline',
          }}>
          <Menu.Item
            name='calculator'
            active={active === 'calculator'}
            onClick={(event, { name }) => setActive(name)}>
              데미지 계산기
          </Menu.Item>
        </Link>
        <Link
          to='/info'
          style={{
            fontFamily: 'Noto Sans CJK KR',
            fontWeight: 500,
            fontSize: 24,
            display: 'flex',
            alignSelf: 'baseline',
          }}>
          <Menu.Item
            name='info'
            active={active === 'info'}
            onClick={(event, { name }) => setActive(name)}>
              About us
          </Menu.Item>
        </Link>
      </Menu>
    </Segment>
  )
}

export default Nav
