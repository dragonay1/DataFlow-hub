const roleAliases: Record<string, Array<string>> = {
  admin: ['admin', 'administrator', 'administrador', 'super_admin', 'superadmin', 'role_admin', 'role administrator'],
  teacher: ['teacher', 'docente', 'professor', 'profesor', 'instructor', 'role_teacher', 'role docente'],
  student: ['student', 'estudiante', 'alumno', 'learner', 'role_student', 'role estudiante'],
};

const normalizeRole = (value: unknown) =>
  typeof value === 'string'
    ? value
        .trim()
        .toLowerCase()
        .replace(/^role[_\s-]*/, '')
        .replace(/[\s-]+/g, '_')
    : '';

export const getNormalizedRoles = (roles: unknown) =>
  (Array.isArray(roles)
    ? roles.map(role => {
        if (typeof role === 'string') return role;
        if (role && typeof role === 'object') {
          const roleObject = role as Record<string, unknown>;
          const roleValue =
            roleObject.name ?? roleObject.role ?? roleObject.authority ?? roleObject.value ?? roleObject.rol;

          if (typeof roleValue === 'string') {
            return roleValue;
          }
        }

        return '';
      })
    : typeof roles === 'string'
      ? roles.split(',')
      : [])
    .map(normalizeRole)
    .filter(Boolean);

export const hasRole = (roles: unknown, role: 'admin' | 'teacher' | 'student') => {
  const normalizedRoles = getNormalizedRoles(roles);
  const acceptedValues = roleAliases[role].map(normalizeRole);

  return normalizedRoles.some(currentRole => acceptedValues.includes(currentRole));
};

export const getPrimaryRoleLabel = (roles: unknown) => {
  if (hasRole(roles, 'admin')) return 'Administrador';
  if (hasRole(roles, 'teacher')) return 'Docente';
  if (hasRole(roles, 'student')) return 'Estudiante';

  if (!Array.isArray(roles) || roles.length === 0) return 'Sin rol';

  return String(roles[0]);
};
