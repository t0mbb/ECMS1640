import { Button, message, Form, type FormProps, Input, Typography, Divider, ConfigProvider } from 'antd';
import { login } from '../../services/auth.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/login.css"
import Home from '../Home/Home';



type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate(); 
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
   try{
    const response = await login(values.email, values.password)
      sessionStorage.setItem('accessToken', response.data.accessToken);
      sessionStorage.setItem('userData', JSON.stringify(response.data.userData));

      message.success("Login Successful!");
      navigate('/home');
    } catch {
      message.error('Login failed. Wrong Email or Password'); 
    }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (<ConfigProvider theme={{ token: {  colorBorder: "#e84749" , colorText :"white", colorBgContainer : "black" }}} >   
  <div className = "appBG">
      <Form className = "formLog"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
            <Typography.Title>Sign In</Typography.Title>
            <Divider></Divider>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input correctly email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
  
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

          <Divider/>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%"  }} >
            SIGN IN
          </Button>
          
        </Form.Item>
      </Form>
    
    </div>
    </ConfigProvider>
  );
};





export default Login;
