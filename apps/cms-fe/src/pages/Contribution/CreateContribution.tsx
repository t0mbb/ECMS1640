import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Layout,
  Modal,
  message,
} from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { useState } from 'react';
import { httpClient } from '../../utils/HttpClient';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const Create: React.FC = () => {
  let { id } = useParams();

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [file, setFile] = useState<any>();

  const handleFileChange = (info : any) => {
    setFile(info.file.originFileObj);
  };
  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      if(!file) {
        message.error('Please select a file to upload.');
        return false; 
      }
      formData.append('file', file);
      formData.append('content', values.content);
      formData.append('event_id', values.event_id);
      console.log(formData);
      const response = await httpClient.post('/con/createCon', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/Event/listEvent');
      message.success('New Contribution has been added!!!!');
    } catch (error) {
      console.error('Error updating Contribution:', error);
    
    }
  };
  
  const props: UploadProps = {
    action: 'https://localhost:3000/con/uploadFile',
    onChange: handleFileChange,
  };
  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#9dc8ed',
          colorBorderSecondary: 'black',
          borderRadius: 20,
        },
      }}
    >
      <Layout style={{ padding: '50px' }}>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{ maxWidth: 800 }}
          form={form}
          onFinish={onFinish}
          initialValues={{ event_id: id }}
        >
          <Form.Item name="event_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="content"   rules={[
                { required: true,  message: 'Please fill and input right type!' },
              ]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
          <Upload {...props}>
      <Button style={{marginLeft : 200 , marginTop : 15 , marginBottom : 15}}icon={<UploadOutlined />}>Upload</Button>
         </Upload>
          </Form.Item>
          <Checkbox style={{marginLeft : 75 , marginBottom : 20}} onChange={onChange} required> 
          <Modal title="" open={isModalOpen} onCancel={handleCancel}  cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }}> 
          <p>This is the terms and conditions content.</p>
         <p>By accessing or using the CMS system, you agree to abide by these terms and conditions. If you do not agree with any part of these terms, you may not access the system.</p>
          </Modal>
          Agree with 
          <a onClick={showModal}> Term and Condition</a>
          </Checkbox>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" ghost htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
   
      </Layout>
    </ConfigProvider>
  );
};

export default Create;
