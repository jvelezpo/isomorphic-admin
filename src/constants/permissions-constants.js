import isEmpty from 'lodash.isempty';

export const IS_AUTHENTICATED = {
  evaluate: (props) => {
    console.log('IS_AUTHENTICATED props', props);    
    return props.get('idToken') && props.get('user').id
  },
  redirectTo: '/'
};

export const IS_GUEST = {
  evaluate: (props) => {
    console.log('IS_GUEST props', props);
    return isEmpty(props.get('idToken')) || isEmpty(props.get('user'));
  },
  redirectTo: '/dashboard'
};
