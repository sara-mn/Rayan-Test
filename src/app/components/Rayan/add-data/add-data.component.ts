import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RayanApiService} from "../../../services/apis/rayanApi/rayan.api.service";
import {ValidateFormService} from "../../../services/validate-form.service";
import { mergeMap, Observable} from "rxjs";
import {startWith} from 'rxjs/operators';
import { Rayan } from 'src/app/store/models/rayan';
import {KeyValue} from "../../../component-directives/grid/types";

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  result: any;
  id: string;
  errors: string[] = [];
  showErrors: boolean = false;
  rayanForm!: FormGroup;
  accountOptions: Observable<Account[]>;
  transfereeOptions: Observable<Transferee[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string },
              private rayanApi: RayanApiService,
              private formBuilder: FormBuilder,
              private validateFormService: ValidateFormService,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef,
              public dialogRef: MatDialogRef<AddDataComponent>) {

    this.id = this.data?.id;
    this.rayanForm = this.formBuilder.group({
      date: ['', [Validators.required,]],
      subject: ['', [Validators.required,]],
      description: ['', []],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      account: ['', []],
      transferee: ['', []],
    })
  }

  ngOnInit(): void {
    this.accountOptions = this.account.valueChanges.pipe(
      startWith(''),
      mergeMap(search => {
        return this.rayanApi.getAccounts<Account[]>(search)
      }),
    );

    this.transfereeOptions = this.account.valueChanges.pipe(
      startWith(''),
      mergeMap(search => this.rayanApi.getTransferees<Transferee[]>(search)),
    );
  }

  get date(): FormControl<any> {
    return this.rayanForm.get('date') as FormControl;
  }

  get subject() {
    return this.rayanForm.get('subject') as FormControl;
  }

  get description() {
    return this.rayanForm.get('description') as FormControl;
  }

  get firstName(): FormControl<any> {
    return this.rayanForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.rayanForm.get('lastName') as FormControl;
  }

  get account() {
    return this.rayanForm.get('account') as FormControl;
  }

  get transferee() {
    return this.rayanForm.get('transferee') as FormControl;
  }

  isFieldValid(fieldName: string) {
    const control = this.rayanForm.get(fieldName) as FormControl;
    return (control.invalid && (control.dirty || control.touched))
  }

  saveForm() {
    this.errors = [];
    if (this.rayanForm.invalid)
      return this.validateFormService.validateAllControls(this.rayanForm);

    if (this.errors.length > 0) {
      this.showErrors = true;
    } else {
      const dynamicParams = [];
      for (let item of Object.keys(dynamicFieldTransformer))
        dynamicParams.push({
          name:  dynamicFieldTransformer[item],
          value: this.rayanForm.value[item]
        })

      const cmd : Rayan = {
        date: this.date.value,
        subject: this.subject.value,
        description: this.description.value,
        dynamicParams
      }

      const obs$ = this.rayanApi.saveNewData(cmd);
      const saveSubscription = obs$.pipe()
        .subscribe({
          next: (id) => {
            console.log(`form number ${id} is saved`);
            this.close({id});
          },
          error: err => console.log(err),//this.logger.error(err.message),
          complete: () => {
            saveSubscription.unsubscribe();
            //this.logger.success()
          }
        })
    }
  }

  convertToArray(obj: any) {
    return Object.keys(obj).map(key => {
      return {key, value: obj[key]}
    })
  }

  close(result: any) {
    this.dialogRef.close(result);
  }
}

const dynamicFieldTransformer : KeyValue = {
  firstName: 'CUSR28005',
  lastName: 'CUSR28006',
  account: 'RUSR28007',
  transferee: 'RUSR28008',
}

interface Account {
  text: string,
  value: string
}

interface Transferee {
  text: string,
  value: string
}
