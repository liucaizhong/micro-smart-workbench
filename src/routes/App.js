// configure router
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AsyncComponent from '../components/AsyncComponent'

const AsyncCommission = AsyncComponent(
  () => import('../containers/CCommission'),
)

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={AsyncCommission} />
    </Switch>
  </Router>
)

export default App
