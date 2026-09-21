import { useState, useEffect } from "react";
import type { ManagerRequestHistoryType } from "../types/types";
import api from "../api/api";

const useRequest = () => {
  const [requests, setRequests] = useState<ManagerRequestHistoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/manager/requests");
      setRequests(res.data.payload.data);
    };
    fetchData();
  }, []);

  return {requests};
};

export default useRequest;
