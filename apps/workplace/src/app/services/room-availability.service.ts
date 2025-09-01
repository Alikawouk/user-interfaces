import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RoomAvailabilityService {
    private systemsUrl = 'https://poc.kjtech.ai/api/engine/v2/systems';
    private eventsUrl = 'https://poc.kjtech.ai/api/staff/v1/events';
    private apiKey =
        '2350e121452d488528dadae21a54cbc1.XU8J4au545_ou1CXHr4OKrqutJPCZdNn8UHuI0M1hzQ';

    http = inject(HttpClient);

    /** Returns the number of available rooms for a given period */
    getAvailableRooms(
        periodStart: number,
        periodEnd: number,
    ): Observable<number> {
        const headers = new HttpHeaders({
            'X-API-Key': this.apiKey,
        });

        // Step 1: Get all bookable systems (rooms)
        const systems$ = this.http
            .get<any[]>(this.systemsUrl, { headers })
            .pipe(map((systems) => systems.filter((s) => s.bookable === true)));

        // Step 2: Get all events for the given period
        const params = new HttpParams()
            .set('period_start', periodStart.toString())
            .set('period_end', periodEnd.toString());

        const events$ = this.http.get<any[]>(this.eventsUrl, {
            headers,
            params,
        });

        // Step 3: Combine both calls
        return forkJoin([systems$, events$]).pipe(
            map(([systems, events]) => {
                // Extract booked system ids safely
                const bookedIds = new Set(
                    events
                        .map((e) => e.system?.id)
                        .filter((id) => id !== undefined && id !== null),
                );

                // Filter out booked systems
                const availableRooms = systems.filter(
                    (room) => !bookedIds.has(room.id),
                );

                return availableRooms.length;
            }),
        );
    }
    /** Helper to compute start as now and end of the day in UNIX seconds */
    getTodayPeriod(): { start: number; end: number } {
        const now = new Date();
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        return {
            start: Math.floor(now.getTime() / 1000),
            end: Math.floor(end.getTime() / 1000),
        };
    }
}
