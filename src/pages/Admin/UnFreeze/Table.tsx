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
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      render: (date: any) => date.split("T")[0],
    },
    {
      title: " ID",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Suit Number",
      dataIndex: "suit_number",
      width: 150,
    },
    {
      title: "Bank Name",
      dataIndex: "bank_name",
      key: "bank_name",
      width: 200, // Fixed width for the column
      render: (text) => <div style={{ whiteSpace: "normal" }}>{text}</div>,
    },
    {
      title: "Unfreeze Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (record: any) => (
        <>
          {
            <Tag color={!record || record == "rejected" ? "red" : "green"}>
              {(record == "activated" ? "Unfreeze" : record) || "pending"}
            </Tag>
          }
        </>
      ),
    },
    {
      title: "Account Number",
      dataIndex: "account_number",
      key: "account_number",
      width: 200,
    },
    {
      title: "Court Order",
      dataIndex: "file",
      key: "file",
      width: 150,
      render: (record: any) => (
        <Button type="primary" size="medium">
          View
        </Button>
      ),
    },
    {
      title: "Cover letter",
      dataIndex: "file",
      key: "file",
      width: 150,
      render: (record: any) => (
        <Button type="primary" size="medium">
          View
        </Button>
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
