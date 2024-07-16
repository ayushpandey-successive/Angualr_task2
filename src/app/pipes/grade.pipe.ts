import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grade',
  standalone: true
})
export class GradePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}