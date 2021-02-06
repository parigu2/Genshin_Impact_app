import Artifact from '../../interface/Artifact'

export class RetracingBolide extends Artifact {
  constructor() {
    super()
    this.ADDITIONAL_PHYSICAL_DMG_BONUS = 0
    this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = 0
    this.SHIELD_ENABLED = false
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '보호막 강화 효과가 35% 상승한다',
      },
      4: {
        label: '4-set',
        description: '보호막이 존재 시 추가로 일반 공격과 강공격 보너스를 40% 획득한다',
        SHIELD_ENABLED: {
          type: 'boolean',
          ADDITIONAL_SKILL_RATE_BONUS: 40,
          ADDITIONAL_SKILL_RATE_CHARGED_BONUS: 40,
          helper: (checked) => {
            this.SHIELD_ENABLED = checked
            if (this.SHIELD_ENABLED) {
              this.ADDITIONAL_SKILL_RATE_BONUS = ADDITIONAL_SKILL_RATE_BONUS
              this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = ADDITIONAL_SKILL_RATE_CHARGED_BONUS
            } else {
              this.ADDITIONAL_SKILL_RATE_BONUS = 0
              this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = 0
            },
          },
        },
      },
    }
  }

  getName() {
    return '날아오르는 유성'
  }
}
