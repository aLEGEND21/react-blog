import { useReducer } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './Profile';
import { SessionContext, SessionDispatchContext } from './Contexts';
import { sessionReducer } from './Reducers';
import Home from './pages';
import Login from './pages/login';
import Register from './pages/register';
import NewPost from './pages/newPost';
import Logout from './pages/logout';
import './App.css';

function App() {
  let [session, sessionDispatch] = useReducer(sessionReducer, {
    loggedIn: true ? UserProfile.username !== null : false,
    username: UserProfile.username,
    id: UserProfile.id,
  });

  return (
      <Router>
        <SessionContext.Provider value={session}>
          <SessionDispatchContext.Provider value={sessionDispatch}>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/posts/new" element={<NewPost />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </SessionDispatchContext.Provider>
        </SessionContext.Provider>
      </Router>
  )
}

export default App;