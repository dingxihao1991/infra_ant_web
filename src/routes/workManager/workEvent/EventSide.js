import { Layout, Menu, Icon ,Input ,Row,Col,Card,List} from 'antd';
import Authorized from '../../../utils/Authorized';
import PropTypes from 'prop-types';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from './FormEvent';

const Modal = ModalForm.Modal;
const { ButtonAuthorize } = Authorized;
const Search = Input.Search;
const { Sider, Content } = Layout;
const data = [
  {
    id:1,
    title: '合肥管廊运营处_突发事件',
    unitName:'合肥管廊运营管理处',
    name:'周福',
    reasons:'临时任务',
    workType:'紧急巡视',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
    ops:'系统管理员'
  }
];
export default  class EventSide extends React.Component {

  constructor(props,context) {
    super(props,context)
  }

  componentDidMount(){
    this.init();
  }

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    record:undefined,
    dataArray:undefined
  };

  init= () =>{
    this.setState({
      dataArray: data
    })
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

  //新增事件
  onAdd = () => {
    this.setState({record:null});
    this.openModal(null);
  };

  //编辑
  edit =(item)=>{
    this.openModal(item);
  }

  onSelect = (selectedKey) => {
    if(selectedKey == '1'){
      this.setState({
        dataArray:[{
          id:1,
          title: '合肥管廊运营处_突发事件',
          unitName:'合肥管廊运营管理处',
          name:'周福',
          reasons:'临时任务',
          workType:'紧急巡视',
          startDate:'2018-03-13 08：30：00',
          endDate:'2018-03-13 17：30：00',
          gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
          ops:'系统管理员'
        }]
      })
    }else if(selectedKey == '2'){
      this.setState({
        dataArray:[{
          id:3,
          title: '合肥管廊运营处_设备故障',
          unitName:'合肥管廊运营管理处',
          name:'周福',
          reasons:'临时任务',
          workType:'紧急巡视',
          startDate:'2018-03-13 08：30：00',
          endDate:'2018-03-13 17：30：00',
          gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
          ops:'系统管理员'
        }]
      })
    }else{
      this.setState({
        dataArray:[{
          id:4,
          title: '合肥管廊运营处_巡视',
          unitName:'合肥管廊运营管理处',
          name:'周福',
          reasons:'临时任务',
          workType:'紧急巡视',
          startDate:'2018-03-13 08：30：00',
          endDate:'2018-03-13 17：30：00',
          gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
          ops:'系统管理员'
        }]
      })
    }
  }

  delete =(item)=> {
    const {rows,record} = this.state;
    alert(item.id);
  }

  render() {
    const {dataArray} = this.state;
    return (
      <Layout style={{background: '#fff',height:'100%'}}>
        <div>
          <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="user:add"/>
          <Search style={{ margin: 10,width:'20%',float:'right'}} placeholder="搜索" onChange={this.handleSearch} />
        </div>
        <Content >
          <Layout style={{ background: '#fff' }}>

            <Sider style={{ background: '#fff' }}>
              <Menu mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={()=>this.onSelect('1')}>
                  <Icon type="user" />
                  <span>突发事件</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={()=>this.onSelect('2')}>
                  <Icon type="video-camera" />
                  <span>设备故障</span>
                </Menu.Item>
                <Menu.Item key="3" onClick={()=>this.onSelect('3')}>
                  <Icon type="upload" />
                  <span>其它</span>
                </Menu.Item>
              </Menu>
            </Sider>

            <Content >
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={dataArray}
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
        </Content>
      </Layout>
    );
  }
}
