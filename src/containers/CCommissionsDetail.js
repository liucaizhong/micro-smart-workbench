import { connect } from 'react-redux'
import CommissionsDetail from '../components/CommissionsDetail'

const mapStateToProps = (state) => {
  return {
    commissionCond: state.commissionCond,
  }
}

const CCommissionsDetail = connect(
  mapStateToProps,
)(CommissionsDetail)

export default CCommissionsDetail
