import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/interfaces/form.model';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  moviesInJSON: Observable<any> | null = this.apiService.getMoviesList();

  deleteMovie(id: string) {
    if (
      confirm('Press OK if you want to delete this movie from the favorites')
    ) {
      this.apiService.deleteMovie(id).subscribe(() => {
        this.moviesInJSON = this.apiService.getMoviesList();
      });
    }
  }

  moveToEdit(id: number) {
    this.router.navigateByUrl('edit-movie');
    this.apiService.currentMovieId = id;
  }

  constructor(private apiService: ApiService, private router: Router) {}
}
