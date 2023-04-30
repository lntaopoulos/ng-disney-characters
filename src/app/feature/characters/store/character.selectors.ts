import { createSelector } from '@ngrx/store'
import { AppStateModel } from '../../app-state.model'

export const selectFeature = (state: AppStateModel) => state.characters

export const characterList = createSelector(selectFeature, (state) => state.list)
export const isLoaderVisible = createSelector(selectFeature, (state) => state.isLoaderVisible)
export const totalItems = createSelector(selectFeature, (state) => state.totalItems)
