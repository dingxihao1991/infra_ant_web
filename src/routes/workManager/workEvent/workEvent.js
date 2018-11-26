import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../workManage.less';
import { Table ,Button ,Layout,Pagination,Form,Input , message , Menu , Dropdown,Icon,Tree,List,Card} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import Authorized from '../../../utils/Authorized';
import OrganizationSide from './OrganizationSide';

const { ButtonAuthorize } = Authorized;
const { Content} = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const Search = Input.Search;

const data = [
  {
    title: '合肥管廊运营处_紧急巡视',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];
const columns = [
  {
    title: '用户名',
    dataIndex: 'userName',
    id: 'userName',
    align: 'center',
    key:'userName'
  }, {
    title: '登录名',
    dataIndex: 'loginName',
    id: 'loginName',
    align: 'center',
    key:'loginName'
  },{
    title: '证件号码',
    dataIndex: 'card',
    id: 'card',
    align: 'center',
    key:'card'
  }, {
    title: '机构名称',
    dataIndex: 'orgName',
    id: 'orgName',
    align: 'center',
    key:'orgName'
  },{
    title: '角色',
    dataIndex: 'roleName',
    id: 'roleName',
    align: 'center',
    key:'roleName'
  }, {
    title: '固定电话',
    dataIndex: 'phone',
    id: 'phone',
    align: 'center',
    key:'phone'
  }, {
    title: '手机',
    dataIndex: 'mobilePhone',
    id: 'mobilePhone',
    align: 'center',
    key:'mobilePhone'
  }, {
    title: '邮箱',
    dataIndex: 'email',
    id: 'email',
    align: 'center',
    key:'email'
  }, {
    title: 'QQ',
    dataIndex: 'qq',
    id: 'qq',
    align: 'center',
    key:'qq'
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

export default class workEvent extends PureComponent {

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
    const thiz = this;
    GET('/users',function(data){
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
            <Search style={{ margin: 10,width:'20%',float:'right'}} placeholder="搜索" onChange={this.handleSearch} />
          </div>
          <Content  >
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Card title={item.title} actions={[<Icon type="edit" />, <Icon type="close" />]}>
                    <p style={{fontSize:14}}><Icon type="reload" style={{color:'#4194ce',marginRight:6}}/>单位人员：jack</p>
                    <p style={{fontSize:14}}><Icon type="unlock" style={{color:'#4194ce',marginRight:6}}/>开始时间：2018-1-2 09：23：44</p>
                    <p style={{fontSize:14}}><Icon type="bars" style={{color:'#4194ce',marginRight:6}}/>所属管廊：彩虹西路(将军岭路~鸡鸣山路)</p>
                    <p style={{fontSize:14}}><Icon type="clock-circle" style={{color:'#4194ce',marginRight:6}}/>操作人员：管理员</p>
                  </Card>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    )

  }
}
