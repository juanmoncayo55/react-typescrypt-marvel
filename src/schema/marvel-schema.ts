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