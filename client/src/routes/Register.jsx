import React from 'react'; // get the React object from the react module

class Register extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        counta: 0
      };
      
  }
  bClicked = (e, d) => {
    console.log(e);
    console.log(d);
    this.setState(prevState => ({
      counta: prevState.counta + 1
    }));
  }

  render() {
    let m = 'miricow';
    return <div className="container">
        <div className="row">
            <div className="col">
                <button className="btn btn-primary" onClick={(e) => this.bClicked(e,m)}>
                    Clack Me! {this.state.counta}
                </button>
            </div>
        </div>
    </div>;
  }
}

export default Register;