import Artifact from '../../interface/Artifact'

export class BloodstainedChivalry extends Artifact {
  constructor() {
    super()
    this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = 0
    this.ENEMY_KILLED = false
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '가하는 물리 피해가 25% 증가한다',
        // default: {
        //   ADDITIONAL_PHYSICAL_DMG_BONUS: 25, ???
        // }
      },
      4: {
        label: '4-set',
        description: '적을 처치한 후 10초 동안 강공격 사용 시 스태미나를 소모하지 않고 강공격으로 가하는 피해가 50% 증가한다',
        ENEMY_KILLED: {
          type: 'boolean',
          ADDITIONAL_SKILL_RATE_CHARGED_BONUS: 50,
          helper: (checked) => {
            this.ENEMY_KILLED = checked
            if (this.ENEMY_KILLED) {
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
    return '몰락한 마음'
  }
}
