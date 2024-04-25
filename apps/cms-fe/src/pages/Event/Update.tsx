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
  import { eventDetails, eventUpdate } from '../../services/event.service';
  import { useState, useEffect } from 'react';
  import moment from 'moment';

  
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
    const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
    const [listEvent, setListAcc] = useState<any>();

    const getListRoleFromBE = async () => {

      const response = await eventDetails(id);

      setListAcc(response.data.Result);

      form.setFieldsValue({
        name : response.data.Result.name,
        closure_date : moment(response.data.Result.closure_date),
        finalclosure_date : moment(response.data.Result.finalclosure_date),
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
        await eventUpdate(id, {values});
        message.success('Event updated successfully');
        navigate('/Event/listEvent');
      } catch (error) {
        console.error('Error updating Event:', error);
        message.error('Failed to update Event');
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
              label="Name of Event"
              name="name"
              rules={[
                { required: true,  message: 'Please fill and input right type!' },
              ]}
            >
              <Input />
            </Form.Item>
         
          
            <Form.Item
              label="Closure Date"
              name="closure_date"
              rules={[
                { required: true, message: 'Please fill and input right type!' },
              ]}
            >
              <DatePicker type = "date" />
            </Form.Item>
            <Form.Item
              label="Final Closure Date"
              name="finalclosure_date"
            >
              <DatePicker type = "date" />
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
  