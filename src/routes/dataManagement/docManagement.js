import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './UserManage.less';
import { Table ,Button ,Layout,Pagination,Form,Input , message , Menu , Dropdown,Icon,Tree} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../services/api';
import Authorized from '../../utils/Authorized';
import FormSub from './Form';
import OrganizationSide from './OrganizationSide';

const { ButtonAuthorize } = Authorized;
const { Content} = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const Search = Input.Search;



const data8 ={
  data: [
    {
      result: {
        org: [{
          sysDate: "2018-10-24 09:43:48",
          orgType: "总虚拟机构",
          applicationId: "0",
          orgName: "隧道运维文档",
          parentId: "-9999",
          title: "隧道运维文档",
          id: "0",
          lastModifiedDate: "2018-10-24 09:43:44",
          value: "0",
          markAsDeleted: false,
          key: "0",
          lastModifiedUserId: "0",
          children: [{
            lastModifiedUserId: "0",
            markAsDeleted: false,
            applicationId: "381bf6032e0847e89baa4fe96b50fac3",
            parentId: "0",
            lastModifiedDate: "2018-10-24 09:48:08",
            id: "cb26109199ed43839b60238752cedc9f",
            sysUserId: "0",
            key: "cb26109199ed43839b60238752cedc9f",
            orgType: "虚拟机构",
            children: [{
              key: "3c9fe32c4ab04366b6cc81edc7111edc",
              orgName: "测试",
              id: "3c9fe32c4ab04366b6cc81edc7111edc",
              applicationId: "381bf6032e0847e89baa4fe96b50fac3",
              lastModifiedDate: "2018-10-25 09:43:05",
              orgRemark: "444",
              sysUserId: "0",
              title: "上中路隧道2017-2018运维管理手册",
              value: "3c9fe32c4ab04366b6cc81edc7111edc",
              parentId: "cb26109199ed43839b60238752cedc9f",
              orgType: "集团",
              markAsDeleted: false,
              lastModifiedUserId: "0",
              sysDate: "2018-10-24 09:48:26"
            }],
            value: "cb26109199ed43839b60238752cedc9f",
            orgName: "隧道运维系统",
            sysDate: "2018-10-24 09:48:08",
            orgRemark: "test",
            title: "操作手册"
          }, {
            orgType: "虚拟机构",
            orgName: "管廊运维系统",
            key: "f047c4fd08634148aad7877202234af5",
            sysUserId: "0",
            value: "f047c4fd08634148aad7877202234af5",
            id: "f047c4fd08634148aad7877202234af5",
            sysDate: "2018-10-24 08:55:33",
            lastModifiedDate: "2018-11-15 10:43:23",
            markAsDeleted: false,
            applicationId: "d79502289d1541548da717dd2232c723",
            parentId: "0",
            lastModifiedUserName: "超级管理员",
            lastModifiedUserId: "0",
            title: "技术指南"
          }, {
            markAsDeleted: false,
            orgType: "虚拟机构",
            lastModifiedUserId: "0",
            title: "管理规范",
            sysDate: "2018-10-24 08:57:39",
            parentId: "0",
            children: [{
              key: "a153e9cb9b3d407ea8d968dba107fba0",
              lastModifiedDate: "2018-10-31 16:26:25",
              lastModifiedUserName: "dxh",
              title: "管理规范流程表",
              sysUserName: "dxh",
              markAsDeleted: false,
              applicationId: "381bf6032e0847e89baa4fe96b50fac3",
              value: "a153e9cb9b3d407ea8d968dba107fba0",
              orgName: "大连路现场操作人员管理规章",
              parentId: "f799259e78af4bd79a8c63fcc68ae0c7",
              sysUserId: "ccbab605f6fe4874862bce7a53a3f245",
              orgType: "公司",
              lastModifiedUserId: "ccbab605f6fe4874862bce7a53a3f245",
              id: "a153e9cb9b3d407ea8d968dba107fba0",
              children: [{
                orgType: "虚拟机构",
                orgName: "管廊运维系统",
                key: "f047c4fd08634148aad7877202234af5",
                sysUserId: "0",
                value: "f047c4fd08634148aad7877202234af5",
                id: "f047c4fd08634148aad7877202234af5",
                sysDate: "2018-10-24 08:55:33",
                lastModifiedDate: "2018-11-15 10:43:23",
                markAsDeleted: false,
                applicationId: "d79502289d1541548da717dd2232c723",
                parentId: "0",
                lastModifiedUserName: "超级管理员",
                lastModifiedUserId: "0",
                title: "大连路巡检流程表"
              }],
              sysDate: "2018-10-31 16:25:23"
            }, {
              sysDate: "2018-10-31 16:26:03",
              applicationId: "381bf6032e0847e89baa4fe96b50fac3",
              title: "复兴东路隧道管理条例",
              key: "a209e2aeb7574e0fb6f9a0a674ce5a02",
              orgName: "十六号线",
              markAsDeleted: false,
              lastModifiedDate: "2018-10-31 16:26:14",
              orgType: "公司",
              value: "a209e2aeb7574e0fb6f9a0a674ce5a02",
              sysUserName: "dxh",
              sysUserId: "ccbab605f6fe4874862bce7a53a3f245",
              parentId: "f799259e78af4bd79a8c63fcc68ae0c7",
              lastModifiedUserId: "ccbab605f6fe4874862bce7a53a3f245",
              id: "a209e2aeb7574e0fb6f9a0a674ce5a02",
              lastModifiedUserName: "dxh"
            }],
            sysUserId: "0",
            orgName: "车站运维系统",
            value: "f799259e78af4bd79a8c63fcc68ae0c7",
            applicationId: "381bf6032e0847e89baa4fe96b50fac3",
            key: "f799259e78af4bd79a8c63fcc68ae0c7",
            id: "f799259e78af4bd79a8c63fcc68ae0c7",
            lastModifiedDate: "2018-10-24 08:57:39"
          }, {
            lastModifiedUserId: "0",
            orgType: "虚拟机构",
            markAsDeleted: false,
            value: "1917ced7e79d4d02bcd9206ccf828e65",
            applicationId: "381bf6032e0847e89baa4fe96b50fac3",
            lastModifiedUserName: "超级管理员",
            sysUserName: "超级管理员",
            key: "1917ced7e79d4d02bcd9206ccf828e65",
            lastModifiedDate: "2018-12-13 11:08:14",
            id: "1917ced7e79d4d02bcd9206ccf828e65",
            parentId: "0",
            sysUserId: "0",
            title: "其他文档",
            sysDate: "2018-11-19 15:56:02",
            orgName: "测试123456"
          }],
          sysUserId: "0"
        }],
        users: [{
          id: "ec2fc85f2f844145b25642d5d499d32c",
          sysDate: "2019-01-09 11:18:43",
          sysUserId: "4c5f2a01f5414089be76ea98be4d94be",
          sysUserName: "黄磊",
          markAsDeleted: false,
          lastModifiedDate: "2019-01-09 11:18:43",
          lastModifiedUserId: "4c5f2a01f5414089be76ea98be4d94be",
          lastModifiedUserName: "黄磊",
          userName: "PDF",
          loginName: "上中路隧道2017-2018运维管理手册.pdf",
          password: "系统管理员",
          card: "2019-1-10",
          departmentId: "2019-1-10",
          phone: 1,
          mobilePhone: "正常",
          email: "3",
          qq: null,
          imgDir: null,
          fileId: null,
          roleId: "bf33446058cb40f5bb3c2793e7a892c8",
          roleName: "综合运维系统管理员",
          orgName: "综合运维系统",
          deviceSign: null,
          departmentPid: "-9999"
        }, {
          id: "ec2fc85f2f844145b25642d5d499d32c",
          sysDate: "2019-01-09 11:18:43",
          sysUserId: "4c5f2a01f5414089be76ea98be4d94be",
          sysUserName: "黄磊",
          markAsDeleted: false,
          lastModifiedDate: "2019-01-09 11:18:43",
          lastModifiedUserId: "4c5f2a01f5414089be76ea98be4d94be",
          lastModifiedUserName: "黄磊",
          userName: "PDF",
          loginName: "大连路巡检流程表.pdf",
          password: "系统管理员",
          card: "2019-1-10",
          departmentId: "2019-1-10",
          phone: 1,
          mobilePhone: "正常",
          email: "3",
          qq: null,
          imgDir: null,
          fileId: null,
          roleId: "bf33446058cb40f5bb3c2793e7a892c8",
          roleName: "综合运维系统管理员",
          orgName: "综合运维系统",
          deviceSign: null,
          departmentPid: "-9999"
        }, {
          id: "ec2fc85f2f844145b25642d5d499d32c",
          sysDate: "2019-01-09 11:18:43",
          sysUserId: "4c5f2a01f5414089be76ea98be4d94be",
          sysUserName: "黄磊",
          markAsDeleted: false,
          lastModifiedDate: "2019-01-09 11:18:43",
          lastModifiedUserId: "4c5f2a01f5414089be76ea98be4d94be",
          lastModifiedUserName: "黄磊",
          userName: "PDF",
          loginName: "大连路巡检流程表.pdf",
          password: "系统管理员",
          card: "2019-1-10",
          departmentId: "2019-1-10",
          phone: 1,
          mobilePhone: "正常",
          email: "3",
          qq: null,
          imgDir: null,
          fileId: null,
          roleId: "bf33446058cb40f5bb3c2793e7a892c8",
          roleName: "综合运维系统管理员",
          orgName: "综合运维系统",
          deviceSign: null,
          departmentPid: "-9999"
        }, {
          id: "ec2fc85f2f844145b25642d5d499d32c",
          sysDate: "2019-01-09 11:18:43",
          sysUserId: "4c5f2a01f5414089be76ea98be4d94be",
          sysUserName: "黄磊",
          markAsDeleted: false,
          lastModifiedDate: "2019-01-09 11:18:43",
          lastModifiedUserId: "4c5f2a01f5414089be76ea98be4d94be",
          lastModifiedUserName: "黄磊",
          userName: "PDF",
          loginName: "大连路巡检流程表.pdf",
          password: "系统管理员",
          card: "2019-1-10",
          departmentId: "2019-1-10",
          phone: 1,
          mobilePhone: "正常",
          email: "3",
          qq: null,
          imgDir: null,
          fileId: null,
          roleId: "bf33446058cb40f5bb3c2793e7a892c8",
          roleName: "综合运维系统管理员",
          orgName: "综合运维系统",
          deviceSign: null,
          departmentPid: "-9999"
        }, {
          id: "ec2fc85f2f844145b25642d5d499d32c",
          sysDate: "2019-01-09 11:18:43",
          sysUserId: "4c5f2a01f5414089be76ea98be4d94be",
          sysUserName: "黄磊",
          markAsDeleted: false,
          lastModifiedDate: "2019-01-09 11:18:43",
          lastModifiedUserId: "4c5f2a01f5414089be76ea98be4d94be",
          lastModifiedUserName: "黄磊",
          userName: "PDF",
          loginName: "上中路隧道2017-2018运维管理手册.pdf",
          password: "系统管理员",
          card: "2019-1-10",
          departmentId: "2019-1-10",
          phone: 1,
          mobilePhone: "正常",
          email: "3",
          qq: null,
          imgDir: null,
          fileId: null,
          roleId: "bf33446058cb40f5bb3c2793e7a892c8",
          roleName: "综合运维系统管理员",
          orgName: "综合运维系统",
          deviceSign: null,
          departmentPid: "-9999"
        }, {
          id: "ec2fc85f2f844145b25642d5d499d32c",
          sysDate: "2019-01-09 11:18:43",
          sysUserId: "4c5f2a01f5414089be76ea98be4d94be",
          sysUserName: "黄磊",
          markAsDeleted: false,
          lastModifiedDate: "2019-01-09 11:18:43",
          lastModifiedUserId: "4c5f2a01f5414089be76ea98be4d94be",
          lastModifiedUserName: "黄磊",
          userName: "PDF",
          loginName: "上中路隧道2017-2018运维管理手册.pdf",
          password: "系统管理员",
          card: "2019-1-10",
          departmentId: "2019-1-10",
          phone: 1,
          mobilePhone: "正常",
          email: "3",
          qq: null,
          imgDir: null,
          fileId: null,
          roleId: "bf33446058cb40f5bb3c2793e7a892c8",
          roleName: "综合运维系统管理员",
          orgName: "综合运维系统",
          deviceSign: null,
          departmentPid: "-9999"
        }, {
          id: "ec2fc85f2f844145b25642d5d499d32c",
          sysDate: "2019-01-09 11:18:43",
          sysUserId: "4c5f2a01f5414089be76ea98be4d94be",
          sysUserName: "黄磊",
          markAsDeleted: false,
          lastModifiedDate: "2019-01-09 11:18:43",
          lastModifiedUserId: "4c5f2a01f5414089be76ea98be4d94be",
          lastModifiedUserName: "黄磊",
          userName: "PDF",
          loginName: "上中路隧道2017-2018运维管理手册.pdf",
          password: "系统管理员",
          card: "2019-1-10",
          departmentId: "2019-1-10",
          phone: 1,
          mobilePhone: "正常",
          email: "3",
          qq: null,
          imgDir: null,
          fileId: null,
          roleId: "bf33446058cb40f5bb3c2793e7a892c8",
          roleName: "综合运维系统管理员",
          orgName: "综合运维系统",
          deviceSign: null,
          departmentPid: "-9999"
        }, {
          id: "ec2fc85f2f844145b25642d5d499d32c",
          sysDate: "2019-01-09 11:18:43",
          sysUserId: "4c5f2a01f5414089be76ea98be4d94be",
          sysUserName: "黄磊",
          markAsDeleted: false,
          lastModifiedDate: "2019-01-09 11:18:43",
          lastModifiedUserId: "4c5f2a01f5414089be76ea98be4d94be",
          lastModifiedUserName: "黄磊",
          userName: "PDF",
          loginName: "上中路隧道2017-2018运维管理手册.pdf",
          password: "系统管理员",
          card: "2019-1-10",
          departmentId: "2019-1-10",
          phone: 1,
          mobilePhone: "正常",
          email: "3",
          qq: null,
          imgDir: null,
          fileId: null,
          roleId: "bf33446058cb40f5bb3c2793e7a892c8",
          roleName: "综合运维系统管理员",
          orgName: "综合运维系统",
          deviceSign: null,
          departmentPid: "-9999"
        }]
      }},
  {success: true},
  {code: 0},
  {message: "查询成功"}

]
};

const testData2 ={
  employees: [
    { firstName1:"John" , lastName1:"Doe" },
    { firstName2:"Anna" , lastName2:"Smith" },
    { firstName3:"Peter" , lastName3:"Jones" }
  ]
}

const testData = [
  { firstName1:"John" , lastName1:"Doe" },
  { firstName2:"Anna" , lastName2:"Smith" },
  { firstName3:"Peter" , lastName3:"Jones" }
]



/*
{
  "employees": [
  { "firstName":"John" , "lastName":"Doe" },
  { "firstName":"Anna" , "lastName":"Smith" },
  { "firstName":"Peter" , "lastName":"Jones" }
]
}
*/

const columns = [
{
    title: '类型',
    dataIndex: 'userName',
    id: 'userName',
    align: 'center',
    key:'userName'
}, {
    title: '名称',
    dataIndex: 'loginName',
    id: 'loginName',
    align: 'center',
    key:'loginName'
},{
    title: '所有者',
    dataIndex: 'password',
    id: 'password',
    align: 'center',
    key:'password'
}, {
    title: '创建日期',
    dataIndex: 'card',
    id: 'card',
    align: 'center',
    key:'card'
},{
    title: '修改日期',
    dataIndex: 'departmentId',
    id: 'departmentId',
    align: 'center',
    key:'departmentId'
}, {
    title: '附件数',
    dataIndex: 'phone',
    id: 'phone',
    align: 'center',
    key:'phone'
}, {
    title: '状态',
    dataIndex: 'mobilePhone',
    id: 'mobilePhone',
    align: 'center',
    key:'mobilePhone'
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

export default class userManage extends PureComponent {

    static contextTypes = {
        openModal: PropTypes.func,
    };

    state = {
        columns:[],
        dataSource:[],
        fileDataSource:[],
        record: null,
        visible: false,
        rows: [],
        openSide: true,
        treeData:[],
        treeDataSote:[],
    };

    constructor(props,context) {
        super(props,context)
    }

    componentDidMount(){
        this.init();
    }




    init= () =>{
      console.log("--------------data8----------------"+data8.data[0].result.users)
      console.log("--------------data8----------------"+data8.data[0].result.org)
      console.log("--------------columns----------------"+columns)
      console.log("--------------testData----------------"+testData.firstName1)
      console.log("--------------employees----------------"+testData2.employees[0].firstName1)
        const thiz = this;
       /* GET('/users',function(data){
            if(data.success){
                thiz.setState({
                    fileDataSource:data.result.users,
                    dataSource:data.result.users,
                    treeData:data.result.org,
                    treeDataSote: data.result.org,
                })
            }
        },function(error){
            console.log(error)
        })*/
        thiz.setState({
          fileDataSource:data8.data[0].result.users,
          dataSource:data8.data[0].result.users,
          treeData:data8.data[0].result.org,
          treeDataSote: data8.data[0].result.org,
        })

    }

    //编辑
    edit =()=>{
        const {rows,record} = this.state
        if(rows.length>1){
            Modal.warning({
                title: '警告信息',
                content: '请选中一行数据',
            });
            return;
        }
        this.openModal(record);
    }

    //新增事件
    onAdd = () => {
        this.setState({record:null});
        this.openModal(null);
    };

    openModal =(record)=>{
        const modalFormProps = {
            record:record,
            isShow:true,
            Contents:FormSub,
            modalOpts: {
                width: 700,
            },
            onSubmit: (values) => this.onSubmit(values)
        }
        this.context.openModal(modalFormProps);
    }

    delete =()=> {
        const {rows,record} = this.state;
        const dataSource = [...this.state.dataSource];
        let thiz = this;
        if(rows.length > 1 || rows.length == 0){
            Modal.warning({
                title: '警告信息',
                content: '请选中一行数据',
            });
            return;
        }
        confirm({
            title: '提示信息',
            content: '确定删除【'+rows.length+'】行数据吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let params = []
                rows.map(value=>{
                    params.push(value.id);
                });
                DELETE('/users/delete', params , function(result){
                    if(result.success){
                        thiz.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem.id == item.id))});
                    }else{
                        alert(result.message);
                    }

                },function(error){
                    console.log(error)
                })
            },
            onCancel() {

            },

        })

    }

    //选中项发生变化时的回调
    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({rows:selectedRows,record:selectedRows[0]});
    }

    onSubmit= (values) =>{
        const thiz = this;
        if(thiz.state.record!=null){
            values['id'] = thiz.state.record.id;
            PUT('/users/update',values,function(data){
                console.log(data);
                if(data.success){
                    message.success("更新成功");
                    thiz.closeModal();
                    thiz.init();
                }else{
                    message.success("更新失败，请联系管理员")
                }
            },function(error){
                console.log(error);
            })
        }else {
            POST('/users/add',values,function(data){
                console.log(data);
                if(data.success){
                    message.success("新增成功");
                    thiz.closeModal();
                    thiz.init();
                }else{
                    message.success("新增失败，请联系管理员")
                }
            },function(error){
                console.log(error);
            })

        }
    }

    closeModal = () =>{
        this.setState({
            visible: false
        });
    }

    // 重置密码
    resetPassword = ()=> {
        const thiz = this;
        const {rows} = this.state
        if(rows.length > 1 || rows.length == 0){
            Modal.warning({
                title: '警告信息',
                content: '请选中一行数据',
            });
            return;
        }
        confirm({
            title: '提示信息',
            content: '确定重置密码吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let params = []
                rows.map(value=>{
                    params.push(value.id);
                });
                PUT('/users/resetPassword', params , function(result){
                    console.log(result);
                    if(result.success){
                        message.success("更新成功");
                        thiz.closeModal();
                        thiz.init();
                    }else{
                        message.success("更新失败，请联系管理员")
                    }
                },function(error){
                    console.log(error)
                })
            },
            onCancel() {

            },

        })
    }

    onSelect = (selectedKeys, info) => {
        let array = []

        array.push(selectedKeys);
        let recursive = function(node){
            if(node.key!=undefined){
                array.push(node.key)
            }
            if(node.props['children']){
                for(var i=0;i<node.props['children'].length;i++){
                    recursive(node.props['children'][i]);
                }
            }
        }
        //递归获取子集
        recursive(info.node);
        const {fileDataSource} = this.state;
        this.setState({ dataSource: fileDataSource.filter(item => array.some(jtem =>item.departmentId==jtem))});
    }

    handleSearch = () => {}



    render() {
        const {visible,record,dataSource,treeData} = this.state;
        const rowSelection = {
            onChange: this.onSelectChange,
        };

        const menu = (
            <Menu>
                <Menu.Item >
                    <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)" onClick={this.edit}>修改</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)" onClick={this.delete}>删除</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="javascript:void(0)" onClick={this.resetPassword}>重置密码</a>
                </Menu.Item>
            </Menu>
        );

        return(
            <Layout className={styles.application}>
                <OrganizationSide
                    treeData={treeData}
                    onSelect={this.onSelect}
                />
                <Layout style={{background: '#fff',border:'1px solid #E5E5E5'}}>
                    <div>
                        <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="user:add"/>

                        <Button icon="setting"  style={{ margin: 10,float:'right'}}>
                            高级 <Icon type="primary" />
                        </Button>
                        <Search style={{ margin: 10,width:'20%',float:'right'}} placeholder="搜索" onChange={this.handleSearch} />

                    </div>
                    <Content  >
                        <Table  rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={dataSource}  onChange={this.handleChange} rowSelection={rowSelection}
                                pagination={{
                                   showSizeChanger:true,
                                   showQuickJumper:true,
                                   total:dataSource?dataSource.length:null,
                                   onChange:this.onChange
                               }}
                        />
                    </Content>
                </Layout>
            </Layout>
        )

    }
}
