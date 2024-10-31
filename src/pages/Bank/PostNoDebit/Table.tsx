import React, { useState } from "react";
import { Table, Button, Tag, Dropdown, Menu } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const App: React.FC = ({ data, update, setState, status }: any) => {
  const handleClick = (id: any) => {
    update(id);
  };
  const menu = (id: any) => (
    <Menu
      style={{
        padding: "10px",
      }}
    >
      {[status ? "Freeze" : "Unfreeze", "Rejected"].map((item, index) => (
        <Menu.Item
          onClick={() =>
            handleClick({
              status: ["Freeze", "Unfreeze"].includes(item)
                ? "activated"
                : "rejected",
              id: id,
            })
          }
          key={index}
        >
          {item}
        </Menu.Item>
      ))}
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
      title: "PND Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (record: any) => (
        <>
          {
            <Tag color={!record || record == "rejected" ? "red" : "green"}>
              {(record == "activated" && !status ? "Unfreeze" : record) ||
                "pending"}
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
      dataIndex: "court_order",
      key: "court_order",
      width: 150,
      render: (record: any) => (
        <Button type="primary" onClick={() => setState(record)} size="medium">
          View
        </Button>
      ),
    },
    {
      title: "Cover letter",
      dataIndex: "cover_letter",
      key: "cover_letter",
      width: 150,
      render: (record: any) => (
        <Button type="primary" onClick={() => setState(record)} size="medium">
          View
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "unique_id",
      key: "unique_id",
      render: (record: any) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
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
