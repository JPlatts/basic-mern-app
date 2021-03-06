import { FaPlusCircle, FaDice, FaTrashAlt } from 'react-icons/fa'
import DeciderItem from './DeciderItem';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {  deleteDecider, addItem, decide } from './deciderSlice'

function Decider(props) {
  
  const dispatch = useDispatch();

  const [newItemText, setItemText] = useState('');

  const addNewItem = () => {
    dispatch(addItem({deciderID: props.decider._id, text: newItemText}));
    setItemText('');
  };

  const deleteMe = () => {
    dispatch(deleteDecider({ deciderID: props.decider._id }));
  }

  const handleReturn = (e) => {
    if(e.key === 'Enter') {
      addNewItem();
    }
  }

  const makeDecision = () => {
    dispatch(decide(props.decider._id))
  }
  
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-three-fifths is-offset-one-fifth">
          <article className="panel is-info">
            <div className="panel-heading">
              <div className="columns is-mobile">
                <div className="column is-11">
                  {props.decider && props.decider.name}
                </div>
                <div className="column is-1">
                  <FaTrashAlt onClick={deleteMe} />
                </div>  
              </div>
            </div>
            
            {props.decider.items.map((item) => (
              <DeciderItem key={item._id} item={item} />
            ))}

            <div className="panel-block">
              <p className="control has-icons-left">
                <input autoFocus className="input is-success" type="text" placeholder="Add new item" onChange={(e) => setItemText(e.target.value)} value={newItemText} onKeyUp={(e) => handleReturn(e)} />
                <span className="icon is-left">
                  <FaPlusCircle />
                </span>
              </p>&nbsp;
              <button className="button is-info" onClick={addNewItem}><FaPlusCircle />&nbsp;Add</button>
            </div>
            <div className="panel-block">
              <button className="button is-info" onClick={makeDecision} ><FaDice />&nbsp;Decide </button>
            </div>
          </article>

          
        </div>
      </div>
    </div>
  );

}
export default Decider;