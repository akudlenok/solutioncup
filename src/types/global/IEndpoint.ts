export interface IEndpoint {
  url: string,
  title: string
}

export interface IEndpoints {
  [key: string]: IEndpoint;
}
