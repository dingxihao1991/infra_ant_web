import { Form, Row, Col, Input, Button, Icon,Select,DatePicker } from 'antd';
import styles from '../../workManage.less';
import Authorized from '../../../../utils/Authorized';


const { ButtonAuthorize } = Authorized;
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;
const Search = Input.Search;

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

  handleReset = () => {
    this.props.form.resetFields();
  }

  renderSimpleForm(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div style={{float: 'right', paddingTop: 10  ,    width: '24%' }}>
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
                  <Option value="0">养护</Option>
                  <Option value="1">巡检</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={8} key="work_name">
            <FormItem label='计划名称'>
              {getFieldDecorator(`work_name`)(
                <Input placeholder="请输入"  style={{width: 400}}/>
              )}
            </FormItem>
          </Col>

          <Col span={8} key="startDate">
            <FormItem label='执行时间'>
              {getFieldDecorator(`startDate`)(
                <DatePicker style={{ width: 400 }} />
              )}
            </FormItem>
          </Col>

          <Col span={8} key="work_status">
            <FormItem label='计划状态'>
              {getFieldDecorator(`work_status`)(
                <Select placeholder="请选择" style={{ width:400 }}>
                  <Option value="0">启动</Option>
                  <Option value="1">禁用</Option>
                </Select>
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