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
  import { accDetails, accUpdate, getListRole } from '../../services/account.service';
  import { useState, useEffect } from 'react';
  import moment from 'moment';
  import { facDetails, facUpdate, getListFac } from '../../services/faculty.service';
import listFac from './List';
  
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
  
  
  
  export const Update: React.FC = () => {
    let { id } = useParams();
    const [listAcc, setListFac] = useState<any>();

    const getListRoleFromBE = async () => {
      const response = await facDetails(id);
      setListFac(response.data.Result);
      form.setFieldsValue({
       name: response.data.Result.name,
      });
    };
    const [form] = Form.useForm();
    useEffect(() => {
      getListRoleFromBE();
    }, []);
  
    const navigate = useNavigate(); 
    const onFinish = async (values: any) => {
      try {
        console.log(values);
        await facUpdate(id, values);
        message.success('Faculty updated successfully');
        navigate('/faculty');
      } catch (error) {
        message.error('Failed to update faculty');
      }
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
        <Layout style={{ padding: '30px' }}>
          <Form
            {...formItemLayout}
            variant="filled"
            style={{ maxWidth: 600 }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Faculty Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please fill and input right type!!!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Layout>
      </ConfigProvider>
    );
  };
  
  export default Update;
  