import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
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
import { CharacterCardModalComponent } from './components/character-card-modal/character-card-modal.component'
import { CharacterEffects } from './store/character.effects'
import { reducers } from './store/character.reducers'

const AngularMaterialModules = [
  MatPaginatorModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
]

@NgModule({
  declarations: [CharactersComponent, CharacterCardModalComponent],
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
