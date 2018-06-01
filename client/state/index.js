import { merge } from './redux-automap';
import list from './list';
import cats from './cats';

export default merge([ list, cats ]);
