export interface Pagination {
  size: number;
  page: number;
}

export interface PageResponse<T> {
  /**
   * 列表数据
   */
  list: T[];
  pagination: {
    /**
     * 分页条数
     */
    pageSize: number;
    /**
     * 总条数
     */
    total: number;
    /**
     * 当前页
     */
    current: number;
  };
}
