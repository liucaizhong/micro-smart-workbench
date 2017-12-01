import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Picker, Toast } from 'antd-mobile'
import { injectIntl, intlShape } from 'react-intl'
import moment from 'moment'
import Table from 'rc-table'
import 'rc-table/assets/index.css'
import Icon from './CustomIcon'

const Item = List.Item

class Commission extends Component {
  constructor(props) {
    super(props)

    this.loginUser = props.loginUser
    this.year = moment().year()
    this.month = moment().month() + 1
    this.quarter = moment().quarter()

    const pageId = props.loginUser.roleId || 1

    this.state = {
      pickedUser: [props.loginUser.groupId, props.loginUser.userId],
      pageId,
      pickedDate: pageId === 1 ? [this.quarter] : [this.month],
      // userList: [],
      userList: [{
        groupName: '战略',
        groupId: 'zhanlue',
        roleId: 1,
        members: [{
          userId: 'sunjx',
          userName: '孙金霞',
        }, {
          userId: 'xuej',
          userName: '薛俊',
        }],
      }, {
        groupName: '其他',
        groupId: 'qita',
        roleId: 0,
        members: [{
          userId: 'zhuxy',
          userName: '朱晓燕',
        }],
      }, {
        groupName: '上海销售',
        groupId: 'xiaoshou0',
        roleId: 2,
        members: [{
          userId: 'wumy',
          userName: '吴鸣远',
        }, {
          userId: 'cheny',
          userName: '程瑶',
        }],
      }],
      fee: [{
        total: '100000',
        used: '50000',
        unused: '50000',
      }],
      points: [{
        category: '上海',
        point: '50',
      }, {
        category: '广深',
        point: '30',
      }, {
        category: '北京',
        point: '30',
      }, {
        category: '经纪业务VIP',
        point: '50',
      }, {
        category: '自营资管',
        point: '30',
      }, {
        category: '其他',
        point: '30',
      }],
      commissions: [{
        category: '交银施罗德',
        commission: '2,921,235.34',
      }, {
        category: '华安',
        commission: '5,021,022.01',
      }],
    }
  }

  render() {
    const { intl } = this.props
    const { fee, points, userList, pickedDate,
      pickedUser, pageId, commissions,
    } = this.state

    const renderListHeader = () => {
      return pageId === 1 ? intl.formatMessage({
        id: 'Commission.mainTitle0',
      }) : intl.formatMessage({
        id: 'Commission.mainTitle1',
      })
    }

    const userPickerData = userList.map((row) => {
      return {
        label: row.groupName,
        value: row.groupId,
        children: row.members.map((m) => {
          return {
            label: m.userName,
            value: m.userId,
          }
        }),
      }
    })

    const onUserPicked = (v) => {
      Toast.loading(intl.formatMessage({
        id: 'Common.loading',
      }), 0)

      const newPageId = userList.find((user) => {
        return user.groupId === v[0]
      }).roleId || 1

      this.setState({
        pickedDate: newPageId === 1 ? [this.quarter] : [this.month],
        pickedUser: v,
        pageId: newPageId,
      })

      Toast.hide()
    }

    const datePickerData = pageId === 1 ? [1, 2, 3, 4].map((q) => {
      return {
        label: intl.formatMessage({
          id: 'Common.quarter',
        }, {
          num: q,
        }),
        value: q,
      }
    }) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
      return {
        label: intl.formatMessage({
          id: 'Common.month',
        }, {
          num: m,
        }),
        value: m,
      }
    })

    const onDatePicked = (v) => {
      Toast.loading(intl.formatMessage({
        id: 'Common.loading',
      }), 0)

      this.setState({
        pickedDate: v,
      })

      Toast.hide()
    }

    const columnsTable0 = [{
      title: intl.formatMessage({
        id: 'Commission.feeField0',
      }),
      dataIndex: 'total',
      key: 'total',
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
        id: 'Commission.feeField1',
      }),
      dataIndex: 'used',
      key: 'used',
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
        id: 'Commission.feeField2',
      }),
      dataIndex: 'unused',
      key: 'unused',
      render: (val) => {
        return (
          <span>
            <Icon type={require('../assets/icons/rmb.svg')} size="xxs" />
            {val}
          </span>
        )
      },
    }]

    const dataTable0 = fee.map((row, i) => {
      return {
        ...row,
        key: i,
      }
    })

    const columnsTable1 = [{
      title: intl.formatMessage({
        id: 'Commission.pointField0',
      }),
      dataIndex: 'category',
      key: 'category',
    }, {
      title: intl.formatMessage({
        id: 'Commission.pointField1',
      }),
      dataIndex: 'point',
      key: 'point',
    }]

    const dataTable1 = points.map((row, i) => {
      return {
        ...row,
        key: i,
      }
    })

    const columnsTable2 = [{
      title: intl.formatMessage({
        id: 'Commission.commissionField0',
      }),
      dataIndex: 'category',
      key: 'category',
    }, {
      title: intl.formatMessage({
        id: 'Commission.commissionField1',
      }),
      dataIndex: 'commission',
      key: 'commission',
      render: (val) => {
        return (
          <span>
            <Icon type={require('../assets/icons/rmb.svg')} size="xxs" />
            {val}
          </span>
        )
      },
    }]

    const dataTable2 = commissions.map((row, i) => {
      return {
        ...row,
        key: i,
      }
    })

    return (
      <div className="commission-div">
        <List
          className="list__select-person"
          renderHeader={renderListHeader}
        >
          {
            userList.length ?
              <Picker
                data={userPickerData}
                title={intl.formatMessage({
                  id: 'Commission.userPicker.title',
                })}
                extra={intl.formatMessage({
                  id: 'Common.pick',
                })}
                value={pickedUser}
                format={(v) => {
                  return v[1]
                }}
                cols={2}
                onChange={(v) => {
                  onUserPicked(v)
                }}
                onOk={(v) => {
                  onUserPicked(v)
                }}
              >
                <Item arrow="horizontal">
                  {intl.formatMessage({
                    id: 'Commission.selectPerson',
                  })}
                </Item>
              </Picker> :
              <Item extra={this.loginUser.userName}>
                {intl.formatMessage({
                  id: 'Commission.selectPerson',
                })}
              </Item>
          }
          <Picker
            data={datePickerData}
            title={intl.formatMessage({
              id: 'Commission.datePicker.title',
            })}
            extra={intl.formatMessage({
              id: 'Common.pick',
            })}
            value={pickedDate}
            format={(v) => {
              return `${this.year}${intl.formatMessage({
                id: 'Common.year',
              })}${v[0]}`
            }}
            cols={1}
            onChange={(v) => {
              onDatePicked(v)
            }}
            onOk={(v) => {
              onDatePicked(v)
            }}
          >
            <Item arrow="horizontal">
              {intl.formatMessage({
                id: 'Commission.selectDate',
              })}
            </Item>
          </Picker>
        </List>

        <Table
          id="table0"
          columns={columnsTable0}
          data={dataTable0}
        />

        {
          pageId === 1
          ? <Table
            id="table1"
            columns={columnsTable1}
            data={dataTable1}
          />
          : <Table
            id="table2"
            columns={columnsTable2}
            data={dataTable2}
          />
        }
      </div>
    )
  }
}

Commission.propTypes = {
  intl: intlShape.isRequired,
  loginUser: PropTypes.object.isRequired,
}

export default injectIntl(Commission)
