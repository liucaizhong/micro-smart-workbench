import React, { Component } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/parallel'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legendScroll'

class BarEchart extends Component {
  static propTypes = {
    style: PropTypes.object,
    option: PropTypes.object,
  }

  static defaultProps = {
    style: {
      width: '100%',
      height: '4rem',
    },
    option: {},
  }

  componentDidMount() {
    this.init()
  }

  componentDidUpdate() {
    this.init()
  }

  init() {
    const { option } = this.props
    const chart = echarts.getInstanceByDom(this.el) || echarts.init(this.el)

    chart.setOption(option)
    if (!window.onresize) {
      window.onresize = () => {
        chart.resize()
      }
    }
    window.onresize()
  }

  render() {
    const { style, className } = this.props

    return (
      <div
        ref={(el) => {
          this.el = el
        }}
        className={className}
        style={style}
      />
    )
  }
}

export default BarEchart
