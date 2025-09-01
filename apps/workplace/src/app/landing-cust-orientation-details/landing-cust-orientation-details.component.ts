import { Location, NgIf } from '@angular/common';
import {
    Component,
    ElementRef,
    inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { currentUser, SettingsService } from '@placeos/common';
import { OrganisationService } from '@placeos/organisation';
import { startOfMinute } from 'date-fns';
import { SharedComponentModule } from '../components/shared.module';
import { AppLandingModule } from '../landing/landing.module';
import { OrientationComponent } from '../orientation/orientation.component';
import { OrientationService } from '../services/orientationsService';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'landing-cust-orientation-details',
    imports: [
        NgIf,
        OrientationComponent,
        AppLandingModule, // includes LandingUpcoming, LandingColleagues, etc
        SharedComponentModule,
    ],
    templateUrl: './landing-cust-orientation-details.component.html',
    styleUrls: ['./landing-cust-orientation-details.component.css'],
})
export class LandingCustOrientationDetailsComponent implements OnInit {
    stationId!: number;
    station: any;
    orientationService = inject(OrientationService);

    route = inject(ActivatedRoute);
    location = inject(Location);
    ngOnInit() {
        this.stationId = Number(this.route.snapshot.paramMap.get('id'));
        this.station = this.orientationService.getStation(this.stationId);
        console.log(this.station);
    }
    isPlaying = false;

    @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

    toggleAudio(audio: HTMLAudioElement) {
        if (audio.paused) {
            audio.play();
            this.isPlaying = true;
        } else {
            audio.pause();
            this.isPlaying = false;
        }
    }
    GoBack() {
        console.log('gobacktriggered');
        this.location.back();
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
