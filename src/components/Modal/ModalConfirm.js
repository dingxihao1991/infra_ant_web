import { Modal } from 'antd';
const confirm = Modal.confirm;

export async function showConfirm(title,content,okType,excute) {
    confirm({
        title: title,
        content: content,
        okText: '确定',
        okType: okType,
        cancelText: '取消',
        onOk() {

            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}