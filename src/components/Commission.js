import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { List, Picker, Toast, Button, Card } from 'antd-mobile'
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
    this.preYear = this.year - 1
    this.month = moment().month() + 1
    this.quarter = moment().quarter()

    const { pickedUser, pickedDate, pageId } = props.commissionCond
    const newPageId = +pageId || +props.loginUser.roleId || 1

    // set default year, month, quarter
    this.defaultQuarter = this.quarter - 1 || 4
    this.defaultYear0 = this.quarter - 1 ? this.year : this.preYear
    this.defaultMonth = this.month - 1 || 12
    this.defaultYear1 = this.month - 1 ? this.year : this.preYear

    this.state = {
      pickedUser: (pickedUser.length && pickedUser)
        || [props.loginUser.groupId, props.loginUser.userId],
      pageId: newPageId,
      pickedDate: (pickedDate.length && pickedDate) || (newPageId === 1
                  ? [this.defaultYear0, this.defaultQuarter]
                  : [this.defaultYear1, this.defaultMonth]),
      userList: [],
      ranking: 0,
      // fee: [{
      //   total: '100000',
      //   used: '50000',
      //   unused: '50000',
      // }],
      total: 0,
      fee: [],
      points: [],
      // commissions: [{
      //   category: '交银施罗德',
      //   commission: '2,921,235.34',
      // }, {
      //   category: '华安',
      //   commission: '5,021,022.01',
      // }],
      commissions: [],
    }
  }

  async componentDidMount() {
    const { pickedUser, pickedDate, pageId } = this.state
    const { setCommissionCond } = this.props

    setCommissionCond({
      pickedUser,
      pickedDate,
      pageId,
    })

    const urlGetUserList = process.env.NODE_ENV === 'production'
                ? './API/userList.php'
                : 'http://localhost:3000/getUserList'

    const resp = await fetch(`${urlGetUserList}?userId=${this.loginUser.userId}`, {
      method: 'GET',
    })
    const data = await resp.json()
    this.setState({
      userList: data,
    })
  }

  componentWillReceiveProps(nextProps) {
    // console.log('receive next props')
    const { intl, commissionCond: { pickedUser, pickedDate, pageId } } = nextProps

    if (pageId === 1) {
      Toast.loading(intl.formatMessage({
        id: 'Common.loading',
      }), 0)
      const urlGetPoints = process.env.NODE_ENV === 'production'
                  ? './API/getPaidian.php'
                  : 'http://localhost:3000/getPoints'

      fetch(`${urlGetPoints}?userId=${pickedUser[1]}&year=${pickedDate[0]}&quarter=${pickedDate[1]}`, {
        method: 'GET',
      })
      .then((resp) => {
        // console.log('resp', resp)
        return resp.json()
      })
      .then((data) => {
        // console.log('data', data)
        const total = data.detail && data.detail.reduce((t, p) => {
          return t + (isNaN(+p.point) ? 0 : +p.point)
        }, 0)

        this.setState({
          points: data.detail,
          total: Math.round(total * 100) / 100,
          ranking: data.rank || intl.formatMessage({
            id: 'Commission.ranking0',
          }),
        })
        Toast.hide()
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      // for commission
      // Toast.loading(intl.formatMessage({
      //   id: 'Common.loading',
      // }), 0)
      Toast.hide()
    }
  }

  onAdminBtn = () => {
    const { history } = this.props
    history.push('/upd-commission')
  }

  render() {
    const { intl, history, setCommissionCond } = this.props
    const { fee, points, userList, pickedDate,
      pickedUser, pageId, commissions, ranking, total,
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
      const newPageId = +userList.find((user) => {
        return user.groupId === v[0]
      }).roleId || 1

      let newPickedDate = []
      if (pageId !== newPageId) {
        newPickedDate = newPageId === 1
          ? [this.defaultYear0, this.defaultQuarter]
          : [this.defaultYear1, this.defaultMonth]
        this.setState({
          pickedDate: newPickedDate,
          pickedUser: v,
          pageId: newPageId,
        }, setCommissionCond({
          pickedDate: newPickedDate,
          pickedUser: v,
          pageId: newPageId,
        }))
      } else {
        newPickedDate = pickedDate
        this.setState({
          pickedUser: v,
        }, setCommissionCond({
          pickedUser: v,
        }))
      }
    }

    const datePickerData = pageId === 1 ? [[
      {
        label: `${this.preYear}${intl.formatMessage({
          id: 'Common.year',
        })}`,
        value: this.preYear,
      },
      {
        label: `${this.year}${intl.formatMessage({
          id: 'Common.year',
        })}`,
        value: this.year,
      },
    ], [1, 2, 3, 4].map((q) => {
      return {
        label: intl.formatMessage({
          id: 'Common.quarter',
        }, {
          num: q,
        }),
        value: q,
      }
    })] : [[
      {
        label: `${this.preYear}${intl.formatMessage({
          id: 'Common.year',
        })}`,
        value: this.preYear,
      },
      {
        label: `${this.year}${intl.formatMessage({
          id: 'Common.year',
        })}`,
        value: this.year,
      },
    ], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
      return {
        label: intl.formatMessage({
          id: 'Common.month',
        }, {
          num: m,
        }),
        value: m,
      }
    })]

    const onDatePicked = (v) => {
      this.setState({
        pickedDate: v,
      }, setCommissionCond({
        pickedDate: v,
      }))
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

    const onTable1Row = (record) => ({
      onClick() {
        setCommissionCond({
          category: record.category,
        })
        history.push('/points-detail')
        // history.push(`/points-detail?q=${JSON.stringify({
        //   category: encodeURI(record.category),
        // })}`)
      },
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
              // console.log('v', v)
              return v.join('')
            }}
            cols={2}
            cascade={false}
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
          pageId === 1 ?
            <Card full className="ranking-card">
              <Card.Header
                title={intl.formatMessage({
                  id: 'Commission.ranking',
                })}
              />
              <Card.Body>
                <div>{ranking}</div>
              </Card.Body>
              <Card.Footer
                content={`${intl.formatMessage({
                  id: 'Commission.totalPoints',
                })}：${total}`}
              />
            </Card>
          : null
        }

        {
          pageId === 1
          ? <Table
            id="table1"
            columns={columnsTable1}
            data={dataTable1}
            onRow={onTable1Row}
          />
          : <Table
            id="table2"
            columns={columnsTable2}
            data={dataTable2}
          />
        }

        {
          +this.loginUser.roleId === 0 ?
            <div className="toolbar">
              <Button
                className="admin-btn"
                icon={
                  <Icon
                    type={require('../assets/icons/list.svg')}
                    size="xxs"
                  />
                }
                onClick={this.onAdminBtn}
              >
                {intl.formatMessage({
                  id: 'Common.admin',
                })}
              </Button>
            </div>
          : null
        }
      </div>
    )
  }
}

Commission.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  loginUser: PropTypes.object.isRequired,
  commissionCond: PropTypes.object.isRequired,
  setCommissionCond: PropTypes.func.isRequired,
}

export default injectIntl(Commission)
