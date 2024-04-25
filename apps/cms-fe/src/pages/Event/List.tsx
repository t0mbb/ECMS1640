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
  FloatButton,
  Tag,
} from 'antd';
import { getlistEvent, eventDelete , listEventbyFac } from '../../services/event.service';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import  {
  RoleName, RoleProtectedButton,
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

  const [listEvent, setListEvent] = useState();
  const user = JSON.parse(sessionStorage.getItem('userData') || '{}');

  const getListAccFromBE = async () => {
    if(user.role_id.name === "admin" || ""){
    const res = await getlistEvent();
    setListEvent(res.data.event);
    console.log(res.data);
    }
    else {
      const facId = user.faculty_id._id
      const res = await listEventbyFac(facId);
      setListEvent(res.data.Result);
      console.log(res);
    }
    
  };

  useEffect(() => {
    getListAccFromBE();
  }, []);

  const confirm = async (_id: string) => {
    eventDelete(_id);
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
  <RoleProtectedButton allowedRole={[RoleName.ADMIN]}> 
      <FloatButton
        shape="circle"
        type="primary"
        onClick={() => navigate(`/Event/createEvent`)}
        style={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          marginRight: 20,
        }}
        icon={<PlusOutlined />}
      />
      </RoleProtectedButton>
      <Table pagination={false} dataSource={listEvent || listEvent}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Closure Date"
          dataIndex="closure_date"
          key="closure_date"
         
          render={(text) => ( <Tag
            style={{
              fontSize: 14,
              backgroundColor: '#347d59',
              borderRadius: '10px',
              padding: '10px 12px',
            }}
          >
            {new Date(text).toLocaleDateString()}
          </Tag>)}
        />
        <Column
          title="Final Closure Date"
          dataIndex="finalclosure_date"
          key="finalclosure_date"
          render={(text) => ( <Tag
            style={{
              fontSize: 14,
              backgroundColor: 'red',
              borderRadius: '20px',
              color: "white",
              padding: '10px 12px',
            }}
          >
            {new Date(text).toLocaleDateString()}
          </Tag>)}
        />

        <Column
          title=""
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <RoleProtectedButton allowedRole={[RoleName.ADMIN]}>
                <Button
                  className="button"
                  onClick={() => navigate(`/Event/detail/${record._id}`)}
                >
                  Details
                </Button>
              </RoleProtectedButton>
              
              <RoleProtectedButton allowedRole={[RoleName.ADMIN]}>
                <Button
                  className="button"
                  onClick={() => navigate(`/Event/update/${record._id}`)}
                >
                  Update
                </Button>
              </RoleProtectedButton>

              <RoleProtectedButton allowedRole={[RoleName.ADMIN]}>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => confirm(record._id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger className="button">
                    Delete
                  </Button>
                </Popconfirm>
              </RoleProtectedButton>

              <RoleProtectedButton allowedRole={[RoleName.ADMIN , RoleName.STUDENT]}>
                  <Button onClick={() => navigate(`/con/createCon/${record._id}`)} className="button">
                    +
                  </Button>
     
              </RoleProtectedButton>


              <RoleProtectedButton allowedRole={[RoleName.ADMIN , RoleName.STUDENT]}>
                  <Button onClick={() => navigate(`/con/listCon/${record._id}`)} className="button">
                    |||
                  </Button>
     
              </RoleProtectedButton>
            </Space>
          )}
        />
      </Table>
    </ConfigProvider>
  );
};

export default Home;
