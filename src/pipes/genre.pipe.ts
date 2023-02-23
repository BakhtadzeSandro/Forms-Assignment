import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Genre, Movie } from 'src/interfaces/form.model';
import { ApiService } from 'src/services/api.service';

@Pipe({
  name: 'genre',
})
export class GenrePipe implements PipeTransform {
  constructor(private apiService: ApiService) {}

  selectedGenre: Genre | undefined;

  genres = this.apiService
    .getMoviesList()
    .pipe(
      map((movieInfo: any) => {
        return movieInfo.genre;
      })
    )
    .subscribe((x) => (this.selectedGenre = x));

  transform(selectedGenre: Genre): any {
    for (const [key, value] of Object.entries(selectedGenre)) {
      if (value == true) {
        return key;
      }
    }
  }
}
