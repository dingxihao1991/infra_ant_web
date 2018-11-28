import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../workManage.less';
import { Table ,Button ,Layout,Pagination,Form,Input , message , Menu , Dropdown,Icon,Tree,List,Card} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import Authorized from '../../../utils/Authorized';
import OrganizationSide from './OrganizationSide';
import EventSide from './EventSide';
import FormSub from './Form';

const { ButtonAuthorize } = Authorized;
const { Content} = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const Search = Input.Search;

const data = [
  {
    id:1,
    title: '合肥管廊运营处_紧急巡视',
    unitName:'合肥管廊运营管理处',
    name:'周福',
    reasons:'临时任务',
    workType:'紧急巡视',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
    ops:'系统管理员'
  },
  {
    id:2,
    title: '合肥管廊运营处_紧急巡视',
    unitName:'合肥管廊运营管理处',
    name:'周福',
    reasons:'临时任务',
    workType:'紧急巡视',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
    ops:'系统管理员'
  },
  {
    id:3,
    title: '合肥管廊运营处_紧急巡视',
    unitName:'合肥管廊运营管理处',
    name:'周福',
    reasons:'临时任务',
    workType:'紧急巡视',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
    ops:'系统管理员'
  },
  {
    id:4,
    title: '合肥管廊运营处_紧急巡视',
    unitName:'合肥管廊运营管理处',
    name:'周福',
    reasons:'临时任务',
    workType:'紧急巡视',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
    ops:'系统管理员'
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
    content:null
  };

  constructor(props,context) {
    super(props,context)
  }

  componentDidMount(){
    this.init();
  }

  init= () =>{
    const content =  (<Layout style={{background: '#fff',border:'1px solid #E5E5E5'}}>
      <div>
        <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="user:add"/>
        <Search style={{ margin: 10,width:'20%',float:'right'}} placeholder="搜索" onChange={this.handleSearch} />
      </div>
      <Content >
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Card title={item.title} actions={[<Icon type="edit" onClick={() => this.edit(item)}/>, <Icon type="close" onClick={() => this.delete(item)}/>]}>
                <p style={{fontSize:14}}><Icon type="user" style={{color:'#4194ce',marginRight:6}}/>单位人员：jack</p>
                <p style={{fontSize:14}}><Icon type="unlock" style={{color:'#4194ce',marginRight:6}}/>开始时间：2018-1-2 09：23：44</p>
                <p style={{fontSize:14}}><Icon type="bars" style={{color:'#4194ce',marginRight:6}}/>所属管廊：彩虹西路(将军岭路~鸡鸣山路)</p>
                <p style={{fontSize:14}}><Icon type="user" style={{color:'#4194ce',marginRight:6}}/>操作人员：管理员</p>
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>)
    this.setState({
      content:content
    })

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
  edit =(item)=>{
    this.openModal(item);
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

  delete =(item)=> {
    const {rows,record} = this.state;
    alert(item.id);
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

  onSelect = (selectedKey) => {
    if(selectedKey == 1){
      this.setState({
        content:
          <Layout style={{background: '#fff',border:'1px solid #E5E5E5',height:'100%'}}>
            <div>
              <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="user:add"/>
              <Search style={{ margin: 10,width:'20%',float:'right'}} placeholder="搜索" onChange={this.handleSearch} />
            </div>
            <Content >
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <Card title={item.title} actions={[<Icon type="edit" onClick={() => this.edit(item)}/>, <Icon type="close" onClick={() => this.delete(item)}/>]}>
                      <p style={{fontSize:14}}><Icon type="user" style={{color:'#4194ce',marginRight:6}}/>单位人员：jack</p>
                      <p style={{fontSize:14}}><Icon type="unlock" style={{color:'#4194ce',marginRight:6}}/>开始时间：2018-1-2 09：23：44</p>
                      <p style={{fontSize:14}}><Icon type="bars" style={{color:'#4194ce',marginRight:6}}/>所属管廊：彩虹西路(将军岭路~鸡鸣山路)</p>
                      <p style={{fontSize:14}}><Icon type="user" style={{color:'#4194ce',marginRight:6}}/>操作人员：管理员</p>
                    </Card>
                  </List.Item>
                )}
              />
            </Content>
          </Layout>
      })
    }else{
      this.setState({content:<EventSide/>})
    }

  }

  handleSearch = () => {}


  render() {
    const {visible,record,dataSource,treeData} = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    return(
      <Layout className={styles.application} style={{ background: '#fff' }}>
        <OrganizationSide
          treeData={treeData}
          onSelect={this.onSelect}
        />
        {this.state.content}
      </Layout>
    )

  }
}
