import React ,{PureComponent} from 'react';
import { Input, Icon, AutoComplete ,Dropdown,Menu,Anchor,Card ,Divider,List } from 'antd';
import styles from './SearchMenu.less'
import {connect} from 'dva';
import { push } from 'react-router-redux'

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const Item =List.Item;


@connect(({loading, search}) => ({
    data:search.list,
    loading:loading.effects['search/query'],
}))
export default class SearchMenu extends PureComponent {

    onClick =  (item) => {
        const {dispatch} =this.props;

        dispatch(push(item.path));
    };


    render(){
        const {data,visible} = this.props;

        return (
            <Card className={styles.menu}
                  style={{display: visible?'block':'none'}}
            >
                {data.map(item=>(
                    <div key={item.title} title={item.title} onMouseDown={this.onClick.bind(this,item)}>
                        <div style={{ marginBottom: '5px'}}>
                            <div style={{margin:'10px',}}>
                                {item.title}
                            </div>
                            <Divider />
                        </div>
                        <div>
                            {
                                item.children.map(opt=>(
                                    <Item key={opt.title} onMouseDown={this.onClick.bind(this,opt)} style={{lineHeight: '30px'}}>
                                        <span style={{borderRight:'1px solid #E8E8E8', paddingRight:'10px'}}>{opt.menu}</span>
                                        <span className="item-content"><a style={{color:'#53b7f5'}}>{opt.content}</a></span>
                                    </Item>
                                ))
                            }
                        </div>


                    </div>
                ))}
            </Card>
        )
    }
}