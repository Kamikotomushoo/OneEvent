import { FormControl, ValidatorFn } from '@angular/forms';



// export function CorrectStartTime(date: Date): ValidatorFn
// {
//   return (control: FormControl): {[s: string]: boolean} | null => {
//     const tempDate = new Date();
//     if ( control.value !== null ) {
//       if ((date.getFullYear() === tempDate.getFullYear()
//       && date.getMonth() === tempDate.getMonth()
//       && date.getDate() === tempDate.getDate()) ) {
//         console.log('fadsfdf');
//         console.log(date.getFullYear() + ' ' + tempDate.getFullYear());
//         console.log(date.getMonth() + ' ' + tempDate.getMonth());
//         console.log(date.getDate() + ' ' + tempDate.getDate());

//         var myTime = control.value;
//         myTime = myTime.split(':');
//         if(tempDate.getHours() > +myTime[0] ||
//         (tempDate.getHours() === +myTime[0] && tempDate.getMinutes() >= +myTime[1] )) return { 'incorrectTime': true };

//       }
//     }
//     return null;
//   }
// }


export function CorrectEndTime(date: Date): ValidatorFn
{
  return (control: FormControl): {[s: string]: boolean} | null => {
    const tempDate = new Date();
    if ( control.value !== null ) {
      if ((date.getFullYear() === tempDate.getFullYear()
      && date.getMonth() === tempDate.getMonth()
      && date.getDay() === tempDate.getDay()) ) {
        console.log('fadsfdsfdffdf');
        var myTime = control.value;
        myTime = myTime.split(':');
        if(tempDate.getHours() > +myTime[0] ||
        (tempDate.getHours() === +myTime[0] && tempDate.getMinutes() >= +myTime[1] )) return { 'incorrectTime': true };

      }
    }
    return null;
  }
}
