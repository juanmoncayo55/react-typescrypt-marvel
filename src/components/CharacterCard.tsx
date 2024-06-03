import {useMarvelStore} from '../store'

export default function CharacterCard() {
	const resultCharactersData = useMarvelStore(store => store.resultCharactersData)
	const setModalCharacter = useMarvelStore(store => store.setModalCharacter)
	const fetchCharacterById = useMarvelStore(store => store.fetchCharacterById)

	const handleModal = (id: number) => {
		setModalCharacter(true)
		fetchCharacterById(id)
	}

	return (
		<>
			<div className="wrapper-personage">
				{
					resultCharactersData.results.map(character => (
						<div className="personage-content" key={character.id}>
							<div className="personage-container">
								<div className="personage">
									<img
										src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
										className="personage-image" />
									<p className="personage-name">{character.name}</p>
								</div>
								<div className="personage-back">
									<p className="personage-back-name">{character.name}</p>
									<button
										className="personage-back-btn"
										onClick={() => handleModal(character.id)}>More info</button>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</>
	)
}