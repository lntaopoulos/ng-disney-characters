import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { CharacterModel } from '../../models/character.model'

@Component({
  selector: 'app-character-card-modal',
  templateUrl: './character-card-modal.component.html',
  styleUrls: ['./character-card-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterCardModalComponent {
  @Input() character!: CharacterModel | null
  @Input() get isVisible() {
    return this._isVisible
  }

  @Output() isVisibleChange = new EventEmitter<boolean>()

  set isVisible(isVisible: boolean) {
    this._isVisible = isVisible
    this.isVisibleChange.emit(this.isVisible)
  }

  private _isVisible!: boolean

  handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.isVisible = false
    }
  }

  @HostListener('document:keydown.escape')
  handleEscButtonPress() {
    this.isVisible = false
  }
}
