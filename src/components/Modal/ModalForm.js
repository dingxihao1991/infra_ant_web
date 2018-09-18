import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Modal, Button } from 'antd';
import './index.less';

class ModalForm extends Component {

    static propTypes = {
        title: PropTypes.string,
        record: PropTypes.object,
        visible: PropTypes.bool,
        columns: PropTypes.array,
        onCancel: PropTypes.func,
        onSubmit: PropTypes.func,
        modalOpts: PropTypes.object,
        className: PropTypes.string
    };
    constructor(props){
        super(props);
        this.state={
            visible: this.props.visible
        }
    }

    closeModal = () =>{
        if (this.props.onCancel) {
            this.props.onCancel();
            return;
        }
        this.setState({
            visible: false
        });
    }

    onSubmit = () => {
        const { record, onSubmit } = this.props;

        this.refs.form.validateFields((error, value) => {
            if (error) {
                console.log(error);
                return;
            }
            this.closeModal();
            onSubmit && onSubmit(value, record);

        });
    }
    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps) {
            this.setState({
                visible: nextProps.visible
            });
        }
    }


    render(){
        const {title, record, columns, onCancel, onSubmit, modalOpts, loading,Contents} = this.props;
        const modalProps = {
            confirmLoading:loading,
            visible:this.state.visible,
            style:{ top: 20 },
            title: title || (record ? '编辑内容' : '新增内容'),
            destroyOnClose:true,
            maskClosable: false,
            modalOpts,
            onCancel: this.closeModal,
            footer:[
                onCancel && (
                    <Button key="back" onClick={this.closeModal}>
                        取消
                    </Button>
                ),
                onSubmit && (
                    <Button key="submit" type="primary" onClick={this.onSubmit}>
                        确定
                    </Button>
                )
            ],
            ...modalOpts
        }

        return (
            <Modal {...modalProps}>
                <Contents ref='form' record={record}/>
            </Modal>
        )
    }

}

ModalForm.Modal = Modal;
export default ModalForm;