import Artifact from '../../interface/Artifact'

export class GladiatorsFinale extends Artifact {
  constructor() {
    super()
    this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = 0
    this.NEAR_ATTACK = false
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '공격력 +18%',
      },
      4: {
        label: '4-set',
        description: '해당 성유물 세트를 장착한 캐릭터가 한손검, 양손검, 장병기를 사용 시 캐릭터의 일반 공격으로 가하는 피해가 35% 증가한다',
        NEAR_ATTACK: {
          type: 'boolean',
          ADDITIONAL_SKILL_RATE_CHARGED_BONUS: 35,
          helper: (checked) => {
            this.NEAR_ATTACK = checked
            if (this.E_SKILL_USED) {
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
    return '검투사의 피날레'
  }
}
