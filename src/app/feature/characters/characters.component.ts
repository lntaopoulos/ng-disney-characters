import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core'
import { CharacterResource } from './character.resource'

@Component({
  selector: 'characters-component',
  styleUrls: ['./characters.component.scss'],
  templateUrl: './characters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent {
  characters: any

  constructor(private characterResource: CharacterResource, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.characterResource.getCharacters().subscribe((value) => {
      this.characters = value.data
      this.changeDetectorRef.detectChanges()
    })
  }
}
