import { FormControl } from '@angular/forms';

export function NameLimit(control: FormControl): {[s: string]: boolean} {
  const text: string = control.value;
  // console.log(text);

  if (text.length > 50) {
    return { 'aboveLimit' : true };
  }
  return null;
}


export function DescriptionLimit(control: FormControl): {[s: string]: boolean} {
  const text: string = control.value;
  // console.log(text);

  if (text.length > 1024) {
    return { 'aboveLimit' : true };
  }
  return null;
}
