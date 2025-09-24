import {BASE_URL} from "../src/utils/constants"

export const PokemonEndPoint = {
  LIST: `${BASE_URL}/pokemon`,
  DETAIL: (idOrName) => `${BASE_URL}/pokemon/${idOrName}`,
  TYPES: `${BASE_URL}/type`,
  ABILITY: (idOrName) => `${BASE_URL}/ability/${idOrName}`,
  MOVE: (idOrName) => `${BASE_URL}/move/${idOrName}`,
};