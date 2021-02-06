import Artifact from '../../interface/Artifact'

export class Lavawalker extends Artifact {
  constructor() {
    super()
    this.pyroEffected = false
    this.ADDITIONAL_DMG_BONUS = 0
    this.rarity = 5
    this.set = {
      2: {
        label: '2-set',
        description: '불 원소 내성 +40%'
      },
      4: {
        label: '4-set',
        description: '불 원소의 영향을 받은 적에게 가하는 피해가 35% 증가한다',
        PYRO_EFFECTED: {
          type: 'boolean',
          ADDITIONAL_DMG_BONUS: 15,
          helper: (checked) => {
            this.pyroEffected = checked
            if (this.pyroEffected) {
              this.ADDITIONAL_DMG_BONUS = 15
            } else {
              this.ADDITIONAL_DMG_BONUS = 0
            }
          }
        },
      },
    }
  }

  getName() {
    return '불 위를 걷는 현인'
  }
}
