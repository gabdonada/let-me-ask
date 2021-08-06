import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {AuthContextProvider} from './contexts/AuthContext'
import { Room } from './pages/Room';

function App() {

  

  return (

    <BrowserRouter>
      <AuthContextProvider>
        <Switch> {/** Prevents the router to load more pages instead of the one opened (as the exact below) */}
          <Route path="/" exact component={Home}/> {/** Exact is needed to the page doesn't load the other routes as well */}
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
