type LocalMockUser = {
  userId: string;
  email: string;
  token: string;
  refreshToken: string;
  roles: string[];
};

type LocalCredential = {
  username: string;
  passwords: string[];
  user: LocalMockUser;
};

const localCredentials: LocalCredential[] = [
  {
    username: 'admin',
    passwords: ['123', 'admin123'],
    user: {
      userId: '1',
      email: 'admin@local.dev',
      token: 'local-token-admin',
      refreshToken: 'local-refresh-admin',
      roles: ['admin'],
    },
  },
  {
    username: 'docente',
    passwords: ['123', 'docente123'],
    user: {
      userId: '2',
      email: 'docente@local.dev',
      token: 'local-token-docente',
      refreshToken: 'local-refresh-docente',
      roles: ['docente'],
    },
  },
  {
    username: 'estudiante',
    passwords: ['123', 'estudiante123'],
    user: {
      userId: '3',
      email: 'estudiante@local.dev',
      token: 'local-token-estudiante',
      refreshToken: 'local-refresh-estudiante',
      roles: ['estudiante'],
    },
  },
];

export const authenticateLocalUser = (username: string, password: string) => {
  const normalizedUsername = username.trim().toLowerCase();
  const credential = localCredentials.find(
    item => item.username.toLowerCase() === normalizedUsername && item.passwords.includes(password),
  );

  return credential?.user ?? null;
};
