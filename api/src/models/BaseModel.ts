import { Model, Page, QueryBuilder } from 'objection'
import cursorPaginate from '../services/pagination/cursorPaginate'

class MyQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {
  // These are necessary. You can just copy-paste them and change the
  // name of the query builder class.
  ArrayQueryBuilderType!: MyQueryBuilder<M, M[]>;
  SingleQueryBuilderType!: MyQueryBuilder<M, M>;
  MaybeSingleQueryBuilderType!: MyQueryBuilder<M, M | undefined>;
  NumberQueryBuilderType!: MyQueryBuilder<M, number>;
  PageQueryBuilderType!: MyQueryBuilder<M, Page<M>>;

  cursorPaginate(options: any) {
    return cursorPaginate(this, options)
  }
}

class BaseModel extends Model {

  QueryBuilderType!: MyQueryBuilder<this>;
  static QueryBuilder = MyQueryBuilder;

  static useLimitInFirst = true

  $beforeInsert(this: any) {
    if (!this.createdAt) {
      this.createdAt = new Date()
    }
  }

  $beforeUpdate(this: any) {
    if (!this.updatedAt) {
      this.updatedAt = new Date()
    }
  }

}

export default BaseModel