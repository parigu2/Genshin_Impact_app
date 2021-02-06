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
        description: '번개 원소 내성 +40%',
      },
      4: {
        label: '4-set',
        description: '번개 원소의 영향을 받은 적에게 가하는 피해가 35% 증가한다',
        ELECTRO_EFFECTED: {
          type: 'boolean',
          ADDITIONAL_ELECTRO_DMG_BONUS: 35,
          helper: (checked) => {
            this.ELECTRO_EFFECTED = checked
            if (this.ELECTRO_EFFECTED) {
              this.ADDITIONAL_ELECTRO_DMG_BONUS = ADDITIONAL_ELECTRO_DMG_BONUS
            } else {
              this.ADDITIONAL_ELECTRO_DMG_BONUS = 0
            }
          },
        },
      },
    }
  }

  getName() {
    return '뇌명을 평정한 존자'
  }
}
