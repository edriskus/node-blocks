export interface IUserReduxState {
  isOnSync: boolean;
  loggedIn: boolean;
  details: any | null;
  token: string | null;
  username: string | null;
}
