import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCreditCardMask]'
})
export class CreditCardMaskDirective {
  constructor(public ngControl: NgControl) {}

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: string) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  onkeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.onInputChange(input.value, true);
    }
  }

  onInputChange(event: string, backspace: boolean) {
    let newVal = event.replace(/\D/g, '');
    if (newVal.length > 16) {
      // Limita la longitud a 16 dígitos
      newVal = newVal.substring(0, 16);
    }

    // Formateo de la tarjeta de crédito
    if (newVal.length === 0) {
      newVal = '';
    } else {
      newVal = newVal.match(new RegExp('.{1,4}', 'g'))?.join('-') ?? newVal;
    }

    if (this.ngControl.valueAccessor) {
      this.ngControl.valueAccessor.writeValue(newVal);
    }
  }
}
