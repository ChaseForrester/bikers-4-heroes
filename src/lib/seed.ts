import type { AppState } from "./types";

export const SEED: AppState = {
    site: {
        name: "Bikers 4 Heroes",
        tagline: "Life's not always fair, so let's make it FUN!",
        mission:
            "We are an alliance of friends and motorcycle enthusiasts who unite dressed as Super Heroes to bring support and funding to those in need. Camaraderie, integrity and community are the values that underpin everything we do.",
        storyShort:
            "In November 2018 three work mates rode up Mt Ousley to join the i98 Illawarra Convoy. The kids on the roadside, the community, the roar of the bikes — it changed everything. Bikers 4 Heroes was born to raise funds as a Convoy Lead Bike group for the real heroes: Illawarra kids fighting serious illness.",
        storyLong: `In November 2018, three work mates — Russell Parkinson, Daniel Barnes and Stuart Butler — jumped on their motorcycles and rode up Mt Ousley to West Cliff Colliery to join the i98 Illawarra Convoy. The experience they shared, and the huge representation of the Illawarra community lining the side of the road, left a deep impression.

The following Monday they were still on a high, and all agreed there was more they could do. Forming a Convoy Lead Bike group to raise funds for children of the Illawarra suffering serious illness would be their direction.

Many people think the “Heroes” part of the name refers to the members who dress as Superheroes. In reality it refers to the kids they help — the REAL heroes. With the loving support of their partners Shay and Kayla, Bikers 4 Heroes was born.

The team grew quickly to ten members. In 2018 they applied to the Illawarra Community Foundation to raise funds for Convoy as a Lead Bike Group. Their application was successful, and in January 2019 Bikers 4 Heroes were formally on their way.

Their first event was Australia Day 2019: a walk in full superhero kit from Shellharbour Boat Harbour to Belmore Basin. Home base became the Albion Park RSL. Trivia nights, kids fun days, ride days and an annual Masquerade Ball followed. In their rookie year they presented a Lead Bike bid in excess of $30,000.

The focus has never been to ride down the hill first on Convoy day. If ANY local family needs help, the Heroes will be there. They also partner with Super-Tee, who produce hospital-grade superhero t-shirts that give kids strength, joy and dignity while undergoing treatment.

“Our name comes from the kids that we help, the true heroes, fighting battles and taking on the world at such a young age. We wear our uniforms with pride, to display the hero in all of them.”`,
        facebookUrl: "https://www.facebook.com/bikers4heroes",
        instagramUrl: "https://linktr.ee/bikers4heroes",
        email: "hello@bikers4heroes.org",
        region: "Illawarra, NSW",
        heroImage: "/gallery/bikes-lineup.jpg",
        stats: [
            { label: "Founded", value: "2018" },
            { label: "Rookie Lead Bike bid", value: "$30k+" },
            { label: "2025 Lead Bike bid", value: "$17.6k" },
            { label: "Home of the Heroes", value: "Illawarra" },
        ],
        values: [
            {
                title: "Camaraderie",
                body: "An alliance of mates on two wheels. One team, one entity, one village.",
            },
            {
                title: "Integrity",
                body: "Every sausage sizzle, trivia night and ride dollar goes to people in need.",
            },
            {
                title: "Community",
                body: "If a local family needs help, we show up — capes, bikes and all.",
            },
        ],
    },
    events: [
        {
            id: "evt-bunnings-oct-2026",
            slug: "bunnings-sausage-sizzle-shellharbour",
            title: "Bunnings Sausage Sizzle",
            subtitle: "Come down, say G’day, grab a snag — every dollar rides with us to Convoy.",
            date: "2026-10-05",
            time: "8:00am",
            location: "Bunnings Shellharbour",
            address: "Bunnings Warehouse, Shellharbour NSW",
            description:
                "The Heroes are firing up the BBQ at Shellharbour Bunnings. Come down and say G-day and get a sausage sizzle or two. All money raised will go to our Lead Bike bid for the i98FM Illawarra Convoy.",
            details:
                "A classic community fundraiser. Bring the kids — Superheroes often drop by for photos. Cash and card welcome. Every snag helps a local family facing serious illness.",
            featured: true,
            status: "upcoming",
            image: "/gallery/sausage-sizzle.jpg",
            gallery: ["/gallery/sausage-sizzle.jpg", "/gallery/donation-day.jpg", "/gallery/bikes-lineup.jpg"],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            price: "Gold coin / BBQ prices",
            category: "Fundraiser",
        },
        {
            id: "evt-convoy-2026",
            slug: "i98fm-illawarra-convoy-2026",
            title: "i98FM Illawarra Convoy 2026",
            subtitle: "Lead Bike pack. For the kids on the side of the road.",
            date: "2026-11-15",
            time: "Bikes assemble 7:00am",
            location: "West Cliff Colliery → Shellharbour Airport",
            address: "West Cliff Colliery, Appin Road, Appin NSW",
            description:
                "The reason we ride. Bikers 4 Heroes roll with the Lead Bike pack in the i98FM Illawarra Convoy — raising funds through the Illawarra Community Foundation for local families facing life-threatening illness.",
            details:
                "Bikes assemble in the main carpark at West Cliff Colliery no earlier than 7:00am. Police briefing 7:45am. Lead bikes depart 8:15am, followed by all other bikes at 8:30am. The convoy finishes near Airport Road and Princes Highway, then the free Family Fun Day kicks off at Shellharbour Airport. Every dollar the Heroes raise through the year is bid live on i98FM in the Lead Bike auction.",
            featured: true,
            status: "upcoming",
            image: "/gallery/heroes-stage.jpg",
            gallery: [
                "/gallery/heroes-stage.jpg",
                "/gallery/bikes-lineup.jpg",
                "/gallery/ride-morning.jpg",
                "/gallery/hospital-visit.jpg",
            ],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            ticketUrl: "https://illawarraconvoy.com.au",
            category: "Convoy",
        },
        {
            id: "evt-ball-2026",
            slug: "masquerade-ball-2026",
            title: "Bikers 4 Heroes Masquerade Ball",
            subtitle: "An amazing night of fun, dancing and laughter.",
            date: "2026-09-26",
            time: "6:00pm",
            location: "City Beach Function Centre",
            address: "Marine Drive, Wollongong NSW",
            description:
                "Gather your friends and family for our annual Masquerade Ball. Black tie, gold balloons, and a room full of people who show up for Illawarra kids.",
            details:
                "The annual ball began after member Thor would not let the idea rest. The first was held at Jamberoo Valley Lodge and it has been a highlight ever since. 2026 returned to City Beach Function Centre on Marine Drive — dancing, raffles, auction prizes and a whole lot of heart.",
            featured: false,
            status: "past",
            image: "/gallery/masquerade-ball.jpg",
            gallery: [
                "/gallery/masquerade-ball.jpg",
                "/gallery/ball-guests.jpg",
                "/gallery/auction-prizes.jpg",
                "/gallery/raffle-winner.jpg",
            ],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            category: "Ball",
        },
        {
            id: "evt-trivia-jul-2026",
            slug: "family-trivia-july-2026",
            title: "Family Trivia Afternoon",
            subtitle: "Superman, Robin, Wolverine, Ladybug, Aquaman and a room full of prizes.",
            date: "2026-07-12",
            time: "Doors 2:30pm · Trivia 3:00pm",
            location: "Albion Park Bowling Club",
            address: "Albion Park Bowling Club, NSW",
            description:
                "A mixed bag of trivia with the Heroes in full costume. Kids photos with Superman, Robin, Wolverine, Captain America, Jessie, Ladybug, Star-Lord and Aquaman. All proceeds to the 2026 i98FM Illawarra Convoy.",
            details:
                "Home-base energy. Family tables, plenty of prizes, and the Superheroes on the floor all afternoon. Every dollar raised went toward the Lead Bike bid.",
            featured: false,
            status: "past",
            image: "/gallery/hospital-visit.jpg",
            gallery: [
                "/gallery/hospital-visit.jpg",
                "/gallery/superhero-night.jpg",
                "/gallery/stage-heroes.jpg",
            ],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            category: "Trivia",
        },
        {
            id: "evt-nerriga-2026",
            slug: "ride-to-nerriga-2026",
            title: "Ride to Nerriga",
            subtitle: "The Heroes first big ride of the year. Weather held. Hearts full.",
            date: "2026-05-09",
            time: "9:00am",
            location: "Nerriga Hotel",
            address: "Nerriga, NSW",
            description:
                "A cracking day in the saddle out to Nerriga. Rain, hail or shine the Heroes ride — and this time the weather held out for a wonderful day.",
            details:
                "Open to mates on two wheels who want to put kilometres on the clock for Convoy. Meet, ride, eat, give.",
            featured: false,
            status: "past",
            image: "/gallery/ride-morning.jpg",
            gallery: ["/gallery/ride-morning.jpg", "/gallery/bikes-lineup.jpg"],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            category: "Ride",
        },
        {
            id: "evt-bundeena-2026",
            slug: "heroes-cruise-to-bundeena-2026",
            title: "Heroes Cruise to Bundeena",
            subtitle: "Cars and bikes. Coast road. Cold drink at the RSL.",
            date: "2026-02-28",
            time: "9:00am start · 10:00am roll out",
            location: "Brunch Cartel → Bundeena RSL",
            address: "118 Industrial Road, Oak Flats NSW",
            description:
                "Guys and gals, cars and bikes — a fun-filled day cruising the Illawarra coast. Kick off at Brunch Cartel, Oak Flats, then roll north to picturesque Bundeena and finish at the RSL.",
            details:
                "Early bird registration $10 per vehicle online, $15 on the day. Breakfast and coffee from the amazing team at Brunch Cartel. Rain, hail or shine the Heroes did their part for i98FM Illawarra Convoy.",
            featured: false,
            status: "past",
            image: "/gallery/bikes-lineup.jpg",
            gallery: ["/gallery/bikes-lineup.jpg", "/gallery/ride-morning.jpg", "/gallery/donation-day.jpg"],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            price: "$10 early bird / $15 on the day",
            category: "Ride",
        },
        {
            id: "evt-trivia-apr-2026",
            slug: "family-trivia-april-2026",
            title: "Family Trivia Afternoon",
            subtitle: "Tables, prizes, capes. Home base at the Bowlo.",
            date: "2026-04-19",
            time: "2:30pm",
            location: "Albion Park Bowling Club",
            address: "Albion Park Bowling Club, NSW",
            description:
                "Another packed trivia afternoon raising funds for the Lead Bike bid. Superheroes on the floor, kids on the dance of it, community around the tables.",
            details:
                "A staple of the Heroes calendar. Come as a table or join one. Costumes encouraged. Kids welcome.",
            featured: false,
            status: "past",
            image: "/gallery/stage-heroes.jpg",
            gallery: ["/gallery/stage-heroes.jpg", "/gallery/superhero-night.jpg"],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            category: "Trivia",
        },
        {
            id: "evt-fitness-2026",
            slug: "community-fitness-fundraiser",
            title: "Community Fitness Fundraiser",
            subtitle: "Sweat, smiles and a stage full of Heroes.",
            date: "2026-03-15",
            time: "Morning class",
            location: "Illawarra community hall",
            address: "Illawarra, NSW",
            description:
                "Local fitness crews jumped in with the Heroes for a high-energy fundraiser. Zumba, mates, kids in costume and Aquaman on the edge of the stage with the trident.",
            details:
                "Proof that you do not need a motorcycle to ride with us. Come as you are, move as you can, give what you can.",
            featured: false,
            status: "past",
            image: "/gallery/community-fitness.jpg",
            gallery: ["/gallery/community-fitness.jpg", "/gallery/heroes-sign.jpg", "/gallery/stage-heroes.jpg"],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            category: "Community",
        },
        {
            id: "evt-bingo-2020",
            slug: "drag-bingo-and-games-nights",
            title: "Drag Bingo & Games Nights",
            subtitle: "Dabbers out. Capes on. Convoy on the wall.",
            date: "2025-04-26",
            time: "6:00pm",
            location: "Albion Park Bowling Club",
            address: "Albion Park Bowling Club, NSW",
            description:
                "Bingo, drag, raffles and a night that feels like a village hall in the best possible way. A Heroes classic.",
            details:
                "Eyes down. Prizes on the table. Every game night feeds the Lead Bike bid and keeps the village together between rides.",
            featured: false,
            status: "past",
            image: "/gallery/bingo-night.jpg",
            gallery: ["/gallery/bingo-night.jpg", "/gallery/superhero-night.jpg", "/gallery/raffle-winner.jpg"],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            category: "Bingo",
        },
        {
            id: "evt-hospital-visits",
            slug: "hospital-hero-visits",
            title: "Hospital Hero Visits",
            subtitle: "Smileyscopes, capes, and the kids who are the real heroes.",
            date: "2025-11-01",
            time: "By arrangement",
            location: "Illawarra hospitals & wards",
            address: "Illawarra, NSW",
            description:
                "The Heroes visit kids in treatment dressed as the characters they love, and have delivered Smileyscope VR units so procedures feel a little less scary.",
            details:
                "This is the heart of the name. Super-Tee hospital-grade hero shirts. Ward visits. Quiet work behind the costumes. If you know a child or family who could use a visit, tell us on the Community in Need page.",
            featured: false,
            status: "past",
            image: "/gallery/hospital-visit.jpg",
            gallery: ["/gallery/hospital-visit.jpg", "/gallery/heroes-sign.jpg"],
            facebookUrl: "https://www.facebook.com/bikers4heroes",
            category: "Outreach",
        },
    ],
    photos: [
        {
            id: "ph-1",
            src: "/gallery/bikes-lineup.jpg",
            alt: "Motorcycles lined up on a sunny Illawarra morning",
            caption: "Wheels down. Ready to roll.",
            featured: true,
            eventId: "evt-bundeena-2026",
        },
        {
            id: "ph-2",
            src: "/gallery/masquerade-ball.jpg",
            alt: "Guests in formal wear at the Masquerade Ball",
            caption: "Masquerade Ball — City Beach",
            featured: true,
            eventId: "evt-ball-2026",
        },
        {
            id: "ph-3",
            src: "/gallery/hospital-visit.jpg",
            alt: "Superheroes visiting hospital staff with Smileyscope devices",
            caption: "Hospital visit with Smileyscope",
            featured: true,
            eventId: "evt-hospital-visits",
        },
        {
            id: "ph-4",
            src: "/gallery/superhero-night.jpg",
            alt: "Ladybug, Robin, Aquaman, Catwoman and the crew",
            caption: "The village in costume",
            featured: true,
            eventId: "evt-trivia-jul-2026",
        },
        {
            id: "ph-5",
            src: "/gallery/sausage-sizzle.jpg",
            alt: "Ladybug and Wonder Woman at a community BBQ",
            caption: "Sausage sizzle for Convoy",
            featured: true,
            eventId: "evt-bunnings-oct-2026",
        },
        {
            id: "ph-6",
            src: "/gallery/heroes-stage.jpg",
            alt: "HEROES letters on stage with Convoy banner",
            caption: "i98FM Illawarra Convoy",
            featured: true,
            eventId: "evt-convoy-2026",
        },
        {
            id: "ph-7",
            src: "/gallery/community-fitness.jpg",
            alt: "Large community fitness fundraiser group",
            caption: "Community fitness fundraiser",
            featured: false,
            eventId: "evt-fitness-2026",
        },
        {
            id: "ph-8",
            src: "/gallery/heroes-sign.jpg",
            alt: "Three members with the Bikers 4 Heroes sign",
            caption: "One team, one entity",
            featured: false,
        },
        {
            id: "ph-9",
            src: "/gallery/donation-day.jpg",
            alt: "Member holding donated cash at an outdoor lunch",
            caption: "Every dollar counts",
            featured: false,
        },
        {
            id: "ph-10",
            src: "/gallery/stage-heroes.jpg",
            alt: "Robin, Ladybug and Aquaman on stage",
            caption: "Stage heroes",
            featured: false,
            eventId: "evt-trivia-jul-2026",
        },
        {
            id: "ph-11",
            src: "/gallery/raffle-winner.jpg",
            alt: "Raffle winner with a gift hamper",
            caption: "Raffle night winner",
            featured: false,
            eventId: "evt-ball-2026",
        },
        {
            id: "ph-12",
            src: "/gallery/bingo-night.jpg",
            alt: "Bingo night with Illawarra Convoy banner",
            caption: "Eyes down for Convoy",
            featured: false,
            eventId: "evt-bingo-2020",
        },
        {
            id: "ph-13",
            src: "/gallery/ball-guests.jpg",
            alt: "Three guests in formal wear at the gold sequin wall",
            caption: "Ball night glamour",
            featured: false,
            eventId: "evt-ball-2026",
        },
        {
            id: "ph-14",
            src: "/gallery/auction-prizes.jpg",
            alt: "Signed jerseys and a dirt bike ready for auction",
            caption: "Auction prizes",
            featured: false,
            eventId: "evt-ball-2026",
        },
        {
            id: "ph-15",
            src: "/gallery/ride-morning.jpg",
            alt: "Cruisers and sports bikes parked before a ride",
            caption: "Brunch Cartel roll out",
            featured: false,
            eventId: "evt-bundeena-2026",
        },
    ],
    messages: [],
    donations: {
        year: 2026,
        raised: 0,
        goal: 20000,
        lastYearRaised: 17653.83,
        lastYearLabel: "2025 Lead Bike bid",
        convoyDate: "2026-11-15",
        hoodieUrl: "https://illawarraconvoy.com.au/store/product/2025-convoy-hoodies",
        hoodieTitle: "2025 Convoy Hoodies on sale",
        hoodieBlurb:
            "No new hoodies in 2026 — last year’s khaki and black zip/pullover hoodies are reduced. Adults $35 (was $45). Kids $25 (was $35). Every hoodie supports the i98FM Illawarra Convoy.",
        hoodieAdultPrice: 35,
        hoodieKidsPrice: 25,
        storeUrl: "https://illawarraconvoy.com.au/store",
        donateTeamUrl: "https://illawarraconvoy.com.au/browse/teams",
        donateGeneralUrl: "https://illawarraconvoy.com.au/team/general-donations",
        log: [],
    },
};

export function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export function eventStatus(date: string, explicit?: "upcoming" | "past") {
    if (explicit) {
        const today = new Date().toISOString().slice(0, 10);
        return date >= today ? "upcoming" : "past";
    }
    const today = new Date().toISOString().slice(0, 10);
    return date >= today ? "upcoming" : "past";
}
