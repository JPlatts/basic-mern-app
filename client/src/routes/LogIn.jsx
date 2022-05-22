import React from 'react'; // get the React object from the react module

class LogIn extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
          user: {name: 'Pete'},
          date: new Date()
      }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
        this.tock()
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tock() {
    this.setState({
        user: {name: this.state.user.name + ' colon'},
        date: new Date()
    });
  }

  render() {
    console.log(this.props);
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                <p>Hello, Logga!</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {this.state.user.name}
                </div>
                <div className="col">
                    {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
                </div>
            </div>
        </div>
    )
    ;
  }
}

export default LogIn;