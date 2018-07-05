import { connect } from 'react-redux'
import SalesAnalysis from '../components/SalesAnalysis'

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
  }
}

const CSalesAnalysis = connect(
  mapStateToProps,
)(SalesAnalysis)

export default CSalesAnalysis
