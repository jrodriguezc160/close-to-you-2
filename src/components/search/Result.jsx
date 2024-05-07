import { useEffect } from 'react';
import { addElemento } from '../../services/ElementosServices';
import { useState } from 'react';

const Result = ({ result, filtros, isFirstResult, isOpen, onClick, miColeccion, getColeccion, currentUser, idColeccion }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const isSaved = miColeccion.some(item => item.id_api === result.id);
        setIsSaved(isSaved);

        const isFav = miColeccion.find(item => item.id_api === result.id && item.favorito === '1');
        setIsFav(isFav);
      } catch (error) {
        console.error('Error al verificar si el elemento está guardado');
      }
    };

    checkIfSaved();
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [miColeccion, result.id]);

  // Función para detectar enlaces
  const Linkify = ({ children }) => {
    if (typeof children !== 'string') {
      return children;
    }

    const isUrl = word => {
      const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
      return word.match(urlPattern)
    }

    const addMarkup = word => {
      return isUrl(word) ?
        `<a href="${word}">${word}</a>` :
        word
    }

    const words = children.split(' ')
    const formatedWords = words.map((w, i) => addMarkup(w))
    const html = formatedWords.join(' ')
    return (<span dangerouslySetInnerHTML={{ __html: html }} />)
  }

  // Clase .open para el primer renderizado
  let classNames = "result";
  if (isFirstResult && isOpen) {
    classNames += " open";
  } else if (isOpen) {
    classNames += " open";
  }

  const handleAddElemento = async () => {
    if (!miColeccion.some(item => item.id_api === result.id)) {
      try {
        await addElemento(currentUser, idColeccion, result.title, result.authors, result.image, result.id, 0);
        await getColeccion();
        console.log('Elemento agregado con éxito');
        console.log(isSaved)
      } catch (error) {
        console.log(result.image)
        console.error('Error al agregar el elemento');
      }
    } else {
      console.warn('Ya existe este elemento')
    }
  }

  /*   const handleDeleteElemento = async () => {
      try {
        await deleteElemento(result.id, 0);
        await getColeccion();
        console.log('Elemento agregado con éxito');
      } catch (error) {
        console.error('Error al agregar el elemento');
      }
    } */

  return (
    <div className={classNames} onClick={onClick}>
      <div className={`result-pic ${filtros}-result`}>
        <img src={result.image} alt="result-pic" />
      </div>
      <div className="result-text">
        <div className="result-title">{result.title}</div>
        <div className="result-authors">{filtros === 'users' && '@'}{result.authors}</div>
        <div className="result-desc">
          <Linkify>{result.description}</Linkify>
        </div>

        <div className="result-buttons">
          {filtros === 'users' ? (
            <>
              <div className={`nav-button ${!isOpen && 'no-text'}`}><i data-feather="user-plus"></i><span>Seguir</span></div>
              <div className={`nav-button ${!isOpen && 'no-text'}`}><i data-feather="external-link"></i><span>Ver perfil</span></div>
            </>
          ) : (
            <>
              {/* Si el resultado está guardado en la colección... */}
              {isSaved ? (
                <div className={`nav-button ${!isOpen && 'no-text'} selected`}><i data-feather="check-circle"></i><span>Guardado</span></div>
              ) : (
                <div className={`nav-button ${!isOpen && 'no-text'}`} onClick={handleAddElemento}><i data-feather="plus-circle"></i><span>Guardar</span></div>
              )}

              {/* Si el resultado está marcado como favorito... */}
              {isFav ? (
                <div className={`nav-button ${!isOpen && 'no-text'} selected`}><i data-feather="star"></i><span>Destacado</span></div>
              ) : (
                <div className={`nav-button ${!isOpen && 'no-text'}`}><i data-feather="star"></i><span>Destacar</span></div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Result;