export type EventStatus = "upcoming" | "past";

export interface CharityEvent {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    endDate?: string;
    time: string;
    location: string;
    address: string;
    description: string;
    details: string;
    featured: boolean;
    status: EventStatus;
    image: string;
    gallery: string[];
    ticketUrl?: string;
    facebookUrl?: string;
    price?: string;
    raised?: string;
    category: string;
}

export interface Photo {
    id: string;
    src: string;
    alt: string;
    caption: string;
    eventId?: string;
    featured: boolean;
}

export interface SiteContent {
    name: string;
    tagline: string;
    mission: string;
    storyShort: string;
    storyLong: string;
    facebookUrl: string;
    instagramUrl: string;
    email: string;
    region: string;
    heroImage: string;
    stats: { label: string; value: string }[];
    values: { title: string; body: string }[];
}

export interface DonationEntry {
    id: string;
    date: string;
    source: string;
    amount: number;
    note: string;
}

export interface DonationState {
    year: number;
    raised: number;
    goal: number;
    lastYearRaised: number;
    lastYearLabel: string;
    convoyDate: string;
    hoodieUrl: string;
    hoodieTitle: string;
    hoodieBlurb: string;
    hoodieAdultPrice: number;
    hoodieKidsPrice: number;
    storeUrl: string;
    donateTeamUrl: string;
    donateGeneralUrl: string;
    log: DonationEntry[];
}

export interface ConvoyLeader {
    name: string;
    amount: number;
    goal?: number;
    url: string;
    place: string;
}

export interface ConvoyLive {
    lifetimeRaised: number;
    teams: ConvoyLeader[];
    fundraisers: ConvoyLeader[];
    sourceUrl: string;
    fetchedAt: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
    read: boolean;
}

export interface AppState {
    events: CharityEvent[];
    photos: Photo[];
    site: SiteContent;
    messages: ContactMessage[];
    donations: DonationState;
}
