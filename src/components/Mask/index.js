import style from './style/index.less';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import {Icon} from 'antd';
import cssAnimate, { isCssAnimationSupported } from 'css-animation';

const noop = () => {};

class Mask extends PureComponent {
  static defaultProps = {
    prefixCls: 'basic_mask',
    maskClosable: true
  };

  componentDidMount() {
    console.log("------")
      const { visible } = this.props;
      this.container = document.createElement('div');
      const mountNode = ReactDOM.findDOMNode(this);
      mountNode.appendChild(this.container);
      document.body.appendChild(this.container);
      this.toggle(visible);
  }

  componentDidUpdate(prevProps, prevState) {
    const { visible } = this.props;
    this.toggle(visible);
  }

  componentWillUnmount() {
    this.container.parentNode.removeChild(this.container);
  }

  toggle = visible => {
    const node = this.node;
    if (!node) return;
    if (visible) node.style.display = 'block';

    if (isCssAnimationSupported) {
        cssAnimate(node, `fade${visible ? 'In' : 'Out'}`, _ => {
            node.style.display = visible ? 'block' : 'none';
        });
    } else {
        node.style.display = visible ? 'block' : 'none';
    }

  };

  onClick = e => {
    const { onClose, prefixCls } = this.props;

    if (
      (e.target.classList.contains(prefixCls) ||
        e.target.classList.contains(prefixCls + '_close')) &&
      onClose
    ) {
      onClose(e);
    }
  };

  render() {
    const {
      children,
      className,
      prefixCls,
      closable,
      maskClosable
    } = this.props;

    if (this.container) {
      return ReactDOM.createPortal(
        <div
          ref={node => this.node = node}
          className={cx(style.basic_mask,prefixCls, 'animated', 'animated-short', className)}
          onClick={maskClosable ? this.onClick : noop}
        >
          {closable ? (
            <Icon
              className={`${prefixCls}_close`}
              type="close"
              onClick={this.onClick}
            />
          ) : null}
          {children}
        </div>,
        this.container
      );
    }

    return <div></div>;
  }
}

export default Mask;
