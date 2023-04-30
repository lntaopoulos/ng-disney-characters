import { CharacterModel } from './character.model'

export interface CharacterStateModel {
  isLoaderVisible: boolean
  list: CharacterModel[]
  activeCharacter?: CharacterModel | null
  totalItems?: number
  searchTerm?: string | null
  currentPage?: number | null
  pageSize?: number | null
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
