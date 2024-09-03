export interface MovieCardType {
  id: number;
  posterPath?: URL | string;
  movieTitle: string;
}

export interface MovieListType {
  title: string;
  moviesList: MovieDetailType[];
  urlQuery: string;
  isLoading?: boolean;
}

export interface SpokenLanguageType {
  english_name: string;
  iso_639_1?: string;
  name?: string;
}

export interface GenreType {
  id: string;
  name: string;
}
export interface MovieDetailType {
  id: number;
  backdrop_path?: URL;
  poster_path?: URL;
  title: string;
  tagline?: string;
  status?: string;
  release_date?: string;
  runtime?: number;
  spoken_languages?: SpokenLanguageType[];
  genres?: GenreType[];
}
