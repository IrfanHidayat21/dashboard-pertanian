import { Injectable } from '@angular/core';
import { Petani } from '../domain/petani';
import { WebRequestService } from './web-request.service';

@Injectable()
export class PetaniService {

    constructor(private webReqService: WebRequestService) { }

    getPetani() {
        return this.webReqService.get('users');
    }

    updateStatus(id:any, status: string) {
        // We want to send a web request to update a list
        return this.webReqService.patch(`users/${id}`, { status });
      }

}
