import { FaPlusCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { searchStations, reset } from './stationSlice'
import { toast } from 'react-toastify';

import AutoSuggest from 'react-autosuggest';
import TrainImage from './TrainImage';

function NextrainForm({stationChosen}) {

  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const { stations, isError, message, } = useSelector((state) => state.stations)

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
    let r = {stationID: s._id};
    return JSON.stringify(r);

  }

  const renderSugg = s => (
    <div>
      {`${s.name} - ${s.line}`}<br />
      {s.routes.map((r) => {return (<TrainImage key={r.route} route={r}></TrainImage>)})}
      </div>
    
  );

  const inputProps = {
    placeholder: 'Find an MTA subway station to add',
    value:searchText,
    onChange: (event, {newValue}) => {
      setSearchText(newValue);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="columns is-mobile">
          <div className="column is-12">
                <div className="control has-icons-left">
                  <AutoSuggest suggestions={stations} 
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}  
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSugg} 
                    inputProps={inputProps}
                    onSuggestionSelected={(e,v)=> {stationChosen(v.suggestionValue); setSearchText('')}} />

                  <span className="icon is-left">
                    <FaPlusCircle />
                  </span>
                </div>
              </div>
              {/* <div className="column is-3 has-text-right">
                <button className="button is-info is-fullwidth" ><FaPlusCircle />&nbsp;Add</button>
              </div> */}
            </div>
          </div>
        
      
    </div>
  );
}
export default NextrainForm;