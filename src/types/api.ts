export type ApiRequestInfo = {
  uri: string;
  options: { method: string; headers: object; body?: string };
};
