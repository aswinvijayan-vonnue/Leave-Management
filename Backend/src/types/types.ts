export type ResponseType = {
  status: "error"|"success";
  payload: Record<string, unknown>;
};
