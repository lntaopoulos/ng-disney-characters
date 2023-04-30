import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { CharacterResource } from './character.resource'
import { CharactersRoutingModule } from './characters-routing.module'
import { CharactersComponent } from './characters.component'
import { CharacterEffects } from './store/character.effects'
import { reducers } from './store/character.reducers'

const AngularMaterialModules = [
  MatPaginatorModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule,
]

@NgModule({
  declarations: [CharactersComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CharactersRoutingModule,
    ...AngularMaterialModules,
    StoreModule.forFeature('characters', reducers),
    EffectsModule.forFeature([CharacterEffects]),
  ],
  exports: [CharactersRoutingModule],
  providers: [CharacterResource],
})
export class CharactersModule {}
