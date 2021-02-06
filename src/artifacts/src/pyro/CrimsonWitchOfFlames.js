import { ensureNumeric, ensureObject } from '../../../util'
import Artifact from '../../interface/Artifact'

export class CrimsonWitchOfFlames extends Artifact {
  constructor() {
    super()
    this.stack = 0
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '불 원소 피해 +15%'
      },
      4: {
        label: '4-set',
        description: '과부하, 연소 반응이 적에게 주는 피해가 40% 증가하고 증발, 융해 반응의 보너스 계수가 15% 증가한다. 원소 전투 스킬 발동 후 10초 동안 2세트의 효과가 50% 증가한다. 최대 중첩수: 3회',
        default: {
          vaporize: 15,
          melt: 15,
          overloaded: 40,
        },
        E_SKILL_USED: {
          type: 'stack',
          maxStack: 3,
          stack: {
            1: {
              type: 'PYRO_DMG_BONUS',
              value: 7.5,
            },
            2: {
              type: 'PYRO_DMG_BONUS',
              value: 15,
            },
            3:{
              type: 'PYRO_DMG_BONUS',
              value: 22.5,
            },
          },
          helper: (stack) => {
            this.stack = stack
          },
        },
      },
    }
  }

  getName() {
    return '불타오르는 화염의 마녀'
  }

  getSet2Effects() {
    return null
  }

  getSet4Effects(type) {
    const {
      default: _default,
      E_SKILL_USED: {
        stack,
      },
    } = ensureObject(this.set[4])
    const { value }  = ensureObject(stack[this.stack])
    const effects = {
      ..._default,
      PYRO_DMG_BONUS: ensureNumeric(value)
    }
    return effects[type]
  }
}
