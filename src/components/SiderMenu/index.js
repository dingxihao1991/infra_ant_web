import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';

const SiderMenuWrapper = props => {
  const { collapsed } = props;
  return(
    <SiderMenu {...props} />
  );
};

export default SiderMenuWrapper;
