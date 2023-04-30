import { createReducer, on } from '@ngrx/store'
import { CharacterStateModel } from '../models/character-state.model'
import * as CharacterActions from './character.actions'

export const initialState: CharacterStateModel = {
  list: [],
  activeCharacter: null,
  isLoaderVisible: false,
}

export const reducers = createReducer(
  initialState,
  on(CharacterActions.getCharacters, (state) => ({ ...state, isLoaderVisible: true })),
  on(CharacterActions.getCharactersSuccess, (state, action) => ({
    ...state,
    isLoaderVisible: false,
    list: action.list,
    totalItems: action.totalItems,
  }))
)
