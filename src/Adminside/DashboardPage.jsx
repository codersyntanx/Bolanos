import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';



const DashboardPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/getinformation');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showDetail = (record) => {
    console.log('Show details for:', record);
    navigate(`/detail/${record._id}`);
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showDetail(record)}>
            Details
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default DashboardPage;
