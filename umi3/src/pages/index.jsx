import React from 'react';
import { Table, Tag, Space } from 'antd';
import { connect } from 'umi';

// 导入进行静态数据
// import { dataSource, columns } from '../mock/leter-data.js';

const IndexPage = ({ dataSource }) => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="wrap-v1"
      />
      ;
    </div>
  );
};

// nfn
const mapStateToProps = ({ IndexPage }) => {
  return {
    dataSource: IndexPage.Source,
  };
};

export default connect(mapStateToProps)(IndexPage);
