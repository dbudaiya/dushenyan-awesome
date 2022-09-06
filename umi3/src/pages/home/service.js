import { request } from 'umi';

const getDataSource = async () => {
  // 对数据请求前先在客户端路径:src\network启动服务
  return await request('http://localhost:8000/jsonserver', {
    method: 'GET',
  }).then(
    (res) => {
      return res.data.HomeSource;
    },
    (err) => {
      return err;
    },
  );
};


export default getDataSource