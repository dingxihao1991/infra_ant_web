/**
 * @Author: zhangy;
 * @Date: 2018/10/9
 * @Description: *
 */
import React ,{Component}from 'react';
import { Table ,Button} from 'antd';
import PropTypes from 'prop-types';

class ButtonAuthorize extends Component {

    static contextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
        userInfo:PropTypes.object
    };

    constructor(props,context){
        super(props);
        let authentic= context.userInfo;
        const {authority} = props;
        this.state={
            mark: authentic?authentic.authCode.some(item=>item==authority):false
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