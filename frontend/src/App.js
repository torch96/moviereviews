import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AddReview from "./components/add-review";
import Movie from "./components/movies";
import MoviesList from "./components/movies-list";
import Home from "./components/home";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
  }
  

  return (
    
   <div>
     
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/movies" className="nav-item">
          <img className="logo" src="" alt=""></img>
          
        </a>
        <a href="/" className="navbar-brand">

          
        <Link to={"/home"} className="nav-link"> 
          Movie Reviews
        </Link>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/movies"} className="nav-link">
              Movies
            </Link>
          </li>
          <li className="nav-item" >
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
            )}

          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>

        <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path={["/", "/movies"]} component={MoviesList} />
          
          <Route 
            path="/movies/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/movies/:id"
            render={(props) => (
              <Movie {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>

      
      <footer className="container">
        <p className="float-end"><a href="#">Back to top</a></p>
        <p>© 2017–2021 Company, Inc. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
      </footer>
    </div>
  );
}

export default App;
