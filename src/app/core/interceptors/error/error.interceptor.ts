import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { PlateformService } from '../../services/palteform/plateform.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      toastrService.error(err.error.message);
      console.log(err);

      return throwError(() => err);
    })
  );
};
