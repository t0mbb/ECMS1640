import React, { useState } from 'react';

import {
  Space,
  Table,
  type FormProps,
  Button,
  ConfigProvider,
  Popconfirm,
  message,
  FloatButton,
  Tag,
} from 'antd';

import '../../assets/css/table.css';

import imageSrc from '../../assets/image/cms.jpg'
const Home = () => {

    const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: '#141414',
          colorBgContainer: '#',
          colorText: 'white',
          colorBorderSecondary: '#a61d24',
          borderRadius: 10,
          
        },
      }}
    >

  
      <h1 style={{ display: "flex",
  justifyContent  : "center", color : ""}}>Welcome   {user.fullname} !!!!</h1>
      <img src={imageSrc} style={{width: '800px',  
 marginLeft :"280px",
  marginTop:"40px",
          height: '600px',
          borderRadius: '20px', 
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', }} alt="Description of the image" />
   

    </ConfigProvider>
  );
};

export default Home;
