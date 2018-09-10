import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-code-edit',
  templateUrl: './code-edit.component.html',
  styleUrls: ['./code-edit.component.scss']
})
export class CodeEditComponent implements OnInit {

  public codeHelpShown: boolean = false;
  public options: any = {
    lineNumbers: true,
    theme: 'material',
    mode: 'javascript',
    tabSize: 2,
    lineWrapping: true,
    scrollbarStyle: 'null'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  public toggleCodeHelp(): void {
    this.codeHelpShown = !this.codeHelpShown;
  }

}
