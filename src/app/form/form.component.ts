import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Form, Genre, Movie } from 'src/interfaces/form.model';
import { map, switchMap, of, max, observable, Observable, tap } from 'rxjs';
import { minimumPopulation } from './constants';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public moviesFromJson: string[] | any = [];
  public selectedCountry = '';

  public form: FormGroup<Form> | null = null;
  public genre: FormGroup<Genre> | null = null;
  public allCountries: Observable<string[]> | null = null;

  // Validate date.
  minDate = new Date().toISOString().split('T')[0];

  // Validate population.
  public lessThanFifty: boolean | undefined;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.buildForm();
    this.getAllCountries();
    this.getMoviesInJSON();
    this.listenToCountryChanges();
  }

  // Validate Movie names.
  private forbiddenNames(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      this.moviesFromJson.includes(control.value)
        ? { nameAlreadyInJSON: control.value }
        : null;
  }

  // Send data to json server.
  public handleSubmission() {
    if (this.form?.valid) {
      this.apiService.saveMovie(this.form?.value).subscribe(console.log);
      this.resetForm();
    }
  }

  public getAllCountries() {
    this.allCountries = this.apiService.getAllCountries();
  }

  public getMoviesInJSON() {
    this.apiService.getMovieNames().subscribe((movies) => {
      this.moviesFromJson = movies;
    });
  }

  public getCountry(country: string) {
    return this.apiService.getCountry(country).pipe(
      map((country) => {
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
          return this.getCountry(country);
        })
      )
      .subscribe((x) => (this.lessThanFifty = x));
  }

  private resetForm() {
    this.form = null;
    this.form = this.buildForm();
  }

  private buildForm() {
    return this.fb.group<Form>({
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.forbiddenNames(),
      ]),
      countries: this.fb.control(null, [Validators.required]),
      premierePlace: this.fb.control(''),
      releaseDate: this.fb.control(new Date(), [Validators.required]),
      genre: this.fb.group({
        Drama: this.fb.control(false),
        psychologicalThriller: this.fb.control(false),
        sciFi: this.fb.control(false),
      }),
      type: this.fb.control('', [Validators.required]),
      numberOfSeries: this.fb.control(null),
      numberOfMinutes: this.fb.control(null, [
        Validators.min(60),
        Validators.max(150),
      ]),
      rating: this.fb.control(null, [Validators.required]),
    });
  }
}
