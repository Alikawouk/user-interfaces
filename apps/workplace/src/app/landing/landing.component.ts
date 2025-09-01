import { Component, inject, OnInit } from '@angular/core';
import { currentUser, SettingsService } from '@placeos/common';
import { OrganisationService } from '@placeos/organisation';
import { startOfMinute } from 'date-fns';
import { interval, startWith, switchMap } from 'rxjs';
import { DeskAvailabilityService } from '../services/deskAvailabilityService';
import { RoomAvailabilityService } from '../services/room-availability.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-landing',
    template: `
        @if (!hide_nav) {
            <topbar class="z-10" />
        }
        <div class="flex h-1/2 flex-1 bg-base-200">
            @if (!hide_landing_sidebar) {
                <div
                    class="relative hidden h-full w-[18rem] flex-col overflow-hidden border-r border-base-300 bg-base-100 sm:flex"
                >
                    <div class="flex items-center space-x-2 p-2">
                        @if (!hide_colleagues) {
                            <button
                                btn
                                matRipple
                                class="flex-1"
                                [class.inverse]="tab !== 'people'"
                                (click)="tab = 'people'"
                            >
                                <div
                                    class="flex items-center space-x-2 capitalize"
                                >
                                    <icon>people</icon>

                                    <div class="pr-2">
                                        {{
                                            'APP.WORKPLACE.COLLEAGUES'
                                                | translate
                                        }}
                                    </div>
                                </div>
                            </button>
                        }
                        <button
                            btn
                            matRipple
                            class="flex-1"
                            [class.inverse]="tab !== 'fav'"
                            (click)="tab = 'fav'"
                        >
                            <div class="flex items-center space-x-2 capitalize">
                                <icon>favorite</icon>
                                <div class="pr-2">
                                    {{ 'COMMON.FAVOURITES' | translate }}
                                </div>
                            </div>
                        </button>
                    </div>
                    <div class="h-1/2 w-full flex-1">
                        @if (tab === 'people' && !hide_colleagues) {
                            <landing-colleagues></landing-colleagues>
                        }
                        @if (tab === 'fav' || hide_colleagues) {
                            <landing-favourites></landing-favourites>
                        }
                    </div>
                </div>
            }
            <div class="z-0 h-full w-1/2 flex-1 overflow-auto sm:px-4">
                <header
                    class="sticky top-0 z-50 mb-4 overflow-hidden bg-gradient-to-b from-[rgb(174,167,156)] via-[rgb(40,38,35)] to-[rgb(40,38,35)] px-4 [background-position:top] [background-repeat:no-repeat] [background-size:100%_100%] sm:rounded-b"
                >
                    <!-- Welcome section -->
                    <div class="p-5 font-medium text-white sm:text-xl">
                        {{
                            'APP.WORKPLACE.WELCOME_MESSAGE'
                                | translate: { name: user?.name }
                        }}
                    </div>
                    <div date class="px-5 text-sm text-white sm:text-base">
                        What do you want todo today ?
                    </div>

                    <!-- Gauges row -->
                    <div
                        class="flex h-32 w-full items-center justify-evenly p-5"
                    >
                        <!-- Desk gauge -->
                        <div class="flex flex-col items-center">
                            <svg viewBox="0 0 100 100" class="h-20 w-20">
                                <!-- Background circle -->
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="rgb(153,153,153)"
                                    stroke-width="10"
                                    fill="transparent"
                                ></circle>

                                <!-- Booked desks indicator -->
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="orange"
                                    stroke-width="10"
                                    fill="transparent"
                                    stroke-linecap="round"
                                    transform="rotate(-90 50 50)"
                                    [attr.stroke-dasharray]="deskCircumference"
                                    [attr.stroke-dashoffset]="deskDashOffset"
                                ></circle>

                                <!-- Text -->
                                <text
                                    x="50"
                                    y="55"
                                    text-anchor="middle"
                                    class="fill-white text-xl font-bold"
                                >
                                    {{ bookedDesks }}/{{ totalDesks }}
                                </text>
                            </svg>
                            <span class="mt-1 text-sm font-medium text-white"
                                >Desks</span
                            >
                        </div>

                        <!-- Parking gauge -->
                        <div class="flex flex-col items-center">
                            <svg viewBox="0 0 100 100" class="h-20 w-20">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="rgb(153,153,153)"
                                    stroke-width="10"
                                    fill="transparent"
                                ></circle>
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="#FFD700"
                                    stroke-width="10"
                                    fill="transparent"
                                    stroke-linecap="round"
                                    transform="rotate(-90 50 50)"
                                    stroke-dasharray="251.32741228718345"
                                    stroke-dashoffset="251.32741228718345"
                                ></circle>
                                <text
                                    x="50"
                                    y="55"
                                    text-anchor="middle"
                                    class="fill-white text-xl font-bold"
                                >
                                    0/81
                                </text>
                            </svg>
                            <span class="mt-1 text-sm font-medium text-white"
                                >Parkings</span
                            >
                        </div>

                        <!-- Room gauge -->
                        <div class="flex flex-col items-center">
                            <svg viewBox="0 0 100 100" class="h-20 w-20">
                                <!-- Background circle -->
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="rgb(153,153,153)"
                                    stroke-width="10"
                                    fill="transparent"
                                ></circle>

                                <!-- Booked rooms indicator -->
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="orange"
                                    stroke-width="10"
                                    fill="transparent"
                                    stroke-linecap="round"
                                    transform="rotate(-90 50 50)"
                                    [attr.stroke-dasharray]="roomCircumference"
                                    [attr.stroke-dashoffset]="roomDashOffset"
                                ></circle>

                                <!-- Text inside the gauge -->
                                <text
                                    x="50"
                                    y="55"
                                    text-anchor="middle"
                                    class="fill-white text-xl font-bold"
                                >
                                    {{ bookedRooms }}/{{ totalRooms }}
                                </text>
                            </svg>
                            <span class="mt-1 text-sm font-medium text-white"
                                >Rooms</span
                            >
                        </div>
                    </div>

                    <!-- Image section -->
                    <!-- <div class="flex h-32 justify-center pt-4">
                        <img src="assets/img/landing.svg" />
                    </div> -->
                </header>

                @if (show_quick_links) {
                    <landing-quick-links></landing-quick-links>
                }
                <!-- <landing-availability></landing-availability> -->
                <div
                    class="mx-4 mb-2 h-px w-[calc(100%-2rem)] bg-base-200"
                ></div>
                <landing-upcoming></landing-upcoming>
                <!-- <placeos-orientation></placeos-orientation> -->
            </div>
        </div>
        @if (!hide_nav) {
            <footer-menu />
        }
    `,
    styles: [
        `
            :host {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            main {
                min-height: 50%;
            }
        `,
    ],
    standalone: false,
})
export class LandingComponent implements OnInit {
    Math = Math;
    availableRooms = 0;
    parkingUsage = 100;
    totalRooms = 6;
    bookedRooms = 0;
    totalDesks = 11;
    bookedDesks = 0;

    roomService = inject(RoomAvailabilityService);
    deskService = inject(DeskAvailabilityService);
    ngOnInit(): void {
        const { start, end } = this.roomService.getTodayPeriod();

        // Call immediately and then every 5 seconds
        interval(5000)
            .pipe(
                switchMap(() => this.roomService.getAvailableRooms(start, end)),
            )
            .subscribe((count) => {
                this.availableRooms = count;
                this.bookedRooms = this.totalRooms - this.availableRooms;
            });

        // Optional: call once immediately before interval ticks
        this.roomService.getAvailableRooms(start, end).subscribe((count) => {
            this.availableRooms = count;
            this.bookedRooms = this.totalRooms - this.availableRooms;
        });

        const { start: start1, end: end1 } = this.deskService.getTodayPeriod();

        interval(5000)
            .pipe(
                startWith(0), // triggers an immediate call
                switchMap(() => this.deskService.getBookedDesks(start1, end1)),
            )
            .subscribe((bookedDesks: string[]) => {
                this.bookedDesks = bookedDesks.length;
                console.log('Booked desks:', bookedDesks);
                console.log('Number of booked desks:', bookedDesks.length);
            });
    }

    get roomCircumference() {
        return 2 * Math.PI * 40; // 40 is the radius
    }

    // dash offset for booked rooms
    get roomDashOffset() {
        return (
            this.roomCircumference * (1 - this.bookedRooms / this.totalRooms)
        );
    }
    get deskCircumference() {
        return 2 * Math.PI * 40; // SVG radius
    }

    get deskDashOffset() {
        return (
            this.deskCircumference * (1 - this.bookedDesks / this.totalDesks)
        );
    }

    private _org = inject(OrganisationService);
    private _settings = inject(SettingsService);

    public time: number;
    public tab = 'people';

    public get hide_nav() {
        return localStorage.getItem('PlaceOS.hide_nav') === 'true';
    }

    public get date() {
        return startOfMinute(this.time || Date.now());
    }

    public get user() {
        return currentUser();
    }

    public get building() {
        return this._org.building;
    }

    public get hide_landing_sidebar() {
        return this._settings.get('app.hide_landing_sidebar');
    }

    public get hide_colleagues() {
        return this._settings.get('app.hide_colleagues');
    }

    public get show_quick_links() {
        return this._settings.get('app.show_quick_links');
    }
}
