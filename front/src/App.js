import { Home } from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Setting from './Pages/setting/Setting';
import Single from './Pages/Single/Single';
import Write from './Pages/write/Write';
import Topbar from './src/topbar/Tobbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useContext } from 'react';
import { Context } from './Context/context';

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <Topbar/>
      <Switch>
        <Route exact path="/">
          {user? <Home/> : <Login />}
        </Route>
        <Route path="/register">
          {user? <Home/> : <Register />}
        </Route>
        <Route path="/login">
          {user? <Home/> : <Login />}
        </Route>
        <Route path="/write">
          {user? <Write/> : <Login />}
        </Route>
        <Route path="/setting">
        {user? <Setting/> : <Login />}
        </Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
