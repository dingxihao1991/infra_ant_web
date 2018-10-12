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
        })
    }

    onExpand = (expandedKeys) => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys,event) => {

        const {onCheck,checkStrictly } = this.props;
        let values = null;

        if(checkStrictly){
            const node = event.node;
            let array = []
            let recursive = function(node){
                array.push(node.key)
                if(node.props['children']){
                    for(var i=0;i<node.props['children'].length;i++){
                        recursive(node.props['children'][i]);
                    }
                }
            }
            //递归查找树节点
            recursive(node);
            //event: true：设置全部选中; false: 取消选中
            if(event.checked){
                for(var i=0;i<array.length;i++){
                    checkedKeys.checked.push(array[i]);
                }
            }else{
                checkedKeys.checked = checkedKeys.checked.filter(item => !array.some(jtem=>jtem == item))
            }

            this.setState({ checkedKeys});
            values = checkedKeys.checked

        }else{
            this.setState({ checkedKeys });
            values = checkedKeys;
        }
        console.log(values)
        onCheck && onCheck(values);
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
        const {treeData,checkStrictly} = this.props
        return (
            <Tree
                checkable
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys} //展开指定的树节点
                checkStrictly={checkStrictly}
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