import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../components/Header'
import TaskDashboardPage from '../components/TaskDashboardPage/TaskDashboardPage';
import AnalyticsPage from '../components/AnalyticsPage';
import LoginPage from '../components/LoginPage';
import React from 'react';


const AppRouter = () => (
      <BrowserRouter>
        <div>
          <Header />
        </div>
        <Switch>
          <Route exact path="/" component={TaskDashboardPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route exact path="/analytics" component={AnalyticsPage} />
        </Switch>
      </BrowserRouter>
    );
  
  export default AppRouter;