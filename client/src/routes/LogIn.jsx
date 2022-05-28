import React from 'react'; // get the React object from the react module

class LogIn extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
          username: '',
          password: ''
      }
  }
  componentDidMount() {
    let [a,b] = foo();
    function foo() {
      let x = 1;
      let y = 2;
      return [x,y];
    }
    console.log(a);
    console.log(b);
  }
  componentWillUnmount() {

  }

  handleSubmit = (e) => {
    console.log('submission');
    e.preventDefault();
  }

  handleChange  = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }


  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col">
              U: {this.state.username}
            </div>
          </div>
          <div className="row">
            <div className="col">
              P: {this.state.password}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor="txtUsername" className="form-label">Username</label>
                <input type="email" className="form-control" id="txtUsername" name="username" onChange={(e) => this.handleChange(e)} />
                <label htmlFor="txtPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="txtPassword" name="password" onChange={(e) => this.handleChange(e)} />
                <button type="submit" className="btn btn-primary">Log In</button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default LogIn;