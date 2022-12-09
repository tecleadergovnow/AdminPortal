export interface AdminActionDto{
  product: string;
  actionType: string;
  payload?: any;
  applicationId: number;
}
