import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space, Modal, Input, Tag, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [informId, setInformId] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  const navigate = useNavigate();

  const fetchMessage = async (id) => {
    try {
      const response = await axios.get(`https://serverforbce.vercel.app/api/getmeesagebyinformid/${id}`);
      const messages = response.data.data;
      return {
        length: messages.length,
        lastMessage: messages.length > 0 ? messages[messages.length - 1].Message : null,
      };
    } catch (error) {
      console.error('Error fetching messages:', error);
      return {
        length: 0,
        lastMessage: null,
      };
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://serverforbce.vercel.app/api/getinformation');
      const informationData = response.data.data;

      const newData = await Promise.all(
        informationData.map(async (item) => {
          const messageInfo = await fetchMessage(item._id);
          return {
            ...item,
            messageLength: messageInfo.length,
            lastMessagePreview: messageInfo.lastMessage
              ? `${messageInfo.lastMessage.slice(0, 20)}...`
              : 'Not connected yet',
          };
        })
      );

      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); 
    }
  };

  const showDetail = (record) => {
    console.log('Show details for:', record);
    navigate(`/detail/${record._id}`);
  };

  const showModal = (record) => {
    const informId = record._id; // Assuming _id is the informId
    setInformId(informId);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      console.log('InformId in handleOk:', informId);
      console.log('Message:', message);

      if (informId) {
        const response = await axios.post('https://serverforbce.vercel.app/api/postmessage', {
          informId: informId,
          Message: message,
        });

        console.log('Message posted:', response.data);

        // Close the modal and fetch data again
        setIsModalVisible(false);
        fetchData();
      } else {
        console.error('No informId provided for posting message.');
      }
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMessage('');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Business Type',
      dataIndex: 'bussinesstype',
      key: 'bussinesstype',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Message Length',
      dataIndex: 'messageLength',
      key: 'messageLength',
    },
    {
      title: 'Last Message Preview',
      dataIndex: 'lastMessagePreview',
      key: 'lastMessagePreview',
      render: (text, record) => (
        <Tag color="magenta">{record.lastMessagePreview}</Tag>
      ),
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showDetail(record)}>
            Details
          </Button>
          <Button type="default" onClick={() => showModal(record)}>
            Post Message
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
    <h1>Dashboard</h1>
    <Spin spinning={loading}> 
      <Table columns={columns} dataSource={data} />
    </Spin>

    <Modal
      title="Post Message"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input.TextArea
        placeholder="Write your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </Modal>
  </div>
  );
};

export default DashboardPage;
