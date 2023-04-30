export interface CharacterAPIResponseModel {
  data: CharacterModel[]
  info: InfoModel
}

export interface CharacterModel {
  _id: number
  films: string[]
  shortFilms: string[]
  tvShows: string[]
  videoGames: string[]
  parkAttractions: string[]
  allies: any[]
  enemies: any[]
  sourceUrl: string
  name: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  url: string
}

export interface InfoModel {
  count: number
  totalPages: number
  previousPage: null
  nextPage: string
}
