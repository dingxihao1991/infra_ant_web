import React, {PureComponent} from 'react';
import SideLayout from 'components/SideLayout';
import {Tree} from 'antd';
const TreeNode = Tree.TreeNode;

export default class OrganizationSide extends PureComponent{

    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    }


    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    getParentKey = (key, tree,parentKey) => {
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];

            if (node.children) {
                node.children.map(item=>{
                    if(item.title.indexOf(key) > -1){
                        parentKey.push(item.key);
                    }
                    if(item.children){
                        this.getParentKey(key, item.children,parentKey)
                    }
                })

            }else{
                if(node.title.indexOf(key) > -1){
                    parentKey.push(node.key);
                }
            }
        }

    };

    handleSearch = (e) =>{
        const value = e.target.value;
        const {treeData} = this.props;
        let parentKey = [];
        this.getParentKey(value, treeData,parentKey)
        this.setState({
            expandedKeys:parentKey,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    render(){
        const {searchValue,expandedKeys, autoExpandParent} = this.state;
        const {onSelect,treeData} =this.props;

        //搜索到的设置为红色
        const loop = data => data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title = index > -1 ? (
                    <div>
                      {beforeStr}
                        <div style={{ color: '#f50' }}>{searchValue}</div>
                        {afterStr}
                    </div>
                ) : <div>{item.title}</div>;
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={title} style={{}}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title} />;
        });

        return(
            <SideLayout
                title="组织机构"
                width={230}
                handleSearch={this.handleSearch}
                search={true}
                toggle={true}
                sideContent={
                    treeData.length>0?
                        <Tree

                            onExpand={this.onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onSelect={onSelect}>
                            {loop(treeData)}
                        </Tree>:null
                }
            >
            </SideLayout>
        )
    }
}