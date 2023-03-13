export type ApiRequestInfo = {
  uri: string;
  options: { method: string; headers: HeadersInit; body?: string };
};
