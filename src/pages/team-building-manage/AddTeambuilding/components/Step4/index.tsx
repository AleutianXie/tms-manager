import React, { useEffect, useState } from 'react';
import { Form, Button, Space, Row, Col, Input, Card } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import PriceDetails from '@/components/PriceElemets/PriceDetails';
import FeeDetails from '@/components/FeeDetails/FeeDetails';
import { uuid } from '@/helpers';

interface Step4Props {
  data?: StateType['step'];
  dispatch?: Dispatch;
  submitting?: boolean;
}
const { TextArea } = Input;
const FormItemLayoutSpan = 4;
const FormItemLayoutOffset = 0;
const FormRowLayoutSpan = 12;

const Step4: React.FC<Step4Props> = (props) => {
  const { data, dispatch, submitting } = props;
  const [form] = Form.useForm();
  const [setOpen] = useState('');
  useEffect(() => {
    if (data?.feature !== undefined) {
      if (data?.places !== undefined) {
        form.setFieldsValue({
          themes: data?.themes?.length || [{}],
          feature:
            Array.isArray(data?.feature)
              ? data?.feature
              : [data?.feature],
          places:
            Array.isArray(data?.places)
              ? data?.places
              : [data?.places],
        });
      } else {
        form.setFieldsValue({
          themes: data?.themes?.length || [{}],
          feature:
            Array.isArray(data?.feature)
              ? data?.feature
              : [data?.feature],
          places:
            [{}],
        });
      }
    } else if (data?.places !== undefined) {
      form.setFieldsValue({
        themes: data?.themes?.length || [{}],
        feature:
          [{}],
        places:
          Array.isArray(data?.places)
            ? data?.places
            : [data?.places],
      });
    } else {
      form.setFieldsValue({
        themes: data?.themes?.length || [{}],
        feature:
          [{}],
        places:
          [{}],
      });
    }
  }, []);
  if (!data) {
    return null;
  }
  const { getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: {
          ...data,
          ...values,
        },
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'schedule',
      });
    }
  };
  const onValidateForm = async () => {
    // const values = await validateFields();
    const values = await getFieldsValue();
    if (dispatch) {
      const { hold_people = {}, ...others }: any = data;
      const params: any = { ...others, ...hold_people, ...values };
      console.log(params);
      dispatch({
        type: 'addteambuilding/saveStepFormData',
        payload: params,
      });
      dispatch({
        type: 'addteambuilding/saveCurrentStep',
        payload: 'notice',
      });
    }
  };

  return (
    <>
    <Form
      style={{ height: '100%', marginTop: 40 }}
      name={'plan'}
      form={form}
      layout="horizontal"
      autoComplete="off"
      hideRequiredMark={true}
    >
      <FeeDetails id={data?.id} type={'activity'} />
      <Row>
        <Col span={24} offset={FormItemLayoutOffset}>
          <Form.Item
            label="不包含"
            name="cost_statement"
            rules={[{ required: true, message: '请输入不包含说明' }]}
          >
            <TextArea placeholder="费用不包含说明" autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
        </Col>
      </Row>
      <Space
        style={{
          marginTop: 40,
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'center',
          flex: 1,
        }}
        align={'baseline'}
      >
        <Button onClick={onPrev} style={{ marginRight: 8 }}>
          上一步
        </Button>
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          下一步
        </Button>
      </Space>
    </Form>
    </>
  );
};
export default connect(
  ({
    addteambuilding,
    loading,
  }: {
    addteambuilding: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['addteambuilding/submitStepForm'],
    data: addteambuilding.step,
  }),
)(Step4);
