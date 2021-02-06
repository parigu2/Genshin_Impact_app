import Artifact from '../../interface/Artifact'

export class ArchaicPetra extends Artifact {
  constructor() {
    super()
    this.ADDITIONAL_ELEMENTAL_DMG_BONUS = 0
    this.SHIELD_ENABLED = false
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '바위 원소 피해 보너스를 15% 획득한다',
      },
      4: {
        label: '4-set',
        description: '바위 원소 반응으로 만들어진 결정을 획득 시 파티 내 모든 캐릭터는 해당 원소 피해 보너스를 35% 획득한다. 지속 시간: 10초. 이러한 효과로 1가지의 원소 피해 보너스만 획득할 수 있다',
        SHIELD_ENABLED: {
          type: 'boolean',
          ADDITIONAL_ELEMENTAL_DMG_BONUS: 35,
          helper: (checked) => {
            this.SHIELD_ENABLED = checked
            if (this.SHIELD_ENABLED) {
              this.ADDITIONAL_ELEMENTAL_DMG_BONUS = ADDITIONAL_ELEMENTAL_DMG_BONUS
            } else {
              this.ADDITIONAL_ELEMENTAL_DMG_BONUS = 0
            },
          },
        },
      },
    }
  }

  getName() {
    return '유구한 반암'
  }
}
