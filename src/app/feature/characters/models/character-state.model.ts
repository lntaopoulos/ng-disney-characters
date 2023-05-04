import { CharacterModel } from './character.model'
import { SortingOptionsModel } from './sorting-options.model'

export interface CharacterStateModel {
  isLoaderVisible: boolean
  list: CharacterModel[]
  activeCharacter?: CharacterModel | null
  totalItems?: number
  searchTerm?: string | null
  pageSize?: number | null
  isTvShowFilterEnabled: boolean
  sortingOptions: SortingOptionsModel | null
}

export interface GetCharacterActionPropsModel {
  searchTerm?: string | null
  page: number
  pageSize: number
}

export interface GetCharacterSuccessActionPropsModel {
  list: CharacterModel[]
  totalItems: number
}
