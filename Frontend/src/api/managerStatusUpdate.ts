import api from "./api";

const updateStatus = async (id: number, status: string) => {
  await api.patch("/manager/status-update", { id, status });
};

export default updateStatus;
