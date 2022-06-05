import { FaPlusCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import {  addDecider } from './deciderSlice'

function DeciderForm() {
  const dispatch = useDispatch();
  const [newDeciderText, setNewDeciderText] = useState('');
  
  const addNewDecider = () => {
    dispatch(addDecider({name:newDeciderText}));
  }

  const handleReturn = (e) => {
    if(e.key === 'Enter') {
      addNewDecider();
    }
  }

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth">
          <div className="box">
            <div className="columns is-mobile">
              <div className="column is-9">
                <p className="control has-icons-left">
                  <input className="input is-success" type="text" placeholder="Add new decider" onChange={(e) => setNewDeciderText(e.target.value)} value={newDeciderText} onKeyUp={(e) => handleReturn(e)} />
                  <span className="icon is-left">
                    <FaPlusCircle />
                  </span>
                </p>
              </div>
              <div className="column is-3 has-text-right">
                <button className="button is-info is-fullwidth" onClick={addNewDecider}><FaPlusCircle />&nbsp;Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeciderForm