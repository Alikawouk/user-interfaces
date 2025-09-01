import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrientationService } from '../services/orientationsService';

@Component({
    selector: 'placeos-orientation',
    standalone: true,
    imports: [NgFor],
    templateUrl: './orientation.component.html',
    styleUrl: './orientation.component.css',
})
export class OrientationComponent implements OnInit {
    stations = [];

    orientationService = inject(OrientationService);

    router = inject(Router);
    ngOnInit(): void {
        this.stations = this.orientationService.getStations();
    }

    openStation(id: number) {
        this.router.navigate(['/landing-cust-orientations', id]);
    }
}
