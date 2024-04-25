import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  Space,
  Table,
  Tag,
  type FormProps,
  Button,
  ConfigProvider,
} from 'antd';
import { accDetails } from '../../services/account.service';
import '../../assets/css/table.css';
import { useParams } from 'react-router-dom';
const { Column } = Table;

const Detail = () => {
  let { id } = useParams();
  const [listAcc, setDetail] = useState();
  console.log(listAcc);
  const getListAccFromBE = async () => {
    const res = await accDetails(id);
    setDetail(res.data.Result);
  };

  useEffect(() => {
    getListAccFromBE();
  }, []);

  if (!listAcc) {
    return <div>Loading...</div>;
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
      <div style={{ overflowX: 'auto' }}>
        <Table pagination={false} dataSource={[listAcc]}>
          <Column title="Email" dataIndex="email" key="firstName" />
          <Column title="Phone" dataIndex="phone" key="age" />
          <Column title="Full Name" dataIndex="fullname" key="fullname" />
          <Column title="Date of Birth" dataIndex="dob" key="dob" render={(text) => new Date(text).toLocaleDateString()}/>
          <Column title="Address" dataIndex="address" key="address" />
          <Column
          title="Role"
          dataIndex="role_id"
          key="role_id"
          render={(role: any) => <Tag style={{ backgroundColor : "#55a6c9", borderColor:"black"   ,borderRadius: '10px'  ,padding: '5px 10px'}}> {role?.name ? role.name.toUpperCase() : '||Empty Role||'} </Tag>}
        />
           <Column
          title="Faculty"
          dataIndex="faculty_id"
          key="faculty_id"
          render={(faculty: any) => <Tag style={{ backgroundColor : "#55a6c9", borderColor:"black"  ,borderRadius: '10px'  ,padding: '5px 10px'}}>{faculty?.name ? faculty.name.toUpperCase() : '||Empty Faculty||' } </Tag>}
        />
        </Table>
        </div>

    </ConfigProvider>
  );
};

export default Detail;
