import * as debug from './utils/debug';
import * as behaviors from './utils/behaviors';

// Core ======================================= /
// NOTE: Every item in the "Core" section is required for running the Soho library properly.
// The Soho team will not support any custom builds where these packages are not included.
// ============================================ /
export { version } from '../package.json';
export { debug };
export { uniqueIdCount, utils, DOM } from './utils/utils';
export { stringUtils as string } from './utils/string';
export { breakpoints } from './utils/breakpoints';
export { Locale } from './locale/locale';
export { Environment as env } from './utils/environment';
export { theme } from './utils/theme';

// Behaviors ======================== /
export { behaviors };
export { Personalize } from './personalize/personalize';
export { Initialize } from './initialize/initialize';

// Components ======================= /
import * as components from './components';
export { components };
