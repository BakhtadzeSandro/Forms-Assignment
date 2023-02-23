import { FormArray, FormControl } from '@angular/forms';

export interface Form {
  name: FormControl<string | null>;
  //   countries: FormArray<FormControl>;
  countries: FormControl<string | null>;
  premierePlace: FormControl<string | null>;
  releaseDate: FormControl<any | null>;
  genre: FormControl<string[] | null>;
  //   genre: FormArray<FormControl>;
  type: FormControl<string | null>;
  numberOfSeries: FormControl<number | null>;
  numberOfMinutes: FormControl<number | null>;
  rating: FormControl<number | null>;
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
