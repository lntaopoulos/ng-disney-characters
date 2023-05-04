import { createAction, props } from '@ngrx/store'
import { GetCharacterActionPropsModel, GetCharacterSuccessActionPropsModel } from '../models/character-state.model'
import { SortingOptionsModel } from './../models/sorting-options.model'

export const getCharacters = createAction('[Characters] Get characters', props<GetCharacterActionPropsModel>())
export const getCharactersSuccess = createAction('[Characters] Get characters success', props<GetCharacterSuccessActionPropsModel>())
export const setTvShowFilterValue = createAction('[Characters] Set TV show filter value', props<{ isTvShowFilterEnabled: boolean }>())
export const applySorting = createAction('[Characters] Apply sorting', props<SortingOptionsModel>())
export const resetState = createAction('[Characters] Reset state')
