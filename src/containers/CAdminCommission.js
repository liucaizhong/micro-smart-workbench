import { connect } from 'react-redux'
import AdminCommission from '../components/AdminCommission'

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
  }
}

const CAdminCommission = connect(
  mapStateToProps,
)(AdminCommission)

export default CAdminCommission
