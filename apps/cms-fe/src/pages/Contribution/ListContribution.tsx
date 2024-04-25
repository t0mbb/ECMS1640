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
import { getlistContribution, contributionDelete ,downloadZipContribution } from '../../services/contribution.service';
import { DownloadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
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
  fileName :string
}

const Home = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [listTable, setListAcc] = useState();


  const getListFromBE = async () => {
   
    const res = await getlistContribution(id);
    console.log(res);
    setListAcc(res.data.Result);
  };

  useEffect(() => {
    getListFromBE();
  }, []);

  const confirm = async (_id: string) => {
    try {
      await contributionDelete(_id);
      message.success('Delete Success');
    } catch (error) {
      message.error('Error delete');
    }
  };

  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Cancel Delete');
  };

  const download = async (fileName : string ) => {
    try {
      const returnURI = await downloadZipContribution(fileName);
      message.success('Success');
      window.open(returnURI.data,'_blank') ;
    } catch (error) {
      message.error('Error delete');
    }
  }

  
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
   

      <Table dataSource={listTable}>
     
         <Column
          title="fileSize"
          dataIndex="fileSize"
          key="filepath"
          onCell={(record: DataType) => ({
            onClick: () => navigate(`/con/detail/${record._id}`),
          })}
          render={(name: string) => {

            return (
              <Tag
                style={{
                  backgroundColor: "grey",
                  borderRadius: '10px',
                  padding: '5px 10px',
             
                }}
              >
                {`${name} kb`}
              </Tag>
            );
          }}
        />
       
        <Column title="Upload Date"
         onCell={(record: DataType) => ({
          onClick: () => navigate(`/con/detail/${record._id}`),
        })}
         dataIndex="UploadDate" key="UploadDate" render={(text) => new Date(text).toLocaleDateString()}/>
         
        <Column title="File Name" 
         dataIndex="fileName"
          key="fileName"
          onCell={(record: DataType) => ({
            onClick: () => navigate(`/con/detail/${record._id}`),
          })} />
        <Column title="Description" dataIndex="content" key="content" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button
                type="primary"
                className="button"
                style={{ color: 'whitesmoke', backgroundColor: 'black' }}
                onClick={() =>
                  navigate(`/con/update/${record._id}`)
                }
              >
                Update
              </Button>
              <RoleProtectedButton allowedRole={[RoleName.ADMIN]}>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => confirm(record._id)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                  
                >
                  <Button
                    type="primary"
                    className="button"
                    style={{ color: 'red', backgroundColor: 'black' }}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </RoleProtectedButton>
              <RoleProtectedButton allowedRole={[RoleName.ADMIN , RoleName.MARKETING_MANAGER]}>
              <Button
                type="primary"
                className="button"
                style={{ color: 'whitesmoke', backgroundColor: 'black' }}
                onClick={() => download(record.fileName)}
                icon={<DownloadOutlined />}
              >
                
                Download
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
