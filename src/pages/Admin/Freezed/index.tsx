import React, { useEffect, useState } from "react";
import Table from "./Table";
import { adminUrl } from "../../../BackendUrl";
import axios from "axios";

const Freezed = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const data = await axios.get(
        `${adminUrl}user/post_no_bill/status?status=rejected`
      );
      console.log(data);
      setData(data.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h3 className=" my-2">Unfreeze Request</h3>
      <Table data={data} />
    </div>
  );
};

export default Freezed;
