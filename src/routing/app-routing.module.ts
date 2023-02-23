import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from 'src/app/form/form.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
