import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = (props) => {
  const { name, age, address } = props.record;
  const [form] = Form.useForm();
  useEffect(() => {
    //  钩子函数的好处
    form.setFieldsValue(props.record);
    console.log(props.record);
  }, [props.visiable]);

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={props.visiable}
        onCancel={props.closehandle}
        onOk={props.closehandle}
        forceRender
      >
        <Form name="basic" form={form}>
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Age" name="age">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
