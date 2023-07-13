/**
*
* Asynchronously loads the component for MePage
*
*/

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));