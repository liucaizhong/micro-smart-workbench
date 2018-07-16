// configure router
import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import { spring, AnimatedSwitch } from 'react-router-transition'
import AsyncComponent from '../components/AsyncComponent'

const AsyncCommission = AsyncComponent(
  () => import('../containers/CCommission'),
)
const AsyncAdminCommission = AsyncComponent(
  () => import('../containers/CAdminCommission'),
)
const AsyncPointsDetail = AsyncComponent(
  () => import('../containers/CPointsDetail'),
)
const AsyncCommissionsDetail = AsyncComponent(
  () => import('../containers/CCommissionsDetail'),
)
const AsyncAnnualReview = AsyncComponent(
  () => import('../containers/CAnnualReview'),
)
const AsyncInternManagement = AsyncComponent(
  () => import('../components/InternManagement'),
)
const AsyncInternDetail = AsyncComponent(
  () => import('../components/InternDetail'),
)
const AsyncSalesAnalysis = AsyncComponent(
  () => import('../containers/CSalesAnalysis'),
)

// const mapStyles = (styles) => {
//   return {
//     opacity: styles.opacity,
//     transform: `scale(${styles.scale})`,
//   }
// }
//
// // wrap the `spring` helper to use a bouncy config
// const bounce = (val) => {
//   return spring(val, {
//     stiffness: 330,
//     damping: 22,
//   })
// }
//
// // child matches will...
// const bounceTransition = {
//   // start in a transparent, upscaled state
//   atEnter: {
//     opacity: 0,
//     scale: 1.2,
//   },
//   // leave in a transparent, downscaled state
//   atLeave: {
//     opacity: bounce(0),
//     scale: bounce(0.8),
//   },
//   // and rest at an opaque, normally-scaled state
//   atActive: {
//     opacity: bounce(1),
//     scale: bounce(1),
//   },
// }

const App = () => (
  <Router>
    <Switch>
      {/* <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="route-wrapper"
      > */}
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to="/sales-analysis" />
        )}
      />
      <Route path="/commission" component={AsyncCommission} />
      <Route path="/upd-commission" component={AsyncAdminCommission} />
      <Route path="/points-detail" component={AsyncPointsDetail} />
      <Route path="/commissions-detail" component={AsyncCommissionsDetail} />
      <Route path="/annual-review" component={AsyncAnnualReview} />
      <Route path="/intern" component={AsyncInternManagement} />
      <Route path="/intern-detail/:id" component={AsyncInternDetail} />
      <Route
        path="/intern-add"
        render={(props) =>
          <AsyncInternDetail op={1} {...props} />
        }
      />
      {/* </AnimatedSwitch> */}
      <Route path="/sales-analysis" component={AsyncSalesAnalysis} />
    </Switch>
  </Router>
)

export default App
