export interface ICategory {
  id: number;
  name: string;
}

export interface ILimitCategory {
  id: number;
  limit: number;
  month: number;
  categoryId: number;
  category: ICategory;
}

export interface IPopularCategory {
  category: ICategory;
  total: number;
  limit: number;
  month: number;
}
