import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../style/index.less';
import { Table ,Button ,Input,Layout,Form,Dropdown,Icon,Tree,List,Card,Avatar,Tooltip, Menu } from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import {connect} from 'dva';
import Authorized from '../../../utils/Authorized';
import FormSub from './Form';
import AddFloder from './AddFloder';
import DocumentSide from './DocumentSide';
import moment from 'moment';
import { ContextMenu, MenuItem } from "react-contextmenu";
const { ButtonAuthorize } = Authorized;


const { Content} = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const Search = Input.Search;



const recursive = function(node,array){
    if(node.key!=undefined){
        if(node.key=='0'){
        }
        array.push(node.key)
    }
    if(node.props['children']){
        for(var i=0;i<node.props['children'].length;i++){
            recursive(node.props['children'][i],array);
        }
    }
}

@connect(({loading,documentModel})=>({
    folderList:documentModel.folderList,
    documentList:documentModel.documentList

}))
export default class DocumentManagement extends PureComponent {

    static contextTypes = {
        openModal: PropTypes.func,
    };

    state = {
        record: null,
        rightClickNodeTreeItem:null,
    };

    constructor(props,context) {
        super(props,context)
    }

    componentDidMount(){
        this.init();
    }


    init= () =>{

        const thiz = this;

        const {dispatch } = this.props;
        dispatch({
            type: 'documentModel/folder',
            payload: {
            },
        });
        dispatch({
            type: 'documentModel/document',
            payload: {
            },
        })

        const { folderList,documentList } =  this.props


        thiz.setState({
            treeData:folderList,
            document:documentList,
        })

    }


    onSelect = (selectedKeys, info) => {
        if(selectedKeys.length==0){
            return;
        }

        const {dispatch } = this.props;
        let array1 = []

        array1.push(selectedKeys[0]);

        //递归获取子集
        recursive(info.node,array1);

        console.log("--orgName----",array1);

        dispatch({
            type: 'documentModel/document',
            payload: {
                params:array1
            },
        });
    }

    openModal =(record,FormSub,width,title)=>{
        const modalFormProps = {
            record:record,
            isShow:true,
            title,
            Contents:FormSub,
            modalOpts: {
                width: width,
            },
            onSubmit: (values) => this.onSubmit(values)
        }
        this.context.openModal(modalFormProps);
    }

    onAddFolder = (data) =>{
        console.log('data--->',data);



       const {record} = this.state;

        const modalFormProps = {
            record:record,
            isShow:true,
            title:'新建文件夹',
            Contents:AddFloder,
            modalOpts: {
                width: 400,
            },
            onSubmit: (values) => this.onSubmit(values)
        }
        this.context.openModal(modalFormProps);
    }

    handleClick = (e, data, target) =>{
        if(data.action=='add'){
            this.onAddFolder(data)
        }else{
            this.onEdit(data,'folder')
        }

    }

    onSubmit = (values) =>{
        console.log(values);
    }

    onUploadFile = () =>{
        const modalFormProps = {
            isShow:true,
            title:'文件上传',
            Contents:FormSub,
            modalOpts: {
                width: 600
            },
            onSubmit: (values) => this.onSubmit(values)
        }
        this.context.openModal(modalFormProps);
    }

    onEdit= (item,type) =>{
        let record = {};

        if(type=='folder'){
            record['fileName'] = item.orgName;
        }else{
            record['fileName'] = item.loginName;
        }

        const modalFormProps = {
            record:record,
            isShow:true,
            title:'编辑',
            Contents:AddFloder,
            modalOpts: {
                width: 400
            },
            onSubmit: (values) => this.edit(values)
        }
        this.context.openModal(modalFormProps);
    }

    edit= (values) =>{
        console.log('编辑：',values);

    }


    handleSearch = () => {}

    MouseEnter =(id)=>{
        var elem = document.getElementById(id);
        elem.classList.remove('hide-active');
        elem.classList.add('show-active');

    }
    MouseLeave= (id)=>{
        var elem = document.getElementById(id);
        elem.classList.remove('show-active');
        elem.classList.add('hide-active');

    }

    renderItem=item=>{

        return(
            <List.Item>
              <Card
                  className={styles.card}
                  hoverable
                  onMouseEnter={this.MouseEnter.bind(this,item.id)}
                  onMouseLeave={this.MouseLeave.bind(this,item.id)}
              >
                <Layout style={{ textAlign: 'center', height: '200px'}}>
                  <div style={{paddingTop: '10px'}}>
                    <img alt={item.title} src='/images/files/pdf.png' width={60} height={80}/>
                  </div>
                  <Content style={{}} >

                    <Card.Meta style={{width: '80%'}} title={<a title={item.loginName} >{item.loginName}</a>} />

                    <div >
                      <div className='avatarList'>
                        <Tooltip title={item.lastModifiedUserName}>
                          <Avatar src={item.avatar} size="small"/>
                        </Tooltip>
                        <em>{moment(item.lastModifiedDate).format('YYYY-MM-DD HH:mm')}</em>
                      </div>
                    </div>

                  </Content>
                    <div id={item.id} style={{marginRight: '10px',textAlign: 'right'}} className="hide-active">
                        <div className="btn-group" title="编辑" onClick={this.onEdit.bind(this,item)}>
                            <svg className="icon" aria-hidden="true">
                                <use href='#icon-preview-line'></use>
                            </svg>
                        </div>
                        <div className="btn-group" title="删除">
                            <svg className="icon" aria-hidden="true">
                                <use href='#icon-shanchu'></use>
                            </svg>
                        </div>
                        <div className="btn-group" title="下载">
                            <svg className="icon" aria-hidden="true">
                                <use href='#icon-ziyuanldpi'></use>
                            </svg>
                        </div>
                    </div>
                </Layout>
              </Card>
            </List.Item>
        )

    }


    render() {
// onRightClick={this.onRightClick}
        const { folderList,documentList } =  this.props

        return(
            <Layout className={styles.documnet} style={{height:'100%'}}>

                <DocumentSide
                    treeData={folderList}
                    onSelect={this.onSelect}

                />
                <Layout style={{background: '#fff',border:'1px solid #E5E5E5'}}>
                    <div>
                        <ButtonAuthorize icon="plus" type="primary" onClick={this.onAddFolder} name="新建文件夹" authority="user:add"/>
                        <ButtonAuthorize icon="cloud-upload" type="primary" onClick={this.onUploadFile} name="上传文件" authority="user:add"/>
                        <Search style={{ margin: 10,width:'20%',float:'right'}} placeholder="搜索" onChange={this.handleSearch} />
                    </div>
                    <Content  style={{borderTop:'1px solid #E5E5E5',padding: '15px'}}>
                      <List
                          className={styles.coverCardList}
                          rowKey="id"
                          grid={{gutter: 30,column:6}}

                          dataSource={documentList}
                          renderItem={this.renderItem}
                      >

                      </List>

                    </Content>
                </Layout>
                <ContextMenu id={MENU_TYPE}>
                    <MenuItem onClick={this.handleClick} data={{action:'add'}}> <Icon type="plus" style={{marginRight:'8px'}}/>添加文件夹</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{action:'edit'}} > <Icon type="edit" style={{marginRight:'8px'}}/>修改文件夹</MenuItem>
                </ContextMenu>
            </Layout>
        )

    }
}
const MENU_TYPE = 'MULTI';