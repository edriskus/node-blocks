import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlgorithmsService } from '../algorithms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormController } from '../../shared/controllers/form.controller';
import { NotifyService } from '../../core/notify.service';
import { TranslateService } from '@ngx-translate/core';
import { CodeEditComponent } from '../../shared/code-edit/code-edit.component';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends FormController implements OnInit {

  public alg: any;
  public loading: boolean = false;
  private translations: any = {};

  constructor(
    private algorithmsService: AlgorithmsService,
    private route: ActivatedRoute,
    private notifyService: NotifyService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog,
    private fileSaverService: FileSaverService,
    protected fb: FormBuilder
  ) {
    super(fb);
    translate.get([
      'help.builder_code',
      'help.client_code',
      'common.save_success'
    ]).subscribe(trans => this.translations = trans);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getAlgorithm();
  }

  private getAlgorithm(): void {
    this.route.params.pipe(
      mergeMap(
        params => this.algorithmsService.getAlgorithm(params['id'])
      )
    ).subscribe(alg => {
      this.alg = alg;
      this.form.patchValue(alg);
    })
  }

  public buildForm(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      fa: [null, [Validators.required]],
      gpu: [null, [Validators.required]],
      description: [null, []],
      inputs: [null, []],
      results: [null, []],
      builder_code: [null, [Validators.required]],
      client_code: [null, [Validators.required]],
      resolve_code: [null, [Validators.required]]
    })
  }

  public save(alg?): void {
    this.submitAttempted = true;
    if(!this.form.valid) return;
    this.loading = true;
    this.algorithmsService.updateAlgorithm({
      ...this.alg,
      ...this.form.value
    }).subscribe(
      alg => {
        this.loading = false;
        this.notifyService.notify(this.translations['common.save_success']);
        this.form.patchValue(alg);
        this.alg = alg;
      },
      err => this.loading = false
    )
  }

  public remove(alg?): void {
    this.algorithmsService.removeAlgorithm(this.alg.id).subscribe(
      res => this.router.navigate([`/algorithms`])
    )
  }

  public openFormControl(name: string): void {
    this.dialog.open(CodeEditComponent, {
      panelClass: 'code-edit-panel',
      data: {
        form: this.form,
        control: name,
        codeHelp: this.getCodeHelp(name)
      }
    })
  }

  private getCodeHelp(name: string): void {
    return this.translations[`help.${name}`];
  }

  public backupAlgorithm(): void {
    let title = this.alg.title.toLowerCase().replace(' ', '_');
    this.fileSaverService.save(new Blob([JSON.stringify(this.alg)], {
      type: 'text/plain'
    }), `nb-alg-${title}-${Date.now()}.json`);
  }

  public uploadAlgorithm(ev): void {
    if(ev.target.files && ev.target.files[0]) {
      let reader = new FileReader();
      let cmpt = this;
      reader.onload = function (e : any) {
        try {
          let data = JSON.parse(e.target.result);
          cmpt.alg = {
            ...data,
            id: cmpt.alg.id
          };
          cmpt.form.patchValue(data);
        } catch(e) {
          console.log(e);
        }
      }
      reader.readAsText(ev.target.files[0]);
    }
  }

}
