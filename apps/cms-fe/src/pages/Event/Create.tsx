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
  import {  createEvent } from '../../services/event.service';
  import {getListFac} from '../../services/faculty.service'
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
  
  export const Create: React.FC = () => {

    
    const [listFac, setListFac] = useState<any[]>([]);
    const getListRoleFromBE = async () => {
      const facList = await getListFac();
      setListFac(facList.data.faculty);
      console.log(facList.data.faculty);
    };
  
    useEffect(() => {
      getListRoleFromBE();
    }, []);
  
    const navigate = useNavigate(); 
    const onFinish = async (values: any) => {
      try {
        console.log(values);
        await createEvent(values);
        message.success('Event updated successfully');
        navigate('/Event/listEvent');
      } catch (error : any) {
        console.error('Error Event account:', error);
        message.error(`Failed to update please check again ` , error);
      }
    };
  
    const [form] = Form.useForm();
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
        <Layout style={{ padding: '30px'  }}>
          <Form
            {...formItemLayout}
            variant="filled"
            style={{ maxWidth: 600 }}
            form={form}
            onFinish={onFinish}
          >
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
  
  export default Create;
  