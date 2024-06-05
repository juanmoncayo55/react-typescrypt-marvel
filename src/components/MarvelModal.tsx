import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ModalMarvelInfo from './ModalMarvelInfo'
import {useMarvelStore} from '../store'
import Spinner from '../Spinner'

export default function MarvelModal() {

  const modal = useMarvelStore(store => store.modal)
  const setModalCharacter = useMarvelStore(store => store.setModalCharacter)
  const resultCharacterById = useMarvelStore(store => store.resultCharacterById)
  //Fetch section of character
  const fetchComicsCharacter = useMarvelStore(store => store.fetchComicsCharacter)
  const fetchEventsCharacter = useMarvelStore(store => store.fetchEventsCharacter)
  const fetchSeriesCharacter = useMarvelStore(store => store.fetchSeriesCharacter)
  const fetchStoriesCharacter = useMarvelStore(store => store.fetchStoriesCharacter)
  const setLoadingCharacter = useMarvelStore(store => store.setLoadingCharacter)
  const loadingCharacter = useMarvelStore(store => store.loadingCharacter)

  const displayInfo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, idSection: string) => {
    e.preventDefault()
    const modalAcordeon = document.querySelector("#modalAcordeon")
    const id = +resultCharacterById.results[0].id

    setLoadingCharacter(true)
    if(idSection === "Comics"){
      fetchComicsCharacter(id)
    }else if(idSection === "Series"){
      fetchSeriesCharacter(id)
    }else if(idSection === "Stories"){
      fetchStoriesCharacter(id)
    }else if(idSection === "Events"){
      fetchEventsCharacter(id)
    }

    modalAcordeon?.classList.add("modal-acordeon-show")
  }

  return (
    <div>
      <Modal open={modal} onClose={() => setModalCharacter(false)}>
        <h2 className="modal-title">{resultCharacterById.results[0].name}</h2>
        <div className="modal-grid">
          <div className="modal-grid-1">
            <img src={`${resultCharacterById.results[0].thumbnail.path}.${resultCharacterById.results[0].thumbnail.extension}`} />
          </div>
          <div className="modal-grid-2">
            <p className="modal-description">
              {resultCharacterById.results[0].description ? resultCharacterById.results[0].description : "No hay una descripción para mostrar"}
            </p>
            <ul className="modal-list">
              <ModalMarvelInfo
                titleSection="Comics"
                numberInfo={resultCharacterById.results[0].comics.available}
                displayInfo={displayInfo}
              />
              <ModalMarvelInfo
                titleSection="Series"
                numberInfo={resultCharacterById.results[0].series.available}
                displayInfo={displayInfo}
              />
              <ModalMarvelInfo
                titleSection="Stories"
                numberInfo={resultCharacterById.results[0].stories.available}
                displayInfo={displayInfo}
              />
              <ModalMarvelInfo
                titleSection="Events"
                numberInfo={resultCharacterById.results[0].events.available}
                displayInfo={displayInfo}
              />
            </ul>
          </div>
        </div>

        {loadingCharacter && <Spinner />}
        <div className="modal-info-acordeon" id="modalAcordeon"></div>
      </Modal>
    </div>
  )
}