/* eslint-disable no-return-assign */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {
  SearchBar,
  Button,
  ListView,
  Popover,
  Icon,
  List,
  Checkbox,
  PullToRefresh,
} from 'antd-mobile'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

const CheckboxItem = Checkbox.CheckboxItem

const NUM_ROWS = 10
let pageIndex = 0
const rawData = [{
  id: '0',
  name: 'intern0',
  entryDate: '2018-6-8',
  status: '0',
}, {
  id: '1',
  name: 'intern1',
  entryDate: '2018-6-9',
  status: '1',
}, {
  id: '2',
  name: 'intern2',
  entryDate: '2018-6-11',
  status: '0',
}]
const rowMockData = []

const mockData = (p = 0) => {
  for (let i = 0; i < NUM_ROWS; ++i) {
    const ii = (p * NUM_ROWS) + i
    rowMockData[ii] = rawData[i % rawData.length]
  }
  // rowMockData.push(rawData)
  return rowMockData
}

const pseudoFetch = (page) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(mockData(page))
  }, 2000)
})

class InternManagement extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchVal: '',
      rawData: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      height: 0,
      loadingMore: false,
      refreshing: false,
      status: [true, false], // 0: be on the job, 1: dimissed
    }
  }

  async componentDidMount() {
    this.setState({
      loadingMore: true,
    })
    const { status, searchVal } = this.state
    const height = document.documentElement.clientHeight
      - this.lvParent.offsetTop
    const data = await pseudoFetch()
    // console.log('data', data)
    this.setState({
      rawData: data,
      dataSource: this.state.dataSource.cloneWithRows(
        data.filter((item) => {
          return status[item.status] && item.name.includes(searchVal)
        }),
      ),
      height,
      loadingMore: false,
    })
  }

  onFilter = (val) => {
    const { searchVal, status, rawData: data } = this.state
    status[val] = !status[val]
    this.setState({
      status,
      dataSource: this.state.dataSource.cloneWithRows(
        data.filter((item) => {
          return status[item.status] && item.name.includes(searchVal)
        }),
      ),
    })
  }

  onUploadFile = (e) => {
    console.dir(e.target)
    // const file = e.target.files[0]
  }

  render() {
    const { intl, history } = this.props
    const { searchVal, dataSource, height, loadingMore } = this.state

    const renderRow = (rowData, sectionID, rowID, highlightRow) => {
      return (
        <div
          className="row-data"
          key={rowID}
          onClick={() => {
            history.push(`/intern-detail/${rowData.id}`)
          }}
        >
          <span className="name">{ rowData.name }</span>
          <span className="entry-date">{ rowData.entryDate}</span>
          <span className="status">
            {
              intl.formatMessage({
                id: `Intern.status${rowData.status}`,
              })
            }
          </span>
        </div>
      )
    }

    // const LvBody = (props) => (
    //   <div className="am-list-body my-lv">
    //     { props.children }
    //   </div>
    // )

    const separator = (sectionID, rowID) => (
      <div
        key={`${rowID}`}
        style={{
          borderTop: '.5px solid #ECECED',
        }}
      />
    )

    const renderFooter = () => (
      <div style={{ textAlign: 'center' }}>
        {
          loadingMore
            ? intl.formatMessage({
              id: 'Common.loading',
            })
            : intl.formatMessage({
              id: 'Common.loaded',
            })
        }
      </div>
    )

    const onEndReached = async () => {
      console.log('onEndReached')
      this.setState({
        loadingMore: true,
      })
      // const newHeight = document.documentElement.clientHeight -
      //   this.lvParent.offsetTop
      const { status } = this.state
      const data = await pseudoFetch(++pageIndex)
      // console.log('data', data)
      this.setState({
        rawData: data,
        dataSource: this.state.dataSource.cloneWithRows(
          data.filter((item) => {
            return status[item.status] && item.name.includes(searchVal)
          }),
        ),
        // height: newHeight,
        loadingMore: false,
      })
    }

    const renderHeader = () => (
      <div className="row-data-header">
        <FormattedMessage className="name" id="Intern.headerCol0" />
        <FormattedMessage className="entry-date" id="Intern.headerCol1" />
        <div className="status">
          <FormattedMessage id="Intern.headerCol2" />
          <Popover
            mask
            overlay={
              (
                <List>
                  {
                    ['0', '1'].map((key, i) => (
                      <CheckboxItem
                        key={i}
                        onChange={
                          () => this.onFilter(key)
                        }
                        checked={this.state.status[i]}
                      >
                        {
                          intl.formatMessage({
                            id: `Intern.status${i}`,
                          })
                        }
                      </CheckboxItem>
                    ))
                  }
                </List>
              )
            }
          >
            <Icon type="ellipsis" size="xs" />
          </Popover>
        </div>
      </div>
    )

    const onRefresh = async () => {
      console.log('onRefresh')
      this.setState({
        refreshing: true,
      })
      // const newHeight = document.documentElement.clientHeight -
      //   this.lvParent.offsetTop
      const { status } = this.state
      const data = await pseudoFetch(++pageIndex)
      // console.log('data', data)
      this.setState({
        rawData: data,
        dataSource: this.state.dataSource.cloneWithRows(
          data.filter((item) => {
            return status[item.status] && item.name.includes(searchVal)
          }),
        ),
        // height: newHeight,
        refreshing: false,
      })
    }

    return (
      <div className="intern-management">
        <SearchBar
          placeholder={intl.formatMessage({
            id: 'Common.search',
          })}
          defaultValue={searchVal}
          onClear={() => {
            const { status, rawData: data } = this.state
            this.setState({
              searchVal: '',
              dataSource: this.state.dataSource.cloneWithRows(
                data.filter((item) => {
                  return status[item.status]
                }),
              ),
            })
          }}
          onSubmit={(val) => {
            const { status, rawData: data } = this.state
            this.setState({
              searchVal: val,
              dataSource: this.state.dataSource.cloneWithRows(
                data.filter((item) => {
                  return status[item.status] && item.name.includes(val)
                }),
              ),
            })
          }}
        />
        <div className="intern-list" ref={(el) => this.lvParent = el}>
          <ListView
            ref={(el) => this.lv = el}
            dataSource={dataSource}
            renderRow={renderRow}
            // renderBodyComponent={() => <LvBody />}
            renderSeparator={separator}
            renderFooter={renderFooter}
            style={{
              height,
            }}
            onEndReached={onEndReached}
            initialListSize={20}
            pageSize={15}
            renderHeader={renderHeader}
            pullToRefresh={
              <PullToRefresh
                refreshing={this.state.refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        </div>
        <footer>
          <Button onClick={() => {
            history.push('/intern-add')
          }}
          >
            {
              intl.formatMessage({
                id: 'Intern.addNewIntern',
              })
            }
          </Button>
          <div className="upload">
            <a className="file-upd-btn" role="button">
              <input
                type="file"
                name="file"
                id="file"
                onChange={this.onUploadFile}
              />
              <span>{intl.formatMessage({
                id: 'Intern.batchImport',
              })}</span>
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

InternManagement.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
}

export default injectIntl(InternManagement)
