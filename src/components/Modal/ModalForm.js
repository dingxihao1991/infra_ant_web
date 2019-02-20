import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Modal, Button } from 'antd';
import styles from './index.less';

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
        const { record, onSubmit,onCancel } = this.props;

        this.refs.form.validateFields((error, value) => {
            if (error) {
                console.log(error);
                return;
            }
            onSubmit && onSubmit(value, record);
            onCancel();

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
        const {title, record, className, onCancel, onSubmit, modalOpts,full, loading,Contents,visible,isFooter,maskClosable} = this.props;

        const modalProps = {
            className: cx(className,styles.modalform,{ 'full-modal': full }),
            confirmLoading:loading,
            visible:visible,
            title: title || (record ? '编辑内容' : '新增内容'),
            destroyOnClose:true,
            maskClosable: !!maskClosable,
            modalOpts,
            onCancel: onCancel,
            footer:!isFooter? [
                    onCancel && (
                        <Button key="back" onClick={onCancel}>
                            取消
                        </Button>
                    ),
                    onSubmit && (
                        <Button key="submit" type="primary" onClick={this.onSubmit}>
                            确定
                        </Button>
                    )
                ]:null,
            ...modalOpts
        }

        return (
            <Modal {...modalProps}>
                {Contents?<Contents ref='form'  record={record}/>:<div/>}
            </Modal>
        )
    }

}

ModalForm.Modal = Modal;
export default ModalForm;