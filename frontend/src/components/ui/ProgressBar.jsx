const ProgressBar = ({ step, total }) => {
    const percent = Math.round((step / total) * 100)
  
    return (
      <div className="w-full">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    )
  }
  
  export default ProgressBar