import { FaCog } from 'react-icons/fa'

function Spinner (props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>
            <FaCog className='Spinner-spin' />
          </h1>
          {props.children}
        </div>
      </div>
    </div>
  )
}
export default Spinner;