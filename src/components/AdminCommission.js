import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { List, Button, Picker, Toast } from 'antd-mobile'
import moment from 'moment'

const Item = List.Item

class AdminCommission extends Component {
  constructor(props) {
    super(props)

    this.year = moment().year()
    this.preYear = this.year - 1
    this.quarter = moment().quarter()
    this.month = moment().month() + 1
    // set default year, month, quarter
    this.defaultQuarter = this.quarter - 1 || 4
    this.defaultYear0 = this.quarter - 1 ? this.year : this.preYear
    this.defaultMonth = this.month - 1 || 12
    this.defaultYear1 = this.month - 1 ? this.year : this.preYear

    this.state = {
      opId: 0,
      pickedFileType: 0,
      pickedDate: [this.defaultYear0, this.defaultQuarter],
      file: '',
    }
  }

  onFtPicked = (v) => {
    this.setState({
      pickedFileType: v[0],
      pickedDate: v[0]
        ? [this.defaultYear1, this.defaultMonth]
        : [this.defaultYear0, this.defaultQuarter],
    })
  }

  onDatePicked = (v) => {
    this.setState({
      pickedDate: v,
    })
  }

  onConfirm = () => {
    // console.log('confirm upload')
    const { intl, history, loginUser: { userId } } = this.props
    const { pickedFileType, pickedDate, file, opId } = this.state

    if (opId) {
      if (pickedFileType) {
        console.log('export commission file')
      } else {
        Toast.loading(intl.formatMessage({
          id: 'Commission.dwdFile.loading',
        }), 0)
        const urlExportPoints = process.env.NODE_ENV === 'production'
                    ? './API/exportPaidian.php'
                    : 'http://localhost:3000/exportPoints'

        fetch(`${urlExportPoints}?year=${pickedDate[0]}&quarter=${pickedDate[1]}&userId=${userId}`, {
          method: 'GET',
        })
        .then((resp) => {
          // console.log('resp', resp)
          return resp.json()
        })
        .then((data) => {
          // console.log('data', data)
          Toast.hide()
          const { type } = data
          if (!type) {
            Toast.success(intl.formatMessage({
              id: 'Commission.dwdFile.success',
            }), 1, () => {
              history.goBack()
            })
          } else {
            Toast.fail(intl.formatMessage({
              id: 'Commission.dwdFile.fail',
            }), 1)
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
    } else if (!file) {
      Toast.fail(intl.formatMessage({
        id: 'Commission.updFile.fail0',
      }), 1)
    } else if (pickedFileType) {
      Toast.loading(intl.formatMessage({
        id: 'Commission.updFile.loading',
      }), 0)
      // submit
      const formData = new FormData()

      formData.append('type', pickedFileType)
      formData.append('date', pickedDate)
      formData.append('file', file, file.name)

      const url = './API/uploadYongjin.php'

      fetch(url, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        body: formData,
      })
      .then((resp) => {
        console.log('resp', resp)
        return resp.json()
      })
      .then((data) => {
        Toast.hide()
        console.log('data', data)
        const { type } = data
        if (!type) {
          Toast.success(intl.formatMessage({
            id: 'Commission.updFile.success',
          }), 1, () => {
            history.goBack()
          })
        } else {
          Toast.fail(intl.formatMessage({
            id: 'Commission.updFile.fail1',
          }), 1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      Toast.loading(intl.formatMessage({
        id: 'Commission.updFile.loading',
      }), 0)
      // submit
      const formData = new FormData()

      formData.append('type', pickedFileType)
      formData.append('date', pickedDate)
      formData.append('file', file, file.name)

      const url = './API/uploadPaidian.php'

      fetch(url, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        body: formData,
      })
      .then((resp) => {
        // console.log('resp', resp)
        return resp.json()
      })
      .then((data) => {
        Toast.hide()
        // console.log('data', data)
        const { type } = data
        if (!type) {
          Toast.success(intl.formatMessage({
            id: 'Commission.updFile.success',
          }), 1, () => {
            history.goBack()
          })
        } else {
          Toast.fail(intl.formatMessage({
            id: 'Commission.updFile.fail1',
          }), 1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  onCancel = () => {
    const { history } = this.props
    history.goBack()
  }

  onUploadFile = (e) => {
    console.dir(e.target)
    const file = e.target.files[0]
    this.setState({
      file,
    })
  }

  onChangeOperation = () => {
    const { opId } = this.state
    this.setState({
      opId: opId ^ 1,
    })
  }

  render() {
    const { intl } = this.props
    const { pickedFileType, pickedDate, file, opId } = this.state

    const ftPickerData = [{
      label: intl.formatMessage({
        id: 'Commission.mainTitle0',
      }),
      value: 0,
    }, {
      label: intl.formatMessage({
        id: 'Commission.mainTitle1',
      }),
      value: 1,
    }]

    const datePickerData = pickedFileType ? [
      [
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
      ],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
        return {
          label: intl.formatMessage({
            id: 'Common.month',
          }, {
            num: m,
          }),
          value: m,
        }
      }),
    ] : [
      [
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
      ],
      [1, 2, 3, 4].map((q) => {
        return {
          label: intl.formatMessage({
            id: 'Common.quarter',
          }, {
            num: q,
          }),
          value: q,
        }
      }),
    ]

    return (
      <div className="upd-commission-file">
        <List renderHeader={() => (
          <div className="header-bar">
            <span>{intl.formatMessage({
              id: `Commission.admin.mainTitle${opId}`,
            })}
            </span>
            <Button
              className="trans-btn"
              type="primary"
              onClick={this.onChangeOperation}
            >
              {intl.formatMessage({
                id: 'Common.transfer',
              })}
            </Button>
          </div>
        )}
        >
          <Picker
            data={ftPickerData}
            title={intl.formatMessage({
              id: 'Commission.updFile.type',
            })}
            extra={intl.formatMessage({
              id: 'Common.pick',
            })}
            value={[pickedFileType]}
            cols={1}
            onChange={(v) => {
              this.onFtPicked(v)
            }}
            onOk={(v) => {
              this.onFtPicked(v)
            }}
          >
            <Item arrow="horizontal">
              {intl.formatMessage({
                id: 'Commission.updFile.type',
              })}
            </Item>
          </Picker>
          { opId
            ? <Picker
              data={datePickerData}
              title={intl.formatMessage({
                id: 'Commission.datePicker.title',
              })}
              extra={intl.formatMessage({
                id: 'Common.pick',
              })}
              value={pickedDate}
              format={(v) => {
                return v.join('')
              }}
              cols={2}
              cascade={false}
              onChange={(v) => {
                this.onDatePicked(v)
              }}
              onOk={(v) => {
                this.onDatePicked(v)
              }}
            >
              <Item arrow="horizontal">
                {intl.formatMessage({
                  id: 'Commission.selectDate',
                })}
              </Item>
            </Picker>
            : <Item
              className="file-upd-item"
              arrow="horizontal"
              extra={
                <a className="file-upd-btn" role="button">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={this.onUploadFile}
                  />
                  <span>{(file && file.name) || intl.formatMessage({
                    id: 'Commission.updFile.extra',
                  })}</span>
                </a>
              }
            >
              {intl.formatMessage({
                id: 'Commission.updFile.title',
              })}
            </Item>
          }
        </List>
        <div className="btn-group">
          <Button type="primary" onClick={this.onConfirm}>
            {intl.formatMessage({
              id: 'Common.confirm',
            })}
          </Button>
          <Button type="warning" onClick={this.onCancel}>
            {intl.formatMessage({
              id: 'Common.cancel',
            })}
          </Button>
        </div>
      </div>
    )
  }
}

AdminCommission.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  loginUser: PropTypes.object.isRequired,
}

export default injectIntl(AdminCommission)
