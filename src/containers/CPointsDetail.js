import { connect } from 'react-redux'
import PointsDetail from '../components/PointsDetail'

const mapStateToProps = (state) => {
  return {
    commissionCond: state.commissionCond,
  }
}

const CPointsDetail = connect(
  mapStateToProps,
)(PointsDetail)

export default CPointsDetail
