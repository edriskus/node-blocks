import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AlgorithmsComponent),
  multi: true
};

@Component({
  selector: 'jobs-algorithms',
  templateUrl: './algorithms.component.html',
  styleUrls: ['./algorithms.component.scss'],
  providers: [DEFAULT_VALUE_ACCESSOR]
})
export class AlgorithmsComponent implements OnInit, ControlValueAccessor {

  @Input() algorithms: Array<any>;

  constructor() { }
  private onChange: Function;
  public selected: any;

  ngOnInit() {
  }

  public selectAlgorithm(type: any): void {
    this.selected = type.id;
    this.onChange(this.selected);
  }

  public isSelected(type: any): boolean {
    return type.id == this.selected;
  }

  public writeValue(val: any): void {
    this.selected = val;
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {

  }

}
