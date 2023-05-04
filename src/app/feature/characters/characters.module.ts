import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTableModule } from '@angular/material/table'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { HighchartsChartModule } from 'highcharts-angular'
import { CharacterResource } from './character.resource'
import { CharactersRoutingModule } from './characters-routing.module'
import { CharactersComponent } from './characters.component'
import { CharacterCardModalComponent } from './components/character-card-modal/character-card-modal.component'
import { CharacterPieChartComponent } from './components/character-pie-chart/character-pie-chart.component'
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
  MatSlideToggleModule,
  MatRadioModule,
]

@NgModule({
  declarations: [CharactersComponent, CharacterCardModalComponent, CharacterPieChartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CharactersRoutingModule,
    ...AngularMaterialModules,
    HighchartsChartModule,
    StoreModule.forFeature('characters', reducers),
    EffectsModule.forFeature([CharacterEffects]),
  ],
  exports: [CharactersRoutingModule],
  providers: [CharacterResource],
})
export class CharactersModule {}
