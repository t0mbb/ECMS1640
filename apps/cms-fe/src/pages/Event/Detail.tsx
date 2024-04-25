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
import { eventDetails } from '../../services/event.service';
import '../../assets/css/table.css';
import { useParams } from 'react-router-dom';
const { Column } = Table;

const Detail = () => {
  let { id } = useParams();
  const [listEvent, setDetail] = useState();
  const getListEventFromBE = async () => {
    const res = await eventDetails(id);
    console.log(res);
    setDetail(res.data.Result);
  };

  useEffect(() => {
    getListEventFromBE();
  }, []);

  if (!listEvent) {
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
      <div className="Outlet">
        {' '}
        <Table dataSource={[listEvent]}>
          <Column title="Name" dataIndex="name" key="Name" />
          <Column title="Closure Date" dataIndex="closure_date" key="closure_date" render={(text) => new Date(text).toLocaleDateString()}/>
          <Column title="Final Closure Date" dataIndex="finalclosure_date" key="closure_date" render={(text) => new Date(text).toLocaleDateString()}/>
        </Table>

      </div>
    </ConfigProvider>
  );
};

export default Detail;
