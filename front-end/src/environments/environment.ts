// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
   apiUrl: 'http://localhost:9090',
  // apiUrl: 'http://192.168.4.147:8082/symud',
  // apiUrl: 'http://41.77.184.36:8082/symud',
  key: `U2FsdGVkX19ALWwf+J98VhPca6nZKpKttgkrIQhWz/N7ucDRZyog4ZFKtGzjiGEL`
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
