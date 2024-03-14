import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Components/Header'
import Home from './Pages/Home'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from './Contexts.js';
import AuthenticationAPI from './APIs/AuthenticationAPI';
import BrowseApplications from './Pages/BrowseApplications.jsx';
import BrowseProposals from './Pages/BrowseProposals.jsx';
import MyProposals from './Pages/MyProposals.jsx';
import StudentApplications from './Pages/StudentApplications.jsx';
import StudentRequest from './Pages/StudentRequest.jsx';
import BrowseRequests from './Pages/BrowseRequests.jsx';
import { ToastContainer} from 'react-toastify';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let _user = new Promise((resolve, reject) => {
      AuthenticationAPI.getSessionAPI()
        .then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
    });

    Promise.all([_user]).then(async values => {
      if (values[0].status === 200)
        setUser(await values[0].json());
      else {
        setUser(null);
        window.location.href = "http://localhost:3000/login";
      }

      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <>
      {
        isLoading ? <div>Loading...</div> :
          <Router>
            <UserContext.Provider value={{ user, setUser }}>
              <div className="App">
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/browse-applications" element={<BrowseApplications />} />
                  <Route path="/browse-proposals" element={<BrowseProposals />} />
                  <Route path="/my-proposals" element={<MyProposals />} />
                  <Route path="/student-applications" element={<StudentApplications />} />
                  <Route path="/student-request" element={<StudentRequest />} />
                  <Route path="/secretary-requests" element={<BrowseRequests />} />
                  <Route path="/prof-requests" element={<BrowseRequests />} />
                </Routes>
                <ToastContainer />
              </div>
            </UserContext.Provider>
          </Router>
      }
    </>
  )
}

export default App
