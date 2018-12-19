import React, { PureComponent,ReactDOM } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, AutoComplete ,Dropdown,Menu,Anchor } from 'antd';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import {connect} from 'dva';
import styles from './index.less';
import SearchMenu from './SearchMenu';

@connect(({loading, search}) => ({
    data:search.list,
    loading:loading.effects['search/query'],
}))
export default class HeaderSearch extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchMode: props.defaultOpen,
            value: '',
            visible:false,
            menu:[]
        };
    }

    onChange = value => {

        if(value!=''){
            const {dispatch,loading } = this.props;
            dispatch({
                type: 'search/query',
                payload: {
                    value:value
                },
            });
            this.setState({ value:value,visible:true });
        }else{
            this.setState({ value:value,visible:false });
        }

    };



    enterSearchMode = () => {
        const {value} = this.state;
        let visible = false;
        if(value!=''){
            visible = true;
        }
        this.setState({ searchMode: true,visible:visible }, () => {
            const { searchMode } = this.state;
            if (searchMode) {

                this.input.focus();
            }
        });
    };

    leaveSearchMode = () => {
        this.setState({
            searchMode: false,
            //value: '',
            visible:false
        });
    };

    // NOTE: 不能小于500，如果长按某键，第一次触发auto repeat的间隔是500ms，小于500会导致触发2次
    // @Bind()
    // @Debounce(500, {
    //     leading: true,
    //     trailing: false,
    // })

    render() {
        const { className, data,loading,placeholder, ...restProps } = this.props;
        const { searchMode,visible, value } = this.state;
        delete restProps.defaultOpen; // for rc-select not affected
        const inputClass = classNames(styles.input, {
            [styles.show]: searchMode,
        });


        return (
            <span className={classNames(className, styles.headerSearch)}  >
          <Icon type="search" key="Icon" onClick={this.enterSearchMode} />

          <AutoComplete
              key="AutoComplete"
              {...restProps}
              className={inputClass}
              value={value}
              onChange={this.onChange}
          >
              <Input
                  placeholder={placeholder}
                  ref={node => {
                      this.input = node;
                  }}
                  onBlur={this.leaveSearchMode}
              />
          </AutoComplete>
          <SearchMenu data={data} visible={visible}/>
      </span>
        );
    }
}
