import styles from './style/index.less';
import React, { Component } from 'react';
import { Layout ,Icon,Input,Tree } from 'antd';
const { Sider } = Layout;
const Search = Input.Search;
class SideLayout extends Component {

  static defaultProps = {
    width: 180
  };

  state = {
    openSide: true
  }

  toggle = (e) => {
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      openSide: !this.state.openSide
    });
      this.refs.sideHandle.style.right = this.state.openSide?'-12px':null;
  }


  render() {
    const { sideContent, width,handleSearch,search,toggle } = this.props;
    const { openSide } = this.state;
    return (

        <Sider className={styles.SideLayout}
               style={{background: '#fff'}}
               trigger={null}
               collapsible
               collapsed={!openSide}
               collapsedWidth={0}
               width={width}
        >
          {toggle?<a ref='sideHandle'
                       title={this.state.openSide ? "收起" : "展开"}
                       className="side-handle"
                       onClick={this.toggle}
              >
                <Icon type={openSide ? 'caret-left' : 'caret-right'} />
              </a>:null
          }
          <div className="side-body" style={{height: '100%',overflow: 'auto'}}>
            <div className="side-panel">
                {search?
                    <div className={styles.panel_header}>
                      <Search style={{ marginBottom: 8,width:'90%'}} placeholder="搜索" onChange={handleSearch} />

                    </div>: null
                }
              <div className="panel-body">{sideContent}</div>
            </div>
          </div>
        </Sider>
    );
  }
}

export default SideLayout;
