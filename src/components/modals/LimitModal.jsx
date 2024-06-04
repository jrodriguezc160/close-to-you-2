const LimitModal = ({ showLimit, setShowLimit, favLimit }) => {

  const handleClickExterior = (event) => {
    if (event.target.classList.contains('modal-screen')) {
      setTimeout(() => {
        setShowLimit(false)
      }, 1000);
    }
  }
  return (
    <div className={`modal-screen ${showLimit ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', }} onClick={handleClickExterior}>
      <div className={`modal-message ${showLimit ? 'visible' : ''}`} style={{ zIndex: '201', visibility: showLimit ? 'visible' : 'hidden', opacity: showLimit ? 1 : 0 }}>
        <i data-feather="alert-triangle"></i>

        <p>Límite de favoritos: {favLimit}</p>
        <p>Elimine un favorito para continuar</p>
      </div>
    </div>
  )
}

export default LimitModal;