import {create} from 'zustand' //importamos el metodo create para crear nuestro store
import { devtools } from "zustand/middleware";
import {
	MarvelType,
	CharacterByIdType,
	ComicsCharacter,
	EventsCharacter,
	SeriesCharacter,
	StoriesCharacter
} from './types'
import {
	getCharacterForMarvelApi,
	getCharacterById,
	getComicsForCharater,
	getEventsForCharater,
	getSeriesForCharater,
	getStoriesForCharater
} from './services/MarvelServices'

type MarvelStore = {
	resultCharactersData: MarvelType,
	resultCharacterById: CharacterByIdType,
	resultComics: ComicsCharacter,
	resultEvents: EventsCharacter,
	resultSeries: SeriesCharacter,
	resultStories: StoriesCharacter,
	modal: boolean,
	loading: boolean,
	loadingCharacter: boolean,
	setModalCharacter: (isOpenOrClose: boolean) => void,
	fetchCharactersData: () => Promise<void>,
	fetchCharacterById: (id: number) => Promise<void>,
	fetchComicsCharacter: (id: number) => Promise<void>,
	fetchEventsCharacter: (id: number) => Promise<void>,
	fetchSeriesCharacter: (id: number) => Promise<void>,
	fetchStoriesCharacter: (id: number) => Promise<void>,
	setLoading: (change: boolean) => void,
	setLoadingCharacter: (change: boolean) => void
}

export const useMarvelStore = create<MarvelStore>()(devtools((set) => ({
	resultCharactersData: {} as MarvelType,
	resultCharacterById: {} as CharacterByIdType,
	resultComics: {} as ComicsCharacter,
	resultEvents: {} as EventsCharacter,
	resultSeries: {} as SeriesCharacter,
	resultStories: {} as StoriesCharacter,
	modal: false,
	loading: true,
	loadingCharacter: false,
	setModalCharacter: (isOpenOrClose) => {
		set(() => ({
			modal: isOpenOrClose,
			resultCharacterById: {} as CharacterByIdType
		}))
	},
	fetchCharactersData: async () => {
		const resultCharactersData = await getCharacterForMarvelApi()

		set(() => ({
			resultCharactersData,
			loading: false
		}))
	},
	fetchCharacterById: async (id) => {
		const resultCharacterById = await getCharacterById(id)

		set(() => ({
			resultCharacterById
		}))
	},
	fetchComicsCharacter: async (id) => {
		const resultComics = await getComicsForCharater(id)

		set(() => ({
			resultComics,
			resultEvents: {} as EventsCharacter,
			resultSeries: {} as SeriesCharacter,
			resultStories: {} as StoriesCharacter,
			loadingCharacter: false
		}))
	},
	fetchEventsCharacter: async (id) => {
		const resultEvents = await getEventsForCharater(id)

		set(() => ({
			resultEvents,
			resultComics: {} as ComicsCharacter,
			resultSeries: {} as SeriesCharacter,
			resultStories: {} as StoriesCharacter,
			loadingCharacter: false
		}))
	},
	fetchSeriesCharacter: async (id) => {
		const resultSeries = await getSeriesForCharater(id)

		set(() => ({
			resultSeries,
			resultComics: {} as ComicsCharacter,
			resultEvents: {} as EventsCharacter,
			resultStories: {} as StoriesCharacter,
			loadingCharacter: false
		}))
	},
	fetchStoriesCharacter: async (id) => {
		const resultStories = await getStoriesForCharater(id)

		set(() => ({
			resultStories,
			resultComics: {} as ComicsCharacter,
			resultEvents: {} as EventsCharacter,
			resultSeries: {} as SeriesCharacter,
			loadingCharacter: false
		}))
	},
	setLoading: (value) => {
		set(() => ({
			loading: value
		}))
	},
	setLoadingCharacter: (value) => {
		set(() => ({
			loadingCharacter: value
		}))
	}
}))) //exportamos nuestro store global

