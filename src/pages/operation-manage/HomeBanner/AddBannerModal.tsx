/**
 *  Created by pw on 2020/10/9 10:08 下午.
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import UploadComponent from '@/components/Upload';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

interface AddModalIF {
  onAdd: (data: API.HomeBanner, isAdd: boolean) => void;
  data: API.HomeBanner;
  visibleModal: boolean;
}

const AddBannerModal = (props: AddModalIF) => {
  const { visibleModal, data = { sort: 1 } as API.HomeBanner } = props;
  const [visible, setVisible] = useState(visibleModal);
  const [form] = Form.useForm();

  useEffect(() => {
    setVisible(visibleModal);
  }, [visibleModal]);

  const handleOk = async () => {
    const values = await form.validateFields();
    console.log(values);
    props.onAdd({ ...values, status: 0 } as API.HomeBanner, !data.id);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        新增
      </Button>
      <Modal width={600} title="添加" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form<API.AddAccount>
          {...formItemLayout}
          form={form}
          name="addBanner"
          initialValues={{ ...data }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[
              {
                required: true,
                message: '请输入名称',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label="跳转链接"
            rules={[
              {
                required: true,
                message: '请输入链接',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sort"
            label="排序"
            rules={[
              {
                required: true,
                message: '请输入排序',
              },
              {
                type: 'number',
                message: '请输入数字',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="cover"
            label="图片上传"
            rules={[
              {
                required: false,
                message: '请上传图片',
              },
            ]}
          >
            <UploadComponent />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default (props: AddModalIF) => <AddBannerModal {...props} />;