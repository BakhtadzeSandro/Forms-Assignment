import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AppRoutingModule } from 'src/routing/app-routing.module';
import { GenrePipe } from 'src/pipes/genre.pipe';
import { EditMovieComponent } from './movie-list/edit-movie/edit-movie.component';

@NgModule({
  declarations: [AppComponent, FormComponent, MovieListComponent, GenrePipe, EditMovieComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
