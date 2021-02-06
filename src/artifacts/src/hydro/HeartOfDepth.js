import Artifact from '../../interface/Artifact'

export class HeartOfDepth extends Artifact {
  constructor() {
    super()
    this.ADDITIONAL_SKILL_RATE_BONUS = 0
    this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = 0
    this.E_SKILL_USED = false
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '물 원소 피해+15%',
      },
      4: {
        label: '4-set',
        description: '원소전투 스킬 발동 후 15초 동안 일반 공격과 강공격으로 가하는 피해가 30% 증가한다',
        E_SKILL_USED: {
          type: 'boolean',
          ADDITIONAL_SKILL_RATE_BONUS: 30,
          ADDITIONAL_SKILL_RATE_CHARGED_BONUS: 30,
          helper: (checked) => {
            this.E_SKILL_USED = checked
            if (this.E_SKILL_USED) {
              this.ADDITIONAL_SKILL_RATE_BONUS = ADDITIONAL_SKILL_RATE_BONUS
              this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = ADDITIONAL_SKILL_RATE_CHARGED_BONUS
            } else {
              this.ADDITIONAL_SKILL_RATE_BONUS = 0
              this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = 0
            }
          }
        },
      },
    }
  }

  getName() {
    return '몰락한 마음'
  }
}
