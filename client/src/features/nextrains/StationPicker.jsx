import React,{useState} from 'react'
import { FaPlusCircle } from 'react-icons/fa';
import TrainImage from './TrainImage';
import useStationSearch from './useStationSearch';

function StationPicker({stationChosen}) {
  const [searchStr, setSearchStr] = useState('');
  const {stations} = useStationSearch(searchStr);
  
  const chooChooChooseMe = (station) => {
    setSearchStr('');
    stationChosen && stationChosen(station);
  }
  
   const stationBoxes = stations && stations.map(s => (
    <div key={s._id} className="box is-clickable has-background-light" onClick={() => chooChooChooseMe(s)}>
      {s.routes.map((r) => {return (<TrainImage key={r.route} route={r} />)})} &nbsp; {s.name} - {s.line}
    </div>
   ));

  return (
    <div className="container">
      <div className="box">
        <div className="columns is-mobile">
          <div className="column is-12">
            <div className="control has-icons-left">
              <input type="text" className="input" value={searchStr} onChange={(e) => {setSearchStr(e.target.value)}} placeholder="Search for an MTA train station" />            
              <span className="icon is-left">
                <FaPlusCircle />
              </span>
            </div>
            {stationBoxes}
          </div>
        </div>
      </div>
    </div>        
  )
}

export default StationPicker