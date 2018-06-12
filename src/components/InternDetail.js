import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { List, InputItem, Button, Picker, DatePicker, TextareaItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import Icon from './CustomIcon'

class InternDetail extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.state = {
      rawInfo: {},
      curInfo: {},
      editing: !!props.op,
    }
  }

  onEdit = () => {
    console.log('edit intern info')
    const editing = !this.state.editing
    this.setState({
      editing,
    })
  }

  onConfirm = () => {
    console.log('submit', this.props.form.getFieldsValue())
  }

  onCancel = () => {
    console.log('cancel operation')
    const { rawInfo } = this.state
    const { op, history } = this.props

    if (op) {
      history.goBack()
    } else {
      this.setState({
        editing: false,
        curInfo: { ...rawInfo },
      })
    }
  }

  render() {
    const { intl, op } = this.props
    const { getFieldProps } = this.props.form
    const { editing } = this.state

    return (
      <div className="intern-detail">
        <List
          renderHeader={() => [
            <span key={0}>
              {
                intl.formatMessage({
                  id: op ? 'Intern.addNewIntern' : 'Intern.detail',
                })
              }
            </span>,
            <Icon
              key={1}
              type={require('../assets/icons/edit.svg')}
              size="xs"
              style={{
                position: 'relative',
                top: '5px',
                left: '15px',
                display: op ? 'none' :
                  (editing ? 'none' : 'inline-block'),
              }}
              onClick={this.onEdit}
            />,
          ]}
        >
          <InputItem
            {...getFieldProps('name', {
              initialValue: 'hhahah',
            })}
            clear
            placeholder={intl.formatMessage({
              id: 'Intern.inputInternName',
            })}
            editable={editing}
          >
            {
              intl.formatMessage({
                id: 'Intern.name',
              })
            }
          </InputItem>
          <Picker
            data={[{
              label: intl.formatMessage({
                id: 'Intern.status0',
              }),
              value: '0',
            }, {
              label: intl.formatMessage({
                id: 'Intern.status1',
              }),
              value: '1',
            }]}
            cols={1}
            {...getFieldProps('status', {
              initialValue: '0',
            })}
            disabled={!editing}
          >
            <List.Item arrow="horizontal">{ intl.formatMessage({
              id: 'Intern.headerCol2',
            })}</List.Item>
          </Picker>
          <DatePicker
            mode="date"
            extra={
              intl.formatMessage({
                id: 'Intern.inputEntryDate',
              })
            }
            {...getFieldProps('entryDate', {
              initialValue: new Date('2018-6-11'),
            })}
            disabled={!editing}
          >
            <List.Item arrow="horizontal">
              {
                intl.formatMessage({
                  id: 'Intern.headerCol1',
                })
              }
            </List.Item>
          </DatePicker>
          <DatePicker
            mode="date"
            extra={
              intl.formatMessage({
                id: 'Intern.inputDepartureDate',
              })
            }
            {...getFieldProps('departureDate', {
              initialValue: new Date('2018-6-11'),
            })}
            disabled={!editing}
          >
            <List.Item arrow="horizontal">
              {
                intl.formatMessage({
                  id: 'Intern.headerCol3',
                })
              }
            </List.Item>
          </DatePicker>
          <InputItem
            {...getFieldProps('school', {
              initialValue: 'qinghua',
            })}
            clear
            placeholder={intl.formatMessage({
              id: 'Intern.inputSchoolName',
            })}
            editable={editing}
          >
            {
              intl.formatMessage({
                id: 'Intern.school',
              })
            }
          </InputItem>
          <TextareaItem
            {...getFieldProps('comments', {
              initialValue: 'comment',
            })}
            title={intl.formatMessage({
              id: 'Intern.comments',
            })}
            autoHeight
            clear
            placeholder={intl.formatMessage({
              id: 'Intern.comments',
            })}
            editable={editing}
          />
        </List>

        <div
          className="btn-group"
          style={{
            display: editing ? 'block' : 'none',
          }}
        >
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

InternDetail.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
}

export default createForm()(injectIntl(InternDetail))
