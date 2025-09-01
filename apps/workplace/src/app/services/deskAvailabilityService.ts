import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DeskAvailabilityService {
    private desksUrl =
        'https://poc.kjtech.ai/api/engine/v2/metadata/zone-Iz7BiIfLUV?name=desks';
    private bookingsUrl = 'https://poc.kjtech.ai/api/staff/v1/bookings';
    private apiKey =
        '2350e121452d488528dadae21a54cbc1.XU8J4au545_ou1CXHr4OKrqutJPCZdNn8UHuI0M1hzQ'; // same as rooms

    http = inject(HttpClient);

    /** Get booked desks count for a given period */
    getBookedDesks(periodStart: number, periodEnd: number): Observable<number> {
        const headers = new HttpHeaders({ 'X-API-Key': this.apiKey });

        // Get all desks and all bookings simultaneously
        const desks$ = this.http
            .get<any>(this.desksUrl, { headers })
            .pipe(map((res) => res.desks.details.filter((d) => d.bookable)));

        const params = new HttpParams()
            .set('period_start', periodStart.toString())
            .set('period_end', periodEnd.toString())
            .set('type', 'desk');

        const bookings$ = this.http.get<any[]>(this.bookingsUrl, {
            headers,
            params,
        });

        return forkJoin([desks$, bookings$]).pipe(
            map(([desks, bookings]) => {
                const bookedIds = new Set(bookings.map((b) => b.asset_id));
                return desks.filter((d) => bookedIds.has(d.id)).length;
            }),
        );
    }

    /** Helper: start/end of today in UNIX seconds */
    getTodayPeriod(): { start1: number; end1: number } {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        return {
            start1: Math.floor(start.getTime() / 1000),
            end1: Math.floor(end.getTime() / 1000),
        };
    }
}
