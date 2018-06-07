import { connect } from 'react-redux'
import AnnualReview from '../components/AnnualReview'

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
  }
}

const CAnnualReview = connect(
  mapStateToProps,
)(AnnualReview)

export default CAnnualReview
