import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { PageEvent } from '@angular/material/paginator'
import { select, Store } from '@ngrx/store'
import { debounceTime, map, Observable, Subject, takeUntil, tap } from 'rxjs'
import { AppStateModel } from './../app-state.model'
import { GetCharacterActionPropsModel } from './models/character-state.model'
import { CharacterModel } from './models/character.model'
import { ResultStatusEnum } from './models/results-status.enum'
import { SortingOptionsModel, SortType } from './models/sorting-options.model'
import * as CharacterActions from './store/character.actions'
import { characterList, getCharacterById, resultStatus, sortType, totalItems } from './store/character.selectors'

const INPUT_DEBOUNCE_TIME = 600
const DEFAULT_PAGE_SIZE = 50
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 200, 500]

@Component({
  selector: 'characters-component',
  styleUrls: ['./characters.component.scss'],
  templateUrl: './characters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters$: Observable<CharacterModel[]>
  activeCharacter$!: Observable<CharacterModel>
  resultStatus$: Observable<ResultStatusEnum | null>
  totalItems$: Observable<number | null | undefined>
  sortType$: Observable<SortType | null | undefined>
  chartData$: Observable<{ name: string; y: number; films: string }[] | null>

  page = 1
  pageIndex!: number
  pageSize = DEFAULT_PAGE_SIZE
  pageSizeOptions = PAGE_SIZE_OPTIONS
  isCharacterModalVisible!: boolean
  form = this.fb.group({ searchTerm: [''], tvShowFilter: [false], isPieChartVisible: [true] })

  readonly resultStatusEnum = ResultStatusEnum

  get searchTermControl(): FormControl {
    return this.form?.get('searchTerm') as FormControl
  }

  get tvShowFilterControl(): FormControl {
    return this.form?.get('tvShowFilter') as FormControl
  }

  get isPieChartVisibleControl(): FormControl {
    return this.form?.get('isPieChartVisible') as FormControl
  }

  private destroy$ = new Subject<void>()

  constructor(private store: Store<AppStateModel>, private fb: FormBuilder) {
    this.resultStatus$ = this.store.pipe(select(resultStatus))
    this.characters$ = this.store.pipe(select(characterList))
    this.totalItems$ = this.store.pipe(select(totalItems))
    this.sortType$ = this.store.pipe(select(sortType))
    this.chartData$ = this.store.pipe(
      select(characterList),
      map((characters) => characters.map(({ name, films }) => ({ name, y: films.length, films: films.join(', ') })))
    )
  }

  ngOnInit(): void {
    this.getCharacters({ page: this.page, pageSize: this.pageSize })
    this.handleSearchTermChanges()
    this.handleTvShowFilterChanges()
  }

  ngOnDestroy(): void {
    this.store.dispatch(CharacterActions.resetState())

    this.destroy$.next()
    this.destroy$.complete()
  }

  itemTrackBy(index: number, item: CharacterModel): number {
    return item._id || index
  }

  handlePaginationChanges(pageEvent: PageEvent) {
    const { pageIndex, pageSize } = pageEvent
    this.page = pageIndex ? pageIndex + 1 : 1
    this.pageSize = pageSize

    this.getCharacters({ searchTerm: this.searchTermControl.value, page: this.page, pageSize: this.pageSize })
  }

  openCharacterModal(id: number) {
    this.activeCharacter$ = this.store.pipe(select(getCharacterById(id))) as Observable<CharacterModel>
    this.isCharacterModalVisible = true
  }

  applySorting(sortingOptions: SortingOptionsModel) {
    this.store.dispatch(CharacterActions.applySorting(sortingOptions))
  }

  private getCharacters({ searchTerm, page, pageSize }: GetCharacterActionPropsModel) {
    this.store.dispatch(CharacterActions.getCharacters({ searchTerm, page, pageSize }))
  }

  private handleSearchTermChanges() {
    this.searchTermControl.valueChanges.pipe(debounceTime(INPUT_DEBOUNCE_TIME), takeUntil(this.destroy$)).subscribe((value) => {
      this.page = 1
      this.pageIndex = this.page - 1
      this.getCharacters({ searchTerm: value, page: this.page, pageSize: this.pageSize })
    })
  }

  private handleTvShowFilterChanges() {
    this.tvShowFilterControl.valueChanges
      .pipe(
        tap((isEnabled) => {
          if (!isEnabled) {
            this.getCharacters({ searchTerm: this.searchTermControl.value, page: this.page, pageSize: this.pageSize })
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.store.dispatch(CharacterActions.setTvShowFilterValue({ isTvShowFilterEnabled: value }))
      })
  }
}
