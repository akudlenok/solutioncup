export interface IGetAllExpensesRequest {
  date_gte: string;
  date_lte: string;
  categoryId?: number;
}
