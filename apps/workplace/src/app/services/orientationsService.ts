// src/app/services/orientation.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrientationService {
    stations = [
        {
            id: 1,
            name: 'G | Station 1 – Reception',
            image: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/image-thumbnails/1-Reception.jpeg',
            shortDescription:
                'Your first glimpse of the Nestlé MENA Head Office — where safety, design, and a warm welcome meet.',
            media: 'https://nestle-public-access-uae.s3.me-central-1.amazonaws.com/1.+ORIENTATION+STATION+01.mp4',
        },
        {
            id: 2,
            name: 'L1 | Station 2 – Digital Bar',
            image: 'https://nestle-public-access-uae.s3.me-central-1.amazonaws.com/imgs/2+NEW+Digital+Bar.jpg',
            shortDescription:
                'Your walk-in IT help desk for quick fixes, tech tips, and hands-on learning.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 3,
            name: 'L1 | Station 3 – Collaboration Zone',
            image: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/image-thumbnails/4-Collaboration.JPG',
            shortDescription:
                'Flexible desks designed to spark conversations, fresh ideas, and team connection.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 4,
            name: 'L1 | Station 4 – Boardroom',
            image: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/image-thumbnails/5-Boardroom3.JPG',
            shortDescription:
                'A modern bull-ring style meeting room with tech and design that puts everyone in the conversation.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 5,
            name: 'L1 | Station 5 – Focus Zone',
            image: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/image-thumbnails/6-Focus31+(1).jpg',
            shortDescription:
                'Quiet, library-like areas with reservable desks for deep thinking and distraction-free work.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 6,
            name: 'L1 | Station 6 – Café',
            image: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/image-thumbnails/7-Cafe1.JPG',
            shortDescription:
                'Your own in-office café with a dedicated barista, Starbucks and Nescafé brews, with an offering of cold and hot beverages.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 7,
            name: 'L1 | Station 7 – Majlis',
            image: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/image-thumbnails/8-Majlis2.JPG',
            shortDescription:
                'A traditional MENA gathering place reimagined for hospitality, connection, and meaningful conversations.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 8,
            name: 'L1 | Station 8 – Pantry',
            image: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/image-thumbnails/9-Pantr.jpeg',
            shortDescription:
                'From fresh lunches for purchase to PS5 battles — a place to eat, recharge, and have a little fun.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 9,
            name: 'L2 | Station 9 – Comfort & Prayer Rooms',
            image: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/image-thumbnails/10-ComfortPraye.jpeg',
            shortDescription:
                'Private, respectful spaces for prayer, reflection, and nursing — supporting your well-being at work.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 10,
            name: 'L2 | Station 10 – Collaboration Zone',
            image: 'https://nestle-public-access-uae.s3.me-central-1.amazonaws.com/imgs/10+NEW+Collaboration+Floor+2.jpg',
            shortDescription:
                'From large screens to a proper stage — this floor is ready for big announcements, events, and collaboration.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 11,
            name: 'L2 | Station 11 – Green Room',
            image: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/image-thumbnails/12-GreenRoo.jpeg',
            shortDescription:
                'An in-house creative studio for videos, podcasts, photography, and content that brings our brands to life.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 12,
            name: 'L2 | Station 12 – Creative Meeting Rooms',
            image: 'https://nestle-public-access-uae.s3.me-central-1.amazonaws.com/imgs/12+Creative+Meeting+1.jpg',
            shortDescription:
                'Meeting rooms with personality — some featuring beanbags and bikes, designed to fuel creativity, connectivity and teamwork.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 13,
            name: 'L2 | Station 13 – Staircase Art Installation',
            image: 'https://nestle-public-access-uae.s3.me-central-1.amazonaws.com/imgs/13+StairCase+Art+Piece-min.jpg',
            shortDescription:
                'A breathtaking mural telling our heritage story — full of colour, culture, and symbolism.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 14,
            name: 'L2 | Station 14 – Multi-Purpose Room',
            image: 'https://nestle-public-access-uae.s3.me-central-1.amazonaws.com/imgs/14+-+Multi-Purpose+Room.jpg',
            shortDescription:
                'A fully adaptable space for workshops, training, or team sessions — big or small.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
        {
            id: 15,
            name: 'L2 | Station 15 – Flow Zone',
            image: 'https://nestle-public-access-uae.s3.me-central-1.amazonaws.com/imgs/15-Flow+3.jpeg',
            shortDescription:
                'A hybrid of focus and collaboration — for when you need to work with others, quietly.',
            media: 'https://s3.ap-southeast-2.amazonaws.com/os.place.tech/nestle-mena-orientation/audio/Station+4+-+Collaboration+Zone.mp3',
        },
    ];
    getStations() {
        return this.stations;
    }

    getStation(id: number) {
        return this.stations.find((s) => s.id === id);
    }
}
