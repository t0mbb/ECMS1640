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
import { getListFac } from '../../services/faculty.service';

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
  const [listAcc, setListAcc] = useState<any>();
  const [listFac, setListFac] = useState<any[]>([]);
  const [listRole, setListRole] = useState<any[]>([]);
  const getListRoleFromBE = async () => {
    const res = await getListRole();
    const response = await accDetails(id);
    console.log(response.data.Result);
    const facList = await getListFac();
    setListRole(res.data.role);
    setListAcc(response.data.Result);
    setListFac(facList.data.faculty);
    form.setFieldsValue({
      fullname: response.data.Result.fullname,
      email: response.data.Result.email,
      role_id : response.data.Result.role_id._id,
      phone : response.data.Result.phone,
      dob : moment(response.data.Result.dob),
      address : response.data.Result.address,
      faculty_id : response.data.Result.faculty_id._id
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
      await accUpdate(id, {values});
      message.success('Account updated successfully');
      navigate('/account');
    } catch (error) {
      console.error('Error updating account:', error);
      message.error('Failed to update account');
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please fill and input right type!!!',
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[
              {
                required: true,
                message: 'Please fill and input right type!!!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role_id"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <TreeSelect>
              {listRole.map((role) => (
                <TreeSelect.TreeNode
                  key={role._id}
                  title={role.name}
                  value={role._id}
                />
              ))}
            </TreeSelect>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please fill and input right type',
              },
            ]}
          >
            <Input type="number" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Date Of Birth"
            name="dob"
            rules={[
              { required: true, message: 'Please fill and input right type!' },
            ]}
          >
            <DatePicker type = "date" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: 'Please fill and input right type!' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Faculty"
            name="faculty_id"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <TreeSelect>
              {listFac.map((fac) => (
                <TreeSelect.TreeNode
                  key={fac._id}
                  title={fac.name}
                  value={fac._id}
                />
              ))}
            </TreeSelect>
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
