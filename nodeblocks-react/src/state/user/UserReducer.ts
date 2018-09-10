import { IUserReduxState } from '../../types/user';

const INITIAL_STATE: IUserReduxState = {
  isOnSync: false,
  loggedIn: false,

  details: {},
  token: null,
  username: null,
};

type UserAction = any;

export const userReducer = (
  state: IUserReduxState = INITIAL_STATE,
  action: UserAction,
) => {
  switch (action.type) {
    default:
      return state;
  }
};
