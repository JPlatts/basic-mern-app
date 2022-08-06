import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteStation } from './nextrainSlice'
import TrainImage from './TrainImage'

function Nextrain(props) {
  
  const dispatch = useDispatch();
  
  const deleteMe = () => {
    dispatch(deleteStation(props.nextrain.station));
  }
    console.log(props)
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth">
          <article className="panel is-info">
            <div className="panel-heading">
              <div className="columns is-mobile">
                <div className="column is-11">
                  {props.nextrain && props.nextrain.station.name} - {props.nextrain && props.nextrain.station.line}
                </div>
                <div className="column is-1">
                  <FaTrashAlt onClick={deleteMe} />
                </div>  
              </div>
            </div>
            <div className="panel-block">
              <div className="tile is-ancestor">
                <div className="tile is-half"><h3>{props.nextrain && props.nextrain.station.northLabel}</h3></div>
                <div className="tile"><h3>{props.nextrain && props.nextrain.station.southLabel}</h3></div>
              </div>
            </div>
            <div className="panel-block">
              <div className="tile is-ancestor">
                <div className="tile is-vertical is-6">
                  {props.nextrain.uptownTimes.map((n) => ( <p key={`${n.stops}${n.route.route}`}><TrainImage route={n.route} /> {n.stops[0]}</p>))}
                </div>
                <div className="tile is-vertical is-6">
                  {props.nextrain.downtownTimes.map((n) => ( <p key={`${n.stops}${n.route.route}`}><TrainImage route={n.route} /> {n.stops[0]}</p>))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );

}
export default Nextrain;