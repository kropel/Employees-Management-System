import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import { IEmployee } from "../../models/IEmployee";

import { Tag, Table, Avatar, Button, Modal, notification, Space } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import styles from "./CEmployeesList.module.scss";

import {
  deleteEmployee,
  levelsMap,
  positionsMap,
} from "../../services/employeesSvc";

const getYear = (date: string) => new Date(date).getFullYear();
const getFullDate = (date: string) => new Date(date).toLocaleDateString();

const CEmployeesList: FC<{
  getEmployeesData: Function;
  employees: IEmployee[];
  employeesAmount: number;
}> = ({ getEmployeesData, employees, employeesAmount }) => {
  const history = useHistory();

  const employeeData = employees.map((employee, index) => ({
    id: employee._id,
    photo: employee.photo,
    name: employee.name,
    surname: employee.surname,
    startWorkDate: getYear(employee.startWorkDate),
    evaluationDate: getFullDate(employee.evaluationDate),
    tags: employee.tags,
    level: levelsMap(employee.level).value,
    position: positionsMap(employee.position).value,
    project: employee.project,
  }));

  const [userToDelete, setUserToDelete] = useState<typeof employeeData[0]>();

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      render: (photo: string) => {
        return photo ? (
          <Avatar shape="square" size="large" src={photo} />
        ) : (
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Started working",
      dataIndex: "startWorkDate",
      key: "startWorkDate",
    },
    {
      title: "Last evaluation",
      dataIndex: "evaluationDate",
      key: "evaluationDate",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => (
            <Tag color="green" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",

      render: (id: string, record: typeof employeeData[0]) => (
        <Space>
          <Button
            title={`Edit: ${record.name}`}
            type="ghost"
            icon={<EditOutlined />}
            onClick={() => {
              history.push(`/employees/${id}`);
            }}
          />
          <Button
            title={`Delete: ${record.name}`}
            type="ghost"
            danger
            onClick={() => {
              setUserToDelete(record);
            }}
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const openNotificationFailed = () =>
    notification.error({
      message: "Error!",
      description: "Something went wrong. Please try again. ",
    });

  const openNotificationSuccess = (user: typeof employeeData[0]): void => {
    notification.success({
      message: "Success!",
      description: `You have successfully deleted employee ${user.name} ${user.surname}! `,
    });
  };

  return (
    <div className={styles.tableWrapper}>
      <Modal
        title="Delete employee"
        visible={!!userToDelete}
        onOk={async () => {
          const deletedEmployee = await deleteEmployee(userToDelete?.id!);

          if (deletedEmployee) {
            openNotificationSuccess(userToDelete!);
          } else {
            openNotificationFailed();
          }
          setUserToDelete(undefined);
          getEmployeesData();
        }}
        onCancel={() => {
          setUserToDelete(undefined);
        }}
      >
        <p>
          Are you sure you want to delete employee {userToDelete?.name}
          {userToDelete?.surname}?
        </p>
      </Modal>

      <Table
        columns={columns}
        dataSource={employeeData}
        rowKey={(record) => record.id}
        pagination={{
          pageSize: 5,
          total: employeesAmount,
          onChange: (page) => {
            getEmployeesData(page);
          },
        }}
      />
    </div>
  );
};

export default CEmployeesList;
