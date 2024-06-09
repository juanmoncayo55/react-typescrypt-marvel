import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ModalMarvelInfo from './ModalMarvelInfo'
import {useMarvelStore} from '../store'
import Spinner from '../Spinner'
import { formatDate } from "../helpers";

export default function MarvelModal() {
  const [myCss, setMyCss] = useState({})
  const modal = useMarvelStore(store => store.modal)
  const setModalCharacter = useMarvelStore(store => store.setModalCharacter)
  const resultCharacterById = useMarvelStore(store => store.resultCharacterById)
  //Fetch section of character
  const fetchComicsCharacter = useMarvelStore(store => store.fetchComicsCharacter)
  const fetchEventsCharacter = useMarvelStore(store => store.fetchEventsCharacter)
  const fetchSeriesCharacter = useMarvelStore(store => store.fetchSeriesCharacter)
  const fetchStoriesCharacter = useMarvelStore(store => store.fetchStoriesCharacter)
  const resultComics = useMarvelStore(store => store.resultComics)
  const resultEvents = useMarvelStore(store => store.resultEvents)
  const resultSeries = useMarvelStore(store => store.resultSeries)
  const resultStories = useMarvelStore(store => store.resultStories)
  const setLoadingCharacter = useMarvelStore(store => store.setLoadingCharacter)
  const loadingCharacter = useMarvelStore(store => store.loadingCharacter)  

  const displayInfo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, idSection: string) => {
    e.preventDefault()
    const modalAcordeon = document.querySelector("#modalAcordeon")
    const id = +resultCharacterById.results[0].id

    setLoadingCharacter(true)
    if(idSection === "Comics"){
      fetchComicsCharacter(id)
      setMyCss({display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem"})
    }else if(idSection === "Series"){
      fetchSeriesCharacter(id)
      setMyCss({display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem"})
    }else if(idSection === "Stories"){
      fetchStoriesCharacter(id)
      setMyCss({display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem"})
    }else if(idSection === "Events"){
      fetchEventsCharacter(id)
    }

    modalAcordeon?.classList.add("modal-acordeon-show")
  }
  console.log(loadingCharacter);
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
                numberInfo={resultCharacterById.results[0].comics.items.length}
                displayInfo={displayInfo}
              />
              <ModalMarvelInfo
                titleSection="Series"
                numberInfo={resultCharacterById.results[0].series.items.length}
                displayInfo={displayInfo}
              />
              <ModalMarvelInfo
                titleSection="Stories"
                numberInfo={resultCharacterById.results[0].stories.items.length}
                displayInfo={displayInfo}
              />
              <ModalMarvelInfo
                titleSection="Events"
                numberInfo={resultCharacterById.results[0].events.items.length}
                displayInfo={displayInfo}
              />
            </ul>
          </div>
        </div>

          {/*loadingCharacter && <Spinner />*/}          
        <div className="modal-info-acordeon" id="modalAcordeon">
          { loadingCharacter ? <Spinner />
            : <div style={myCss} id="modalInfoAcordeonContent">
              { resultComics.results && resultComics.results.map(comic => (
                  <div className="comicItem" key={comic.id}>
                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} className="comicImage"/>
                    <div className="comicDetails">
                      <p className="comicDetails-title">{comic.title}</p>
                      <p className="comicDetails-digitalId">{comic.digitalId}</p>
                    </div>
                  </div>
                ))
              }
              { resultEvents.results && resultEvents.results.map(event => (
                  <div key={event.id} className="eventItem">
                    <img src={`${event.thumbnail.path}.${event.thumbnail.extension}`} className="eventImag" />
                    <div className="eventItem-content">
                      <p className="eventItem-title">{event.title}</p>
                      <p className="eventItem-description">{event.description}</p>
                      <p className="eventItem-modified">
                        <span>Date of modification:</span>{" "}
                        {formatDate(event.modified)}
                      </p>
                      <p className="eventItem-start">
                        <span>Date of start:</span>{" "}
                        {formatDate(event.start)}
                      </p>
                      <p className="eventItem-end">
                        <span>Date of end:</span>{" "}
                        {formatDate(event.end)}
                      </p>
                    </div>
                  </div>
                ))
              }
              { resultSeries.results && resultSeries.results.map(serie => (
                  <div key={serie.id} className="serieItem">
                    <img src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`} className="serie-image"/>
                    <div className="serie-content">
                      <p className="serieItem-title">{serie.title}</p>
                      <p className="serieItem-start">{serie.startYear}</p>
                      <p className="serieItem-end">{serie.endYear}</p>
                      <p className="serieItem-modified">{serie.modified}</p>
                    </div>
                  </div>
                ))
              }
              { resultStories.results && resultStories.results.map(storie => (
                  <div key={storie.id} className="storieItem">
                    <div className="storieItem-content">
                      <p className="storieItem-title">{storie.title}</p>
                      <p className="storieItem-description">{storie.description}</p>
                      <p className="storieItem-modified">
                        <span>Date of modification:</span>{" "}
                        {formatDate(storie.modified)}
                      </p>
                      {
                        storie.creators.items.map(item => (
                          <p key={item.name}>
                            <span>Creators: </span>{item.name}
                          </p>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          }
        </div>
      </Modal>
    </div>
  )
}