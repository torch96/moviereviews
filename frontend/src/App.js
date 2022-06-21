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
     
      
        
      <header className="fixed-top ">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
        <li className="navbar-brand nav-item">

        <a className="navbar-brand" href="/home">Movie Reviews</a>
          </li>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              
            <li className="nav-item">
           <a className="nav-link" href="/movies">Movies</a>
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
            </ul>
         

          </div>
        </div>
      </nav>
      </header>
      
    <div>    
        
      

      <div className="container  main " >
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
    </div></div>
  );
}

export default App;
