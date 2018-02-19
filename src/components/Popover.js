import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Popover extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let target = ReactDOM.findDOMNode(this)
    this.setState({ target })
  }

  autoAlign = (parentProps, popoverProps) => {
    let order = this.props.order || ['right', 'bottom', 'left', 'top']
    let filtered = order.filter((alignment) => {
      switch (alignment) {
        case 'right' : return window.innerWidth - (parentProps.left + parentProps.width + popoverProps.width) > 0
        case 'left'  : return parentProps.left - popoverProps.width > 0
        case 'top'   : return parentProps.top - popoverProps.height > 0
        case 'bottom': return window.innerHeight - (parentProps.top + parentProps.height + popoverProps.height) > 0
      }
    })

    return this.align(filtered[0] || order[0], parentProps, popoverProps)
  }

  align = (alignment, parentProps, popoverProps) => {
    let { top, left, height, width } = parentProps
    switch (alignment) {
      case 'right':
        top = top + (height / 2) - (popoverProps.height / 2)
        left = left + width
        return { top, left }
      case 'left':
        top = top + (height / 2) - (popoverProps.height / 2)
        left = left - popoverProps.width
        return { top, left }
      case 'top':
        top = top - popoverProps.height
        left = left + (width / 2) - (popoverProps.width / 2)
        return { top, left }
      case 'bottom':
        top = top + height
        left = left + (width / 2) - (popoverProps.width / 2)
        return { top, left }
      case 'auto': return this.autoAlign(parentProps, popoverProps)
    }
  }

  render() {
    let parentProps = this.props.target ? this.props.target.getBoundingClientRect() : {}
    let { top, left, width, height } = parentProps

    if(this.state.target) {
      let popoverProps = this.state.target.getBoundingClientRect()
      let alignedProps = this.align(this.props.alignment || 'auto', parentProps, popoverProps)
      top = alignedProps.top
      left = alignedProps.left
    }

    let popoverTop = top || 0
    let popoverLeft = left || 0

    let style = {
      visibility: this.props.open ? 'visible' : 'hidden', top: popoverTop, left: popoverLeft,
      position: 'fixed', ...this.props.style, zIndex: 2147483647
    }

    return ReactDOM.createPortal((
        <span style={style}>
          {this.props.children}
        </span>
      ), document.body)
  }
}
