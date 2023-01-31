import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BreadcrumbService} from '../../app.breadcrumb.service';
import { Petani } from '../domain/petani';
import { Table } from 'primeng/table';
import { PetaniService } from '../service/petaniservice';

interface Status {
    name: string,
    value: string
}
@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboarddemo.scss'],
})
export class DashboardDemoComponent implements OnInit {

    petani: Petani[];
    petaniDitolak: Petani[];
    petaniDiterima: Petani[];
    petaniDiproses: Petani[];
    selectedPetani: any;
    valueStatus: string;
    rowGroupMetadata: any;
    @ViewChild('dt') table: Table;
    load: any = 1;
    display: boolean = false;

    status: Status[];
    constructor( private messageService:MessageService, private confirmationService: ConfirmationService, private petaniService: PetaniService , private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Dashboard', routerLink: ['/']}
        ]);
    }

    ngOnInit() {
        this.status = [
            {name: 'Diterima', value: 'diterima'},
            {name: 'Ditolak', value: 'ditolak'},
        ]
        
        this.petaniService.getPetani().subscribe((lists: any=[]) => {

            this.petani = lists;

             this.petaniDitolak = lists.filter(petani => petani.status === 'ditolak');
             this.petaniDiterima = lists.filter(petani => petani.status === 'diterima');
             this.petaniDiproses = lists.filter(petani => petani.status === 'diproses');
            
            this.load = 1;
          },
          error => {
            this.load = 1;
            console.log(error);    
          })
    
    }
    confirm(data:any) {
        localStorage.setItem('petani-id', data._id);
        this.display = true;
    }

    changeStatus(status:any) {
        const petaniId = localStorage.getItem('petani-id');
        console.log(status.value, petaniId);
        this.petaniService.updateStatus(petaniId, status.value).subscribe(() => {
            localStorage.removeItem('petani-id');
            this.petaniService.getPetani().subscribe((lists: any=[]) => {
                this.petani = lists;
                this.petaniDitolak = lists.filter(petani => petani.status === 'ditolak');
                this.petaniDiterima = lists.filter(petani => petani.status === 'diterima');
                this.petaniDiproses = lists.filter(petani => petani.status === 'diproses');
              },
              error => {
                console.log(error);    
              })
            this.display = false;
      
          },
          error => {
            localStorage.removeItem('petani-id');
            this.display = false;
            console.log(error);    
          })
    }

    findIndexById(id: any): number {
        let index = -1;
        for (let i = 0; i < this.petani.length; i++) {
            if (this.petani[i]._id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

  
}
