import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ModalMarvelInfo from './ModalMarvelInfo'
import {useMarvelStore} from '../store'

export default function MarvelModal() {

  const modal = useMarvelStore(store => store.modal)
  const setModalCharacter = useMarvelStore(store => store.setModalCharacter)
  const resultCharacterById = useMarvelStore(store => store.resultCharacterById)

  const displayInfo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
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
                titleSection="Series"
                numberInfo={resultCharacterById.results[0].stories.available}
                displayInfo={displayInfo}
              />
              <ModalMarvelInfo
                titleSection="Series"
                numberInfo={resultCharacterById.results[0].events.available}
                displayInfo={displayInfo}
              />
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  )
}