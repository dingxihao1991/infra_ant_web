import React, {PureComponent} from 'react';
import SideLayout from 'components/SideLayout';

export default class OrganizationSide extends PureComponent{

    state = {
        treeData:[]
    }

    componentDidMount(){
        this.init();

    }

    init= () =>{
        const thiz = this;
        GET('/organization/findAll',function(result){
            if(result.success){
                thiz.setState({dataSource:result.result})
            }
        },function(error){
            console.log(error)
        })
    }

    handleSearch = (value) =>{
        const values = value.target.value;
        console.log(values);
    }

    render(){
        const {treeData} = this.state;
        const {onSelect} =this.props;
        return(
            <SideLayout
                title="组织机构"
                width={230}
                handleSearch={this.handleSearch}
                sideContent={
                    treeData.length>0?
                        <Tree defaultExpandAll onSelect={onSelect}>
                            {this.renderTreeNodes(treeData)}
                        </Tree>:null
                }
            >
            </SideLayout>
        )
    }
}