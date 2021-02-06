import Artifact from '../../interface/Artifact'

export class Thundersoother extends Artifact {
  constructor() {
    super()
    this.ADDITIONAL_ELECTRO_DMG_BONUS = 0
    this.ELECTRO_EFFECTED = false
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '번개 원소 피해 15%',
      },
      4: {
        label: '4-set',
        description: '과부하, 감전, 초전도 반응이 주는 피해가 40% 증가한다. 원소 반응 발동 시 원소 스킬의 재사용 대기시간이 1초 줄어든다. 해당 효과는 0.8초마다 1번 발동한다',
        default: {
          overloaded: 40,
          electroCharged: 40,
          superConduct: 40,
        },
      },
    }
  }

  getName() {
    return '번개 같은 분노'
  }
}
