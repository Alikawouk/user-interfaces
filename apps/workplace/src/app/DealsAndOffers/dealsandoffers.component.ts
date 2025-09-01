import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DealsOffersService } from './../services/dealoffersService';

@Component({
    selector: 'placeos-dealsandoffers',
    standalone: true,
    imports: [CommonModule],
    template: `
        <header class="bg-white">
            <div class="space-y-4 p-4">
                <div class="flex items-center justify-center">
                    <h2 class="text-xl font-bold">Deals & Offers</h2>
                </div>
            </div>
        </header>

        <div class="space-y-4 p-4">
            <div
                *ngFor="let deal of deals"
                class="hover:bg-gray-50 animate-fade-in flex cursor-pointer gap-4 rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg"
                (click)="openDeal(deal.id)"
            >
                <!-- Image container -->
                <div
                    class="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl"
                >
                    <img
                        [src]="deal.image"
                        [alt]="deal.name"
                        class="h-full w-full object-cover object-center transition-transform duration-200 hover:scale-105"
                    />
                </div>

                <!-- Text content -->
                <div class="flex flex-col justify-center overflow-hidden">
                    <h3 class="text-gray-800 truncate text-lg font-semibold">
                        {{ deal.name }}
                    </h3>
                    <p class="text-gray-600 line-clamp-2 text-sm">
                        {{ deal.shortDescription }}
                    </p>
                </div>
            </div>
        </div>
    `,
    styles: ``,
})
export class DealsandoffersComponent implements OnInit {
    deals: any[] = [];
    dealsService = inject(DealsOffersService);
    router = inject(Router);

    ngOnInit(): void {
        this.getDeals();
    }

    getDeals() {
        this.deals = this.dealsService.getDeals();
    }

    openDeal(id: string) {
        console.log('Clicked deal with ID:', id);
        this.router.navigate(['landing-cust-deals', id]);
    }
}
