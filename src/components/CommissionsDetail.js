import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Toast } from 'antd-mobile'
import { injectIntl, intlShape } from 'react-intl'
import Table from 'rc-table'
import 'rc-table/assets/index.css'
import Icon from './CustomIcon'

class CommissionsDetail extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    history: PropTypes.object.isRequired,
    commissionCond: PropTypes.shape({
      pickedUser: PropTypes.array,
      pickedDate: PropTypes.array,
      category: PropTypes.string,
      customer: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props)

    const { pickedUser: [groupId, userId],
      pickedDate: [year, date],
      customer } = props.commissionCond

    this.state = {
      groupId,
      userId,
      year,
      date,
      customer,
      data: [],
    }
  }

  async componentDidMount() {
    const { intl, history } = this.props
    const { userId, customer, year, date } = this.state
    Toast.loading(intl.formatMessage({
      id: 'Common.loading',
    }), 0)

    const urlGetCommissions = process.env.NODE_ENV === 'production'
            ? './API/getYongjinDetail.php'
            : 'http://localhost:3000/getCommissionDetail'

    const resp = await fetch(`${urlGetCommissions}?userId=${userId}&year=${year}&date=${date}&customer=${customer}`, {
      method: 'GET',
    })

    const data = await resp.json()

    if (data) {
      this.setState({
        data,
      })
    } else {
      history.push('/commission')
    }

    Toast.hide()
  }

  render() {
    const { intl } = this.props
    const { data } = this.state
    const col = [{
      title: intl.formatMessage({
        id: 'Commission.commissionField2',
      }),
      dataIndex: 'category',
      key: 'category',
    }, {
      title: intl.formatMessage({
        id: 'Commission.commissionField3',
      }),
      dataIndex: 'amount',
      key: 'amount',
      render: (val) => {
        return (
          <span>
            <Icon type={require('../assets/icons/rmb.svg')} size="xxs" />
            {val}
          </span>
        )
      },
    }, {
      title: intl.formatMessage({
        id: 'Commission.commissionField4',
      }),
      dataIndex: 'comment',
      key: 'comment',
    }]

    const tableData = data.map((row, i) => {
      return {
        ...row,
        key: i,
      }
    })

    return (
      <div className="commissions-detail">
        <Table
          columns={col}
          data={tableData}
        />
      </div>
    )
  }
}

export default injectIntl(CommissionsDetail)
