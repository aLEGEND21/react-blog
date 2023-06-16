import ReactSession from 'react-session';

const sessionStore = new ReactSession({
  secret: 'temp-secret-key',
});

export default sessionStore;
