import { createSelector } from '@ngrx/store'
import { AppStateModel } from '../../app-state.model'
import { CharacterModel } from '../models/character.model'

export const selectFeature = (state: AppStateModel) => state.characters

export const resultStatus = createSelector(selectFeature, (state) => state.resultStatus)
export const totalItems = createSelector(selectFeature, (state) => state.totalItems)
export const sortType = createSelector(selectFeature, (state) => state.sortingOptions?.sortType)
export const characterList = createSelector(selectFeature, (state) => state.list)
export const getCharacterById = (id: number) =>
  createSelector(characterList, (characters: CharacterModel[]) => characters.find((character) => character._id === id))
