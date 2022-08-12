import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteStation } from './nextrainSlice'
import TrainImage from './TrainImage'

function Nextrain(props) {
  
  const dispatch = useDispatch();
  
  const deleteMe = () => {
    dispatch(deleteStation(props.nextrain.station));
  }
  return (
    <div className="container">
      <div className="card">
        <header className="card-header">
          <span className="card-header-title">{props.nextrain && props.nextrain.station.name} - {props.nextrain && props.nextrain.station.line}</span>
          <button className="card-header-icon">
            <span className="icon" title="Remove station">
              <FaTrashAlt onClick={deleteMe} />
            </span>
          </button>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="columns">
              <div className="column is-half">
                <table className="table">
                  <tr>
                    <th colSpan="2">{props.nextrain && props.nextrain.station.northLabel}</th>
                  </tr>
                  {props.nextrain.uptownTimes.map((n) => ( <tr key={`${n.stops}${n.route.route}`}><td><TrainImage route={n.route} /></td><td>{n.stops[0]}</td></tr>))}
                </table>
              </div>
              <div className="column is-half">
                <table className="table">
                  <tr>
                    <th colSpan="2">{props.nextrain && props.nextrain.station.southLabel}</th>
                  </tr>
                  {props.nextrain.downtownTimes.map((n) => ( <tr key={`${n.stops}${n.route.route}`}><td><TrainImage route={n.route} /></td><td>{n.stops[0]}</td></tr>))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default Nextrain;