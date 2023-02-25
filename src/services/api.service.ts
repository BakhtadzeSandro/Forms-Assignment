import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Country, Form, Movie } from 'src/interfaces/form.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  currentMovieId: number | undefined;

  getCountry(countryName: string) {
    return this.http
      .get(environment.countryApiBase + countryName + '?fullText=true')
      .pipe(map((e: any) => e[0]));
  }

  getAllCountries(): Observable<string[]> {
    return this.http
      .get<any[]>(environment.allCountriesApiBase)
      .pipe(
        map((countries: Country[]) =>
          countries.map((country: Country) => country.name.common)
        )
      );
  }

  getMoviesList() {
    return this.http.get(environment.jsonServerBase + '/movieList');
  }

  getMovieNames() {
    return this.http.get(environment.jsonServerBase + '/movieList').pipe(
      map((movies: any) => {
        return movies.map((movie: Movie) => movie.name);
      })
    );
  }

  getCurrentMovie() {
    return this.http.get(environment.jsonServerBase + '/movieList').pipe(
      map((movies: any) => {
        return movies.filter(
          (movie: Movie) => movie.id == this.currentMovieId
        )[0];
      })
    );
  }

  saveMovie(movieInfo: any) {
    return this.http.post(environment.jsonServerBase + '/movieList', movieInfo);
  }

  deleteMovie(id: string) {
    return this.http.delete(environment.jsonServerBase + '/movieList/' + id);
  }

  editMovie(id: number, movie: Movie) {
    return this.http.patch(
      environment.jsonServerBase + '/movieList/' + id,
      movie
    );
  }
}
