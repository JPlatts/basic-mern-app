
import { FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import {  deleteItem } from './deciderSlice'

function DeciderItem(props) {

  const dipatch = useDispatch();

  const removeItem = () => {
    dipatch(deleteItem({itemID:props.item._id}))
  }

  return (
    <div className={`panel-block ${props.item.isChosen ? 'is-active' : ''}`}>
      <span className="panel-icon is-left"><FaTrashAlt onClick={removeItem} /></span>
      {props.item && props.item.text}
    </div>
  );
}
export default DeciderItem