import React from 'react';
import {
  Switch
} from 'react-router-dom';
import './App.css';
import {
  AuthRoute,
  ProtectedRoute
} from '../util/routeUtil';
import Sidebar from './sidebar/sidebarContainer';
import sessionContainer from './session/sessionContainer';
import uploaderContainer from './uploader/uploaderContainer';
import dashboardContainer from './dashboard/dashboardContainer';

function App() {
  return (
    <div className="App">
      <nav>
      <Sidebar />
      </nav>
      <main style={{ backgroundColor: '#f1f3f6' }}>
        <Switch>
           <AuthRoute exact path='/' component={ sessionContainer } />
           <AuthRoute exact path='/login' component={ sessionContainer } />
           <ProtectedRoute exact path='/uploader' component={ uploaderContainer } />
           <ProtectedRoute exact path='/dashboard' component={ dashboardContainer} />
           <ProtectedRoute exact path='/dashboard/:id' component={ dashboardContainer} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
