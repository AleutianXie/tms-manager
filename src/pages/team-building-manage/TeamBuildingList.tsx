/**
 *  Created by pw on 2020/8/29 5:23 下午.
 */
import React, { useEffect, useState } from 'react';
import { Space, Table, Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
// import AddTeambuildPanel from '@/pages/team-building-manage/AddTeambuildPanel';
import styles from './TeamBuildingList.less';
import { API } from '@/services/API';
import { getActivities } from '@/services/activity';
import { HomeBannerStatus } from '@/services/API.Enum';
import { history } from 'umi';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NO = 1;

export default () => {
  const [data, setData] = useState<API.ListResponsePayload<API.TeamBuildingNew>>();

  useEffect(() => {
    fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE });
  }, []);

  const fetchData = async (params: API.ListParam) => {
    const data = await getActivities(params);
    setData(data);
  };

  // const handAddResult = () => {
  //   // data.push(values);
  //   // setData(data.slice());
  //   // fetchData({ page_no: DEFAULT_PAGE_NO, page_size: DEFAULT_PAGE_SIZE });
  //   history.push({ pathname: '/team-building/add' });
  // };

  const handleAdd = () => {
    history.push({ pathname: '/team-building/add' });
  };

  const handleDetail = (record: API.TeamBuildingNew) => {
    history.push({
      pathname: '/team-building/detail',
      query: { id: record.id },
    });
  };

  const handleDel = (record: API.TeamBuildingNew) => {};

  const handleEdit = (record: API.TeamBuildingNew) => {};

  const handlePageChange = (page: number) => {
    fetchData({ page_no: page, page_size: DEFAULT_PAGE_NO });
  };

  const columns = [
    {
      title: '活动ID',
      dataIndex: 'series_number',
      key: 'series_number',
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '团建玩法',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: '人均价格',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: '可接纳人数',
      key: 'capacity',
      dataIndex: 'capacity',
      render: (cycle: number, record: API.TeamBuildingNew) =>
        `${record.hold_min} ~ ${record.hold_max}人`,
    },
    {
      title: '活动周期',
      key: 'duration',
      dataIndex: 'duration',
      render: (duration: number) => `${duration}天`,
    },
    {
      title: '活动地区',
      key: 'area',
      dataIndex: 'area',
    },
    {
      title: '是否展示',
      key: 'status',
      dataIndex: 'status',
      render: (text: string, record: API.TeamBuildingNew) => {
        return record.status === HomeBannerStatus.UP ? '已上架' : '已下架';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a onClick={() => handleDetail(record)}>查看</a>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDel(record)}>下架</a>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <div className={styles.team_buildin_list}>
        {/*<AddTeambuildPanel onResult={() => handAddResult()} />*/}
        <div className={styles.team_buildin_add}>
          <Button type="primary" onClick={handleAdd}>
            添加
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data?.data}
          pagination={{ total: data?.page_size, onChange: handlePageChange }}
        />
      </div>
    </PageContainer>
  );
};
