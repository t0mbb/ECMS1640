import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  UserOutlined, PlusOutlined ,FacebookFilled
} from '@ant-design/icons';

import { Breadcrumb, Button, ConfigProvider, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/css/dash.css';
import HeaderComponent from "./Header"
import SidebarComponent from"./Sidebar"
import RoleProtected , {RoleName} from '../components/RoleProtected/RoleProtected';
const { Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const nav = useNavigate();
  const onClick = ({ key }: { key: string }) => {
    return nav(key);
  };

  type MenuItem = {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    children?: MenuItem[];
};
  const items: MenuItem[] = [
    {
      key: '/home',
      label: 'Home',
      icon: <UserOutlined />,
    },
    {
      key: '/account',
      label: 'Account',
      icon: <UserOutlined />,
    }, 
    { key: '/faculty', label: 'Faculty', icon: <FacebookFilled /> }, 
    { key: '/Event/listEvent', label: 'Event', icon: <MenuFoldOutlined />  },
  ] 

  return (
    <ConfigProvider theme={{ token: {  colorPrimary: '#92bdff' , }}} >   
        <Layout style={{ minHeight: '100vh'  }}>
        
        <SidebarComponent collapsed={collapsed} items={items} onClick={onClick} />
          <Layout >
            <HeaderComponent collapsed={collapsed} toggleCollapsed={toggleCollapsed}   />
            <Layout >
            <Content className="Content">
                <Outlet />
            </Content>
            </Layout>
          </Layout>
 
        </Layout>
    
    </ConfigProvider>
  );
};

export default App;
