/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */
import React,{Component} from 'react';
import CheckPermissions from './CheckPermissions';

class Authorized extends Component {
  render() {
    const { children, authority, noMatch = null } = this.props;
    const childrenRender = typeof children === 'undefined' ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
}

export default Authorized;
