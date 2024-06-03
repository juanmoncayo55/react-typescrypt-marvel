import axios from 'axios'
import {CharactersSchema, CharacterByIdSchema} from '../schema/marvel-schema'

const appIdPr = import.meta.env.VITE_API_KEY
const codeMD5 = "52c517f69357339dc70ef8498651f0b0"

export async function getCharacterForMarvelApi(){
	//https://gateway.marvel.com/v1/public/characters/1011334?ts=1&apikey=9231c810c9a43a4a6366e8cf1c320a29&hash=52c517f69357339dc70ef8498651f0b0 ( CharacterbyID )
	const URL = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${appIdPr}&hash=${codeMD5}`
	try{
		const {data: {data} } = await axios(URL)
		const result = CharactersSchema.safeParse(data)

		if(result.success){
			return result.data
		}
	}catch(error){
		console.log(error)
	}
}

export async function getCharacterById(id: number){
	const URL = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=${appIdPr}&hash=${codeMD5}`

	try{
		const {data: {data}} = await axios(URL)
		const result = CharacterByIdSchema.safeParse(data)

		if(result.success){		
			return result.data
		}
	}catch(error){
		console.log(error)
	}
}