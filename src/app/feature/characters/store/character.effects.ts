import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs/operators'
import { CharacterResource } from './../character.resource'
import { CharacterAPIResponseModel } from './../models/character.model'
import * as CharacterActions from './character.actions'

@Injectable()
export class CharacterEffects {
  getCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.getCharacters),
      switchMap((action) =>
        this.characterResource.get({ name: action.searchTerm, page: action.page, pageSize: action.pageSize }).pipe(
          map((response: CharacterAPIResponseModel) =>
            CharacterActions.getCharactersSuccess({
              list: response.data,
              totalItems: 7360, // Hardcoded value since API does not provide it
            })
          )
        )
      )
    )
  )

  constructor(private actions$: Actions, private characterResource: CharacterResource) {}
}
