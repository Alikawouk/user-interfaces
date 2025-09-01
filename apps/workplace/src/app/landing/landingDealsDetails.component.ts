import { Component, inject } from '@angular/core';
import { SettingsService } from '@placeos/common';
import { OrganisationService } from '@placeos/organisation';
import { currentUser } from '@placeos/ts-client';
import { startOfMinute } from 'date-fns';
import { SharedComponentModule } from '../components/shared.module';
import { DealsdetailsComponent } from '../DealsDetails/dealsdetails.component';
import { AppLandingModule } from './landing.module';

@Component({
    selector: 'placeos-landing-details',
    imports: [
        AppLandingModule, // includes LandingUpcoming, LandingColleagues, etc
        SharedComponentModule,
        DealsdetailsComponent,
    ],
    template: `
        @if (!hide_nav) {
            <topbar class="z-10" />
        }
        <div class="flex h-1/2 flex-1 bg-white">
            <div class="z-0 h-full w-1/2 flex-1 overflow-auto bg-white sm:px-4">
                @if (show_quick_links) {
                    <landing-quick-links></landing-quick-links>
                }

                <placeos-dealsdetails></placeos-dealsdetails>
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
                background-color: white;
            }

            main {
                min-height: 50%;
            }
        `,
    ],
    standalone: true,
})
export class LandingDealsDetailsComponent {
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
