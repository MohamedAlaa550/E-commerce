import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { PlateformService } from '../../services/palteform/plateform.service';
import { isPlatformBrowser } from '@angular/common';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  let plateformService = inject(PlateformService);

  if (plateformService.checkPlateform()) {
    if (localStorage.getItem('userToken')) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('userToken')!,
        },
      });
    }
  }

  return next(req);
};
