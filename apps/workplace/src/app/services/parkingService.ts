// src/app/services/orientation.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ParkingService {
    parkingLocations = [
        {
            name: 'Underground Parking',
            image: 'assets/parking_logo.webp',
        },
        {
            name: 'Spinney’s Parking',
            image: 'assets/parking_logo.webp',
        },
        {
            name: 'Alif B Public Parking',
            image: 'assets/parking_logo.webp',
        },
        {
            name: 'Parking - Connect Conference Centre',
            image: 'assets/parking_logo.webp',
        },
    ];

    getParkings() {
        return this.parkingLocations;
    }
}
