import { Component, Input, forwardRef, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  FormGroup,
  NgControl
} from '@angular/forms';

@Component({
  selector: 'app-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.scss']
})
export class ToggleInputComponent implements ControlValueAccessor {

  @Input() label: string;
  @Input() ifTrue: string;
  @Input() ifFalse: string;
  
  formControl!: FormControl;

  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.formControl = new FormControl(null);
    this.formControl.valueChanges.subscribe(value => {
      this._onChange(value);
    })
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
