import { Component, Input, forwardRef, Optional, Self, Inject, Injector } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
  NG_VALIDATORS,
  Validator,
  NG_ASYNC_VALIDATORS
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => InputComponent),
    //   multi: true,
    // },
  ],
})
export class InputComponent implements ControlValueAccessor {
  //@Input() parentForm: FormGroup;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() mask: string;
  @Input() password: boolean = false;
  @Input() textarea: boolean = false;
  //public formControl: FormControl = new FormControl();

  formControl!: FormControl;

  touched = false;

  constructor(
    @Self() @Optional() public ngControl: NgControl) {

    // const validators: (Function | Validator)[] = injector.get(NG_VALIDATORS);

    // validators.forEach(validator => {
    //   console.log(validator);
    // })

    this.ngControl.valueAccessor = this;
    this.formControl = new FormControl(null);
    this.formControl.valueChanges.subscribe(value => {
      this._onChange(value);
    })
  }

  public get isRequired(): boolean {
    return Boolean(this.ngControl?.control?.hasValidator(Validators.required))  
  }

  public get getLabel(): string {
    if (this.isRequired) return this.label + '*'
    return this.label
  }

  public get invalid(): boolean {
    return this.ngControl?.invalid || false;
  }

  public get showError(): boolean {
    if (!this.ngControl) {
      return false;
    }
    const { dirty, touched } = this.ngControl;

    return this.invalid ? (dirty || touched) || false : false;

  }

  writeValue(value: any) {

    if (value === null) {
      this.formControl.reset();
    }
    if (value)
      this.formControl.patchValue(value);
  }

  private _onChange = (value: null | undefined) => undefined;

  registerOnChange(fn: any): void {
    //this.formControl.valueChanges.subscribe((val) => fn(val));
    this._onChange = fn;
    
  }

  registerOnTouched(fn: any): void {
    this.formControl.valueChanges.subscribe((val) => fn(val));
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
