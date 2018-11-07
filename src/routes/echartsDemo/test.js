import React, {PureComponent} from 'react';
import styles from './test.less';
import { Table ,Button ,Layout,Pagination,Form,Input , message} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from './Form';
import FormSub2 from './Form2';

import { Upload, Icon } from 'antd';//引入上传
import { getToken } from "../../utils/authority";


function beforeUpload(file) {
  //无法获取excel的type，故采用name获取file类型    fileName is undefined
  let fileName  = file.name;
  const isXls = fileName.indexOf("xls")==-1?false:true;
  if(!isXls){
    message.error('请上传xls或xlsx格式的文件~');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isXls && isLt2M;
}

const FormItem = Form.Item;
const { Content, Header, Footer } = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;

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

/*const modalFormProps = {
  loading: true,
 /!* record,
  visible,*!/
  Contents:FormSub,
  modalOpts: {
    width: 700,
  },
  onCancel: () => {
    this.setState({
      record: null,
      visible: false
    })
  },
  onSubmit: (values) => this.onSubmit(values)
}

const modalFormProps2 = {
  loading: true,
  /!* record,
   visible,*!/
  Contents:FormSub2,
  modalOpts: {
    width: 700,
  },
  onCancel: () => {
    this.setState({
      record: null,
      visible: false
    })
  },
  onSubmit: (values) => this.onSubmit(values)
}*/




const data = [{
  1: 'NV-TB9716',
  2: '智能照明设备',
  3: '照明系统',
  4: '上海市青浦区诸光路(地铁站)',
  5: '正常',
  6: '/',
  7: '2018-10-12',
  8: 'admin',
  9: '2018-10-12',
}, {
  1: 'AD-359916',
  2: '排水设备',
  3: '排水系统',
  4: '上海市浦东新区大连路隧道',
  5: '检修',
  6: '/',
  7: '2016-9-12',
  8: 'admin',
  9: '2017-6-26',
}, {
  1: 'GD-569ASD',
  2: '管廊施工机器臂',
  3: '管廊系统',
  4: '合肥市高新区管廊控制中心',
  5: '正常',
  6: '/',
  7: '2018-5-8',
  8: 'admin',
  9: '2018-10-12',
}];

export default class userManage extends PureComponent {

  state = {
    columns:[],
    dataSource:[],
    record: null,
    visible: false,
    rows: [],
    form: FormSub
  };

  //props :接收任意的输入值
  constructor(props,context) {
    //传递props到基础构造函数中
    super(props,context)
  }

  componentDidMount(){
    this.initColums();
    this.init();

    console.log("test")
  }

  initColums =() =>{
    const columns = [{
      title: '资产设备编号',
      dataIndex: '1',
      id: '1',
      align: 'center',
      key:'1'
    }, {
      title: '资产设备名称',
      dataIndex: '2',
      id: '2',
      align: 'center',
      key:'2'
    },{
      title: '资产设备类型',
      dataIndex: '3',
      id: '3',
      align: 'center',
      key:'3'
    },{
      title: '资产设备位置',
      dataIndex: '4',
      id: '4',
      align: 'center',
      key:'4'
    }, {
      title: '资产设备状态',
      dataIndex: '5',
      id: '5',
      align: 'center',
      key:'5'
    },{
      title: '描述',
      dataIndex: '6',
      id: '6',
      width: 150
    },
      {
        title: '创建时间',
        dataIndex: '7',
        id: '7',
        width: 150
      }, {
        title: '最后修改人',
        dataIndex: '8',
        id: '8',
        width: 100
      }, {
        title: '最后修改时间',
        dataIndex: '9',
        id: '9',
        width: 150
      }];
    this.setState({columns:columns})
  }



  init= () =>{
    const thiz = this;

        thiz.setState({dataSource:data})


  }

  //编辑
  edit =()=>{
    const {rows} = this.state
    console.log(rows)
    if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }
    let  form = FormSub
    this.setState({
      record:rows[0],
      visible: true,
      form:form
    });
  }

  //变更
  change =()=>{
    const {rows} = this.state
    console.log(rows)
    if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }
    console.log("变更...");
    let  form2 = FormSub2
    this.setState({
      form: form2,
      record:rows[0],
      visible: true,

    });
  }

  //新增事件
  onAdd = () => {
    this.setState({
      record: null,
      visible: true
    });
  };

  delete =()=> {
    const {rows,record} = this.state;
    const dataSource = [...this.state.dataSource];
    let thiz = this;
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

  setFileId = (fileId) =>{
    console.log("ffulei"+fileId);
  }

  render() {
    //增加form变量
    let { columns, visible,record,rows,dataSource,form} = this.state;

    const rowSelection = {
      onChange: this.onSelectChange,
    };
    const thiz = this;
    //const from = FormSub;
    const modalFormProps = {
      loading: true,
      record,
      visible,
      Contents:form,
      modalOpts: {
        width: 800,
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        })
      },
      onSubmit: (values) => {
        console.log(values);
        console.log('-------------'+JSON.stringify(values) );
        if(thiz.state.record!=null){
          values['id'] = thiz.state.record.id;
          PUT('/users/update',values,function(data){
            console.log(data);
            if(data.success){
              message.success("更新成功")
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
              message.success("新增成功")
              thiz.init();
            }else{
              message.success("新增失败，请联系管理员")
            }
          },function(error){
            console.log(error);
          })

        }
      }
    }

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
        <p>请上传头像</p>
      </div>
    );




    return(
      <Layout className={styles.application}>
        <div className={styles.tableOperations}>
         {/* <Button icon="plus" type="primary" onClick={this.onAdd}>上传</Button>*/}


          <Upload
            name="userUploadFile"
           // listType="picture-card"
            //className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:8888/asset/upload"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            headers={{"token":getToken()}}
          >
            <Button>
              <Icon type="upload" /> 批量上传
            </Button>
          </Upload>
          <Button icon="edit" disabled={!rows.length} onClick={this.edit}>定位</Button>
          <Button icon="edit" disabled={!rows.length} onClick={this.change}>变更</Button>
          <Button icon="delete" disabled={!rows.length} onClick={this.delete}>删除</Button>
        </div>
        <Content  >
          <Table rowKey='id' style={{  background: '#ffffff', minHeight: 360}} columns={columns} dataSource={dataSource} onChange={this.handleChange} rowSelection={rowSelection}
                 pagination={{
                    showSizeChanger:true,
                    showQuickJumper:true,
                    total:dataSource?dataSource.length:null,
                    onChange:this.onChange
                  }}
          />
        </Content>
        <ModalForm {...modalFormProps}/>

      </Layout>
    )

  }
}