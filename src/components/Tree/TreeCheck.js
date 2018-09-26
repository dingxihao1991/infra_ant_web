import React,{Component} from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;




class TreeCheck extends Component{

    state = {
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
    }
    constructor(props){
        super(props);

    }

    componentDidMount(){
        const {expandedKeys} = this.props;
        this.setState({
            expandedKeys,
            checkedKeys: expandedKeys,
            //defaultCheckedKeys: expandedKeys
        })
    }


    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys) => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
        const {onCheck } = this.props;
        onCheck && onCheck(checkedKeys);
    }

    renderTreeNodes = (data) => {

        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }


    render() {
        const {treeData} = this.props
        return (
            <Tree
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys} //展开指定的树节点
                autoExpandParent={this.state.autoExpandParent} //是否自动展开父节点
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
            >
                {this.renderTreeNodes(treeData)}
            </Tree>
        )
}


}
export default TreeCheck;