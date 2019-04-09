import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../style/finance.less';
import echarts from 'echarts/lib/echarts';// 引入 ECharts 主模块
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/radar';
import { Table ,Button ,Layout,Pagination,Form,Input,message,Dropdown,Menu,Icon,Row,Col} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import Authorized from '../../../../utils/Authorized';
import { option1 ,option2,option3} from './data';
import { option18 } from "../../../home/data";
const { ButtonAuthorize } = Authorized;
const { Content, Header, Footer } = Layout;

export default class Finance extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {

  };

  constructor(props,context) {
    super(props,context)
  }

  componentDidMount(){
    var myChart1 = echarts.init(document.getElementById('main1'));
    myChart1.setOption(option1);

    var myChart2 = echarts.init(document.getElementById('main2'));
    myChart2.setOption(option2);

/*    var myChart3 = echarts.init(document.getElementById('main3'));
    myChart3.setOption(option3);*/
  }

    render() {
      return(
        <Layout>
          <Content style={{overflow: 'hidden'}}>
            <div className={styles.r_finance}>
              <Row gutter={20} >
                <Col span={6}>
                  <div className={styles.c_finance}>
                    <span className={styles.span_finance}>铺设支出</span>
                    <p className={styles.p_finance}> <img src='/images/finance/money.png'/><label>1,268,200</label></p>
                  </div>
                </Col>
                <Col  span={6}>
                  <div className={styles.d_finance}>
                    <span className={styles.span_finance}>管理支出</span>
                    <p className={styles.p_finance}> <img src='/images/finance/money.png'/><label>203,408</label></p>
                  </div>
                </Col>
                <Col  span={6}>
                  <div className={styles.f_finance}>
                    <span className={styles.span_finance}>本月营收</span>
                    <p className={styles.p_finance}> <img src='/images/finance/money.png'/><label>1,368,500</label></p>
                  </div>
                </Col>
                <Col  span={6}>
                  <div className={styles.g_finance}>
                    <span className={styles.span_finance}>总营收</span>
                    <p className={styles.p_finance}> <img src='/images/finance/money.png'/><label>1,268,200</label></p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={styles.t_d_finance}>
              <Row gutter={20}>
                <Col span={12} className={styles.row_finance}>
                  <div id="main1" style={{ height:'364px',width:'946px'}}></div>
                </Col>
                <Col span={10} className={styles.ro_finance}>
                  <div id="main2" style={{ height:'364px'}}></div>
                </Col>
              </Row>
            </div>

            <ReactEcharts option={option3}
                                notMerge={true}
                                lazyUpdate={true}
                                style={{height:'340px'}}  className={styles.do_finance}/>
           {/* <div id="main3" className={styles.do_finance} style={{ height:'340px'}}></div>*/}
          </Content>
        </Layout>
    )

  }
}