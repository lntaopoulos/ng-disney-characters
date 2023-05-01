import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { PageEvent } from '@angular/material/paginator'
import { select, Store } from '@ngrx/store'
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs'
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/utilities/resource-utilities'
import { AppStateModel } from './../app-state.model'
import { GetCharacterActionPropsModel } from './models/character-state.model'
import { CharacterModel } from './models/character.model'
import * as CharacterActions from './store/character.actions'
import { characterList, getCharacterById, isLoaderVisible, totalItems } from './store/character.selectors'

const INPUT_DEBOUNCE_TIME = 600

@Component({
  selector: 'characters-component',
  styleUrls: ['./characters.component.scss'],
  templateUrl: './characters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersComponent implements OnInit, OnDestroy {
  characters$: Observable<CharacterModel[]>
  activeCharacter$!: Observable<CharacterModel>
  isLoaderVisible$: Observable<boolean>
  totalItems$: Observable<number | null | undefined>

  searchTerm = new FormControl('')
  page = 1
  pageSize = DEFAULT_PAGE_SIZE
  pageSizeOptions = [10, 20, 50, 100, 200, 500]
  isCharacterModalVisible!: boolean

  private destroy$ = new Subject<void>()

  constructor(private store: Store<AppStateModel>) {
    this.isLoaderVisible$ = this.store.pipe(select(isLoaderVisible))
    this.characters$ = this.store.pipe(select(characterList))
    this.totalItems$ = this.store.pipe(select(totalItems))
  }

  ngOnInit(): void {
    this.getCharacters({ page: this.page, pageSize: this.pageSize })
    this.handleSearchTermChanges()
  }

  ngOnDestroy(): void {
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

    this.getCharacters({ searchTerm: this.searchTerm.value, page: this.page, pageSize: this.pageSize })
  }

  openCharacterModal(id: number) {
    this.activeCharacter$ = this.store.pipe(select(getCharacterById(id))) as Observable<CharacterModel>
    this.isCharacterModalVisible = true
  }

  private getCharacters({ searchTerm, page, pageSize }: GetCharacterActionPropsModel) {
    this.store.dispatch(CharacterActions.getCharacters({ searchTerm, page, pageSize }))
  }

  private handleSearchTermChanges() {
    this.searchTerm.valueChanges.pipe(debounceTime(INPUT_DEBOUNCE_TIME), takeUntil(this.destroy$)).subscribe((value) => {
      this.getCharacters({ searchTerm: value, page: this.page, pageSize: this.pageSize })
    })
  }
}
