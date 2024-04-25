import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, List, Modal, Upload, Form,  Popconfirm, Layout, message, Avatar, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { contributionDetails } from '../../services/contribution.service';
import { getListComment ,createComment , deleteComment } from '../../services/comment.service';

import  {
    RoleName, RoleProtectedButton,
  } from '../../components/RoleProtected/RoleProtected';




const Detail: React.FC = () => {
  const { id } = useParams();
  const [listComment, setList] = useState<any>();
const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
  const getListCommentBE = async () => {
      
      const res = await getListComment(id);
      console.log(res.data.commentlist)
      setList(res.data.commentlist);
 
  };

  useEffect(() => {
    getListCommentBE();
  }, []);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    try {
      console.log(values);
      await createComment(values);
      message.success('Event updated successfully');
      setIsModalOpen(false);
    } catch (error : any) {
      console.error('Error Event account:', error);
      message.error(`Failed to update please check again ` , error);
    }
  };


  const confirm = async (_id: string) => {
    deleteComment(_id);
    message.success('Delete Success');
  };

  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Cancel Delete');
  };
  return (

<div>

<Button type="primary" onClick={showModal}>
        Comment
      </Button>
      <Modal title="Create Comment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Layout style={{ padding: '50px' }}>
      <Form
          variant="filled"
          style={{ maxWidth: 800 }}
          form={form}
          onFinish={onFinish}
          initialValues={{ contribution_id: id , account_id : user._id }}
        >
          <Form.Item label= "ID_Contribution"name="contribution_id" >
            <Input disabled />
          </Form.Item>
          <Form.Item label= "Account_ID "name="account_id" >
            <Input disabled />
          </Form.Item>
          <Form.Item label="Comment" name="comment">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" ghost htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Layout>
      </Modal>
      <Divider/>
    <List
    itemLayout="horizontal"
    dataSource={listComment}
    renderItem={(item:any) => (
      <List.Item actions={[
        <RoleProtectedButton allowedRole={[RoleName.ADMIN]}>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => confirm(item._id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger className="button">
            Delete
          </Button>
        </Popconfirm>
      </RoleProtectedButton>]}>
        <List.Item.Meta
         avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${1}`} />}
          title={item.account_id.fullname}
          description={item.comment}
        />
      </List.Item>
    )}
  />
 
 </div>
  );
};

export default Detail;
