import { Form, Row, Col, Input, Button, Icon,Select,DatePicker } from 'antd';
import styles from '../../maintenance.less';
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
          <Col span={8} key="pro_name">
            <FormItem label='工程名称' >
              {getFieldDecorator(`pro_name`)(
                <Input placeholder="请输入工程名称" style={{width: 400}}/>
              )}
            </FormItem>
          </Col>

          <Col span={8} key="pro_date">
            <FormItem label='竣工时间'>
              {getFieldDecorator(`pro_date`)(
                <DatePicker style={{ width: 400 }} />
              )}
            </FormItem>
          </Col>

          <Col span={8} key="pro_h">
            <FormItem label='合同编码' >
              {getFieldDecorator(`pro_h`)(
                <Input placeholder="请输入合同编码" style={{width: 400}}/>
              )}
            </FormItem>
          </Col>

          <Col span={8} key="pro_user">
            <FormItem label='负责人'>
              {getFieldDecorator(`pro_user`)(
                <Input placeholder="请输入负责人"  style={{width: 400}}/>
              )}
            </FormItem>
          </Col>

          <Col span={8} key="pro_g">
            <FormItem label='过程记录'>
              {getFieldDecorator(`pro_g`)(
                <Input placeholder="请输入过程记录"  style={{width: 400}}/>
              )}
            </FormItem>
          </Col>

          <Col span={8} key="pro_result">
            <FormItem label='结果评估'>
              {getFieldDecorator(`pro_result`)(
                <Input placeholder="请输入结果评估"  style={{width: 400}}/>
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