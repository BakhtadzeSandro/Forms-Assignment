import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface Form {
  name: FormControl<string | null>;
  //   countries: FormArray<FormControl>;
  countries: FormControl<string | null>;
  premierePlace: FormControl<string | null>;
  releaseDate: FormControl<any | null>;
  // genre: FormControl<string[] | null>;
  genre: Genre;
  // genre: FormArray<FormControl<string | null>>;
  type: FormControl<string | null>;
  numberOfSeries: FormControl<number | null>;
  numberOfMinutes: FormControl<number | null>;
  rating: FormControl<number | null>;
}

export interface Genre {
  bla1: boolean;
  bla2: boolean;
  bla3: boolean;
}

export interface Movie {
  name: string;
  countries: string;
  premierePlace: string;
  releaseDate: string;
  genre: boolean;
  type: string;
  numberOfSeries: number;
  numberOfMinutes: number;
  rating: string;
  id: number;
}

export interface Country {
  name: {
    common: string;
  };
}
