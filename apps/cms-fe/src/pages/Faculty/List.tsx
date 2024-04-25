import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Space,
  Table,
  Button,
  ConfigProvider,
  Popconfirm,
  message,
  FloatButton,
} from 'antd';
import { PlusOutlined  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import RoleProtected, {
  RoleName,
} from '../../components/RoleProtected/RoleProtected';
import '../../assets/css/table.css';
import { facDelete, getListFac } from '../../services/faculty.service';
const { Column } = Table;

interface DataType {
  key: React.Key;
  _id: string;
}

export const listFac = () => {
  const navigate = useNavigate();

  const [listFac, setListFac] = useState();

  const getListFacFromBE = async () => {
    const res = await getListFac();
    setListFac(res.data.faculty);
  };

  useEffect(() => {
    getListFacFromBE();
  }, []);

  const confirm = async (_id: string) => {
    facDelete(_id);
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
      onClick={() => navigate(`/faculty/createFac`)}
      style={{width: '60px', height: '60px' , position : "absolute" , marginRight : 20  }}
      icon={<PlusOutlined />}
    />
      <Table pagination={false} dataSource={listFac}>
        
        <Column title="Faculty Name" dataIndex="name" key="firstName" />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button
                className="button"
                onClick={() => navigate(`/faculty/update/${record._id}`)}>
                Update
              </Button>
              <RoleProtected allowedRole={[RoleName.ADMIN, RoleName.MARKETING_COORDINATOR , RoleName.MARKETING_MANAGER]}>
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
              </RoleProtected>
            </Space>
          )}
        />
      </Table>
      </div>
    </ConfigProvider>
  );
};

export default listFac;
