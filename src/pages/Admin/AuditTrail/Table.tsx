import React, { useState } from "react";
import { Table, Button, Tag, Dropdown, Menu } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const App: React.FC = ({ data }: any) => {
  const menu = (
    <Menu
      style={{
        padding: "10px",
      }}
    >
      <Menu.Item key="1">Delete</Menu.Item>
      <Menu.Item key="2">Edit </Menu.Item>
    </Menu>
  );
  const columns: TableColumnsType<any> = [
    {
      title: "email address",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Indicator",
      dataIndex: "isOfficer",
      key: "isOfficer",
      render:(record:any)=>(
        <div>
          {
            record?"Police":"Bank"
          }
        </div>
      )
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
    },

    {
      title: "Action",
      dataIndex: "Id",
      key: "Id",
      render: (record: any) => (
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            shape="circle"
            icon={<EllipsisOutlined />}
            style={{ border: "none" }}
          />
        </Dropdown>
      ),
    },
  ];
  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      scroll={{ x: "max-content" }} // Enable horizontal scrolling
      style={{ tableLayout: "fixed" }} // Use fixed layout for the table
    />
  );
};

export default App;
