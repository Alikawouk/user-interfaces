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
                    class="bg-gray-100 relative flex h-24 w-24 flex-shrink-0 items-center justify-center"
                >
                    <img
                        [src]="deal.image"
                        [alt]="deal.name"
                        class="max-h-full max-w-full rounded-md object-contain"
                    />
                </div>

                <!-- Text content -->
                <div class="flex flex-col justify-center overflow-hidden">
                    <h3 class="text-gray-800 truncate text-lg font-semibold">
                        {{ deal.name }}
                    </h3>
                    <p class="text-gray-500 mt-1 text-xs">
                        <span>Discount: {{ deal.discount }} </span> <br />

                        <span *ngIf="deal.open"> Open: {{ deal.open }} </span>
                        <br />
                        <span *ngIf="deal.budget">{{ deal.budget }}</span>
                        <br />
                        <span>Contact: {{ deal.contact }}</span>
                        <br />
                        <span *nfIf="deal.prmoCode"
                            >Promo Code: {{ deal.promoCode }}</span
                        >
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
