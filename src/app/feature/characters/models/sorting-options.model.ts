export type SortType = 'asc' | 'desc' | undefined

export interface SortingOptionsModel {
  sortType: SortType
  sortBy: string
}
