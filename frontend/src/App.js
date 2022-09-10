import React, { useState, useEffect } from "react";
import { useHistory,Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import AddReview from "./components/add-review";
import Movie from "./components/movies";
import MoviesList from "./components/movies-list";
import Home from "./components/home";
import Login from "./components/login";
import SignUp from "./components/register";
import loginDataService from "./services/loginAuth";

function App() {
  const [user, setUser] = React.useState(false);
  const history = useHistory();
  useEffect(() => {
    isLoggedIn()}, []);

  async function isLoggedIn() {
    if (loginDataService.getUser() != null) {
      
     setUser(true);
    }else {
      setUser(null);
    }
    
    
    }

  async function logout() {
    
    loginDataService.logout(localStorage.getItem("jwt"))
    .then( response =>{
      history.push("/" );
      history.go(0);
    }
    );

    setUser(null)
  }
  
  //window.addEventListener('load', login());
  

  return (
    
   <div>
     
      
        
      <header className="fixed-top ">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
        <li className="">

        <a className="navbar-brand" href="#/movies">{}Movie Reviews</a>
          </li>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              
            <li className="nav-item">
                <Link to={"/movies"} className="nav-link"> search
                </Link>
          </li>
              
            { (localStorage.getItem("jwt") != null) ? (
              <li className="nav-item" >
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {}
              </a>
            </li>
            ) : (        
            <><li className="nav-item">
                      <Link className="nav-link" to={"/users/login"}>Login
                      </Link>
                    </li><li className="nav-item">
                        <Link className="nav-link" to={"/users/register"}>register
                        </Link>
                      </li></>
            )}

          
          
          
            </ul>
         

          </div>
        </div>
      </nav>
      </header>
      
    <div>    
        
      

      <div className="container-lg  main " >
        <Switch  >

        
          <Route exact path={["/","/movies"]} component={MoviesList} />
          
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
            path="/users/login"
            render={(props) => (
              <Login {...props} login={Login} />
            )}
          />
          <Route 
            path="/users/register"
            render={(props) => (
              <SignUp {...props} SignUp={SignUp} />
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
