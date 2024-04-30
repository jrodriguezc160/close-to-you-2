const ProfileCard = () => {
  const Linkify = ({ children }) => {
    const isUrl = word => {
      const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
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

  return (
    <div className="profile-card">
      <div className="profile-pic"></div>
      <div className="profile-text">
        <div className="profile-name">rodleyy</div>
        <div className="profile-username">rodleyy</div>
        <div className="profile-desc">
          <Linkify>
            her's, muad'dib, spiderman, croquetas, cat owner, heartstopper, breakfast club https://boxd.it/71Omx
          </Linkify>
        </div>

        <div className="profile-buttons">
          <div className="nav-button"><i data-feather="user-plus"></i><span>Seguir</span></div>
          <div className="nav-button"><i data-feather="package"></i><span>Ver colecciones</span></div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard;