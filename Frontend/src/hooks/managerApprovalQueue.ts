import { useState, useEffect } from "react";
import type { ManagerRequestHistoryType } from "../types/types";
import api from "../api/api";

const useApprovalQueue = () => {
  const [pendingReq, setPendingReq] = useState<ManagerRequestHistoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/manager/pending");
      setPendingReq(res.data.payload.data);
    };
    fetchData();
  }, []);

  return { pendingReq,setPendingReq };
};

export default useApprovalQueue;
