import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkingService } from '../services/parkingService';

@Component({
    selector: 'placeos-parking',
    standalone: true,
    imports: [CommonModule],
    template: `
        <header class="bg-white">
            <div class="space-y-4 p-4">
                <div class="flex items-center justify-center">
                    <h2 class="text-xl font-bold">Parking Locations</h2>
                </div>
            </div>
        </header>

        <div class="space-y-4 p-4">
            <div
                *ngFor="let p of pakingsLocation"
                class="hover:bg-gray-50 animate-fade-in flex cursor-pointer gap-4 rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg"
                (click)="goToMap(p.link)"
            >
                <!-- Image container -->
                <div
                    class="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl"
                >
                    <img
                        [src]="p.image"
                        [alt]="p.name"
                        class="h-full w-full object-cover object-center transition-transform duration-200 hover:scale-105"
                    />
                </div>

                <!-- Text content -->
                <div class="flex flex-col justify-center overflow-hidden">
                    <h3 class="text-gray-800 truncate text-lg font-semibold">
                        <h3>{{ p.name }}</h3>
                    </h3>
                </div>
            </div>
        </div>
    `,
    styles: ``,
})
export class ParkingComponent implements OnInit {
    router = inject(Router);
    parkingService = inject(ParkingService);
    pakingsLocation = [];

    ngOnInit(): void {
        this.pakingsLocation = this.parkingService.getParkings();
    }
    goToMap(link: string) {
        window.open(link);
    }
}
