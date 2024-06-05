import {z} from 'zod' //Zos lo usamos para poder mapear nuestros datos que viene de la api. Establecemos el tipo de dato que nos devuelve la api

export const CharactersSchema = z.object({
	results: z.object({
		id: z.number(),
		name: z.string(),
		description: z.string(),
		modified: z.string(),

		thumbnail: z.object({
			path: z.string(),
			extension: z.string()
		}),

		comics: z.object({
			available: z.number(),
			items: z.object({
				resourceURI: z.string(),
				name: z.string()
			}).array()
		})
	}).array()
})

export const CharacterByIdSchema = z.object({
	results: z.object({
		id: z.number(),
		name: z.string(),
		description: z.string(),
		thumbnail: z.object({
			path: z.string(),
			extension: z.string()
		}),
		comics: z.object({
			available: z.number(),
			items: z.object({
				resourceURI: z.string(),
				name: z.string()
			}).array()
		}),
		series: z.object({
			available: z.number(),
			items: z.object({
				resourceURI: z.string(),
				name: z.string()
			}).array()
		}),
		stories: z.object({
			available: z.number(),
			items: z.object({
				resourceURI: z.string(),
				name: z.string(),
				type: z.string()
			}).array()
		}),
		events: z.object({
			available: z.number(),
			items: z.object({
				resourceURI: z.string(),
				name: z.string()
			}).array()
		})
	}).array()
})

export const SeriesByCharacterSchema = z.object({
	results: z.object({
		id: z.number(),
		title: z.string(),
		startYear: z.number(),
		endYear: z.number(),
		rating: z.string(),
		type: z.string(),
		modified: z.string(),
		thumbnail: z.object({
			path: z.string(),
			extension: z.string()
		})
	}).array()
})

export const ComicsByCharacterSchema = z.object({
	results: z.object({
		id: z.number(),
		digitalId: z.number(),
		title: z.string(),
		thumbnail: z.object({
			path: z.string(),
			extension: z.string()
		})
	}).array()
})

export const StoriesByCharacterSchema = z.object({
	results: z.object({
		id: z.number(),
		title: z.string(),
		description: z.string(),
		resourceURI: z.string(),
		type: z.string(),
		modified: z.string(),
		creators: z.object({
			available: z.number(),
			collectionURI: z.string(),
			items: z.object({
				resourceURI: z.string(),
				name: z.string(),
				role: z.string()
			}).array()
		})
	}).array()
})


export const EventsByCharacterSchema = z.object({
	results: z.object({
		id: z.number(),
		title: z.string(),
		description: z.string(),
		modified: z.string(),
		start: z.string(),
		end: z.string(),
		thumbnail: z.object({
			path: z.string(),
			extension: z.string()
		})
	}).array()
})