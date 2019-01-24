import React, {PureComponent} from 'react';
import styles from './RoleManage.less';
import {Button, Form, Input, Layout, message, Pagination, Table,Icon} from 'antd';
import {ModalForm, showConfirm} from 'components/Modal';
import {GET, POST, PUT} from '../../../services/api';
import Authorized from '../../../utils/Authorized';
import cx from 'classnames';

const Search = Input.Search;
const { ButtonAuthorize } = Authorized;
const { Content} = Layout;
const Modal = ModalForm.Modal;

const columns = [
    {
        title: '操作用户',
        dataIndex: 'userName',
        id: 'userName',
        align: 'center',
        key:'userName'
    }, {
        title: 'IP',
        dataIndex: 'ip',
        id: 'ip',
        align: 'center',
        key:'ip'
    } ,{
        title: '操作模块',
        dataIndex: 'moduleName',
        id: 'moduleName',
        align: 'center',
        key:'moduleName'
    },{
        title: '操作描述',
        dataIndex: 'option',
        id: 'option',
        align: 'center',
        key:'option'
    },{
        title: '操作时间',
        dataIndex: 'sysDate',
        id: 'sysDate',
        align: 'center',
        key:'sysDate'
    }];

const Paging = ({dataItems, onChange, ...otherProps}) => {
    const { total, pageSize, pageNum } = dataItems;
    const paging = {
        total: total,
        pageSize: pageSize,
        current: pageNum,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        onShowSizeChange: (pageNum, pageSize) => onChange({pageNum, pageSize}),
        onChange: (pageNum) => onChange({pageNum}),
        ...otherProps
    };
    return <Pagination {...paging} />;
};

export default class logManage extends PureComponent {

    state = {
        columns:[],
        dataSource:[],
        record: null,
        visible: false,
        rows: [],
        current:1,
        pageSize:10,
    };

    constructor(props,context) {
        super(props,context)

    }

    componentDidMount(){
        this.init();
    }

    init= () =>{
        const thiz = this;
        GET('/systemOperationLogs',function(result){
            if(result.success){
                thiz.setState({dataSource:result.result})
            }
        },function(error){
            console.log(error)
        })
    }

    handleChange = (pagination, filters, sorter, extra) =>{
        this.setState({current:pagination.current,pageSize:pagination.pageSize});

    }

    onSubmit= (values ) =>{
        const thiz = this;
        if(thiz.state.record!=null){
            values['id'] = thiz.state.record.id;
            PUT('/role/update',values,function(data){
                console.log(data);
                if(data.success){
                    message.success('修改成功');
                    thiz.closeModal();
                    thiz.init();
                }else{
                    Modal.error({
                        title: '错误信息',
                        content: '修改失败',
                    });
                }
            },function(error){
                console.log(error);
            })
        }else {
            POST('/role/add',values,function(data){
                console.log(data);
                if(data.success){
                    message.success('新增成功');
                    thiz.closeModal();
                    thiz.init();
                }else{
                    Modal.error({
                        title: '错误信息',
                        content: '新增失败',
                    });
                }
            },function(error){
                console.log(error);
            })

        }
    }

    render() {
        let { current,pageSize,record,rows,dataSource} = this.state;

        let classname = cx(
            {'ant_table_ui':dataSource.length>0?true:false},
        );

        const dataTableProps ={
            total: dataSource?dataSource.length:null,
            pageSize: pageSize,
            current:current,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${dataSource.length} 条`,

        }

        return(
            <Layout className={styles.application}>
                <div>
                    <Button icon="setting"  style={{ margin: 10,float:'right'}}>
                        高级 <Icon type="primary" />
                    </Button>
                    <Search style={{ margin: 10,width:'20%',float:'right'}} placeholder="搜索" onChange={this.handleSearch} />
                </div>
                <Content className={classname} >
                    <Table  rowKey='id' style={{minHeight: 360}}  columns={columns} dataSource={dataSource}  onChange={this.handleChange}
                            pagination={dataTableProps}
                            scroll={{ y: '72vh'  }}
                    />
                </Content>
            </Layout>
        )

    }
}