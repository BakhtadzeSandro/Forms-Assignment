import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { minimumPopulation } from 'src/app/form/constants';
import { Form, Genre, Movie } from 'src/interfaces/form.model';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent {
  public moviesFromJson: string[] | any = [];
  public selectedCountry = '';
  public editMovie = false;
  public newValue: Movie | undefined;

  public form: FormGroup<Form> | null = null;
  public genre: FormGroup<Genre> | null = null;
  public allCountries: Observable<string[]> | null = null;
  public populations: number[] | null = [];
  public currentMovieData: Movie | any;

  public currentMovieId = this.apiService.currentMovieId;

  // Validate date.
  minDate = new Date().toISOString().split('T')[0];

  // Validate population.
  public lessThanFifty: boolean | undefined;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllCountries();
    this.getMoviesInJSON();
    this.listenToCountryChanges();
    this.apiService.getCurrentMovie().subscribe((movie) => {
      this.currentMovieData = movie;
      this.form = this.buildForm();
    });
  }

  // Validate Movie names.
  private forbiddenNames(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.moviesFromJson.includes(control.value) &&
      control.value != this.currentMovieData.name
        ? { nameAlreadyInJSON: control.value }
        : null;
  }

  // Validate Checkboxes.
  public validateCheckboxes(control: AbstractControl): ValidationErrors | null {
    const isSelected =
      Object.values(control.value).filter((val) => val == true).length > 0;
    return isSelected ? null : { noneSelected: true };
  }

  // Get new values.
  private getUpdatedMovie(): Movie {
    const updatedMovie: Movie = {
      ...this.currentMovieData,
      name: this.form?.get('name')?.value,
      countries: this.form?.get('countries')?.value,
      premierePlace: this.form?.get('premierePlace')?.value,
      releaseDate: this.form?.get('releaseDate')?.value,
      type: this.form?.get('type')?.value,
      numberOfSeries: this.form?.get('numberOfSeries')?.value,
      numberOfMinutes: this.form?.get('numberOfMinutes')?.value,
      rating: this.form?.get('rating')?.value,
      genre: {
        Drama: this.form?.get('genre.Drama')?.value,
        psychologicalThriller: this.form?.get('genre.psychologicalThriller')
          ?.value,
        sciFi: this.form?.get('genre.sciFi')?.value,
      },
    };
    return updatedMovie;
  }

  // Edit data on the json server.
  public handleSubmission() {
    if (this.form?.valid) {
      const updatedMovie = this.getUpdatedMovie();
      this.apiService
        .editMovie(this.currentMovieData.id, updatedMovie)
        .subscribe(() => {
          this.router.navigateByUrl('/movie-list');
        });
    }
  }

  //Get current movie data.
  public getCurrentMovieData() {
    this.apiService
      .getCurrentMovie()
      .subscribe((x) => (this.currentMovieData = x));
  }

  public getAllCountries() {
    this.allCountries = this.apiService.getAllCountries();
  }

  public getMoviesInJSON() {
    this.apiService.getMovieNames().subscribe((movies: any) => {
      this.moviesFromJson = movies;
    });
  }

  // Countries.
  // public addCountryControl() {
  //   const countries = this.form?.controls.countries;
  //   countries?.push(this.fb.control('null'));
  // }

  public getCountry(country: string) {
    return this.apiService.getCountry(country).pipe(
      map((country: any) => {
        console.log(country.population);
        country.population > minimumPopulation
          ? this.form?.get('premierePlace')?.enable()
          : this.form?.get('premierePlace')?.disable();
        return country.population < minimumPopulation;
      })
    );
  }

  public listenToCountryChanges() {
    this.form?.controls['countries']?.valueChanges
      .pipe(
        switchMap((country: any) => {
          console.log(country);
          return this.getCountry(country);
        })
      )
      .subscribe((x) => (this.lessThanFifty = x));
  }

  // public listenToCountryChanges() {
  //   const countries = this.form?.controls['countries'];
  //   // Listen to changes in the form array
  //   countries?.valueChanges.subscribe((values) => {
  //     values.forEach((country: string | null) => {
  //       // Check if the country has changed
  //       if (country !== null && country !== '') {
  //         // Make the API call
  //         this.getCountry(country).subscribe((x) => (this.lessThanFifty = x));
  //       }
  //     });
  //   });
  // }

  private resetForm() {
    this.form = null;
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.fb.group<Form>({
      name: this.fb.control(this.currentMovieData?.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.forbiddenNames(),
      ]),
      countries: this.fb.control(this.currentMovieData?.countries, [
        Validators.required,
      ]),
      // countries: this.fb.array([
      //   this.fb.control(this.currentMovieData?.countries),
      // ]),
      premierePlace: this.fb.control(this.currentMovieData?.premierePlace),
      releaseDate: this.fb.control(new Date(), [Validators.required]),
      genre: this.fb.group(
        {
          Drama: this.fb.control(this.currentMovieData.genre.Drama),
          psychologicalThriller: this.fb.control(
            this.currentMovieData.genre.psychologicalThriller
          ),
          sciFi: this.fb.control(this.currentMovieData.genre.sciFi),
        },
        { validators: this.validateCheckboxes }
      ),
      type: this.fb.control(this.currentMovieData.type, [Validators.required]),
      numberOfSeries: this.fb.control(this.currentMovieData.numberOfSeries),
      numberOfMinutes: this.fb.control(this.currentMovieData.numberOfMinutes, [
        Validators.min(60),
        Validators.max(150),
      ]),
      rating: this.fb.control(this.currentMovieData.rating, [
        Validators.required,
      ]),
    });
  }
}
