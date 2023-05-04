import { createReducer, on } from '@ngrx/store'
import { CharacterStateModel } from '../models/character-state.model'
import { CharacterModel } from '../models/character.model'
import { SortingOptionsModel } from './../models/sorting-options.model'
import * as CharacterActions from './character.actions'

export const initialState: CharacterStateModel = {
  list: [],
  isLoaderVisible: false,
  isTvShowFilterEnabled: false,
  sortingOptions: null,
  totalItems: null,
}

export const reducers = createReducer(
  initialState,
  on(CharacterActions.getCharacters, (state) => ({ ...state, isLoaderVisible: true })),
  on(CharacterActions.getCharactersSuccess, (state, action) => ({
    ...state,
    isLoaderVisible: false,
    list: getSortedAndFilteredList(action.list, state.isTvShowFilterEnabled, state.sortingOptions),
    totalItems: action.totalItems,
  })),
  on(CharacterActions.setTvShowFilterValue, (state, action) => ({
    ...state,
    isTvShowFilterEnabled: action.isTvShowFilterEnabled,
    list: getSortedAndFilteredList(state.list, action.isTvShowFilterEnabled, state.sortingOptions),
  })),
  on(CharacterActions.applySorting, (state, action) => {
    const sortingOptions = {
      sortBy: action.sortBy,
      sortType: action.sortType,
    }

    return {
      ...state,
      sortingOptions,
      list: getSortedAndFilteredList(state.list, state.isTvShowFilterEnabled, sortingOptions),
    }
  }),
  on(CharacterActions.resetState, (state) => ({
    ...state,
    ...initialState,
  }))
)

function getSortedAndFilteredList(
  list: CharacterModel[],
  hasTvShowFilter: boolean,
  sortingOptions: SortingOptionsModel | null
): CharacterModel[] {
  let updatedList = list

  if (hasTvShowFilter) {
    updatedList = list.filter((item) => !!item.tvShows?.length)
  }

  if (sortingOptions) {
    const { sortBy, sortType } = sortingOptions
    const sortingBy = sortBy as keyof CharacterModel
    const listToSort = [...updatedList]

    const sortFunction = (a: CharacterModel, b: CharacterModel) => {
      const nameA = a[sortingBy] as string
      const nameB = b[sortingBy] as string

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      return 0
    }

    if (sortType === 'asc') {
      updatedList = listToSort.sort(sortFunction)
    } else {
      updatedList = listToSort.sort(sortFunction).reverse()
    }
  }

  return updatedList
}
