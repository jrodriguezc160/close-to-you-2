const Loading = ({ loading }) => {
  return (
    <div className={`modal-screen ${loading ? 'visible' : ''}`} style={{ height: '100vh', zIndex: '200', }}>
      <div className={`modal-message ${loading ? 'visible' : ''}`} style={{ zIndex: '201', gap: '1rem', visibility: loading ? 'visible' : 'hidden', opacity: loading ? 1 : 0 }}>
        <i data-feather="loader" className='loader'></i>
        <p>Cargando...</p>
      </div>
    </div>
  )
}

export default Loading;