// Result Card

const Result = ({ result, filtros, isFirstResult, isOpen, onClick }) => {

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

  return (
    <div className={classNames} onClick={onClick}>
      <div className={`result-pic ${filtros}-result`}>
        <img src={result.image} alt="result-pic" />
      </div>
      <div className="result-text">
        <div className="result-title">{result.title}</div>
        <div className="result-authors">{filtros === 'Usuarios' && '@'}{result.authors}</div>
        <div className="result-desc">
          <Linkify>{result.description}</Linkify>
        </div>

        <div className="result-buttons">
          <div className="nav-button"><i data-feather="user-plus"></i><span>Seguir</span></div>
          <div className="nav-button"><i data-feather="package"></i><span>Ver colecciones</span></div>
        </div>
      </div>
    </div>
  )
}

export default Result;