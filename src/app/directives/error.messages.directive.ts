import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {NG_VALIDATORS, ValidationErrors} from "@angular/forms";
import errorMessages from '../json-files/errors.json';

@Directive({
  selector: '[errorMessages]',
  providers: [{provide: NG_VALIDATORS, useExisting: ErrorMessagesDirective, multi: true}],
})
export class ErrorMessagesDirective {
  @Input('errorMessages') set errorMessages(control: { errors: any, isValid: Boolean }) {
    this.errors = [];
    if (control.isValid)
      this.setErrorMessage(control.errors);

    if (!this.isViewCreated) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, this.errorMessagesContext);
      this.isViewCreated = true;
    }
  }

  private readonly errorMessagesContext = new ErrorMessagesContext();
  isViewCreated: boolean = false;
  errorObject: ValidationErrors = {};
  errors!: Error[];

  constructor(private templateRef: TemplateRef<ErrorMessagesContext>,
              private viewContainerRef: ViewContainerRef) {
  }

  setErrorMessage(errors: Error[]) {
    if (errors !== null) {
      this.errorObject = errors;
      this.errors = Object.keys(this.errorObject).map(error => {
        return {
          name: error,
          message: errorMessages[error] ? errorMessages[error] : 'error message is undefined , error title: ' + error  //.format(Object.values(returnedObject).join(','))
        }
      })
    }

    this.errorMessagesContext.errors = this.errors;
  }

  static ngTemplateContextGuard(directive: ErrorMessagesDirective, context: unknown)
    : context is ErrorMessagesContext {
    return true;
  }
}

class ErrorMessagesContext {
  errors: Error[] = []
}
