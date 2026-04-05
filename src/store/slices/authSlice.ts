import { createSlice } from '@reduxjs/toolkit';

export interface AuthSliceValues {
  userData: {
    userId: string;
    username: string;
    email: string;
    token: string;
    refreshToken: string;
    roles: Array<string>;
    mustChangePassword: boolean;
  };
  isAuthenticated: boolean;
}

const getRolesFromPayload = (payload: unknown): string[] => {
  if (!payload || typeof payload !== 'object') return [];

  const candidate = payload as Record<string, unknown>;
  const rolesSource =
    candidate.roles ??
    candidate.role ??
    candidate.rol ??
    candidate.userRole ??
    candidate.userRol ??
    candidate.authorities ??
    candidate.permissions;

  if (Array.isArray(rolesSource)) {
    return rolesSource
      .map(role => {
        if (typeof role === 'string') return role;
        if (role && typeof role === 'object') {
          const roleObject = role as Record<string, unknown>;
          const roleValue = roleObject.name ?? roleObject.role ?? roleObject.authority ?? roleObject.value ?? roleObject.rol;

          if (typeof roleValue === 'string') {
            return roleValue;
          }
        }

        return '';
      })
      .filter(Boolean);
  }

  if (typeof rolesSource === 'string') {
    return rolesSource
      .split(',')
      .map(role => role.trim())
      .filter(Boolean);
  }

  if (rolesSource && typeof rolesSource === 'object') {
    const roleObject = rolesSource as Record<string, unknown>;
    const roleValue = roleObject.name ?? roleObject.role ?? roleObject.authority ?? roleObject.value ?? roleObject.rol;

    if (typeof roleValue === 'string') {
      return [roleValue.trim()].filter(Boolean);
    }
  }

  return [];
};

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const pickBestUserSource = (payload: unknown): Record<string, unknown> => {
  if (!isObject(payload)) return {};

  const candidate = payload;
  const nestedData = isObject(candidate.data) ? candidate.data : null;
  const nestedUser = isObject(candidate.user) ? candidate.user : null;
  const nestedDataUser = nestedData && isObject(nestedData.user) ? nestedData.user : null;

  const sources = [candidate, nestedData, nestedUser, nestedDataUser].filter(Boolean) as Record<string, unknown>[];

  const hasAnyUserField = (source: Record<string, unknown>) =>
    ['userId', 'id', 'email', 'username', 'roles', 'role', 'rol', 'authorities', 'userRole', 'userRol'].some(
      key => key in source,
    );

  return sources.find(hasAnyUserField) ?? candidate;
};

const mapUserData = (payload: unknown): AuthSliceValues['userData'] => {
  if (!isObject(payload)) {
    return {
      userId: '',
      username: '',
      email: '',
      token: '',
      refreshToken: '',
      roles: [],
      mustChangePassword: false,
    };
  }

  const candidate = payload;
  const source = pickBestUserSource(payload);

  return {
    userId: String(source.userId ?? source.id ?? ''),
    username: String(source.username ?? source.userName ?? source.user ?? source.email ?? ''),
    email: String(source.email ?? source.username ?? ''),
    token: String(candidate.token ?? candidate.accessToken ?? ''),
    refreshToken: String(candidate.refreshToken ?? ''),
    roles: getRolesFromPayload(source),
    mustChangePassword: Boolean(source.mustChangePassword ?? source.requirePasswordChange ?? false),
  };
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: {
      userId: '',
      username: '',
      email: '',
      token: '',
      refreshToken: '',
      roles: [] as Array<string>,
      mustChangePassword: false,
    },
    isAuthenticated: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = mapUserData(action.payload);
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setMustChangePassword: (state, action) => {
      state.userData.mustChangePassword = action.payload;
    },
  },
});

export const { setUserData, setIsAuthenticated, setMustChangePassword } = authSlice.actions;

export default authSlice.reducer;
