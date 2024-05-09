import { useEffect } from 'react';
import { addElemento, deleteElemento, editElemento } from '../../services/ElementosServices';
import { useState } from 'react';
import { followUsuario, unfollowUsuario } from '../../services/UserServices';

const Result = ({ result, filtros, isFirstResult, isOpen, onClick, miColeccion, getColeccion, currentUser, idColeccion, setShowLimit, getUsuariosSeguidos, usuariosSeguidos }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);


  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const isSaved = miColeccion.some(item => item.id_api === result.id);
        setIsSaved(isSaved);

        const isFav = miColeccion.some(item => item.id_api === result.id && item.favorito === '1');
        setIsFav(isFav);
      } catch (error) {
        console.error('Error al verificar si el elemento está guardado');
      }
    };

    checkIfSaved();
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [miColeccion, result.id]);

  useEffect(() => {
    const checkIfFollowed = async () => {
      try {
        const isFollowed = usuariosSeguidos.some(item => item.id === result.id);
        setIsFollowed(isFollowed);
      } catch (error) {
        console.error('Error al verificar si el usuario es seguido')
      }
    }

    checkIfFollowed();
    // eslint-disable-next-line no-undef
    feather.replace();
  }, [usuariosSeguidos])

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

  // Guardar en colección, destacar y eliminar elementos
  const handleAddElemento = async (favorito) => {
    if (!isSaved) {
      try {
        await addElemento(currentUser, idColeccion, result.title, result.authors, result.image, result.id, favorito);
        await getColeccion();
        console.log('Elemento agregado con éxito');
      } catch (error) {
        console.log(result.image)
        console.error('Error al agregar el elemento');
      }
    } else {
      console.warn('Ya existe este elemento');
    }
  }

  const handleDeleteElemento = async () => {
    try {
      await deleteElemento(currentUser, result.id);
      await getColeccion();
      console.log('Elemento agregado con éxito');
    } catch (error) {
      console.error('Error al agregar el elemento');
    }
  }

  const handleEditElemento = async () => {
    // Verificar el número de elementos favoritos en la colección del usuario
    const favCount = miColeccion.filter(item => item.favorito === '1').length;
    const favLimit = idColeccion === 4 ? 5 : 3;

    let favorito = isSaved && !isFav ? 1 : 0; // Si está guardado y no es favorito, marcar como favorito (1), de lo contrario, no (0)

    if (favCount >= favLimit && favorito === 1) {
      setShowLimit(true);
    } else {
      if (!isSaved) {
        handleAddElemento(favorito);
      } else {

        try {
          await editElemento(currentUser, result.id, idColeccion, favorito)
          await getColeccion();
          console.log('Elemento editado con éxito');
        } catch (error) {
          console.log(result.image)
          console.error('Error al editar el elemento');
        }
      }
    }
  }

  // Seguir y dejar de seguir usuarios
  const handleFollowUser = async () => {
    if (!isSaved) {
      try {
        await followUsuario(result.id, currentUser);
        console.log('Usuario seguido con éxito');
        await getUsuariosSeguidos();
        setIsFollowed(true)
      } catch (error) {
        console.log(result.image)
        console.error('Error al agregar el elemento');
      }
    } else {
      console.warn('Ya existe este elemento');
    }
  }

  const handleUnfollowUser = async () => {
    try {
      await unfollowUsuario(result.id, currentUser)
      await getColeccion();
      setIsFollowed(false)
      console.log('Elemento agregado con éxito');
    } catch (error) {
      console.error('Error al agregar el elemento');
    }
  }

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Si el usuario actual no siga al usuario mostrado... */}
              {isFollowed ? (
                <div className={`nav-button ${!isOpen && 'no-text'} selected`} onClick={handleUnfollowUser}><i data-feather="user-plus"></i><span>Seguido</span></div>
              ) : (
                <div className={`nav-button ${!isOpen && 'no-text'}`} onClick={handleFollowUser}><i data-feather="user-plus"></i><span>Seguir</span></div>
              )}
              <div className={`nav-button ${!isOpen && 'no-text'}`}><i data-feather="external-link"></i><span>Ver perfil</span></div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {/* Si el resultado está guardado en la colección... */}
              {isSaved ? (
                <div className={`nav-button ${!isOpen && 'no-text'} selected`} onClick={handleDeleteElemento}><i data-feather="check-circle"></i><span>Guardado</span></div>
              ) : (
                <div className={`nav-button ${!isOpen && 'no-text'}`} onClick={() => handleAddElemento(0)}><i data-feather="plus-circle"></i><span>Guardar</span></div>
              )}

              {/* Si el resultado está marcado como favorito... */}
              {isFav ? (
                <div className={`nav-button ${!isOpen && 'no-text'} selected`} onClick={handleEditElemento}><i data-feather="star"></i><span>Destacado</span></div>
              ) : (
                <div className={`nav-button ${!isOpen && 'no-text'}`} onClick={handleEditElemento}><i data-feather="star"></i><span>Destacar</span></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Result;