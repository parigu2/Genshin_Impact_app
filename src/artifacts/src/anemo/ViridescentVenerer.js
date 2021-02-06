import Artifact from '../../interface/Artifact'

export class ViridescentVenerer extends Artifact {
  constructor() {
    super()
    this.ADDITIONAL_SKILL_RATE_BONUS = 0
    this.ADDITIONAL_SKILL_RATE_CHARGED_BONUS = 0
    this.E_SKILL_USED = false
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '바람 원소 피해 +15%',
      },
      4: {
        label: '4-set',
        description: '확산 반응이 가하는 피해가 60% 증가한다. 확산되는 원소 타입에 따라 피해 범위 내 적의 해당 원소의 내성이 40% 감소한다. 지속 시간: 10초',
        default: {
          swirl: 60,
        }
      },
    }
  }

  getName() {
    return '청록색 그림자'
  }
}
