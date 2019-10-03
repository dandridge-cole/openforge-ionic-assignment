import { Directive, ElementRef } from '@angular/core';

/**
 * Generated class for the RedTextDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[red-text]' // Attribute selector
})
export class RedTextDirective {

  constructor(el: ElementRef) {
    // console.log('Hello RedTextDirective Directive');
    el.nativeElement.style.color='red';
  }

}
