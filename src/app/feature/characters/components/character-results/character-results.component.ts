import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { ResultStatusEnum } from '../../models/results-status.enum'
import { SortingOptionsModel, SortType } from '../../models/sorting-options.model'
import { CharacterModel } from './../../models/character.model'

@Component({
  selector: 'app-character-results',
  templateUrl: './character-results.component.html',
  styleUrls: ['./character-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterResultsComponent {
  @Input() sortType: SortType | null
  @Input() characters!: CharacterModel[] | null
  @Input() isLoaderVisible!: boolean | null
  @Input() totalItems!: number | null | undefined
  @Input() resultStatus!: ResultStatusEnum | null
  @Input() pageSize!: number
  @Input() pageIndex!: number
  @Input() pageSizeOptions!: number[]

  @Output() characterClicked = new EventEmitter<number>()
  @Output() sortColumnClicked = new EventEmitter<SortingOptionsModel>()
  @Output() paginationChanged = new EventEmitter<PageEvent>()

  sortingTypeToApply: SortType

  readonly resultStatusEnum = ResultStatusEnum

  itemTrackBy(index: number, item: CharacterModel): number {
    return item._id || index
  }

  sortColumn(sortBy: string, sortType: SortType) {
    this.sortingTypeToApply = sortType === 'asc' ? 'desc' : 'asc'
    this.sortColumnClicked.emit({ sortBy, sortType: this.sortingTypeToApply })
  }
}
