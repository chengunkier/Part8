const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null
    }
  
    return (
      <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginBottom: '10px' }}>
        {errorMessage}
      </div>
    )
  }
  
  export default Notify