import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { List, Modal } from 'antd-mobile'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import moment from 'moment'
import Icon from './CustomIcon'

class Commission extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      showModalData: [],
      fee: [100000, 50000, 50000],
      provinceFee: [{
        province: '上海',
        points: 50,
        commission: 50000,
        details: [{
          customer: '富国',
          points: 20,
          commission: 20000,
        }, {
          customer: '华安',
          points: 20,
          commission: 20000,
        }, {
          customer: '汇添富',
          points: 10,
          commission: 10000,
        }],
      }, {
        province: '广深',
        points: 30,
        commission: 30000,
        details: [{
          customer: '富国',
          points: 20,
          commission: 20000,
        }, {
          customer: '华安',
          points: 20,
          commission: 20000,
        }, {
          customer: '汇添富',
          points: 10,
          commission: 10000,
        }],
      }, {
        province: '北京',
        points: 30,
        commission: 30000,
        details: [{
          customer: '富国',
          points: 20,
          commission: 20000,
        }, {
          customer: '华安',
          points: 20,
          commission: 20000,
        }, {
          customer: '汇添富',
          points: 10,
          commission: 10000,
        }],
      }],
    }
  }

  render() {
    const { intl } = this.props
    const Item = List.Item
    const year = moment().year()
    const quarter = moment().quarter()

    return (
      <div className="commission-div">
        <List
          className="list__select-person"
          renderHeader={() => {
            return `${year}${intl.formatMessage({
              id: 'Common.year',
            })}${intl.formatMessage({
              id: 'Common.quarter',
            }, {
              num: quarter,
            })}`
          }}
        >
          <Item arrow="horizontal" onClick={() => {}}>
            {intl.formatMessage({
              id: 'Commission.selectPerson',
            })}
          </Item>
        </List>
        <List
          className="list__fee"
          renderHeader={() => {
            return (
              <div className="list__fee-header">
                <FormattedMessage id="Commission.feeField0" />
                <FormattedMessage id="Commission.feeField1" />
                <FormattedMessage id="Commission.feeField2" />
              </div>
            )
          }}
        >
          <Item onClick={() => {}}>
            {this.state.fee.map((cur, i) => {
              return (
                <span key={i}>
                  <Icon type={require('../assets/icons/rmb.svg')} size="xxs" />
                  {cur}
                </span>
              )
            })}
          </Item>
        </List>
        <List
          className="list__province-fee"
          renderHeader={() => {
            return (
              <div className="list__province-fee-header">
                <FormattedMessage id="Commission.provinceFeeField0" />
                <FormattedMessage id="Commission.provinceFeeField1" />
                <FormattedMessage id="Commission.provinceFeeField2" />
              </div>
            )
          }}
        >
          {this.state.provinceFee.map((cur, i) => {
            return (
              <Item
                key={i}
                onClick={() => {
                  this.setState({
                    showModalData: [...cur.details],
                    showModal: true,
                  })
                }}
              >
                <span>{cur.province}</span>
                <span>{cur.points}</span>
                <span>
                  <Icon type={require('../assets/icons/rmb.svg')} size="xxs" />
                  {cur.commission}
                </span>
              </Item>
            )
          })}
        </List>
        <Modal
          className="commission-modal"
          visible={this.state.showModal}
          transparent
          maskClosable
          onClose={() => {
            this.setState({
              showModal: false,
            })
          }}
        >
          <List
            className="list__customer-fee"
            renderHeader={() => {
              return (
                <div className="list__customer-fee-header">
                  <FormattedMessage id="Commission.customerFeeField0" />
                  <FormattedMessage id="Commission.customerFeeField1" />
                  <FormattedMessage id="Commission.customerFeeField2" />
                </div>
              )
            }}
          >
            {this.state.showModalData.map((cur, i) => {
              return (
                <Item
                  key={i}
                  onClick={() => {}}
                >
                  <span>{cur.customer}</span>
                  <span>{cur.points}</span>
                  <span>
                    <Icon type={require('../assets/icons/rmb.svg')} size="xxs" />
                    {cur.commission}
                  </span>
                </Item>
              )
            })}
          </List>
        </Modal>
      </div>
    )
  }
}

Commission.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(Commission)
