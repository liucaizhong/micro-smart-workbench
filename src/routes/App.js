// configure router
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AsyncComponent from '../components/AsyncComponent'

const AsyncCommission = AsyncComponent(
  () => import('../components/Commission'),
)

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={AsyncCommission} />
    </Switch>
  </Router>
)

export default App
