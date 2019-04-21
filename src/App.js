import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootswatch/dist/litera/variables";
// import "bootstrap/scss/bootstrap";
// import "bootswatch/dist/litera/bootswatch";

// import CreateTidbit from "./components/create-tidbit.component";
// import EditTidbit from "./components/edit-tidbit.component";
// import ListTidbits from "./components/list-tidbit.component";

import CreateStack from "./components/create-stack.component";
import EditStack from "./components/edit-stack.component";
import ViewStack from "./components/view-stack.component";
import ListStacks from "./components/list-stack.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <img src={logo} height="75" alt="bluehelmet.software" />
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Stacks
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/stack/create" className="nav-link">
                    Create Stack
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={ListStacks} />
          <Route path="/stack/edit/:id" component={EditStack} />
          <Route path="/stack/create" component={CreateStack} />
          <Route path="/stack/:id" component={ViewStack} />
        </div>
      </Router>
    );
  }
}

export default App;
