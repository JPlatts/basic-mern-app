import mongoLogo from '../assets/mongo-logo.png';
import expressLogo from '../assets/express-logo2.png';
import reactLogo from '../assets/react-logo.png';
import nodeLogo from '../assets/node-logo.svg';
const { FaInfoCircle, FaGithub } = require('react-icons/fa');

function About() {

  const handleClick = (e) => {
    window.open('https://github.com/JPlatts/basic-mern-app');
  }

  return (
    <div className="container">
      <div className="content">
        <h1><FaInfoCircle /> About </h1>
      </div>
      <hr />
      <div className="content">
        I put this web application together as I was learning how to build on the MERN stack.
        This is a basic single page web application (SPA) with an API for JWT based authentication, account registration, and password management.
        I exposed all of my source code for this project on  GitHub.
      </div>
      <div className="content">
      <button type="button" className=' button is-primary' onClick={handleClick}><FaGithub />&nbsp;GitHub</button>
      </div>
      <div className="columns">
        <div className="column has-text-centered" >
          <figure className="image is-128x128 is-inline-block">
            <img src={mongoLogo} alt="MongoDB"></img>
          </figure>
        </div>
        <div className="column has-text-centered" >
          <figure className="image is-128x128 is-inline-block">
            <img src={expressLogo} alt="Express"></img>
          </figure>
        </div>
        <div className="column has-text-centered" >
          <figure className="image is-128x128 is-inline-block">
            <img src={reactLogo} alt="React"></img>
          </figure>
        </div>
        <div className="column has-text-centered" >
          <figure className="image is-128x128 is-inline-block">
            <img src={nodeLogo} alt="Node"></img>
          </figure>
        </div>
      </div>
    </div>


  );

}
export default About;