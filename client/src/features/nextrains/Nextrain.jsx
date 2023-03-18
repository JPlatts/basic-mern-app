import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteStation } from './nextrainSlice'
import TrainImage from './TrainImage'
import Spinner from '../../app/Spinner';
import { fmtStopDate, getMins } from '../../modules/common';

function Nextrain(props) {
  
  const dispatch = useDispatch();

  const deleteMe = () => {
    dispatch(deleteStation(props.nextrain.station));
  }
  
  return (
    <div className="container mt-3">
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
            {props.loading && <Spinner>Loading Nextrains ...</Spinner>}
            {!props.loading &&  <div className="columns">
              <div className="column is-half">
                <table className="table">
                  <tbody>
                    <tr>
                      <th colSpan="3">{props.nextrain && props.nextrain.station.northLabel ? props.nextrain.station.northLabel : '[no northbound trains]'}</th>
                    </tr>
                    {props.nextrain.uptownTimes.map((n) => (n.route && <tr key={`${n.stopDate}${n.route.route}`}><td><TrainImage route={n.route} /></td><td>{fmtStopDate(n.stopDate)}</td><td>{getMins(n.stopDate)} mins</td></tr> ))}
                  </tbody>
                </table>
              </div>
              <div className="column is-half">
                <table className="table">
                  <tbody>
                    <tr>
                      <th colSpan="3">{props.nextrain && props.nextrain.station.southLabel ? props.nextrain.station.southLabel : '[no southbound trains]'}</th>
                    </tr>
                    {props.nextrain.downtownTimes.map((n) => (n.route && <tr key={`${n.stopDate}${n.route}`}><td><TrainImage route={n.route} /></td><td>{fmtStopDate(n.stopDate)}</td><td>{getMins(n.stopDate)} mins</td></tr> ))}
                  </tbody>
                </table>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );

}
export default Nextrain;