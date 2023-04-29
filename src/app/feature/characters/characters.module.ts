import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { CharacterResource } from './character.resource'
import { CharactersRoutingModule } from './characters-routing.module'
import { CharactersComponent } from './characters.component'

const AngularMaterialModules = [MatPaginatorModule, MatTableModule, MatFormFieldModule, MatInputModule]

@NgModule({
  declarations: [CharactersComponent],
  imports: [CommonModule, ReactiveFormsModule, CharactersRoutingModule, ...AngularMaterialModules],
  exports: [CharactersRoutingModule],
  providers: [CharacterResource],
})
export class CharactersModule {}
