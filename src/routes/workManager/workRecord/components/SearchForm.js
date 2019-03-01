import { Form, Row, Col, Input, Button, Icon,Select,DatePicker ,Radio} from 'antd';
import styles from '../../workManage.less';
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  subFilter = (flag) => {
    const {filter} = this.props;
    filter(flag);
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  renderSimpleForm(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div style={{float: 'right', paddingTop: 10   }}>
        <RadioGroup defaultValue="all" style={{marginRight:10}}>
          <RadioButton value="all" onClick={()=>this.subFilter('全部')}>全部</RadioButton>
          <RadioButton value="progress" onClick={()=>this.subFilter('进行中')}>进行中</RadioButton>
          <RadioButton value="waiting" onClick={()=>this.subFilter('待处理')}>待处理</RadioButton>
          <RadioButton value="complete" onClick={()=>this.subFilter('已完成')}>已完成</RadioButton>
        </RadioGroup>
        <Search onSearch={()=>alert(1)} style={{width: 302}} placeholder="请输入"/>
        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
          展开 <Icon type={this.state.expand ? 'up' : 'down'} />
        </a>
      </div>
    )
  }

  renderAdvancedForm(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="inline"
            className={styles["ant-advanced-search-form"]}
            onSubmit={this.handleSearch}
      >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col span={8} key="gallery_name">
            <FormItem label='管廊名称' >
              {getFieldDecorator(`gallery_name`)(
                <Input placeholder="请输入" style={{width: 400}}/>
              )}
            </FormItem>

          </Col>
          <Col span={8} key="work_type">
            <FormItem label='计划类型'>
              {getFieldDecorator(`work_type`)(
                <Select placeholder="请选择" style={{ width:400 }}>
                  <Option value="计划">计划</Option>
                  <Option value="临时">临时</Option>
                  <Option value="其他">其他</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8} key="work_type">
            <FormItem label='任务类型'>
              {getFieldDecorator(`work_type`)(
                <Select placeholder="请选择" style={{ width:400 }}>
                  <Option value="巡检">巡检</Option>
                  <Option value="养护">养护</Option>
                  <Option value="其他">其他</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8} key="work_name">
            <FormItem label='任务名称'>
              {getFieldDecorator(`work_name`)(
                <Input placeholder="请输入"  style={{width: 400}}/>
              )}
            </FormItem>
          </Col>

          <Col span={8} key="work_status">
            <FormItem label='任务状态'>
              {getFieldDecorator(`work_status`)(
                <Select placeholder="请选择" style={{ width:400 }}>
                  <Option value="进行中">进行中</Option>
                  <Option value="已完成">已完成</Option>
                  <Option value="待处理">待处理</Option>
                </Select>
              )}
            </FormItem>
          </Col>


          <Col span={8} key="startDate">
            <FormItem label='开始时间'>
              {getFieldDecorator(`startDate`)(
                <DatePicker style={{ width: 400 }} />
              )}
            </FormItem>
          </Col>

          <Col span={8} key="endDate">
            <FormItem label='结束时间'>
              {getFieldDecorator(`endDate`)(
                <DatePicker style={{ width: 400 }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              收起 <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          </Col>
        </Row>
      </Form>
    )
  }
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  renderForm() {
    const { expand } = this.state;
    return expand ? this.renderAdvancedForm() : this.renderSimpleForm();
  }


  render() {
    return (
      <div>{this.renderForm()}</div>
    );
  }
}
export default createForm()(AdvancedSearchForm);