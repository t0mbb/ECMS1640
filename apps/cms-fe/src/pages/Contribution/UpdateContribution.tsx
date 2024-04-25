import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Layout,
  TreeSelect,
  message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { contributionDetails } from '../../services/contribution.service';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { useEffect, useState } from 'react';
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
  const [details, setDetailContribution] = useState<any[]>([]);
  const [form] = Form.useForm();


  const getListFromBE = async () => {
    const response = await contributionDetails(id);
    console.log(response)
    setDetailContribution(response.data.Result);
    form.setFieldsValue({
      event_id: response.data.Result.event_id,
      content: response.data.Result.content, 
    });
  };


  useEffect(() => {
    getListFromBE();
  }, []);


  const navigate = useNavigate();
  const [file, setFile] = useState<any>();

  const handleFileChange = (info: any) => {
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
      const response = await httpClient.put(`/con/updateContribution/${id}`, formData, {
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
    action: 'https://localhost:3000/con/uploadFileOnly',
    onChange: handleFileChange,
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
        >
          <Form.Item name="event_id" key="event_id" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Upload {...props}>
              <Button
                style={{ marginLeft: 100, marginTop: 15, marginBottom: 15 }}
                icon={<UploadOutlined />}
              >
                Upload
              </Button>
            </Upload>
          </Form.Item>

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
