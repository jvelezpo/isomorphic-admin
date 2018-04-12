import React, { Component } from 'react';
import Capitalize from 'lodash.capitalize';
import { Route, Redirect } from 'react-router-dom';

const findOnlyPermissions = (onlyPermissions = [], parentState) => {
  if (onlyPermissions.length > 0) {
    const permission = onlyPermissions.find(perm => {
      return !perm.evaluate(parentState);
    });
    if (permission) {
      return {
        ...permission,
        type: 'only'
      };
    }
  }
  return null;
};

const findExceptPermissions = (exceptPermissions = [], parentState) => {
  if (exceptPermissions.length > 0) {
    const permission = exceptPermissions.find(perm => {
      return !!perm.evaluate(parentState);
    });
    if (permission) {
      return {
        ...permission,
        type: 'except'
      };
    }
  }
  return null;
};

export const rejectedPermission = (only, except, parentState) => {
  return findOnlyPermissions(only, parentState) || findExceptPermissions(except, parentState);
};

const getRedirectTo = (data, type, parentState) => {
  if (typeof data === 'string') {
    return data;
  } else if (typeof data[type] === 'function') {
    return data[type](parentState);
  } else {
    return data[type];
  }
};

class PermissionRoute extends Component {
  render() {
    let { component: MountedComponent, parentState, ...rest } = this.props;
    const rejected = rejectedPermission(rest.only, rest.except, parentState);
    if (rejected) {
      if (rejected[`external${Capitalize(rejected.type)}`]) {
        window.location.replace(getRedirectTo(rejected.redirectTo, rejected.type, parentState));
        return <span />;
      } else {
        return (
          <Redirect
            key={rejected.redirectTo}
            to={{
              pathname: getRedirectTo(rejected.redirectTo, rejected.type, parentState),
              state: { from: this.props.location }
            }}
          />
        );
      }
    } else {
      return <Route {...rest} component={MountedComponent} />;
    }
  }
}
export default PermissionRoute;
