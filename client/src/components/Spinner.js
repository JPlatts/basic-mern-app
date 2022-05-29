import { FaCog } from 'react-icons/fa'

function Spinner (props) {
  return (
    <div className="section">
      <div className="columns is-mobile is-centered">
        <div className="column is-half has-text-centered">
          <h1 className='title'>
            <FaCog className='Spinner-spin' />
          </h1>
          {props.children}
        </div>
      </div>
    </div>
  )
}
export default Spinner;