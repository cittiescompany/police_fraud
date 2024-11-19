import React from "react";
import Table from "./Table";
import { adminUrl } from "../../../BackendUrl";
import { useGetData } from "../../../content";
const AuditTrail = () => {
  const [data]=useGetData(`${adminUrl}user/audit/all`)
  return (
    <div>
      <h3>AuditTrail</h3>
      <Table data={ data&&data.data} />
    </div>
  );
};

export default AuditTrail;
