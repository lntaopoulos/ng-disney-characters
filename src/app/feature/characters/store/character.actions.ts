import { createAction, props } from '@ngrx/store'
import { GetCharacterActionPropsModel, GetCharacterSuccessActionPropsModel } from '../models/character-state.model'

export const getCharacters = createAction('[Characters] Get characters', props<GetCharacterActionPropsModel>())
export const getCharactersSuccess = createAction('[Characters] Get characters success', props<GetCharacterSuccessActionPropsModel>())
