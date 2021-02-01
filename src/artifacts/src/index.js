import { BlizzardStrayer } from './cryo'
import { CrimsonWitchOfFlames, Lavawalker } from './pyro'
import { NoblesseOblige } from './support'

const cryoArtifact = {
  blizzardStraper: new BlizzardStrayer(),
}

const pyroArtifact = {
  crimsonWitchOfFlames: new CrimsonWitchOfFlames(),
  lavawalker: new Lavawalker(),
}

const supportArtifact = {
  noblesseOblige: new NoblesseOblige(),
}

export const artifactsList = {
  ...cryoArtifact,
  ...pyroArtifact,
  ...supportArtifact,
}
