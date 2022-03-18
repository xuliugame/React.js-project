import { Link, Outlet } from 'react-router-dom';

function App () {
  return (<div>
      {/*render the navbar*/}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" aria-current="page">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page">Bug List</Link>
              </li>
              <li className="nav-item">
                <Link to="/user" className="nav-link" aria-current="page">Add User</Link>
              </li>
              <li className="nav-item">
                <Link to="/bug" className="nav-link" aria-current="page">Add Bug</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/*render the router*/}
      <br/>
      <div className={'container'}>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
