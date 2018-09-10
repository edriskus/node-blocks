import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FormController } from '../../shared/controllers/form.controller';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends FormController implements OnInit {

  public typeForm: FormGroup;
  public selectedTypeName: string;
  public selectedTypeInputs: Array<any>;
  public jobTitle: string;
  public editable: boolean = true;
  public loading: boolean;

  public algorithms: Array<any>;
  public job: any;
  public jobInputs: any = {};

  constructor(
    protected fb: FormBuilder,
    private router: Router,
    private jobsService: JobsService
  ) {
    super(fb);
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildTypeForm();
    this.getAlgorithms();
  }

  private getAlgorithms(): void {
    this.jobsService.getAlgorithms().subscribe(
      res => {
        this.algorithms = res;
      }
    )
  }

  private buildTypeForm(): void {
    this.typeForm = this.fb.group({
      type: ['', Validators.required]
    })
    this.typeForm.valueChanges.subscribe(
      changes => {
        let f = this.algorithms.find(a => a.id == changes['type']);
        if(f) {
          this.selectedTypeName = f.title;
           let inputs = JSON.parse(f.inputs);
           this.jobInputs = {};
           this.selectedTypeInputs = Object.keys(inputs).map(
             key => {
               return {
                 key,
                 ...inputs[key]
               }
             }
           )
        }
      }
    )
  }

  public buildForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    })
    this.form.valueChanges.subscribe(
      changes => {
        this.jobTitle = changes['title'];
      }
    )
  }

  public submit(stepper: any): void {
    this.submitAttempted = true;
    if(!(this.typeForm.valid && this.form.valid)) return;
    this.loading = true;

    let job = {
      ...this.form.value,
      inputs: this.jobInputs
    };
    job.type = this.typeForm.value['type'];

    this.jobsService.createJob(job).subscribe(
      res => {
        this.job = res;
        this.loading = false;
        this.editable = false;
        stepper.next();
      },
      err => {
        this.loading = false;
      }
    )
  }

  public goToJob(): void {
    if(!this.job) return;
    this.router.navigate([`/jobs/${this.job.id}`]);
  }

  public inputType(input: any): string {
    if(input && input.type == 'number') return 'number';
    return 'text';
  }

}
