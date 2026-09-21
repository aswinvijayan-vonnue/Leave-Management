import { useState, useEffect } from "react";
import api from "../api/api";

const useStats = () => {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/manager/stats");
      setStats(res.data.payload.data);
    };
    fetchStats();
  }, []);
  return { stats };
};

export default useStats;
