import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DeskAvailabilityService {
    private bookedDesksUrl =
        'https://poc.kjtech.ai/api/staff/v1/bookings/booked';
    private apiKey =
        '2350e121452d488528dadae21a54cbc1.XU8J4au545_ou1CXHr4OKrqutJPCZdNn8UHuI0M1hzQ';

    http = inject(HttpClient);

    /** Get list of booked desks for a period */
    getBookedDesks(
        periodStart: number,
        periodEnd: number,
    ): Observable<string[]> {
        const headers = new HttpHeaders({ 'X-API-Key': this.apiKey });
        const params = new HttpParams()
            .set('period_start', periodStart.toString())
            .set('period_end', periodEnd.toString())
            .set('type', 'desk');

        return this.http.get<string[]>(this.bookedDesksUrl, {
            headers,
            params,
        });
    }

    /** Helper: start/end of today in UNIX seconds */
    getTodayPeriod(): { start: number; end: number } {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        return {
            start: Math.floor(start.getTime() / 1000),
            end: Math.floor(end.getTime() / 1000),
        };
    }
}
