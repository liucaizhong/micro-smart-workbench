import { connect } from 'react-redux'
import Commission from '../components/Commission'
import { setCommissionCond } from '../actions/index'

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
    commissionCond: state.commissionCond,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCommissionCond: (val) => {
      dispatch(setCommissionCond(val))
    },
  }
}

const CCommission = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Commission)

export default CCommission
