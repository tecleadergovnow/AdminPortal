export interface UserToken {
  accessToken: string;
}

export interface User {
  logged: boolean;
  name?: string;
  userName?: string;
  email?: string;
}

export type CheckUserRedirect = (params: User) => boolean;
