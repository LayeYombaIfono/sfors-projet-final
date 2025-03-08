import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
   apiUrl: 'http://localhost:9494',
  // apiUrl: 'http://192.168.4.147:8082/symud',
 // apiUrl: 'http://41.77.184.36:8082/symud',
  key: `U2FsdGVkX19ALWwf+J98VhPca6nZKpKttgkrIQhWz/N7ucDRZyog4ZFKtGzjiGEL`
};
