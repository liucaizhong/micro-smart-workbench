import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Toast } from 'antd-mobile'
import { injectIntl, intlShape } from 'react-intl'
import Table from 'rc-table'
import 'rc-table/assets/index.css'
import { CATEGORY } from '../constants.js'

class PointsDetail extends Component {
  constructor(props) {
    super(props)

    const { pickedUser: [groupId, userId],
      pickedDate: [year, quarter],
      category } = props.commissionCond

    this.state = {
      groupId,
      userId,
      year,
      quarter,
      category,
      showId: CATEGORY.indexOf(category),
      data: [],
    }
  }

  componentDidMount() {
    const { intl, history } = this.props
    const { userId, category, year, quarter } = this.state
    Toast.loading(intl.formatMessage({
      id: 'Common.loading',
    }), 0)

    const urlGetPoints = process.env.NODE_ENV === 'production'
                ? './API/getPaidianDetail.php'
                : 'http://localhost:3000/getPointDetail'

    fetch(`${urlGetPoints}?userId=${userId}&year=${year}&quarter=${quarter}&category=${category}`, {
      method: 'GET',
    })
    .then((resp) => {
      // console.log('resp', resp)
      return resp.json()
    })
    .then((data) => {
      // console.log('data', data)
      if (data) {
        this.setState({
          data,
        })
      } else {
        history.push('/commission')
      }

      Toast.hide()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  composeTable = () => {
    const { showId, data } = this.state
    const { intl } = this.props

    const col = [{
      title: intl.formatMessage({
        id: 'Commission.commissionField0',
      }),
      dataIndex: 'customer',
      key: 'customer',
    }, {
      title: intl.formatMessage({
        id: 'Commission.pointField1',
      }),
      dataIndex: 'point',
      key: 'point',
    }]

    if (showId < 3) {
      return data.map((t, i) => {
        const d = t.map((row, k) => {
          return {
            ...row,
            key: k,
          }
        })

        return (
          <Table
            key={i}
            columns={col}
            data={d}
            title={() => {
              return (
                <div className="table-header">{intl.formatMessage({
                  id: `Common.customerLevel${i}`,
                })}</div>
              )
            }}
          />
        )
      })
    } else {
      const d = data.map((row, k) => {
        return {
          ...row,
          key: k,
        }
      })

      return (
        <Table
          columns={col}
          data={d}
        />
      )
    }
  }

  render() {
    return (
      <div className="point-detail">
        {this.composeTable()}
      </div>
    )
  }
}

PointsDetail.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  commissionCond: PropTypes.shape({
    pickedUser: PropTypes.array,
    pickedDate: PropTypes.array,
    category: PropTypes.string,
    customer: PropTypes.string,
  }).isRequired,
}

export default injectIntl(PointsDetail)
