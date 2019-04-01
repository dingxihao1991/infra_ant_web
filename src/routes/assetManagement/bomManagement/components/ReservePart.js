import React, {PureComponent} from "react";
import { Button, Icon, Layout, message, Table,Pagination,Tabs  } from "antd";
import Inventory from './Inventory';
import TakeRecord from './TakeRecord';
import styles from '../style/style.less';

import List from '../../assetList/components/AssetList';
const TabPane = Tabs.TabPane;

const {Content,} = Layout;

export default class ReservePart extends PureComponent {



    render() {

        return (
            <Layout className={styles.reservePart}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="出库记录" key="1" styles>
                        <TakeRecord/>
                    </TabPane>
                    <TabPane tab="库存清单" key="2">
                        <Inventory/>
                    </TabPane>
                </Tabs>
            </Layout>

        );

    }

}
