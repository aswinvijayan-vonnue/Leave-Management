import { useState, useEffect } from "react";
import api from "../api/api";

export type HistoryType = {
  id: number;
  leave: string;
  from: string;
  to: string;
  duration: number;
  status: string;
  applied_on: string;
  department:string;
};
export type LeaveStatType = {
  id: number;
  leave: string;
  total: number;
  used: number;
};
const useReqHistory = () => {
  const [leaveStats, setLeaveStats] = useState<LeaveStatType[]>([]);
  const [data, setData] = useState<HistoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let ignore = false;
    const fetchAll = async () => {
      try {
        const [historyRes, statRes] = await Promise.all([
          api.get("/employee/req-history"),
          api.get("/employee/stats"),
        ]);
        if (!ignore) {
          setData(historyRes.data.payload.data);
          setLeaveStats(statRes.data.payload.data);
        }
      } catch (err) {
        if (!ignore) setError(err as string);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    fetchAll();
    return () => {
      ignore = true;
    };
  });
  return { leaveStats, data, isLoading, error };
};

export default useReqHistory;
