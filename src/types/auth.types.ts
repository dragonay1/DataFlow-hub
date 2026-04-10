export interface LoginValues {
  username: string;
  password: string;
}

export interface AuthResponse {
  data: {
    token: string;
    refreshToken: string;
  };
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  role: string;
}
