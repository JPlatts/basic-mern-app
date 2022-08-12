import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteStation } from './nextrainSlice'
import TrainImage from './TrainImage'
import Spinner from '../../app/Spinner';

function Nextrain(props) {
  
  const dispatch = useDispatch();
  
  const fmtStopDate = (d) => {
    let dt = new Date(d);
    var hours = dt.getHours();
    var minutes = dt.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  }

  const getMins = (d) => {
    let dt = new Date(d);
    return parseInt(Math.abs(dt.getTime() - new Date().getTime()) / (1000 * 60) % 60);
  }

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
            {props.loading && <Spinner>Loading Nextrains ...</Spinner>}
            <div className="columns">
              <div className="column is-half">
                <table className="table">
                  <tbody>
                    <tr>
                      <th colSpan="3">{props.nextrain && props.nextrain.station.northLabel}</th>
                    </tr>
                    {props.nextrain.uptownTimes.map((n) => ( <tr key={`${n.stopDate}${n.route.route}`}><td><TrainImage route={n.route} /></td><td>{fmtStopDate(n.stopDate)}</td><td>{getMins(n.stopDate)} mins</td></tr> ))}
                  </tbody>
                </table>
              </div>
              <div className="column is-half">
                <table className="table">
                  <tbody>
                    <tr>
                      <th colSpan="3">{props.nextrain && props.nextrain.station.southLabel}</th>
                    </tr>
                    {props.nextrain.downtownTimes.map((n) => ( <tr key={`${n.stopDate}${n.route.route}`}><td><TrainImage route={n.route} /></td><td>{fmtStopDate(n.stopDate)}</td><td>{getMins(n.stopDate)} mins</td></tr> ))}
                  </tbody>
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