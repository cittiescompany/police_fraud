import React, { useState } from "react";
import { Table, Button, Tag, Dropdown, Menu } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const App: React.FC = ({ data, state }: any) => {
  const menu = (
    <Menu
      style={{
        padding: "10px",
      }}
    >
      <Menu.Item key="1" className="bg-red-300">
        Delete
      </Menu.Item>
      <Menu.Item key="2" className="bg-green-400 mt-1">
        Edit{" "}
      </Menu.Item>
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
      title: "Case ID",
      dataIndex: "Id",
      width: 100,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 200, // Fixed width for the column
      render: (text) => <div style={{ whiteSpace: "normal" }}>{text}</div>,
    },
    {
      title: "Amount involved",
      dataIndex: "amount",
      key: "amount",
      width: 200,
      render: (record: any) => `N ${Number(record).toLocaleString()}`,
    },
    {
      title: "Pettion",
      dataIndex: "file",
      key: "file",
      width: 150,
      render: (record: any) => (
        <Button type="primary" onClick={() => state(record)} size="medium">
          View
        </Button>
      ),
    },
    {
      title: "CP Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (record: any) => (
        <>
          {
            <Tag color={!record || record == "pending" ? "geekblue" : "green"}>
              {record || "pending"}
            </Tag>
          }
        </>
      ),
    },
    {
      title: "invitation Letter",
      dataIndex: "",
      key: "",
      width: 150,
      render: (record: any) => (
        <Button type="primary" size="medium">
          Download
        </Button>
      ),
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
