import DataLoader from 'dataloader'
import { camelCase, isArray, find, zipObject } from 'lodash'
import Location from '../../models/Location'
import Sport from '../../models/Sport';
import User from '../../models/User'

const jsonCacheKeyFn = (value) => JSON.stringify(value);

const createModelLoader = (Model) =>
  new DataLoader(

    async (ids) => {

      console.log(ids)

      const idColumns = isArray(Model.idColumn)
        ? Model.idColumn
        : [Model.idColumn]

      const camelCasedIdColumns = idColumns.map((id) => camelCase(id));

      const results = await Model.query().findByIds(ids)

      return ids.map(
        (id) =>
          find(
            results,
            zipObject(camelCasedIdColumns, isArray(id) ? id : [id]),
          ) || null,
      );
    },
    {
      cacheKeyFn: jsonCacheKeyFn,
    },
  )

export const createDataLoaders = () => {
  return {
    userLoader: createModelLoader(User),
    locationLoader: createModelLoader(Location),
    sportLoader: createModelLoader(Sport)
  }
}

export default createDataLoaders