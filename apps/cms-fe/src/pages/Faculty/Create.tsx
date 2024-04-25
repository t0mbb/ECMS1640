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
import { accDetails, accUpdate, createAcc, getListRole } from '../../services/account.service';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { createFac, getListFac } from '../../services/faculty.service';

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
type FiledType = {
  role_id: any;
  fullname: String;
  dob: Date;
  address: String;
  password: String;
  phone: String;
  faculty_id: Object;
};

export const Create: React.FC = () => {


  const navigate = useNavigate(); 
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await createFac(values);
      message.success('Faculty updated successfully');
      navigate('/faculty');
    } catch (error) {
      message.error('Failed to update Faculty');
    }
  };

 

  return (
   
      <Layout style={{ padding: '30px' }}>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please fill and input right type!!!',
              },
            ]}
          >
            <Input placeholder='Name'/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" className='button' htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        
      </Layout>
  );
};

export default Create;
