import check, { checkPermissions } from './CheckPermissions';

const Authorized = ({ children, currentAuthority, authority, noMatch = null }) => {
  const childrenRender = typeof children === 'undefined' ? null : children;

  if (currentAuthority) {
    return checkPermissions(authority, currentAuthority, childrenRender, noMatch);
  }

  return check(authority, childrenRender, noMatch);
};

export default Authorized;
