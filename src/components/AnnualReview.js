import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card } from 'antd-mobile'
import { injectIntl, intlShape } from 'react-intl'
import BarEchart from './BarEchart'
import PieEchart from './PieEchart'
import LineEchart from './LineEchart'
import TreemapEchart from './TreemapEchart'

class AnnualReview extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    loginUser: PropTypes.object.isRequired,
  }

  state = {
    meetingCount: '',
    meetingRank: null,
    roadshowCount: '',
    roadshowRegion: null,
    roadshowRankA: null,
    roadshowRankC: null,
    sportCount: '',
    sportRank: null,
    CRMCount: '',
    meetingMonthly: null,
    roadshowMonthly: null,
    CRMRank: null,
  }

  async componentDidMount() {
    // console.log('this.loginUser', this.loginUser)
    if (this.loginUser.userId && this.loginUser.userId.length) {
      const cardWidth = this.cardList.offsetWidth * 0.6
      const urlGetAnnualSummary = process.env.NODE_ENV === 'production'
                  ? './API/getSummary.php'
                  : 'http://localhost:3000/getAnnualSummary'

      const resp = await fetch(`${urlGetAnnualSummary}`, {
        method: 'GET',
      })
      const data = await resp.json()
      console.log('data', data)

      this.setState({
        cardWidth,
        meetingCount: data.Meeting_Count,
        meetingRank: data.Meeting_Rank,
        roadshowCount: data.Roadshow_Count,
        roadshowRegion: data.Region,
        roadshowRankA: data.Roadshow_Rank_A,
        roadshowRankC: data.Roadshow_Rank_C,
        sportCount: data.Sport_Count,
        sportRank: data.Sport_Rank,
        CRMCount: data.CRM_Count,
        meetingMonthly: data.Meeting_Monthly,
        roadshowMonthly: data.Roadshow_Monthly,
        CRMRank: data.CRM_Rank,
      })
    }
  }

  curYear = moment().year() - 1
  loginUser = this.props.loginUser

  render() {
    const { intl } = this.props
    const { cardWidth,
      meetingCount,
      meetingRank,
      roadshowCount,
      roadshowRegion,
      roadshowRankA,
      roadshowRankC,
      sportCount,
      sportRank,
      CRMCount,
      CRMRank,
      meetingMonthly,
      roadshowMonthly,
    } = this.state

    return this.loginUser.userId && this.loginUser.userId.length ? (
      <div
        className="annual-review__card-list"
        ref={(el) => {
          this.cardList = el
        }}
      >
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.meetingCount',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            <div>{ meetingCount }</div>
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.meetingRank',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            <BarEchart
              style={cardWidth ? {
                height: `${cardWidth * 0.9}px`,
              } : null}
              option={{
                grid: {
                  left: 90,
                  right: 60,
                  top: 0,
                  bottom: 60,
                },
                xAxis: {
                  type: 'value',
                  show: true,
                  axisTick: {
                    show: false,
                  },
                  data: [''],
                  min: 0,
                  max: 50,
                  interval: 50,
                  axisLabel: {
                    fontSize: '26',
                    color: '#888',
                    formatter: `{value}${intl.formatMessage({
                      id: 'AnnualReview.meetingUnit',
                    })}`,
                  },
                  axisLine: {
                    show: false,
                  },
                },
                yAxis: {
                  type: 'category',
                  data: (meetingRank && Object.keys(meetingRank)) || [],
                  inverse: true,
                  axisTick: {
                    show: false,
                  },
                  axisLabel: {
                    fontSize: '26',
                    align: 'right',
                    color: '#888',
                  },
                },
                series: [
                  {
                    name: '',
                    type: 'bar',
                    barWidth: '80%',
                    label: {
                      normal: {
                        show: true,
                        position: 'inside',
                        fontSize: '26',
                      },
                    },
                    data: (meetingRank && Object.values(meetingRank)) || [],
                  },
                ],
                color: ['#0D9FBC'],
              }}
            />
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.roadshowCount',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            <div>{ roadshowCount }</div>
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.roadshowRegion',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            {
              cardWidth ?
                <PieEchart
                  style={{
                    height: `${cardWidth}px`,
                  }}
                  option={{
                    lengend: {
                      show: false,
                      data: (roadshowRegion && Object.keys(roadshowRegion)) || [],
                    },
                    series: [{
                      type: 'pie',
                      radius: [0, '70%'],
                      center: ['50%', '60%'],
                      data: roadshowRegion ? ((obj) => {
                        const d = []
                        for (const k in obj) {
                          if ({}.hasOwnProperty.call(obj, k)) {
                            d.push({
                              value: obj[k],
                              name: k,
                              label: {
                                normal: {
                                  show: true,
                                  fontSize: '26',
                                  formatter: '{b}:\n{c}\n{d}%',
                                },
                              },
                            })
                          }
                        }
                        return d
                      })(roadshowRegion) : [],
                    }],
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                      },
                    },
                    color: ['#F14D3F', '#D59E0B', '#0D9FBC'],
                  }}
                />
            : null
          }
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.roadshowRankA',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            {
              cardWidth ?
                <BarEchart
                  style={{
                    height: `${cardWidth * 0.9}px`,
                  }}
                  option={{
                    grid: {
                      left: 90,
                      right: 60,
                      top: 0,
                      bottom: 60,
                    },
                    xAxis: {
                      type: 'value',
                      show: true,
                      axisTick: {
                        show: false,
                      },
                      data: [''],
                      min: 0,
                      max: 400,
                      interval: 400,
                      axisLabel: {
                        fontSize: '26',
                        color: '#888',
                        formatter: `{value}${intl.formatMessage({
                          id: 'AnnualReview.roadshowUnit',
                        })}`,
                      },
                      axisLine: {
                        show: false,
                      },
                    },
                    yAxis: {
                      type: 'category',
                      data: (roadshowRankA && Object.keys(roadshowRankA)) || [],
                      inverse: true,
                      axisTick: {
                        show: false,
                      },
                      axisLabel: {
                        fontSize: '26',
                        align: 'right',
                        color: '#888',
                      },
                    },
                    series: [
                      {
                        name: '',
                        type: 'bar',
                        barWidth: '80%',
                        label: {
                          normal: {
                            show: true,
                            position: 'inside',
                            fontSize: '26',
                          },
                        },
                        data: (roadshowRankA && Object.values(roadshowRankA)) || [],
                      },
                    ],
                    color: ['#0D9FBC'],
                  }}
                />
            : null
          }
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.roadshowRankC',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            {
              cardWidth ?
                <BarEchart
                  style={{
                    height: `${cardWidth * 0.9}px`,
                  }}
                  option={{
                    grid: {
                      left: 110,
                      right: 60,
                      top: 0,
                      bottom: 60,
                    },
                    xAxis: {
                      type: 'value',
                      show: true,
                      axisTick: {
                        show: false,
                      },
                      data: [''],
                      min: 0,
                      max: 200,
                      interval: 200,
                      axisLabel: {
                        fontSize: '26',
                        color: '#888',
                        formatter: `{value}${intl.formatMessage({
                          id: 'AnnualReview.roadshowUnit',
                        })}`,
                      },
                      axisLine: {
                        show: false,
                      },
                    },
                    yAxis: {
                      type: 'category',
                      data: (roadshowRankC && Object.keys(roadshowRankC)) || [],
                      inverse: true,
                      axisTick: {
                        show: false,
                      },
                      axisLabel: {
                        fontSize: '26',
                        align: 'right',
                        color: '#888',
                      },
                    },
                    series: [
                      {
                        name: '',
                        type: 'bar',
                        barWidth: '80%',
                        label: {
                          normal: {
                            show: true,
                            position: 'inside',
                            fontSize: '26',
                          },
                        },
                        data: (roadshowRankC && Object.values(roadshowRankC)) || [],
                      },
                    ],
                    color: ['#0D9FBC'],
                  }}
                />
            : null
          }
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.meetingVsRoadshowMonthly',
            })}
            extra={`BY MONTH`}
          />
          <Card.Body>
            {
              cardWidth ?
                <LineEchart
                  style={{
                    height: `${cardWidth}px`,
                  }}
                  option={{
                    tooltip: {
                      trigger: 'axis',
                    },
                    grid: {
                      left: 0,
                      right: 0,
                      top: 60,
                      bottom: 60,
                      containLabel: true,
                    },
                    legend: {
                      top: 0,
                      textStyle: {
                        fontSize: '26',
                      },
                      data: [{
                        name: intl.formatMessage({
                          id: 'AnnualReview.meeting',
                        }),
                        icon: 'circle',
                      }, {
                        name: intl.formatMessage({
                          id: 'AnnualReview.roadshow',
                        }),
                        icon: 'circle',
                      }],
                    },
                    xAxis: {
                      type: 'category',
                      show: true,
                      axisTick: {
                        show: false,
                      },
                      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      axisLabel: {
                        fontSize: '20',
                        color: '#888',
                        interval: 0,
                        fontStyle: 'oblique',
                        rotate: 30,
                        margin: 12,
                        showMinLabel: true,
                        showMaxLabel: true,
                      },
                    },
                    yAxis: [{
                      // max: 'dataMax',
                      type: 'value',
                      splitNumber: 3,
                      scale: true,
                      axisTick: {
                        show: false,
                      },
                      axisLine: {
                        show: false,
                      },
                      axisLabel: {
                        fontSize: '24',
                        align: 'right',
                        color: '#888',
                      },
                    }, {
                      nameLocation: 'start',
                      // max: 'dataMax',
                      splitNumber: 3,
                      scale: true,
                      type: 'value',
                      axisTick: {
                        show: false,
                      },
                      axisLine: {
                        show: false,
                      },
                      axisLabel: {
                        fontSize: '24',
                        align: 'left',
                        color: '#888',
                      },
                    }],
                    series: [
                      {
                        name: intl.formatMessage({
                          id: 'AnnualReview.meeting',
                        }),
                        type: 'line',
                        data: (meetingMonthly && Object.values(meetingMonthly)) || [],
                      },
                      {
                        name: intl.formatMessage({
                          id: 'AnnualReview.roadshow',
                        }),
                        yAxisIndex: 1,
                        type: 'line',
                        data: (roadshowMonthly && Object.values(roadshowMonthly)) || [],
                      },
                    ],
                    color: ['#0D9FBC', '#373030'],
                  }}
                />
            : null
          }
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.CRMCount',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            <div>{ CRMCount }</div>
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.CRMRank',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            {
              cardWidth ?
                <BarEchart
                  style={{
                    height: `${cardWidth * 0.9}px`,
                  }}
                  option={{
                    grid: {
                      left: 90,
                      right: 60,
                      top: 0,
                      bottom: 60,
                    },
                    xAxis: {
                      type: 'value',
                      show: true,
                      axisTick: {
                        show: false,
                      },
                      data: [''],
                      min: 0,
                      max: 600,
                      interval: 600,
                      axisLabel: {
                        fontSize: '26',
                        color: '#888',
                        formatter: `{value}${intl.formatMessage({
                          id: 'AnnualReview.CRMUnit',
                        })}`,
                      },
                      axisLine: {
                        show: false,
                      },
                    },
                    yAxis: {
                      type: 'category',
                      data: (CRMRank && Object.keys(CRMRank)) || [],
                      inverse: true,
                      axisTick: {
                        show: false,
                      },
                      axisLabel: {
                        fontSize: '26',
                        align: 'right',
                        color: '#888',
                      },
                    },
                    series: [
                      {
                        name: '',
                        type: 'bar',
                        barWidth: '80%',
                        label: {
                          normal: {
                            show: true,
                            position: 'inside',
                            fontSize: '26',
                          },
                        },
                        data: (CRMRank && Object.values(CRMRank)) || [],
                      },
                    ],
                    color: ['#0D9FBC'],
                  }}
                />
            : null
          }
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.sportCount',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            <div
              style={{
                fontSize: '1.2rem',
              }}
            >{ `${Math.round(sportCount / 1e4)}${intl.formatMessage({
              id: 'AnnualReview.sportUnit',
            })}` }</div>
          </Card.Body>
        </Card>
        <Card
          className="annual-review__card"
        >
          <Card.Header
            title={intl.formatMessage({
              id: 'AnnualReview.sportRank',
            })}
            extra={`IN ${this.curYear}`}
          />
          <Card.Body>
            {
              cardWidth ?
                <TreemapEchart
                  style={{
                    height: `${cardWidth}px`,
                  }}
                  option={{
                    grid: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 60,
                    },
                    series: [
                      {
                        name: '',
                        type: 'treemap',
                        left: 0,
                        right: 0,
                        roam: false,
                        nodeClick: false,
                        breadcrumb: {
                          show: false,
                        },
                        data: sportRank ? ((obj) => {
                          const d = []
                          for (const k in obj) {
                            if ({}.hasOwnProperty.call(obj, k)) {
                              d.push({
                                value: obj[k],
                                name: k,
                                label: {
                                  normal: {
                                    show: true,
                                    fontSize: '24',
                                    formatter: (params) => {
                                      const { data } = params
                                      const showNum = `${Math.round(data.value / 1e4)}${intl.formatMessage({
                                        id: 'AnnualReview.sportUnit',
                                      })}`
                                      return `${data.name}\n${showNum}`
                                    },
                                  },
                                },
                              })
                            }
                          }
                          return d
                        })(sportRank) : [],
                      },
                    ],
                    // color: ['#0D9FBC'],
                  }}
                />
            : null
          }
          </Card.Body>
        </Card>
      </div>
    ) : null
  }
}

export default injectIntl(AnnualReview)
