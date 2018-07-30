/*eslint-disable*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Picker, List } from 'antd-mobile'
import { injectIntl, intlShape } from 'react-intl'
import BarEchart from './BarEchart'
import ParallelEchart from './ParallelEchart'

const Item = List.Item

class SalesAnalysis extends Component {
  constructor(props) {
    super(props)

    this.loginUser = props.loginUser
    this.el = React.createRef()

    this.state = {
      chartWidth: 0,
      pickedUser: [props.loginUser.groupId, props.loginUser.userId],
      userList: [],
      // customers: ['富国', '天治', '中银', '富安达'],
      // rank: {
      //   // Q1, Q2, Q3, Q4
      //   '富国': [4, 6, 3, 2],
      //   '天治': [2, 10, 7, 5],
      //   '中银': [6, 3, 11, 2],
      //   '富安达': [4, 8, 3, 1],
      // },
      feeVariety: ['代销费用', '代付费用', '专家费', '净佣金'],
      feeTableVariety: ['毛佣金', '专家费', '代付费用', '代销费用', '合计', '净佣金'],
      // fee: {
      //   // '富国', '天治', '中银', '富安达'
      //   '代销费用': [{
      //     amount: 205,
      //     percent: '20.2%',
      //   }, {
      //     amount: 0,
      //     percent: '0.0%',
      //   }, {
      //     amount: 2,
      //     percent: '1.6%',
      //   }, {
      //     amount: 35,
      //     percent: '10.1%',
      //   }], // 代销费用
      //   '代付费用': [{
      //     amount: 103,
      //     percent: '10.2%',
      //   }, {
      //     amount: 75,
      //     percent: '12.5%',
      //   }, {
      //     amount: 56,
      //     percent: '51.2%',
      //   }, {
      //     amount: 103,
      //     percent: '30.1%',
      //   }], // 代付费用
      //   '专家费': [{
      //     amount: 9,
      //     percent: '0.9%',
      //   }, {
      //     amount: 9,
      //     percent: '1.4%',
      //   }, {
      //     amount: 0,
      //     percent: '0.0%',
      //   }, {
      //     amount: 0,
      //     percent: '0.0%',
      //   }], // 专家费
      //   '净佣金': [{
      //     amount: 699,
      //     percent: '',
      //   }, {
      //     amount: 518,
      //     percent: '',
      //   }, {
      //     amount: 52,
      //     percent: '',
      //   }, {
      //     amount: 205,
      //     percent: '',
      //   }], // 净佣金
      //   '毛佣金': [{
      //     amount: 1016,
      //     percent: '',
      //   }, {
      //     amount: 602,
      //     percent: '',
      //   }, {
      //     amount: 110,
      //     percent: '',
      //   }, {
      //     amount: 343,
      //     percent: '',
      //   }], // 毛佣金
      //   '合计': [{
      //     amount: 317,
      //     percent: '31.2%',
      //   }, {
      //     amount: 84,
      //     percent: '13.9%',
      //   }, {
      //     amount: 58,
      //     percent: '52.8%',
      //   }, {
      //     amount: 138,
      //     percent: '40.2%',
      //   }], // 合计
      // },
      // otherFee: {
      //   amount: 12,
      //   percent: '1.1%',
      // },
      roadShowTitle: ['净佣金（万元）', '路演次数（次）', '路演效率（万元）'],
      // roadShow: {
      //   '富国': [787.6, 350.0, 129, 60, 6.1, 5.8],
      //   '天治': [516.5, 250.0, 132, 65, 3.9, 3.8],
      //   '中银': [228.3, 130.0,  38, 20, 5.9, 6.5],
      //   '富安达': [49.3, 20.0, 44, 22, 1.1, 0.9],
      // },
      // marketShareData: {
      //   '富国': [
      //     ['3.00', '2.55', '2.00', '毛佣金市占率'],
      //     ['2.47', '1.98', '2.00', '净佣金市占率']
      //   ],
      //   '中银': [
      //     ['6.80', '5.99', '6.00', '毛佣金市占率'],
      //     ['6.42', '5.14', '5.00', '净佣金市占率']
      //   ],
      //   '天治': [
      //     ['14.00', '12.00', '10.00', '毛佣金市占率'],
      //     ['12.1', '8.02', '7.00', '净佣金市占率']
      //   ],
      //   '富安达': [
      //     ['6.5', '6.4', '5.0', '毛佣金市占率'],
      //     ['4.5', '2.8', '3.2', '净佣金市占率'],
      //   ],
      // },
      // marketShareGoal: {
      //   '富国': ['2.10', '94%'],
      //   '中银': ['5.14', '94%'],
      //   '天治': ['8.02', '100%'],
      //   '富安达': ['3.03', '100%'],
      // },
      customers: [],
      rank: [],
      fee: [],
      otherFee: {},
      roadShow: {},
      marketShareData: {},
      marketShareGoal: {},
    }
  }

  componentDidMount() {
    // console.dir(this.el)
    const urlGetUserList = process.env.NODE_ENV === 'production' ?
      './API/userList.php' :
      'http://localhost:3000/getUserList'

    fetch(`${urlGetUserList}?userId=${this.loginUser.userId}`, {
      method: 'GET',
    }).then((resp) => {
      return resp.json()
    }).then((data) => {
      this.setState({
        userList: data,
      })
    })

    const urlGetSalesInfo = process.env.NODE_ENV === 'production' ?
      './getInfo.php' :
      'http://localhost:3000/getSalesInfo'

    fetch(`${urlGetSalesInfo}?userId=${this.loginUser.userId}`, {
      method: 'GET',
    }).then((resp) => {
      return resp.json()
    }).then((data) => {
      console.log('sales', data)
      const {
        customers,
        fee,
        rank,
        marketShareData,
        otherFee,
        roadShow,
        marketShareGoal,
      } = data
      // const marketShareDataTest = {
      //   '富国': [
      //     ['3.00', '2.55', '2.00', '毛佣金市占率'],
      //     ['2.47', '1.98', '2.00', '净佣金市占率']
      //   ],
      //   '中银': [
      //     ['6.80', '5.99', '6.00', '毛佣金市占率'],
      //     ['6.42', '5.14', '5.00', '净佣金市占率']
      //   ],
      //   '天治': [
      //     ['14.00', '12.00', '10.00', '毛佣金市占率'],
      //     ['12.1', '8.02', '7.00', '净佣金市占率']
      //   ],
      //   '富安达': [
      //     ['6.5', '6.4', '5.0', '毛佣金市占率'],
      //     ['4.5', '2.8', '3.2', '净佣金市占率'],
      //   ],
      // }
      // const marketShareGoalTest = {
      //   '富国': ['2.10', '94%'],
      //   '中银': ['5.14', '94%'],
      //   '天治': ['8.02', '100%'],
      //   '富安达': ['3.03', '100%'],
      // }
      this.setState({
        customers: customers || [],
        fee: fee || {},
        rank: rank || {},
        marketShareData: marketShareData || {},
        otherFee: otherFee || {},
        roadShow: roadShow || {},
        marketShareGoal: marketShareGoal || {},
        chartWidth: this.el.current.clientWidth,
      })
    })
  }

  render() {
    // console.log('pickedUser', this.state.pickedUser)
    const { intl } = this.props
    const {
      pickedUser,
      userList,
      customers,
      rank,
      feeVariety,
      feeTableVariety,
      fee,
      otherFee,
      roadShowTitle,
      roadShow,
      marketShareData,
      marketShareGoal,
      chartWidth,
    } = this.state
    const showCharts = pickedUser[0] && pickedUser[0] === '1031'
    // console.log('showCharts', showCharts)
    const legend = ['2017Q3', '2017Q4', '2018Q1', '2018Q2']
    const year = (new Date()).getFullYear()
    const yearAxis = [year - 2, year - 1, year]
    const quarter = ['Q1', 'Q2', 'Q3', 'Q4']
    const customersLen = customers && customers.length || 0
    const marketShareDimCount = 6
    // const marketShareDim = 3
    const marketShareChartGap = 2
    const marketShareChartBaseLeft = 5
    const marketShareChartBaseTop = 20
    const marketShareChartBaseBottom = 10
    const marketShareChartRows = Math.ceil(customersLen / marketShareDimCount)
    const marketShareChartGridWidth = (100 - marketShareChartBaseLeft - marketShareChartGap) / marketShareDimCount
      - marketShareChartGap
    const marketShareChartGridHeight = (100 - marketShareChartBaseTop - marketShareChartBaseBottom) / marketShareChartRows
      - marketShareChartGap
    const marketShareDataMax = Object.keys(marketShareData).reduce((max, k) => {
      marketShareData[k].forEach((row) => {
        row.slice(0, row.length - 1).forEach((num) => {
          if (parseFloat(num) > max) {
            max = num
          }
        })
      })
      return max
    }, 0)

    // console.log('marketShareDataMax', marketShareDataMax)

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
      this.setState({
        pickedUser: v,
      }, () => {
        const urlGetSalesInfo = process.env.NODE_ENV === 'production' ?
          './getInfo.php' :
          'http://localhost:3000/getSalesInfo'

        fetch(`${urlGetSalesInfo}?userId=${v[1]}`, {
          method: 'GET',
        }).then((resp) => {
          return resp.json()
        }).then((data) => {
          console.log('sales', data)
          const {
            customers,
            fee,
            rank,
            marketShareData,
            otherFee,
            roadShow,
            marketShareGoal,
          } = data
          this.setState({
            customers: customers || [],
            fee: fee || {},
            rank: rank || {},
            marketShareData: marketShareData || {},
            otherFee: otherFee || {},
            roadShow: roadShow || {},
            marketShareGoal: marketShareGoal || {},
            chartWidth: this.el.current.clientWidth,
          })
        })
      })
    }

    const rankChartOption = {
      title: {
        text: intl.formatMessage({
          id: 'SalesAnalysis.chart0',
        }),
        top: 20,
        left: 'center',
        textStyle: {
          fontSize: 35,
        },
      },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'shadow',
      //   },
      // },
      grid: {
        left: 120,
        top: 90,
      },
      legend: {
        // data: quarter.map((q) => `${year}${q}`),
        data: legend,
        bottom: 0,
        textStyle: {
          fontSize: 20,
        },
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        type: 'category',
        data: [...customers],
        axisLabel: {
          fontSize: 22,
        },
      },
      // series: quarter.map((q, i) => ({
      //   name: `${year}${q}`,
      //   type: 'bar',
      //   data: customers && customers.map((k) => rank[k][i]) || [],
      // })),
      series: legend.map((q, i) => ({
        name: q,
        type: 'bar',
        data: customers && customers.map((k) => (1 / rank[k][i])) || [],
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: (params) => {
              // console.log(params.value)
              return params.value ? `第${Math.round(1 / params.value)}名` : '暂无排名'
            },
          },
        },
      })),
    }

    const feeCompositionChartOption = {
      title: {
        text: intl.formatMessage({
          id: 'SalesAnalysis.chart1',
        }),
        left: 'center',
        textStyle: {
          fontSize: 35,
        },
      },
      grid: {
        top: 80,
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        data: [...customers],
        axisLabel: {
          fontSize: 25,
        },
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        data: [...feeVariety],
        top: 40,
        textStyle: {
          fontSize: 20,
        },
      },
      series: feeVariety.map((v) => ({
        name: v,
        stack: 'total',
        type: 'bar',
        data: fee && fee[v] && fee[v].map((d) => d.amount) || [],
      })),
    }

    const marketShareOption = {
      // visualMap: {
      //   type: 'piecewise',
      //   categories: [
      //     intl.formatMessage({
      //       id: 'SalesAnalysis.grossMarketShare',
      //     }),
      //     intl.formatMessage({
      //       id: 'SalesAnalysis.netMarketShare',
      //     }),
      //   ],
      //   dimension: marketShareDim,
      //   orient: 'horizontal',
      //   top: 0,
      //   left: 'center',
      //   inRange: {
      //     color: ['#61a0a8', '#c23531'],
      //   },
      //   outOfRange: {
      //     color: '#ddd',
      //   },
      //   seriesIndex: [0],
      // },
      tooltip: {
        trigger: 'axis',
      },
      grid: [],
      xAxis: [],
      yAxis: [],
      series: [],
      title: [],
    }

    const generateMarketShareGrids = (option) => {
      let index = 0

      for (let i = 0; i < marketShareChartRows; ++i) {
        for (let j = 0; j < marketShareDimCount; ++j) {
          option.grid.push({
            left: marketShareChartBaseLeft
              + j * (marketShareChartGridWidth + marketShareChartGap)
              + '%',
            top: marketShareChartBaseTop
              + i * (marketShareChartBaseTop + marketShareChartGridHeight + marketShareChartGap)
              + '%',
            width: marketShareChartGridWidth + '%',
            height: marketShareChartGridHeight + '%',
          })
          // console.log('index', index)
          // console.log(option.grid)

          option.xAxis.push({
            // splitNumber: 3,
            position: 'bottom',
            axisLine: {
              show: i === marketShareChartRows - 1,
              onZero: false,
            },
            axisTick: {
              show: false,
              inside: true
            },
            axisLabel: {
              show: i === marketShareChartRows - 1,
            },
            type: 'category',
            gridIndex: index,
            data: yearAxis,
          })

          option.yAxis.push({
            // splitNumber: 3,
            name: j === 0 ? '(%)' : '',
            position: 'left',
            max: marketShareDataMax,
            min: 0,
            axisLine: {
              show: j === 0,
              onZero: false,
            },
            axisTick: {
              show: false,
              inside: true,
            },
            axisLabel: {
              show: j === 0,
            },
            type: 'value',
            gridIndex: index,
            scale: true,
          })

          option.series.push({
            name: intl.formatMessage({
              id: 'SalesAnalysis.grossMarketShare',
            }),
            // stack: 'total',
            type: 'line',
            symbolSize: 3,
            xAxisIndex: index,
            yAxisIndex: index,
            data: marketShareData[customers[index]] && marketShareData[customers[index]][0] || [],
            label: {
              normal: {
                show: true,
                position: 'top',
              },
            },
          }, {
            name: intl.formatMessage({
              id: 'SalesAnalysis.netMarketShare',
            }),
            // stack: 'total',
            type: 'line',
            symbolSize: 3,
            xAxisIndex: index,
            yAxisIndex: index,
            data: marketShareData[customers[index]] && marketShareData[customers[index]][1] || [],
            label: {
              normal: {
                show: true,
                position: 'bottom',
              },
            },
          })

          option.title.push({
            show: true,
            text: customers[index],
            left: marketShareChartBaseLeft +
              j * (marketShareChartGridWidth + marketShareChartGap) +
              3 +
              '%',
            top: i * (marketShareChartBaseTop + marketShareChartGridHeight + marketShareChartGap) +
              '%',
            subtext: `${intl.formatMessage({
              id: 'SalesAnalysis.netMarketGoal',
            })}${marketShareGoal[customers[index]] && marketShareGoal[customers[index]][0] || []}\n${intl.formatMessage({
              id: 'SalesAnalysis.netMarketComplete',
            })}${marketShareGoal[customers[index]] && marketShareGoal[customers[index]][1] || []}`,
          })

          // option.visualMap.seriesIndex.push(option.series.length - 1)

          if (++index >= customersLen) {
            break
          }
        }
      }
    }

    generateMarketShareGrids(marketShareOption)
    console.log('chartWidth', chartWidth)

    return (
      <div className="sales-analysis" ref={this.el}>
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
              // onChange={(v) => {
              //   onUserPicked(v)
              // }}
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
        <div style={{
          display: showCharts ? 'block' : 'none',
        }}>
          {
            chartWidth ?
              [<BarEchart
                key={0}
                className="chart"
                style={{
                  width: `${chartWidth}px`,
                  height: `${(customers.length * 1.8) < 6 ? 6 : (customers.length * 1.8)}rem`,
                }}
                option={rankChartOption}
              />,
              <BarEchart
                key={1}
                className="chart"
                style={{
                  width: `${chartWidth}px`,
                  height: '8rem',
                }}
                option={feeCompositionChartOption}
              />]
            : null
          }
          <div className="fee-detail">
            <table>
              <thead>
                <tr>
                  <th className="title" rowSpan="2" />
                  {
                    customers.map((c, i) => (
                      <th
                        key={i}
                        className="title"
                        colSpan="2"
                      >{ c }</th>
                    ))
                  }
                </tr>
                <tr>
                  {
                    customers.map((c, i) => (
                      [
                        <th
                          key={`${i}0`}
                          className="title"
                        >
                          {
                            intl.formatMessage({
                              id: 'SalesAnalysis.amount',
                            })
                          }
                        </th>,
                        <th
                          key={`${i}1`}
                          className="title"
                        >
                          {
                            intl.formatMessage({
                              id: 'SalesAnalysis.percent',
                            })
                          }
                        </th>,
                      ]
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  feeTableVariety.map((key, i) => (
                    <tr
                      key={i}
                      className={key === intl.formatMessage({
                        id: 'SalesAnalysis.total',
                      }) ? 'total' : ''}
                    >
                      <td className={key === '毛佣金' || key === '净佣金' ?
                        'title t-l' : 'title t-r' }>
                        { key === '专家费' ? '其中: 专家费' : key }
                      </td>
                      {
                        fee && fee[key] && fee[key].map((item, k) => (
                          [
                            <td key={`${k}0`}>{ item.amount }</td>,
                            <td key={`${k}1`}>{ item.percent }</td>,
                          ]
                        )) || []
                      }
                    </tr>
                  ))
                }
                <tr>
                  <td className="title" colSpan={customers.length * 2}>
                    {
                      intl.formatMessage({
                        id: 'SalesAnalysis.otherFee.amount',
                      })
                    }
                  </td>
                  <td>{ otherFee.amount }</td>
                </tr>
                <tr>
                  <td className="title" colSpan={customers.length * 2}>
                    {
                      intl.formatMessage({
                        id: 'SalesAnalysis.otherFee.percent',
                      })
                    }
                  </td>
                  <td>{ otherFee.percent }</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="road-show">
            <header>
              {
                intl.formatMessage({
                  id: 'SalesAnalysis.roadShow',
                })
              }
            </header>
            <table>
              <thead>
                <tr>
                  <th></th>
                  {
                    roadShowTitle.map((t, i) => (
                      <th key={i} colSpan="2">{ t }</th>
                    ))
                  }
                </tr>
                <tr>
                  <th></th>
                  {
                    roadShowTitle.map((t, i) => (
                      [
                        <th key={`${i}0`}>
                          {
                            `${year-1}${intl.formatMessage({
                              id: 'SalesAnalysis.otherFee.annual',
                            })}`
                          }
                        </th>,
                        <th key={`${i}1`}>
                          {
                            `${year}${intl.formatMessage({
                              id: 'SalesAnalysis.otherFee.sofar',
                            })}`
                          }
                        </th>,
                      ]
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  customers.map((c, i) => (
                    <tr key={i}>
                      <td>{ c }</td>
                      {
                        roadShow[c] && roadShow[c].map((n, k) => (
                          <td key={`${i}${k}`}>{ n }</td>
                        )) || []
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          {
            chartWidth ?
            <ParallelEchart
              option={marketShareOption}
              style={{
                marginBottom: '20px',
                width: `${chartWidth}px`,
                height: '350px',
              }}
            />
            : null
          }
        </div>
      </div>
    )
  }
}

SalesAnalysis.propTypes = {
  intl: intlShape.isRequired,
  loginUser: PropTypes.object.isRequired,
}

export default injectIntl(SalesAnalysis)
