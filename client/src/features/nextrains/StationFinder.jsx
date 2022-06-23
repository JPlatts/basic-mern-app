import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { searchStations, reset } from './stationSlice'
import { toast } from 'react-toastify';
import Spinner from '../../app/Spinner';
import AutoSuggest from 'react-autosuggest';
import TrainImage from './TrainImage';

function StationFinder({stationChosen}) {

  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const { stations, isError, message, isLoading} = useSelector((state) => state.stations)

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
    dispatch(reset());
  },[dispatch, isError, message]);

  const onSuggestionsFetchRequested = (r) => {
    dispatch(searchStations({searchText:r.value}))
  }

  const onSuggestionsClearRequested = () => {
    dispatch(reset);
  }

  const getSuggestionValue = (s) => {
    return s.gtfsCode;
  }

  const renderSugg = s => (
    <div>
      {`${s.name} - ${s.line}`}<br />
      {s.routes.map((r) => {return (<TrainImage key={r.route} route={r}></TrainImage>)})}
      </div>
    
  );

  const inputProps = {
    placeholder: 'Find a station',
    value:searchText,
    onChange: (event, {newValue}) => {
      setSearchText(newValue);
    }
  };

  

  return (
    <div className="box">
      <AutoSuggest className='input'
        suggestions={stations} 
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}  
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSugg} 
        inputProps={inputProps}
        onSuggestionSelected={(e,v)=>stationChosen(v.suggestionValue)} />

      
      <div className="section">
        {isLoading && (<Spinner>GETTIN DEM STATIONS..</Spinner>)}
      </div>
    </div>
    )
}

export default StationFinder;