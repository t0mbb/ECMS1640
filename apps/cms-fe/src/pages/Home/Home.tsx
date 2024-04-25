import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Space,
  Table,
  type FormProps,
  Button,
  ConfigProvider,
  Popconfirm,
  message,
  Tag,
  FloatButton,
} from 'antd';
import { getListAcc, accDelete } from '../../services/account.service';
import { PlusOutlined  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import RoleProtected, {
  RoleName,
} from '../../components/RoleProtected/RoleProtected';
import '../../assets/css/table.css';
const { Column } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  age: number;
  address: string;
  _id: string;
}

const Home = () => {
  const navigate = useNavigate();
  
  const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
  
  const [listAcc, setListAcc] = useState();


  const [roleName, setRoleName] = useState();

  
  const getListAccFromBE = async () => {
    const res = await getListAcc();
    setListAcc(res.data.accounts.filter((acc: any) => acc._id !== user._id));
    console.log(res.data.accounts);
  };

  useEffect(() => {
    getListAccFromBE();
  }, []);



  const confirm = async (_id: string) => {
      accDelete(_id)
      message.success('Delete Success'); 
  };
  
  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Cancel Delete');
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
      <div style={{ overflowX: 'auto' }}>
      <FloatButton
      shape="circle"
      type="primary"
      onClick={() => navigate(`/account/createAcc`)}
      style={{width: '60px', height: '60px' , position : "absolute" , marginRight : 20  }}
      icon={<PlusOutlined />}
    />
      <Table pagination={false} dataSource={listAcc}>
        <Column title="Email"  dataIndex="email" key="firstName" />
        <Column title="Full Name" dataIndex="fullname" key="fullname" />
        <Column
          title="Role"
          dataIndex="role_id"
          key="role_id"
          render={(role: any) => <Tag style={{ backgroundColor : "#55a6c9", borderColor:"black" ,borderRadius: '10px'  ,padding: '5px 10px'}}> {role?.name ? role.name.toUpperCase() : '||Empty Role||'} </Tag>}
        />
         <Column
          title="Faculty"
          dataIndex="faculty_id"
          key="faculty_id"
          render={(faculty: any) => <Tag style={{ backgroundColor : "#55a6c9", borderColor:"black" ,borderRadius: '10px'  ,padding: '5px 10px'}}>{faculty?.name ? faculty.name.toUpperCase() : '||Empty Faculty||' } </Tag> } 
        />
        
        <Column
          title="Action"
          key="action"
          
          render={(_: any, record: DataType) => (
            <Space size="middle">
                 <Button type="primary"  className="button"
             style={{color : "black" }}
                onClick={() => navigate(`/account/detail/${record._id}`)}
              >
                Details
              </Button>
              <Button type="primary"  className="button"
                style={{ color : "black"}}
                onClick={() => navigate(`/account/update/${record._id}`)}
              >
                Update
              </Button>
              <RoleProtected allowedRole={[RoleName.ADMIN]}>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => confirm(record._id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button  type="primary"  className="button" style={{color : "red" , borderColor :"red"}}>
                    Delete
                  </Button>
                </Popconfirm>
              </RoleProtected>
            </Space>
          )}
        />
      </Table>
      </div>
    </ConfigProvider>
  );
};

export default Home;
