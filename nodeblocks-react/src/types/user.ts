import { IApiError } from "./api";

export class UserReduxState {
  user?: {
    email: string;
    username: string;
    id: string;
    roles?: string[];
  };
  loading?: boolean;
  apiError?: IApiError
  token?: string;
}
