import React from 'react';
import { Avatar, Button, ConfigProvider } from 'antd';
import {  theme as antTheme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined  ,LogoutOutlined , UserOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import  '../assets/css/dash.css';
import avatar from '../assets/image/tooc.jpg';
interface HeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, toggleCollapsed }) => {
  const nav = useNavigate();

  const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
  const toggleMenu = () => {
    toggleCollapsed();
  };
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userData');
    nav('/login');
  };

  return ( 
    <header className='header'   >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleMenu}
        style={{
            fontSize: '30px',
            width: 64,
            height: 64,
            color : "#033159"
        }}
      />
   
      <Avatar src={avatar} size={42} icon={<UserOutlined />} style={{ position: "absolute", inset: "13px 80px auto auto" }} />
      <span style={{
            width: 42,
            height: 42, position: "absolute", inset: "27px 190px auto auto" }}>{user.fullname}</span>
   
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{
            fontSize: '30px',
            width: 64,
            height: 64,
            color : "#033159",
            position: "absolute", inset: "auto 15px auto auto"
          }}
        
      />
    </header>

  );
};

export default Header;
