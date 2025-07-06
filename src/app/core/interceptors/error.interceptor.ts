import {inject} from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = error.error.message || 'Solicitud incorrecta';
            break;
        /*  case 401:
            errorMessage = 'No autorizado. Por favor inicie sesión nuevamente';
            break;*/
          case 403:
            errorMessage = 'No tiene permisos para realizar esta acción';
            break;
          case 404:
            errorMessage = 'Recurso no encontrado';
            break;
          case 500:
            errorMessage = 'Error en el servidor. Por favor intente más tarde';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.statusText}`;
        }
      }


      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 5000
      });

      return throwError(() => new Error(errorMessage));
    })
  );
};
