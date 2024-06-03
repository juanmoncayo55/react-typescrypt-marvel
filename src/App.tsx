import {useMemo} from 'react'
import CharacterCard from "./components/CharacterCard"
import Header from './components/Header'
import Navigation from './components/Navigation'
import MarvelModal from './components/MarvelModal'
import Spinner from "./Spinner"
import {useMarvelStore} from './store'

function App() {
  const fetchCharactersData = useMarvelStore(store => store.fetchCharactersData)
  const resultCharactersData = useMarvelStore(store => store.resultCharactersData)
  const resultCharacterById = useMarvelStore(store => store.resultCharacterById)
  const modal = useMarvelStore(store => store.modal)
  const loading = useMarvelStore(store => store.loading)

  useMemo(() => {
    fetchCharactersData()
  }, [])

  console.log(modal)
  return (
    <>
      <Header />
      <Navigation />
      <main className="principal">
        <div className="contenedor">
          {loading && <Spinner />}
          {resultCharactersData.results && <CharacterCard />}
        </div>
      </main>
      {resultCharacterById.results && <MarvelModal />}
    </>
  )
}

export default App
