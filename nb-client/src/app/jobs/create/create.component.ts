import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public typeForm: FormGroup;
  public infoForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildTypeForm();
    this.buildInfoForm();
  }

  private buildTypeForm(): void {
    this.typeForm = this.fb.group({

    })
  }

  private buildInfoForm(): void {
    this.infoForm = this.fb.group({

    })
  }


}
