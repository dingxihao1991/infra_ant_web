import React, { PureComponent } from 'react';
import Mask from '../Mask';
import { Radio,Icon ,Select} from 'antd';
import styles from './searchbox.less';

//const RadioGroup = Radio.Group;
const Option = Select.Option;
/**
 * 全屏搜索
 */

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option style={{zIndex:9999}} key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
class SearchBox extends PureComponent {

    handleChange=(value)=> {
        console.log(`selected ${value}`);
    }

  render() {
    const { visible, onClose } = this.props;
    return (
      <Mask visible={visible} onClose={onClose} className={styles.search_box} closable>
        <div className="search-box-input">
          {/*<input ref="input" type="text" placeholder="搜索..." />*/}
            <Select
                size="large"
                mode="multiple"
                style={{ width: '100%'}}
                placeholder="搜索..."
                onChange={this.handleChange}
            >
                {children}
            </Select>
          {/*<a className="search-box-btn"><Icon type="search" /></a>*/}
        </div>
        <div className="search-box-content">
         {/* <RadioGroup name="radiogroup" defaultValue={1}>
            <Radio value={1}>用户</Radio>
            <Radio value={2}>部门</Radio>
            <Radio value={3}>文章</Radio>
            <Radio value={4}>所有</Radio>
          </RadioGroup>*/}
        </div>
      </Mask>
    );
  }
}

export default SearchBox;