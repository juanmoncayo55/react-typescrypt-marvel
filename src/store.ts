import {create} from 'zustand' //importamos el metodo create para crear nuestro store
import { devtools } from "zustand/middleware";
import {MarvelType, CharacterByIdType} from './types'
import {getCharacterForMarvelApi, getCharacterById} from './services/MarvelServices'

type MarvelStore = {
	resultCharactersData: MarvelType,
	resultCharacterById: CharacterByIdType,
	modal: boolean,
	loading: boolean,
	fetchCharactersData: () => Promise<void>,
	setModalCharacter: (isOpenOrClose: boolean) => void,
	fetchCharacterById: (id: number) => Promise<void>,
	setLoading: (change: boolean) => void
}

export const useMarvelStore = create<MarvelStore>()(devtools((set) => ({
	resultCharactersData: {} as MarvelType,
	resultCharacterById: {} as CharacterByIdType,
	modal: false,
	loading: true,
	fetchCharactersData: async () => {
		const resultCharactersData = await getCharacterForMarvelApi()

		set(() => ({
			resultCharactersData,
			loading: false
		}))
	},
	setModalCharacter: (isOpenOrClose) => {
		set(() => ({
			modal: isOpenOrClose,
			resultCharacterById: {} as CharacterByIdType
		}))
	},
	fetchCharacterById: async (id) => {
		const resultCharacterById = await getCharacterById(id)

		set(() => ({
			resultCharacterById
		}))
	},
	setLoading: (value) => {
		set(() => ({
			loading: value
		}))
	}
}))) //exportamos nuestro store global

