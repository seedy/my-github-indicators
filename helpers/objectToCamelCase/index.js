import camelCase from 'helpers/camelCase';
import mapKeys from 'helpers/mapKeys';

export default (obj) => mapKeys(obj, (v, k) => camelCase(k));
