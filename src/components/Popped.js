import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import Popover from './Popover'

const root = document.body

export default class Popped extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false, scrollParents: [] }
    this.el = document.createElement('div')
  }

  getScrollParents(node) {
    if(!node) return []
    if (node.scrollHeight > node.clientHeight) return [node, ...this.getScrollParents(node.parentNode)]
    return [...this.getScrollParents(node.parentNode)]
  }

  _onMouseEnter = () => {
    this.setState({ open: true })
  }

  _onMouseLeave = () => {
    this.setState({ open: false })
  }

  _onScroll = () => {
    this.forceUpdate()
  }

  manageEventListeners(target, ltarget) {
    if(target != ltarget) {
      if(ltarget) ltarget.removeEventListener('mouseenter', this._onMouseEnter)
      if(target) target.addEventListener('mouseenter', this._onMouseEnter)

      if(ltarget) ltarget.removeEventListener('mouseleave', this._onMouseLeave)
      if(target) target.addEventListener('mouseleave', this._onMouseLeave)
    }

    let scrollParents = this.getScrollParents(target)

    scrollParents.map((sp) => {
      sp.addEventListener('scroll', this._onScroll)
    })

    this.state.scrollParents.map((sp) => {
      sp.removeEventListener('scroll', this._onScroll)
    })

    this.setState({ target, scrollParents })
  }

  componentDidMount() {
    let ltarget = this.state.target
    let target = ReactDOM.findDOMNode(this)
    this.timer = setTimeout(() => this.manageEventListeners(target, ltarget), 0)
  }

  componentWillUnmount() {
    let target = this.state.target
    this.state.scrollParents.map((sp) => {
      sp.removeEventListener('scroll', this._onScroll)
    })

    if(target) {
      target.removeEventListener('mouseenter', this._onMouseEnter)
      target.removeEventListener('mouseleave', this._onMouseLeave)
    }

    clearTimeout(this.timer)
  }

  componentWillReceiveProps() {
    let ltarget = this.state.target
    let target = ReactDOM.findDOMNode(this)
    this.timer = setTimeout(() => this.manageEventListeners(target, ltarget), 0)
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
        <Popover
          open={this.state.open}
          order={this.props.order}
          target={this.state.target}
          position={this.props.position}
        >
          {this.props.content}
        </Popover>
      </Fragment>
    )
  }
}
