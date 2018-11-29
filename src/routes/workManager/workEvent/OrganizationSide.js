import React, {PureComponent} from 'react';
import SideLayout from 'components/SideLayout';
import {Menu,Icon} from 'antd';

export default class OrganizationSide extends PureComponent {

  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  }

  handleSearch = (e) => {
    const value = e.target.value;
    const { treeData } = this.props;
    let parentKey = [];
    this.getParentKey(value, treeData, parentKey)
    this.setState({
      expandedKeys: parentKey,
      searchValue: value,
      autoExpandParent: true,
    });
  }

  menus = (onSelect) => {
        return (
          <Menu defaultselectedkey={['1']}>
            <Menu.Item key="1" onClick={()=>onSelect('1')}>
              <Icon type="swap" />
              <span >出入管理</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={()=>onSelect('2')}>
              <Icon type="bars" />
              <span >应急事件</span>
            </Menu.Item>
          </Menu>
        );
  }

    render(){
      const {onSelect} =this.props;
        return(
            <SideLayout
                width={230}
                handleSearch={this.handleSearch}
                sideContent={
                    this.menus(onSelect)
                }
            >
            </SideLayout>
        )
    }
}