import React, { cloneElement } from 'react'

export enum RoleName {
    ADMIN = 'admin',
    MARKETING_MANAGER = 'marketing manager',
    MARKETING_COORDINATOR = 'marketing coordinator',
    STUDENT = 'student',
    GUEST = 'guest',
  }

const RoleProtected = (props: { allowedRole: RoleName[], children: React.ReactElement }) => {
    const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
    if (!user?.role_id?.name) return null;
    if (!props.allowedRole.includes(user?.role_id?.name)) {
        return null;
    }

  return cloneElement(props.children, props);
}

export const RoleProtectedButton = (props: { allowedRole: RoleName[], children: React.ReactElement }) => {
  const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
  console.log(user);
  if (!user?.role_id?.name) return null;
  if (!props.allowedRole.includes(user?.role_id?.name)) {
      return null;
  }
return props.children;
}

export default RoleProtected