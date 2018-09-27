import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class userUpload extends React.Component {
    state = {
        imageUrl:null,
        loading: false,
    };

    componentDidMount(){
        const {imageURL} = this.props;
        this.setState({
            imageUrl: imageURL
        })
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            if(info.file.response.success ){
                const {setSubFileId} = this.props;
                setSubFileId(info.file.response.result); //头像ID 赋值给form
                getBase64(info.file.originFileObj, imageUrl => this.setState({
                    imageUrl,
                    loading: false,
                }));
            }else{
                message.error('头像上传失败，请联系系统管理员');
            }
        }
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
                <p>请上传头像</p>
            </div>
        );

        return (
            <Upload
                name="userUploadFile"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:8888/users/upload"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="userUpload" style={{ height : "auto" , width : '132px'}}/> : uploadButton}
            </Upload>
        );
    }
}
export default userUpload;