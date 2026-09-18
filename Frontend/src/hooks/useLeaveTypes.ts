import { useEffect, useState } from "react";
import api from "../api/api";
type LeaveType = {
  id: number;
  name: string;
};
const useLeaveTypes = () => {
  const [leaves, setLeaves] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get("/employee/leave")
      .then((res) => setLeaves(res.data.payload.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  return { leaves, loading, err };
};

export default useLeaveTypes;
