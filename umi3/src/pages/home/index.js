import React, { useEffect, useState } from 'react';
import { Table, Tag, Space } from 'antd';
import UserModal from './d-cpn/UserModal';
import { connect } from 'umi';

const HomePage = ({ dataSource }) => {
  const [visiable, setvisiable] = useState(false);
  const [record, setRecord] = useState({});
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags = []) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={(e) => {
              edithandle(record);
            }}
          >
            修改
          </a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  const edithandle = (record) => {
    setvisiable(true);
    // 查看antd文档的值record是当前行的数据

    console.log(record);
    setRecord(record);
  };

  const closehandle = () => {
    setvisiable(false);
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        pagination={{ position: ['bottomCenter'] }}
        columns={columns}
        className="wrap-v1"
      />
      <UserModal
        visiable={visiable}
        closehandle={closehandle}
        record={record}
      />
    </div>
  );
};

// nfn
const mapStateToProps = ({ HomePage }) => {
  return {
    dataSource: HomePage.HomeSource,
  };
};

export default connect(mapStateToProps)(HomePage);
