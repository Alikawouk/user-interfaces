import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '@placeos/common';
import { OrganisationService } from '@placeos/organisation';
import { currentUser } from '@placeos/ts-client';
import { startOfMinute } from 'date-fns';
import { DealsOffersService } from '../services/dealoffersService';

@Component({
    selector: 'placeos-dealsdetails',
    standalone: true,
    imports: [CommonModule],
    template: `@if (!hide_nav) {
            <topbar class="z-10" />
        }
        <div class="flex h-1/2 flex-1 bg-white">
            <div class="z-0 h-full w-1/2 flex-1 overflow-auto sm:px-4">
                @if (show_quick_links) {
                    <landing-quick-links></landing-quick-links>
                }
                <!-- <landing-availability></landing-availability> -->
                <div
                    class="mx-4 mb-2 h-px w-[calc(100%-2rem)] bg-base-200"
                ></div>

                <!-- station Details: -->

                <div class="flex flex-1 justify-center overflow-y-auto p-4">
                    <div class="w-full max-w-4xl rounded-lg bg-white shadow-xl">
                        <br />
                        <br />
                        <header
                            class="relative flex items-center justify-between bg-white px-6 py-4 shadow-md"
                        >
                            <!-- Back Button -->
                            <button
                                (click)="goBack()"
                                aria-label="Go back"
                                class="hover:bg-gray-100 absolute left-6 top-1/2 -translate-y-1/2 rounded-full p-2 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    class="text-gray-700 h-6 w-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>

                            <!-- Title -->
                            <div class="flex-grow text-center">
                                <h1 class="text-gray-900 text-xl font-semibold">
                                    {{ deal.name }}
                                </h1>
                            </div>
                        </header>
                        <!-- Deal Image -->
                        <div class="p-8">
                            <div class="mb-8">
                                <img
                                    [src]="deal.image"
                                    [alt]="deal.name"
                                    class="h-auto w-full rounded-lg shadow-lg"
                                />
                            </div>

                            <!-- Description -->
                            <div class="mb-6" *ngIf="deal.description">
                                <h3
                                    class="text-gray-800 mb-2 text-xl font-semibold"
                                >
                                    Description
                                </h3>
                                <p class="text-gray-700">
                                    {{ deal.description }}
                                </p>
                            </div>

                            <!-- Discount -->
                            <div class="mb-6" *ngIf="deal.discount">
                                <h3
                                    class="text-gray-800 mb-2 text-xl font-semibold"
                                >
                                    Discount
                                </h3>
                                <p class="text-gray-700">{{ deal.discount }}</p>
                            </div>

                            <!-- Open Time -->
                            <div class="mb-6" *ngIf="deal.open">
                                <h3
                                    class="text-gray-800 mb-2 text-xl font-semibold"
                                >
                                    Open Time
                                </h3>
                                <p class="text-gray-700">{{ deal.open }}</p>
                            </div>

                            <!-- Contact -->
                            <div class="mb-6" *ngIf="deal.contact">
                                <h3
                                    class="text-gray-800 mb-2 text-xl font-semibold"
                                >
                                    Contact
                                </h3>
                                <p class="text-gray-700">{{ deal.contact }}</p>
                            </div>

                            <!-- Budget -->
                            <div class="mb-6" *ngIf="deal.budget">
                                <h3
                                    class="text-gray-800 mb-2 text-xl font-semibold"
                                >
                                    Budget
                                </h3>
                                <p class="text-gray-700">{{ deal.budget }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @if (!hide_nav) {
            <footer-menu />
        } `,
    styles: `
        :host {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            display: flex;
            flex-direction: column;
        }

        main {
            min-height: 50%;
        }
    `,
})
export class DealsdetailsComponent implements OnInit {
    private _org = inject(OrganisationService);
    private _settings = inject(SettingsService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private dealsService = inject(DealsOffersService);

    public time: number;
    public tab = 'people';
    public deal: any;

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        console.log('id is ' + id);
        if (id) {
            this.deal = this.dealsService.GetDealById(id); // assuming service fetches by ID
            console.log('----------------------' + this.deal);
        }
    }

    goBack() {
        this.router.navigate(['/deals']); // change route to your deals list
    }

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
