import { useSelector } from 'react-redux';

function AccountConfirmation() {

  const { user } = useSelector((s) => s.auth);
  
  if (!user.confirmationDate) {
    return (
      <div className="modal fade" id="staticBackdrop">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Understood</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (<></>);
  }
  

}
export default AccountConfirmation