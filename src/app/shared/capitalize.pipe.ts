import { Pipe, PipeTransform } from '@angular/core';
// import { capitalize } from 'lodash';
// import * as from 'lodash-es';
import * as _ from 'lodash';


// Todo : Need to implement using lodash

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return _.capitalize(value);
  }
}