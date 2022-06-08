import { FaHome, FaDice, FaTrain, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const { Link } = require('react-router-dom');

function Home() {

  const {user} = useSelector((s) => (s.auth))
  

  return (
    <div className="container">
      <div className=" hero content">
        <h1><FaHome /> Home </h1>
      </div>
      <hr />
      
      <div className="columns">
        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <FaDice className='icon-48' />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">Decider</p>
                  <p className="subtitle is-6">#HelpMeChoose</p>
                </div>
              </div>
              <div className="content">
                Having trouble making up your mind?!? Add your options 
                to a list and let the Decider pick for you. Create as 
                many decider lists as you want. They'll be here when 
                you come back.
              </div>
              <div className="content">
                {!user && <Link className='button is-link is-outlined' to="/login"><FaChevronRight /> Login to Access</Link>}
                {user && <Link className='button is-link is-outlined' to="/deciders"><FaChevronRight />Decider</Link>}
              </div>
              
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <FaTrain className='icon-48' />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">NexTrain</p>
                  <p className="subtitle is-6">#GetHome</p>
                </div>
              </div>
              <div className="content">
                Choose your favorite MTA subway stations to have 
                instant access to upcoming departure times (updated 
                in real time). Always available. No more fumbling 
                between apps and refreshing to see how long you're 
                going to wait or if you should start running :-)
              </div>
              <div className="content">
                <Link className='button is-link is-outlined' to="/"><FaChevronRight /> Coming Soon</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <FaInfoCircle className='icon-48' />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">About me</p>
                  <p className="subtitle is-6">#Hello</p>
                </div>
              </div>
              <div className="content">
                Hi! I'm Joe Platts, the author of this website. 
                I've been developing for 15 plus years (mostly 
                on the Microsoft stack). This appliction was 
                created as I am learning how to build in the 
                MERN stack. It is super nice to be able to build 
                everthing with JavaScript! See the about page 
                for a link to my GitHub for this project.
              </div>
              <div className="content">
                <Link className='button is-link is-outlined' to="/about"><FaChevronRight /> About</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;