import React from 'react'
import ReactDom from 'react-dom'

let modalRoot = document.getElementById('modal-root')

if (!modalRoot) {
  modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')

  document.body.appendChild(modalRoot)
}

class Modal extends React.Component {
  el = document.createElement('div')

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return ReactDom.createPortal(this.props.children, this.el)
  }
}

export { Modal }
