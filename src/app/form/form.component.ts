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
import { map, switchMap, of, max } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  moviesFromJson: string[] | any = [];
  countriesToRender: string[] = [];
  selectedCountry = '';

  population = 0;

  form: FormGroup | null = null;

  // Validate population.
  minimumPopulation = 50000000;
  lessThanFifty: boolean | undefined;

  // Validate Movie names.
  private forbiddenNames(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nameAlreadyUsed = this.moviesFromJson.includes(control.value);
      return nameAlreadyUsed ? { nameAlreadyInJSON: control.value } : null;
    };
  }

  // Send data to json server.
  handleSubmission() {
    if (this.form?.valid) {
      const movieData = this.form.value;
      console.log(movieData);
      // this.apiService.saveMovie(movieData).subscribe();
    }
    // console.log(this.form.value);
  }

  genre: FormGroup | undefined;

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
      releaseDate: this.fb.control('', [Validators.required]),
      genre: this.fb.group<Genre>(
        {
          bla1: this.fb.control(false),
          bla2: this.fb.control(false),
          bla3: this.fb.control(false),
        },
        [Validators.required]
      ),
      type: this.fb.control('', [Validators.required]),
      numberOfSeries: this.fb.control(null),
      numberOfMinutes: this.fb.control(null, [
        Validators.min(60),
        Validators.max(150),
      ]),
      rating: this.fb.control(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.buildForm();
    // this.apiService.getAllCountries().subscribe((countryNames: string[]) => {
    //   this.countriesToRender = countryNames;
    // });
    // this.apiService.getMovieNames().subscribe((x) => {
    //   this.moviesFromJson = x;
    // });
    // this.form?.controls['countries'].valueChanges.subscribe(
    //   (country: string) => {
    //     this.selectedCountry = country;
    //     console.log(this.selectedCountry);
    //     return this.apiService
    //       .getCountry(country)
    //       .subscribe((countryInfo: any) => {
    //         this.population = countryInfo.population;
    //         console.log(this.population);
    //         if (this.minimumPopulation > this.population) {
    //           this.lessThanFifty = true;
    //           this.form?.get('premierePlace')?.disable();
    //         } else {
    //           this.lessThanFifty = false;
    //           this.form?.get('premierePlace')?.enable();
    //         }
    //       });
    //   }
    // );
  }
}
