import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class PaysService extends BaseService {

  constructor() {
    super('pays');
   }
}