import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBotAlert'
})
export class FormatBotAlertPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case '1':
        return 'Fishy Process';
      case '2':
        return 'Fab Failures';
      case '3':
        return 'Stealth Table Resize';
      case '4':
        return 'Stealth Card Resize';
      case '5':
        return 'Extended Card Change';
      case '6':
        return 'Keyboard Hook';
      case '7':
        return 'Mouse';
      case '8':
        return 'Captcha';
    }
  }

}
