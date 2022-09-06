import { request } from 'umi';

const getSourceData = async () => {
  return await request('http://localhost:8000/jsonserver', {
    method: 'get',
  }).then(
    (res) => {
      return res.data.Source;
    },
    (err) => {
      return err;
    },
  );
};

export default getSourceData;
