import Artifact from '../../interface/Artifact'

export class BlizzardStrayer extends Artifact {
  constructor() {
    super()
    this.cyroEffected = false
    this.fronzenEffected = false
    this.ADDITIONAL_CRIT_RATE_BONUS = 0
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '얼음 원소 피해 보너스+15%',
      },
      4: {
        label: '4-set',
        description: '얼음 원소의 영향을 받은 적을 공격 시 치명타 확률이 20% 증가한다. 만약 적이 빙결 상태라면 치명타 확률이 추가로 20% 증가한다',
        CRYO_EFFECTED: {
          type: 'boolean',
          ADDITIONAL_CRIT_RATE_BONUS: 20,
          helper: (checked) => {
            let bonus = 0
            this.cyroEffected = checked
            if (this.cyroEffected) bonus += 20
            if (this.fronzenEffected) bonus += 20
            this.ADDITIONAL_CRIT_RATE_BONUS = bonus
          }
        },
        FROZEN_EFFECTED: {
          type: 'boolean',
          ADDITIONAL_CRIT_RATE_BONUS: 20,
          helper: (checked) => {
            let bonus = 0
            this.fronzenEffected = checked
            if (this.cyroEffected) bonus += 20
            if (this.fronzenEffected) bonus += 20
            this.ADDITIONAL_CRIT_RATE_BONUS = bonus
          }
        },
      },
    }
  }

  getName() {
    return '얼음바람 속에서 길잃은 용사'
  }
}
