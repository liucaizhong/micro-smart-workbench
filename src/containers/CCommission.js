import { connect } from 'react-redux'
import Commission from '../components/Commission'

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }

const CCommission = connect(
  mapStateToProps,
)(Commission)

export default CCommission
