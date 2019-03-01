import React from "react";
import { Form,Layout,Table } from "antd";
import { Map, Markers } from "react-amap";
import FormSub from "../../../workManager/workPlan/components/Form";
import styles from "../../../workManager/workManage.less"; //引入高德地图
const { Content } = Layout;

const createForm = Form.create;

const columns = [
  {
    title: '任务名称',
    dataIndex: 'work_name',
    align: 'center',
    key:'work_name'
  },
  {
    title: '任务描述',
    dataIndex: 'work_description',
    align: 'center',
    key:'work_description'
  }
];

class PerambulateDetail extends React.Component{

  state = {
    columns:[],
    loading:false,
  };

  constructor(){
    super();
  }

  componentDidMount(){
    const {record} = this.props
    console.log(">>>>>>>>>>>>>>",record);
    this.setState({columns:columns})
  }

  render(){
    const {record} = this.props;
    let { columns,loading} = this.state;
    return (
      <Layout className={styles.application}>
        <Content>
          <Table  rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={record}
                  loading={loading}
                  pagination={{
                    showSizeChanger:true,
                    showQuickJumper:true,
                    total:{record}.length,
                    onChange:this.onChange
                  }}
          />
        </Content>
      </Layout>)
  }
}

export default createForm()(PerambulateDetail);
