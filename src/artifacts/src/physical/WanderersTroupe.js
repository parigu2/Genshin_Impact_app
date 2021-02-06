import Artifact from '../../interface/Artifact'

import { percentToNumber } from '../../../util/display'

export class WanderersTroupe extends Artifact {
  constructor() {
    super()
    this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = 0
    this.RANGED_ATTACK = false
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '원소 마스터리+80pt',
        default: {
          ELEMENTAL_MASTERY: 80,
        }
      },
      4: {
        label: '4-set',
        description: '해당 성유물 세트를 장착한 캐릭터가 법구 또는 활을 사용시 캐릭터의 강공격으로 가하는 피해가 35% 증가한다',
        RANGED_ATTACK: {
          type: 'boolean',
          ADDITIONAL_SKILL_RATE_CHARGED_BONUS: 35,
          helper: (checked) => {
            this.RANGED_ATTACK = checked
            if (this.RANGED_ATTACK) {
              this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = ADDITIONAL_SKILL_RATE_CHARGED_BONUS
            } else {
              this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = 0
            }
          }
        },
      },
    }
  }

  getName() {
    return '대지를 유랑하는 악단'
  }
}
