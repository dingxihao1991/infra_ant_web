/**
 * @Author: zhangy;
 * @Date: 2018/10/9
 * @Description: *
 */
import React ,{Component}from 'react';
import { Table ,Button} from 'antd';

import {getAuthority} from '../../utils/authority'

class ButtonAuthorize extends Component {

    constructor(props){
        super(props);
        let authentic= getAuthority();
        const {authority} = props;
        this.state={
            mark: authentic?authentic.tokenObjDTO.authCode.some(item=>item==authority):false
        }

    }
    render() {
        const {name } = this.props;

        return (
            <span>{
                this.state.mark?<Button {...this.props}  style={{margin:'10px'}}>{name}</Button>:null
            }
            </span>
        );
    }
}

export default ButtonAuthorize;