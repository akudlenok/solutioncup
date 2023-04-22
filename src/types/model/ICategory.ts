export interface ICategory {
  id: number;
  name: string;
}

export interface IPopularCategory {
  category: ICategory,
  total: number,
  limit: number,
  month: number,
}
