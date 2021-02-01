import Artifact from '../../interface/Artifact'

import { percentToNumber } from '../../../util/display'

export class NoblesseOblige extends Artifact {
  constructor() {
    super()
    this.set = {
      2: {
        label: '2-set',
        description: '원소폭발로 가하는 피해가 20% 증가한다',
        default: {
          Q_SKILL_DMG_BONUS: 20,
        }
      },
      4: {
        label: '4-set',
        description: '원소폭발 발동 후 파티 내 모든 캐릭터의 공격력이 20% 증가한다. 지속 시간: 12초. 해당 효과는 중첩되지 않는다',
        Q_SKILL_USED: {
          type: 'input',
          ATTACK_BONUS: 20,
          helper: (base_atk) => {
            if (base_atk) {
              this.setBaseATK(base_atk)
            }
            const additionalATK = this.getBaseATK() * percentToNumber(20)
            return additionalATK
          }
        },
      },
    }
  }

  getName() {
    return '왕실'
  }
}
