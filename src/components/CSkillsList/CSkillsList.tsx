import React, { FC, useState, Key } from "react";
import { useHistory } from "react-router-dom";

import { ISkills, ISkillsDTO } from "../../models/ISkills";

import { Table, Button, notification, Modal, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteSkill } from "../../services/skillsSvc";
import { TablePaginationConfig } from "antd/lib/table";
import { SorterResult } from "antd/lib/table/interface";

export interface ISkillsList {
  getSkillsData: Function;
  skills: ISkills[];
  skillsAmount: number;
  page: number;
}

const CSkillList: FC<ISkillsList> = ({
  getSkillsData,
  skills,
  skillsAmount,
  page,
}) => {
  const history = useHistory();

  const [skillToDelete, setSkillToDelete] = useState<ISkills>();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: true,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: true,
    },
    {
      title: "Actions",
      key: "action",
      render: (date: string, record: ISkills) => (
        <Space>
          <Button
            title={`Edit: ${record.name}`}
            type="ghost"
            icon={<EditOutlined />}
            onClick={() => history.push(`/skills/${record._id}`)}
          />

          <Button
            title={`Delete: ${record.name}`}
            type="ghost"
            danger
            onClick={() => {
              setSkillToDelete(record);
            }}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const openNotificationFailed = (): void =>
    notification.error({
      message: "Error!",
      description: "Something went wrong. Please try again. ",
    });

  const openNotificationSuccess = (skill: ISkillsDTO): void => {
    notification.success({
      message: "Success!",
      description: `You have successfully deleted skill ${skill.name}`,
    });
  };
  return (
    <>
      <Modal
        title="Delete skill"
        visible={!!skillToDelete}
        onOk={async () => {
          const deletedSkill = await deleteSkill(skillToDelete?._id!);

          if (deletedSkill) {
            openNotificationSuccess(deletedSkill!);
          } else {
            openNotificationFailed();
          }
          setSkillToDelete(undefined);
          getSkillsData({});
        }}
        onCancel={() => {
          setSkillToDelete(undefined);
        }}
      >
        <p>Are you sure you want to delete skill {skillToDelete?.name}?</p>
      </Modal>
      <Table
        sortDirections={["ascend", "descend", "ascend"]}
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={skills}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 5,
          total: skillsAmount,
          current: page,
        }}
        onChange={(
          pagination: TablePaginationConfig,
          filters: Record<string, Key[] | null>,
          sorter: SorterResult<ISkills> | SorterResult<ISkills>[]
        ) => {
          if (!Array.isArray(sorter)) {
            getSkillsData({
              current: pagination?.current,
              order: sorter?.order,
              columnKey: sorter?.columnKey,
            });
          }
        }}
      />
    </>
  );
};

export default CSkillList;
