import Loader from 'react-loader-spinner'
import './index.css'

const RenderLoading = () => (
  <div className="loader-container">
    <Loader
      data-testid="loader"
      type="TailSpin"
      height={35}
      width={380}
      color=" #D81F26"
    />
  </div>
)

export default RenderLoading
