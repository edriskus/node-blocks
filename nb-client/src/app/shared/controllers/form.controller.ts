import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export abstract class FormController {

  public form: FormGroup;
  public submitAttempted: boolean;

  constructor(
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  protected abstract buildForm(): void;

  public isValid(name: string): boolean {
    if(!this.form || !this.submitAttempted) return true;
    if(!this.form.get(name)) return false;
    return this.form.get(name).valid;
  }
}
