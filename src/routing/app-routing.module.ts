import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from 'src/app/form/form.component';
import { EditMovieComponent } from 'src/app/movie-list/edit-movie/edit-movie.component';
import { MovieListComponent } from 'src/app/movie-list/movie-list.component';

const routes: Routes = [
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'movie-list',
    component: MovieListComponent,
  },
  {
    path: 'edit-movie',
    component: EditMovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
