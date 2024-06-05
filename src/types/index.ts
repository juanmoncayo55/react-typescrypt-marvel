import {z} from 'zod'
import {
	CharactersSchema,
	CharacterByIdSchema,
	ComicsByCharacterSchema,
	EventsByCharacterSchema,
	SeriesByCharacterSchema,
	StoriesByCharacterSchema
} from '../schema/marvel-schema'

export type MarvelType = z.infer<typeof CharactersSchema>
export type CharacterByIdType = z.infer<typeof CharacterByIdSchema>
export type ComicsCharacter = z.infer<typeof ComicsByCharacterSchema>
export type EventsCharacter = z.infer<typeof EventsByCharacterSchema>
export type SeriesCharacter = z.infer<typeof SeriesByCharacterSchema>
export type StoriesCharacter = z.infer<typeof StoriesByCharacterSchema>