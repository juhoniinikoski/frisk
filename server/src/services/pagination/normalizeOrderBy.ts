import { isArray, isString, isObject } from 'lodash';
import { OrderBy, ItemObject } from './types';

const normalizeOrderByItem = (item: string | ItemObject) => {
  
  if (isString(item)) {
    return { column: item, order: 'asc' };
  }

  if (isObject(item) && isString(item.column)) {
    const { column, order = 'asc' } = item;

    return { column, order: order.toLowerCase() };
  }

  throw new Error('Order by item must be a string or an object');
};

const normalizeOrderBy = (orderBy: [OrderBy, string]) => {
  if (!orderBy) {
    return [];
  }

  if (isArray(orderBy)) {
    return orderBy.map(normalizeOrderByItem);
  }

  return [normalizeOrderByItem(orderBy)];
};

export default normalizeOrderBy;