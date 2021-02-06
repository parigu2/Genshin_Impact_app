import Artifact from '../../interface/Artifact'

export class MaidenBeloved extends Artifact {
  constructor() {
    super()
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '원소폭발로 가하는 피해가 20% 증가한다',
      },
      4: {
        label: '4-set',
        description: '원소 전투 스킬 또는 원소폭발 발동 후 10초 동안 파티 내 모든 캐릭터가 받는 치유 효과가 20% 증가한다',
      },
    }
  }

  getName() {
    return '사랑받는 소녀'
  }
}
