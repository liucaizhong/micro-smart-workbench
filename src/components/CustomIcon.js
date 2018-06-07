import React from 'react'
import { Icon } from 'antd-mobile'

const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => {
  return type[0] === '#' ? (
    <svg
      className={`am-icon am-icon-${type.substr(1)} am-icon-${size} ${className}`}
      {...restProps}
    >
      {/* svg-sprite-loader@0.3.x */}
      <use xlinkHref={type} />
      {/* svg-sprite-loader@latest */}
      {/* <use xlinkHref={`#${type.default.id}`} /> */}
    </svg>
  )
  : <Icon type={type} size={size} {...restProps} />
}

export default CustomIcon
