import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import AccessDenied from 'components/AccessDenied/AccessDenied';
import { endpoints } from 'constants/endpoints';
import { useAuth } from 'hooks/useAuth';
import { useCheckPermission } from 'hooks/useCheckPermission';

interface PrivateComponentProps {
  component: React.ComponentType;
  permission: string;
}

const PrivateComponent: FC<PrivateComponentProps> = ({ component: RouteComponent, permission }) => {
  const { isAuth } = useAuth();
  const isAccess = useCheckPermission(permission);
  if (isAuth && !isAccess) {
    return <AccessDenied />;
  }

  if (isAuth && isAccess) {
    return <RouteComponent />;
  }

  return <Navigate to={endpoints.login.url} />;
};

export default PrivateComponent;
