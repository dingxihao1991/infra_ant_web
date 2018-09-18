/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */
import React,{PureComponent} from 'react';
import { Spin } from 'antd';

export default class PromiseRender extends PureComponent {
  state = {
    component: null,
  };

  componentDidMount() {
    this.setRenderComponent(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // new Props enter
    this.setRenderComponent(nextProps);
  }

  // set render Component : ok or error
  setRenderComponent(props) {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);
    props.promise
      .then(() => {
        this.setState({
          component: ok,
        });
      })
      .catch(() => {
        this.setState({
          component: error,
        });
      });
  }

  checkIsInstantiation = target => {
    if (!React.isValidElement(target)) {
      return target;
    }
    return () => target;
  };

  render() {
    const { component: Component } = this.state;
    return Component ? (
      <Component {...this.props} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
