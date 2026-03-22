import ky from 'ky';

export default ky.extend({
  prefixUrl: import.meta.env.VITE_APP_SERVER_URL as string
});
