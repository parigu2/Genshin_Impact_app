import { AnemoTraveler, Jean, Sucrose, Venti } from './anemo'
import { Chongyun, Diona, Ganyu, Kaeya, Qiqi } from './cryo'
import { Beidou, Fischl, Keqing, Lisa, Razor } from './electro'
import { Albedo, GeoTraveler, Ningguang, Noelle, Zhongli } from './geo'
import { Bennett, Diluc, Ember, Klee, Xiangling, Xinyan } from './pyro'
import { Babara, Mona, Tartarglia, Xingqiu } from './hydro'

const characterList = {
  klee: Klee,
  mona: Mona,
  xinyan: Xinyan,
  ember: Ember,
}

const anemoCharacterList = {
  anemoTraveler: new AnemoTraveler(),
  jean: new Jean(),
  sucrose: new Sucrose(),
  venti: new Venti(),
}

const cryoCharacterList = {
  chongyun: new Chongyun(),
  diona: new Diona(),
  ganyu: new Ganyu(),
  kaeya: new Kaeya(),
  qiqi: new Qiqi(),
}

const electroCharacterList = {
  beidou: new Beidou(),
  fischl: new Fischl(),
  keqing: new Keqing(),
  lisa: new Lisa(),
  razor: new Razor(),
}

const geoCharacterList = {
  albedo: new Albedo(),
  geoTraveler: new GeoTraveler(),
  ningguang: new Ningguang(),
  noelle: new Noelle(),
  zhongli: new Zhongli(),
}

const pyroCharacterList = {
  bennett: new Bennett(),
  diluc: new Diluc(),
  ember: new Ember(),
  klee: new Klee(),
  xiangling: new Xiangling(),
  xinyan: new Xinyan(),
}

const hydroCharacterList = {
  babara: new Babara(),
  mona: new Mona(),
  tartarglia: new Tartarglia(),
  xingqiu: new Xingqiu(),
}

export const characters = {
  ...anemoCharacterList,
  ...cryoCharacterList,
  ...electroCharacterList,
  ...geoCharacterList,
  ...pyroCharacterList,
  ...hydroCharacterList,
}

export const activeCharacter = (name) => characterList[name]
