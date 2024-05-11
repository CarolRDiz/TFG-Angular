import { Component, Input, forwardRef, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  FormGroup,
  NgControl
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
  @Input() required: boolean;
  @Input() placeholder: string;
  @Input() mask: string;
  @Input() password: boolean = false;
  @Input() textarea: boolean = false;
  //public formControl: FormControl = new FormControl();

  formControl!: FormControl;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.formControl = new FormControl(null);
    this.formControl.valueChanges.subscribe(value => {
      this._onChange(value);
    })
    // console.log(this.ngControl);
    // console.log(this.formControl);
  }

  public get getLabel(): string {
    if (this.required) return this.label+'*'
    return this.label
  }

  public get invalid(): boolean {
    return this.ngControl?.invalid || false;
  }

  public get showError(): boolean {
    if(!this.ngControl) {
      return false;
    }
    const { dirty, touched } = this.ngControl;

    return this.invalid ? ( dirty || touched ) || false : false;
  }

  writeValue(value: any) {
    if (value === null) {
      this.formControl.reset();
  }
    if(value)
    this.formControl.patchValue(value);
  }

  private _onChange = ( value: null | undefined ) => undefined;

  registerOnChange(fn: any): void{
    //this.formControl.valueChanges.subscribe((val) => fn(val));
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.formControl.valueChanges.subscribe((val) => fn(val));
  }
  
  setDisabledState?(isDisabled: boolean): void {
  }
}
