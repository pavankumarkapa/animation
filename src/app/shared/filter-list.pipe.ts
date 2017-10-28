import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(value: any, input?: any): any {
    if (input) {
      input = input.toLocaleLowerCase();
      return value.filter((val: any) => val.toLocaleLowerCase().indexOf(input) > -1);
    }
    return value;
  }

}
