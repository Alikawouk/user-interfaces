// src/app/services/orientation.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ParkingService {
    parkingLocations = [
        {
            name: 'Underground Parking',
            image: 'assets/parking_logo.webp',
            link: 'https://www.google.com/maps/place/Expo+City+Tenant+Underground+Parking/data=!4m2!3m1!1s0x3e5f7300013d4ec7:0xfc7d61c841f961f?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI1LjI5LjAYACDkuwMqmQEsOTQyNjc3MjksOTQyNzUzMDAsOTQyMjMyOTksOTQyMTY0MTMsOTQyODA1NzYsOTQyMTI0OTYsOTQyNzQ4ODMsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsNDcwODQzOTMsOTQyMTMyMDAsOTQyNTgzMjVCAkFF&skid=cb1530fe-e6a3-47dd-8bc1-1d7a70e053d2&g_st=aw',
        },
        {
            name: 'Spinney’s Parking',
            image: 'assets/parking_logo.webp',
            link: "https://www.google.com/maps/place/24%C2%B057'46.9%22N+55%C2%B009'00.8%22E/@24.9627547,55.1497867,19.05z/data=!4m4!3m3!8m2!3d24.9630386!4d55.1502135?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
        },
        {
            name: 'Alif B Public Parking',
            image: 'assets/parking_logo.webp',
            link: 'https://www.google.com/maps/search/24.960517,+55.148697?entry=tts&g_ep=EgoyMDI1MDgxMy4wIPu8ASoASAFQAw%3D%3D&skid=46cc7b3f-db16-4974-bee5-b8cc61a8dcfa',
        },
        {
            name: 'Parking - Connect Conference Centre',
            image: 'assets/parking_logo.webp',
            link: 'https://www.google.com/maps/place/X573%2BV99/data=!4m7!3m6!1s0x3e5f72db853c00a5:0x592c3cffdd1b3de3!8m2!3d24.9646196!4d55.153536!16s%2Fg%2F11rfrsfy0s!19sChIJpQA8hdtyXz4R4z0b3f88LFk?entry=tts&g_ep=EgoyMDI1MDgxOS4wIPu8ASoASAFQAw%3D%3D&skid=578b43ad-ada9-4f59-911e-7a0223f65d71',
        },
    ];

    getParkings() {
        return this.parkingLocations;
    }
}
