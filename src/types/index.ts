import {z} from 'zod'
import {CharactersSchema, CharacterByIdSchema} from '../schema/marvel-schema'

export type MarvelType = z.infer<typeof CharactersSchema>
export type CharacterByIdType = z.infer<typeof CharacterByIdSchema>