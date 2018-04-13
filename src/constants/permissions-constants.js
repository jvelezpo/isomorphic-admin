import isEmpty from 'lodash.isempty';

export const IS_AUTHENTICATED = {
  evaluate: (props) => {
    return props.get('idToken') && props.get('user').id
  },
  redirectTo: '/'
};

export const IS_GUEST = {
  evaluate: (props) => {
    return isEmpty(props.get('idToken')) || isEmpty(props.get('user'));
  },
  redirectTo: '/dashboard'
};
