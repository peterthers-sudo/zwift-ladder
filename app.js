// ═══════════════════════════════════════════════════════
// REAL ZWIFT ROUTE DATABASE (from Zwift Insider)
// distance = km, elevation = metres
// punches = estimated short climbs, flatKm = estimated flat km
// type: tt | sprint | punch | climb
// ═══════════════════════════════════════════════════════

function openPrivacy() {
  document.getElementById("privacyModal").style.display = "block";
}

function closePrivacy() {
  document.getElementById("privacyModal").style.display = "none";
}

const ZWIFT_ROUTES = [
  { name: 'Bologna Time Trial', world: 'Bologna', distance: 8.0, elevation: 236, leadIn: 0.0, profile: 'Hilly', sprint: 0, punch: 0, climb: 56, pursuit: 44, endurance: 0 },
  { name: 'Downtown Dolphin', world: 'Crit City', distance: 2.0, elevation: 17, leadIn: 0.1, profile: 'Flat', sprint: 38, punch: 22, climb: 0, pursuit: 40, endurance: 0 },
  { name: 'The Bell Lap', world: 'Crit City', distance: 2.0, elevation: 17, leadIn: 0.1, profile: 'Flat', sprint: 6, punch: 54, climb: 0, pursuit: 40, endurance: 0 },
  { name: 'Bon Voyage', world: 'France', distance: 28.2, elevation: 132, leadIn: 3.2, profile: 'Flat', sprint: 26, punch: 18, climb: 0, pursuit: 8, endurance: 48 },
  { name: 'Casse-Pattes', world: 'France', distance: 22.9, elevation: 155, leadIn: 0.9, profile: 'Hilly', sprint: 16, punch: 3, climb: 28, pursuit: 25, endurance: 27 },
  { name: 'Climb Portal - Mont Saint-Michel', world: 'France', distance: 2.5, elevation: 11, leadIn: 6.1, profile: '', sprint: 30, punch: 27, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'Croissant', world: 'France', distance: 9.3, elevation: 49, leadIn: 3.2, profile: 'Flat', sprint: 0, punch: 55, climb: 0, pursuit: 44, endurance: 2 },
  { name: 'Douce France', world: 'France', distance: 24.0, elevation: 133, leadIn: 0.8, profile: 'Flat', sprint: 24, punch: 24, climb: 0, pursuit: 24, endurance: 29 },
  { name: 'France Classic Fondo', world: 'France', distance: 145.4, elevation: 1099, leadIn: 1.0, profile: 'Hilly', sprint: 8, punch: 2, climb: 15, pursuit: 0, endurance: 75 },
  { name: 'Gentil 8', world: 'France', distance: 23.2, elevation: 243, leadIn: 2.6, profile: 'Hilly', sprint: 22, punch: 1, climb: 21, pursuit: 11, endurance: 45 },
  { name: 'Hell of the North', world: 'France', distance: 19.8, elevation: 241, leadIn: 0.3, profile: 'Hilly', sprint: 0, punch: 1, climb: 47, pursuit: 30, endurance: 21 },
  { name: 'Knights of the Roundabout', world: 'France', distance: 51.2, elevation: 336, leadIn: 3.2, profile: 'Hilly', sprint: 0, punch: 18, climb: 11, pursuit: 0, endurance: 71 },
  { name: 'La Reine', world: 'France', distance: 22.5, elevation: 1201, leadIn: 0.4, profile: 'Mountainous', sprint: 0, punch: 0, climb: 40, pursuit: 0, endurance: 60 },
  { name: 'Macaron', world: 'France', distance: 2.4, elevation: 13, leadIn: 0.2, profile: 'Flat', sprint: 35, punch: 25, climb: 0, pursuit: 40, endurance: 0 },
  { name: 'Peaky Pavé', world: 'France', distance: 30.6, elevation: 369, leadIn: 0.2, profile: 'Hilly', sprint: 0, punch: 1, climb: 39, pursuit: 0, endurance: 59 },
  { name: 'Petit Boucle', world: 'France', distance: 60.8, elevation: 483, leadIn: 0.9, profile: 'Hilly', sprint: 9, punch: 1, climb: 15, pursuit: 0, endurance: 75 },
  { name: 'Petite Douleur', world: 'France', distance: 13.9, elevation: 194, leadIn: 10.9, profile: 'Hilly', sprint: 0, punch: 0, climb: 43, pursuit: 0, endurance: 57 },
  { name: 'R.G.V.', world: 'France', distance: 24.0, elevation: 133, leadIn: 0.9, profile: 'Flat', sprint: 24, punch: 24, climb: 0, pursuit: 24, endurance: 29 },
  { name: 'Roule Ma Poule', world: 'France', distance: 22.9, elevation: 155, leadIn: 3.1, profile: 'Hilly', sprint: 0, punch: 2, climb: 43, pursuit: 14, endurance: 41 },
  { name: 'Sacre Bleu', world: 'France', distance: 71.2, elevation: 396, leadIn: 2.6, profile: 'Flat', sprint: 12, punch: 12, climb: 0, pursuit: 0, endurance: 75 },
  { name: 'Three Musketeers', world: 'France', distance: 35.2, elevation: 195, leadIn: 2.6, profile: 'Flat', sprint: 20, punch: 20, climb: 0, pursuit: 0, endurance: 60 },
  { name: 'Tire-Bouchon', world: 'France', distance: 60.8, elevation: 479, leadIn: 3.1, profile: 'Hilly', sprint: 0, punch: 1, climb: 24, pursuit: 0, endurance: 75 },
  { name: 'Ven-10', world: 'France', distance: 10.0, elevation: 780, leadIn: 1.4, profile: 'Mountainous', sprint: 0, punch: 0, climb: 49, pursuit: 33, endurance: 18 },
  { name: 'Ven-Top', world: 'France', distance: 20.7, elevation: 1535, leadIn: 0.2, profile: 'Mountainous', sprint: 0, punch: 0, climb: 38, pursuit: 0, endurance: 62 },
  { name: 'Gravel Mountain Reverse', world: 'Gravel Mountain', distance: 5.2, elevation: 53, leadIn: 0.1, profile: 'Hilly', sprint: 25, punch: 33, climb: 0, pursuit: 42, endurance: 0 },
  { name: 'Red Rock Loop', world: 'Gravel Mountain', distance: 5.2, elevation: 53, leadIn: 0.3, profile: 'Hilly', sprint: 6, punch: 52, climb: 0, pursuit: 42, endurance: 0 },
  { name: 'The Rattle Battle', world: 'Gravel Mountain', distance: 5.2, elevation: 52, leadIn: 0.3, profile: '', sprint: 6, punch: 52, climb: 0, pursuit: 42, endurance: 0 },
  { name: '2018 Worlds Short Lap', world: 'Innsbruck', distance: 23.7, elevation: 495, leadIn: 0.2, profile: 'Mountainous', sprint: 12, punch: 10, climb: 21, pursuit: 0, endurance: 57 },
  { name: 'Achterbahn', world: 'Innsbruck', distance: 47.4, elevation: 989, leadIn: 0.2, profile: 'Mountainous', sprint: 7, punch: 6, climb: 12, pursuit: 0, endurance: 75 },
  { name: 'Innsbruck KOM After Party', world: 'Innsbruck', distance: 37.0, elevation: 657, leadIn: 0.2, profile: 'Mountainous', sprint: 0, punch: 2, climb: 35, pursuit: 0, endurance: 63 },
  { name: 'InnsbruckConti', world: 'Innsbruck', distance: 12.5, elevation: 480, leadIn: 0.5, profile: 'Mountainous', sprint: 0, punch: 2, climb: 50, pursuit: 38, endurance: 10 },
  { name: 'Innsbruckring', world: 'Innsbruck', distance: 8.8, elevation: 77, leadIn: 0.2, profile: 'Flat', sprint: 14, punch: 43, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Lutscher', world: 'Innsbruck', distance: 13.7, elevation: 402, leadIn: 10.8, profile: 'Mountainous', sprint: 0, punch: 0, climb: 40, pursuit: 0, endurance: 60 },
  { name: 'Lutscher CCW', world: 'Innsbruck', distance: 13.7, elevation: 402, leadIn: 8.9, profile: 'Mountainous', sprint: 0, punch: 0, climb: 41, pursuit: 0, endurance: 59 },
  { name: 'Greater London 8', world: 'London', distance: 23.8, elevation: 276, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 3, climb: 43, pursuit: 16, endurance: 39 },
  { name: 'Greater London Flat', world: 'London', distance: 11.7, elevation: 53, leadIn: 5.6, profile: 'Flat', sprint: 26, punch: 26, climb: 0, pursuit: 39, endurance: 9 },
  { name: 'Greater London Loop', world: 'London', distance: 21.0, elevation: 255, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 6, climb: 41, pursuit: 24, endurance: 28 },
  { name: 'Greater London Loop Reverse', world: 'London', distance: 21.0, elevation: 255, leadIn: 0.2, profile: 'Hilly', sprint: 16, punch: 9, climb: 22, pursuit: 24, endurance: 29 },
  { name: 'Greatest London Flat', world: 'London', distance: 23.6, elevation: 164, leadIn: 7.4, profile: 'Flat', sprint: 22, punch: 22, climb: 0, pursuit: 0, endurance: 57 },
  { name: 'Greatest London Loop', world: 'London', distance: 25.7, elevation: 355, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 4, climb: 40, pursuit: 3, endurance: 54 },
  { name: 'Greatest London Loop Reverse', world: 'London', distance: 25.7, elevation: 355, leadIn: 0.2, profile: 'Hilly', sprint: 16, punch: 7, climb: 21, pursuit: 0, endurance: 56 },
  { name: 'Keith Hill After Party', world: 'London', distance: 36.2, elevation: 431, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 3, climb: 35, pursuit: 0, endurance: 61 },
  { name: 'Leith Hill After Party', world: 'London', distance: 41.5, elevation: 434, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 5, climb: 32, pursuit: 0, endurance: 63 },
  { name: 'London 8', world: 'London', distance: 20.3, elevation: 256, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 3, climb: 45, pursuit: 26, endurance: 26 },
  { name: 'London 8 Reverse', world: 'London', distance: 20.3, elevation: 256, leadIn: 0.2, profile: 'Hilly', sprint: 1, punch: 30, climb: 17, pursuit: 26, endurance: 26 },
  { name: 'London Calling', world: 'London', distance: 31.2, elevation: 207, leadIn: 0.5, profile: 'Rolling', sprint: 0, punch: 27, climb: 17, pursuit: 0, endurance: 57 },
  { name: 'London Classique', world: 'London', distance: 5.5, elevation: 25, leadIn: 5.6, profile: 'Flat', sprint: 8, punch: 47, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'London Classique Reverse', world: 'London', distance: 5.5, elevation: 25, leadIn: 7.5, profile: 'Flat', sprint: 27, punch: 27, climb: 0, pursuit: 43, endurance: 3 },
  { name: 'London Flat', world: 'London', distance: 12.0, elevation: 115, leadIn: 0.4, profile: 'Flat', sprint: 26, punch: 28, climb: 0, pursuit: 43, endurance: 4 },
  { name: 'London Loop', world: 'London', distance: 14.9, elevation: 231, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 3, climb: 47, pursuit: 36, endurance: 13 },
  { name: 'London Loop Reverse', world: 'London', distance: 14.8, elevation: 231, leadIn: 0.2, profile: 'Hilly', sprint: 1, punch: 30, climb: 19, pursuit: 36, endurance: 14 },
  { name: 'London PRL FULL', world: 'London', distance: 173.3, elevation: 2624, leadIn: 0.5, profile: 'Hilly', sprint: 1, punch: 13, climb: 11, pursuit: 0, endurance: 75 },
  { name: 'London PRL Half', world: 'London', distance: 69.2, elevation: 1009, leadIn: 0.5, profile: 'Hilly', sprint: 1, punch: 13, climb: 10, pursuit: 0, endurance: 75 },
  { name: 'London Uprising', world: 'London', distance: 20.6, elevation: 356, leadIn: 0.3, profile: 'Hilly', sprint: 1, punch: 2, climb: 44, pursuit: 23, endurance: 30 },
  { name: 'Surrey Hills', world: 'London', distance: 39.1, elevation: 877, leadIn: 5.0, profile: 'Hilly', sprint: 1, punch: 2, climb: 22, pursuit: 0, endurance: 75 },
  { name: 'The London Pretzel', world: 'London', distance: 55.7, elevation: 572, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 3, climb: 23, pursuit: 0, endurance: 75 },
  { name: 'Triple Loops', world: 'London', distance: 40.9, elevation: 565, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 3, climb: 30, pursuit: 0, endurance: 67 },
  { name: 'ZG25 Climb Champs', world: 'London', distance: 4.6, elevation: 156, leadIn: 0.3, profile: 'Mountainous', sprint: 2, punch: 0, climb: 55, pursuit: 42, endurance: 0 },
  { name: 'Bridges and Boardwalks', world: 'Makuri Islands', distance: 6.3, elevation: 60, leadIn: 1.9, profile: 'Rolling', sprint: 10, punch: 33, climb: 14, pursuit: 44, endurance: 0 },
  { name: 'Castle Crit', world: 'Makuri Islands', distance: 3.5, elevation: 43, leadIn: 1.5, profile: 'Rolling', sprint: 0, punch: 48, climb: 9, pursuit: 42, endurance: 0 },
  { name: 'Castle Crit Run', world: 'Makuri Islands', distance: 3.5, elevation: 43, leadIn: 1.5, profile: 'Flat', sprint: 0, punch: 48, climb: 9, pursuit: 42, endurance: 0 },
  { name: 'Castle to Castle', world: 'Makuri Islands', distance: 22.4, elevation: 140, leadIn: 0.8, profile: 'Rolling', sprint: 24, punch: 10, climb: 14, pursuit: 29, endurance: 23 },
  { name: 'Chain Chomper', world: 'Makuri Islands', distance: 13.6, elevation: 183, leadIn: 2.4, profile: 'Hilly', sprint: 17, punch: 8, climb: 25, pursuit: 35, endurance: 15 },
  { name: 'Chasing the Sun', world: 'Makuri Islands', distance: 35.1, elevation: 315, leadIn: 0.0, profile: 'Hilly', sprint: 20, punch: 4, climb: 15, pursuit: 0, endurance: 61 },
  { name: 'Country to Coastal', world: 'Makuri Islands', distance: 33.4, elevation: 274, leadIn: 0.1, profile: 'Hilly', sprint: 0, punch: 32, climb: 9, pursuit: 0, endurance: 60 },
  { name: 'Countryside Tour', world: 'Makuri Islands', distance: 15.8, elevation: 185, leadIn: 0.2, profile: 'Hilly', sprint: 15, punch: 6, climb: 29, pursuit: 36, endurance: 13 },
  { name: 'Electric Break', world: 'Makuri Islands', distance: 17.8, elevation: 190, leadIn: 1.8, profile: 'Rolling', sprint: 0, punch: 24, climb: 25, pursuit: 33, endurance: 18 },
  { name: 'Electric Loop', world: 'Makuri Islands', distance: 8.9, elevation: 42, leadIn: 0.0, profile: 'Flat', sprint: 33, punch: 24, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'Farmland Loop', world: 'Makuri Islands', distance: 7.8, elevation: 57, leadIn: 0.2, profile: 'Flat', sprint: 35, punch: 22, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'Fine and Sandy', world: 'Makuri Islands', distance: 10.7, elevation: 77, leadIn: 0.1, profile: 'Rolling', sprint: 34, punch: 21, climb: 0, pursuit: 44, endurance: 1 },
  { name: 'Flatland Loop', world: 'Makuri Islands', distance: 12.9, elevation: 99, leadIn: 0.2, profile: 'Rolling', sprint: 17, punch: 23, climb: 13, pursuit: 42, endurance: 5 },
  { name: 'Island Hopper', world: 'Makuri Islands', distance: 18.0, elevation: 129, leadIn: 0.2, profile: 'Hilly', sprint: 25, punch: 12, climb: 13, pursuit: 37, endurance: 13 },
  { name: 'Island Outskirts', world: 'Makuri Islands', distance: 11.4, elevation: 90, leadIn: 0.2, profile: 'Hilly', sprint: 20, punch: 26, climb: 8, pursuit: 44, endurance: 2 },
  { name: 'Kappa Quest', world: 'Makuri Islands', distance: 9.1, elevation: 140, leadIn: 3.8, profile: 'Hilly', sprint: 1, punch: 1, climb: 50, pursuit: 39, endurance: 10 },
  { name: 'Kappa Quest Reverse', world: 'Makuri Islands', distance: 9.1, elevation: 140, leadIn: 5.1, profile: 'Hilly', sprint: 1, punch: 0, climb: 50, pursuit: 37, endurance: 12 },
  { name: 'Kaze Kicker', world: 'Makuri Islands', distance: 16.9, elevation: 134, leadIn: 0.4, profile: 'Rolling', sprint: 25, punch: 10, climb: 15, pursuit: 37, endurance: 12 },
  { name: 'Makuri 40', world: 'Makuri Islands', distance: 40.1, elevation: 307, leadIn: 0.1, profile: 'Rolling', sprint: 0, punch: 30, climb: 6, pursuit: 0, endurance: 63 },
  { name: 'Makuri Madness', world: 'Makuri Islands', distance: 15.9, elevation: 85, leadIn: 0.1, profile: 'Flat', sprint: 31, punch: 21, climb: 0, pursuit: 39, endurance: 9 },
  { name: 'Makuri Pretzel', world: 'Makuri Islands', distance: 77.6, elevation: 618, leadIn: 1.1, profile: 'Rolling', sprint: 12, punch: 6, climb: 7, pursuit: 0, endurance: 75 },
  { name: 'Mech Isle Loop', world: 'Makuri Islands', distance: 4.0, elevation: 39, leadIn: 0.1, profile: 'Flat', sprint: 39, punch: 20, climb: 0, pursuit: 41, endurance: 0 },
  { name: 'Neokyo All-Nighter', world: 'Makuri Islands', distance: 24.3, elevation: 168, leadIn: 0.2, profile: 'Rolling', sprint: 24, punch: 19, climb: 5, pursuit: 24, endurance: 29 },
  { name: 'Neokyo Crit Course', world: 'Makuri Islands', distance: 3.9, elevation: 20, leadIn: 0.8, profile: 'Flat', sprint: 35, punch: 24, climb: 0, pursuit: 41, endurance: 0 },
  { name: 'Neon After Party', world: 'Makuri Islands', distance: 16.2, elevation: 137, leadIn: 1.1, profile: 'Rolling', sprint: 0, punch: 25, climb: 27, pursuit: 39, endurance: 9 },
  { name: 'Neon Flats', world: 'Makuri Islands', distance: 14.7, elevation: 72, leadIn: 0.3, profile: 'Flat', sprint: 31, punch: 22, climb: 0, pursuit: 42, endurance: 5 },
  { name: 'Neon Shore Loop', world: 'Makuri Islands', distance: 33.0, elevation: 253, leadIn: 1.1, profile: 'Rolling', sprint: 3, punch: 26, climb: 11, pursuit: 0, endurance: 59 },
  { name: 'Railways and Rooftops', world: 'Makuri Islands', distance: 6.2, elevation: 70, leadIn: 2.2, profile: 'Rolling', sprint: 10, punch: 31, climb: 15, pursuit: 44, endurance: 0 },
  { name: 'Red Zone Repeats', world: 'Makuri Islands', distance: 19.4, elevation: 87, leadIn: 0.2, profile: 'Flat', sprint: 29, punch: 22, climb: 0, pursuit: 36, endurance: 13 },
  { name: 'Rooftop Rendezvous', world: 'Makuri Islands', distance: 3.7, elevation: 56, leadIn: 2.9, profile: 'Rolling', sprint: 5, punch: 23, climb: 30, pursuit: 43, endurance: 0 },
  { name: 'Sea to Tree', world: 'Makuri Islands', distance: 3.3, elevation: 108, leadIn: 0.6, profile: 'Hilly', sprint: 2, punch: 0, climb: 57, pursuit: 41, endurance: 0 },
  { name: 'Shisa Shakedown', world: 'Makuri Islands', distance: 49.4, elevation: 495, leadIn: 4.0, profile: 'Hilly', sprint: 1, punch: 17, climb: 8, pursuit: 0, endurance: 74 },
  { name: 'Sleepless City', world: 'Makuri Islands', distance: 9.6, elevation: 43, leadIn: 0.1, profile: 'Flat', sprint: 32, punch: 24, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Spirit Forest', world: 'Makuri Islands', distance: 8.4, elevation: 135, leadIn: 4.6, profile: 'Hilly', sprint: 1, punch: 3, climb: 48, pursuit: 39, endurance: 9 },
  { name: "Sprinter's Playground", world: 'Makuri Islands', distance: 12.4, elevation: 67, leadIn: 0.2, profile: 'Flat', sprint: 24, punch: 31, climb: 0, pursuit: 44, endurance: 2 },
  { name: "Suki's Playground", world: 'Makuri Islands', distance: 18.3, elevation: 150, leadIn: 0.2, profile: 'Rolling', sprint: 25, punch: 2, climb: 22, pursuit: 34, endurance: 16 },
  { name: 'Temples and Towers', world: 'Makuri Islands', distance: 32.6, elevation: 318, leadIn: 0.8, profile: 'Hilly', sprint: 20, punch: 4, climb: 16, pursuit: 0, endurance: 60 },
  { name: 'Three Village Loop', world: 'Makuri Islands', distance: 10.6, elevation: 93, leadIn: 2.4, profile: 'Hilly', sprint: 26, punch: 3, climb: 24, pursuit: 41, endurance: 5 },
  { name: 'Tropic Rush', world: 'Makuri Islands', distance: 41.3, elevation: 327, leadIn: 1.6, profile: 'Rolling', sprint: 18, punch: 9, climb: 9, pursuit: 0, endurance: 65 },
  { name: 'Turf N Surf', world: 'Makuri Islands', distance: 24.6, elevation: 196, leadIn: 0.1, profile: 'Rolling', sprint: 0, punch: 36, climb: 10, pursuit: 21, endurance: 33 },
  { name: 'Twilight Harbor', world: 'Makuri Islands', distance: 6.9, elevation: 33, leadIn: 0.2, profile: 'Flat', sprint: 34, punch: 24, climb: 0, pursuit: 42, endurance: 0 },
  { name: 'Two Village Loop', world: 'Makuri Islands', distance: 12.8, elevation: 88, leadIn: 0.2, profile: 'Rolling', sprint: 18, punch: 31, climb: 4, pursuit: 42, endurance: 4 },
  { name: 'Valley to Mountaintop', world: 'Makuri Islands', distance: 5.0, elevation: 131, leadIn: 0.1, profile: 'Hilly', sprint: 1, punch: 0, climb: 57, pursuit: 42, endurance: 0 },
  { name: 'Wandering Flats', world: 'Makuri Islands', distance: 25.1, elevation: 146, leadIn: 0.1, profile: 'Rolling', sprint: 10, punch: 18, climb: 19, pursuit: 23, endurance: 30 },
  { name: '2022 Cycling Esports World Championships Route', world: 'New York', distance: 54.7, elevation: 941, leadIn: 0.2, profile: 'Hilly', sprint: 0, punch: 5, climb: 20, pursuit: 0, endurance: 75 },
  { name: 'Astoria Line 8', world: 'New York', distance: 11.6, elevation: 141, leadIn: 0.4, profile: 'Rolling', sprint: 27, punch: 24, climb: 3, pursuit: 42, endurance: 4 },
  { name: 'Avon Flyer', world: 'New York', distance: 3.3, elevation: 25, leadIn: 1.8, profile: 'Flat', sprint: 2, punch: 57, climb: 0, pursuit: 42, endurance: 0 },
  { name: 'Double Parked', world: 'New York', distance: 42.2, elevation: 330, leadIn: 0.1, profile: 'Rolling', sprint: 18, punch: 16, climb: 2, pursuit: 0, endurance: 63 },
  { name: 'Double Span Spin', world: 'New York', distance: 7.0, elevation: 80, leadIn: 5.6, profile: 'Rolling', sprint: 1, punch: 49, climb: 4, pursuit: 42, endurance: 4 },
  { name: 'Empire Elevation', world: 'New York', distance: 24.2, elevation: 261, leadIn: 1.8, profile: 'Hilly', sprint: 0, punch: 9, climb: 37, pursuit: 21, endurance: 32 },
  { name: 'Everything Bagel', world: 'New York', distance: 34.3, elevation: 545, leadIn: 0.1, profile: 'Hilly', sprint: 4, punch: 22, climb: 11, pursuit: 0, endurance: 63 },
  { name: 'Fuhgeddaboudit', world: 'New York', distance: 78.9, elevation: 838, leadIn: 0.1, profile: 'Hilly', sprint: 12, punch: 9, climb: 4, pursuit: 0, endurance: 75 },
  { name: 'Gotham Grind', world: 'New York', distance: 9.3, elevation: 96, leadIn: 0.0, profile: 'Rolling', sprint: 5, punch: 50, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Gotham Grind Reverse', world: 'New York', distance: 9.3, elevation: 96, leadIn: 0.4, profile: 'Rolling', sprint: 37, punch: 19, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Grand Central Circuit', world: 'New York', distance: 6.9, elevation: 144, leadIn: 1.4, profile: 'Hilly', sprint: 1, punch: 29, climb: 25, pursuit: 45, endurance: 0 },
  { name: 'Grand Central Circuit Reverse', world: 'New York', distance: 6.9, elevation: 144, leadIn: 2.4, profile: 'Hilly', sprint: 13, punch: 2, climb: 40, pursuit: 44, endurance: 1 },
  { name: 'Green to Screen', world: 'New York', distance: 28.4, elevation: 207, leadIn: 0.1, profile: 'Rolling', sprint: 23, punch: 19, climb: 4, pursuit: 14, endurance: 41 },
  { name: 'Hudson Hustle', world: 'New York', distance: 20.3, elevation: 216, leadIn: 0.1, profile: 'Flat', sprint: 0, punch: 48, climb: 0, pursuit: 31, endurance: 20 },
  { name: 'Issendorf Express', world: 'New York', distance: 7.2, elevation: 53, leadIn: 0.1, profile: 'Rolling', sprint: 3, punch: 54, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'Knickerbocker', world: 'New York', distance: 22.5, elevation: 365, leadIn: 0.2, profile: 'Hilly', sprint: 0, punch: 33, climb: 12, pursuit: 13, endurance: 42 },
  { name: 'Knickerbocker Reverse', world: 'New York', distance: 22.5, elevation: 365, leadIn: 0.1, profile: 'Hilly', sprint: 5, punch: 29, climb: 11, pursuit: 12, endurance: 43 },
  { name: 'LaGuardia After Party', world: 'New York', distance: 20.7, elevation: 295, leadIn: 0.1, profile: 'Hilly', sprint: 0, punch: 0, climb: 47, pursuit: 28, endurance: 24 },
  { name: 'LaGuardia Loop', world: 'New York', distance: 2.8, elevation: 26, leadIn: 1.4, profile: 'Rolling', sprint: 1, punch: 58, climb: 0, pursuit: 41, endurance: 0 },
  { name: 'LaGuardia Loop Reverse', world: 'New York', distance: 2.8, elevation: 26, leadIn: 2.4, profile: 'Rolling', sprint: 26, punch: 33, climb: 0, pursuit: 42, endurance: 0 },
  { name: 'Lady Liberty', world: 'New York', distance: 12.4, elevation: 206, leadIn: 0.3, profile: 'Hilly', sprint: 6, punch: 30, climb: 17, pursuit: 40, endurance: 7 },
  { name: 'Mighty Metropolitan', world: 'New York', distance: 20.1, elevation: 318, leadIn: 0.4, profile: 'Hilly', sprint: 0, punch: 33, climb: 14, pursuit: 23, endurance: 30 },
  { name: 'NYC KOM After Party', world: 'New York', distance: 36.6, elevation: 475, leadIn: 0.4, profile: 'Hilly', sprint: 0, punch: 15, climb: 22, pursuit: 0, endurance: 63 },
  { name: 'No Sleep Till Brooklyn', world: 'New York', distance: 31.8, elevation: 251, leadIn: 0.6, profile: 'Hilly', sprint: 1, punch: 40, climb: 3, pursuit: 0, endurance: 57 },
  { name: 'Park Perimeter Loop', world: 'New York', distance: 9.8, elevation: 126, leadIn: 0.4, profile: 'Rolling', sprint: 0, punch: 55, climb: 0, pursuit: 44, endurance: 1 },
  { name: 'Park Perimeter Reverse', world: 'New York', distance: 9.8, elevation: 126, leadIn: 0.2, profile: 'Rolling', sprint: 6, punch: 49, climb: 0, pursuit: 44, endurance: 1 },
  { name: 'Prospect Park Loop', world: 'New York', distance: 5.4, elevation: 37, leadIn: 0.1, profile: 'Rolling', sprint: 3, punch: 56, climb: 0, pursuit: 42, endurance: 0 },
  { name: 'Rising Empire', world: 'New York', distance: 20.8, elevation: 377, leadIn: 0.4, profile: 'Hilly', sprint: 0, punch: 24, climb: 22, pursuit: 19, endurance: 35 },
  { name: 'Spinfinity', world: 'New York', distance: 19.3, elevation: 155, leadIn: 0.6, profile: 'Rolling', sprint: 4, punch: 20, climb: 26, pursuit: 35, endurance: 15 },
  { name: 'Spinfinity Ultra', world: 'New York', distance: 35.0, elevation: 291, leadIn: 0.6, profile: 'Rolling', sprint: 3, punch: 18, climb: 19, pursuit: 0, endurance: 60 },
  { name: 'Stay Puft Pursuit', world: 'New York', distance: 31.2, elevation: 416, leadIn: 0.6, profile: 'Hilly', sprint: 20, punch: 5, climb: 16, pursuit: 0, endurance: 60 },
  { name: 'The 6 Train', world: 'New York', distance: 6.5, elevation: 69, leadIn: 0.1, profile: 'Rolling', sprint: 6, punch: 52, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'The 6 Train Reverse', world: 'New York', distance: 6.5, elevation: 69, leadIn: 0.4, profile: 'Rolling', sprint: 0, punch: 57, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'The Double Borough', world: 'New York', distance: 17.8, elevation: 147, leadIn: 0.1, profile: 'Rolling', sprint: 25, punch: 20, climb: 5, pursuit: 37, endurance: 12 },
  { name: 'The Greenway', world: 'New York', distance: 36.2, elevation: 290, leadIn: 0.6, profile: 'Rolling', sprint: 19, punch: 18, climb: 2, pursuit: 0, endurance: 61 },
  { name: 'The Highline', world: 'New York', distance: 10.5, elevation: 179, leadIn: 10.0, profile: 'Hilly', sprint: 0, punch: 6, climb: 41, pursuit: 23, endurance: 30 },
  { name: 'The Highline Reverse', world: 'New York', distance: 10.5, elevation: 179, leadIn: 10.5, profile: 'Hilly', sprint: 0, punch: 12, climb: 34, pursuit: 20, endurance: 33 },
  { name: 'Times Square Circuit', world: 'New York', distance: 3.5, elevation: 20, leadIn: 0.6, profile: 'Flat', sprint: 9, punch: 36, climb: 14, pursuit: 41, endurance: 0 },
  { name: 'Toefield Tornado', world: 'New York', distance: 10.2, elevation: 53, leadIn: 0.1, profile: 'Rolling', sprint: 17, punch: 38, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Watts the Limit', world: 'New York', distance: 29.5, elevation: 200, leadIn: 1.4, profile: 'Rolling', sprint: 1, punch: 43, climb: 0, pursuit: 9, endurance: 47 },
  { name: 'Champs-Élysées', world: 'Paris', distance: 6.6, elevation: 39, leadIn: 3.2, profile: 'Flat', sprint: 28, punch: 28, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Lutece Express', world: 'Paris', distance: 6.6, elevation: 39, leadIn: 3.6, profile: 'Flat', sprint: 10, punch: 46, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Cobbled Climbs', world: 'Richmond', distance: 9.2, elevation: 134, leadIn: 0.3, profile: 'Rolling', sprint: 1, punch: 40, climb: 14, pursuit: 44, endurance: 1 },
  { name: 'Cobbled Climbs Reverse', world: 'Richmond', distance: 9.2, elevation: 134, leadIn: 0.1, profile: 'Rolling', sprint: 2, punch: 38, climb: 15, pursuit: 44, endurance: 0 },
  { name: 'Cobbled Crown', world: 'Richmond', distance: 24.0, elevation: 288, leadIn: 0.3, profile: 'Rolling', sprint: 1, punch: 36, climb: 9, pursuit: 17, endurance: 37 },
  { name: 'Libby Hill After Party', world: 'Richmond', distance: 32.9, elevation: 160, leadIn: 0.3, profile: 'Rolling', sprint: 0, punch: 22, climb: 22, pursuit: 3, endurance: 53 },
  { name: 'Richmond 2015 Worlds Reverse', world: 'Richmond', distance: 16.2, elevation: 158, leadIn: 0.1, profile: 'Rolling', sprint: 26, punch: 24, climb: 2, pursuit: 39, endurance: 9 },
  { name: 'Richmond Loop Around', world: 'Richmond', distance: 42.6, elevation: 556, leadIn: 0.1, profile: 'Rolling', sprint: 1, punch: 26, climb: 6, pursuit: 0, endurance: 67 },
  { name: 'Richmond Rollercoaster', world: 'Richmond', distance: 5.1, elevation: 20, leadIn: 12.1, profile: 'Flat', sprint: 8, punch: 42, climb: 1, pursuit: 38, endurance: 11 },
  { name: 'Richmond UCI Worlds', world: 'Richmond', distance: 16.2, elevation: 158, leadIn: 0.3, profile: 'Rolling', sprint: 1, punch: 41, climb: 9, pursuit: 38, endurance: 10 },
  { name: 'The Fan Flats', world: 'Richmond', distance: 5.1, elevation: 20, leadIn: 4.2, profile: 'Flat', sprint: 16, punch: 41, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'BRAEk-fast Crits and Grits', world: 'Scotland', distance: 20.8, elevation: 226, leadIn: 1.4, profile: 'Hilly', sprint: 0, punch: 30, climb: 17, pursuit: 24, endurance: 29 },
  { name: 'City and the Sgurr', world: 'Scotland', distance: 5.9, elevation: 103, leadIn: 2.7, profile: 'Hilly', sprint: 0, punch: 33, climb: 21, pursuit: 44, endurance: 1 },
  { name: 'Dùn Dash', world: 'Scotland', distance: 12.4, elevation: 138, leadIn: 0.0, profile: 'Hilly', sprint: 0, punch: 32, climb: 22, pursuit: 43, endurance: 4 },
  { name: 'Glasgow Crit Circuit', world: 'Scotland', distance: 3.0, elevation: 33, leadIn: 0.2, profile: 'Rolling', sprint: 40, punch: 20, climb: 0, pursuit: 40, endurance: 0 },
  { name: 'Glasgow Crit Six', world: 'Scotland', distance: 18.1, elevation: 199, leadIn: 0.2, profile: 'Hilly', sprint: 35, punch: 16, climb: 0, pursuit: 37, endurance: 12 },
  { name: 'Glasgow Reverse', world: 'Scotland', distance: 3.0, elevation: 33, leadIn: 1.2, profile: 'Rolling', sprint: 7, punch: 52, climb: 0, pursuit: 41, endurance: 0 },
  { name: 'Loch Loop', world: 'Scotland', distance: 8.1, elevation: 71, leadIn: 0.0, profile: 'Rolling', sprint: 1, punch: 56, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'Outer Scotland', world: 'Scotland', distance: 11.1, elevation: 104, leadIn: 0.2, profile: 'Rolling', sprint: 27, punch: 27, climb: 0, pursuit: 44, endurance: 2 },
  { name: 'Rolling Highlands', world: 'Scotland', distance: 9.0, elevation: 77, leadIn: 5.1, profile: 'Rolling', sprint: 0, punch: 53, climb: 0, pursuit: 41, endurance: 6 },
  { name: 'Scotland After Party', world: 'Scotland', distance: 13.6, elevation: 189, leadIn: 1.1, profile: 'Hilly', sprint: 0, punch: 46, climb: 6, pursuit: 40, endurance: 7 },
  { name: 'Scotland Smash', world: 'Scotland', distance: 17.8, elevation: 167, leadIn: 0.2, profile: 'Rolling', sprint: 1, punch: 49, climb: 0, pursuit: 37, endurance: 12 },
  { name: 'The Epiloch', world: 'Scotland', distance: 8.1, elevation: 71, leadIn: 3.0, profile: 'Rolling', sprint: 1, punch: 54, climb: 0, pursuit: 44, endurance: 1 },
  { name: 'The Muckle Yin', world: 'Scotland', distance: 23.4, elevation: 282, leadIn: 0.2, profile: 'Hilly', sprint: 14, punch: 19, climb: 12, pursuit: 16, endurance: 38 },
  { name: 'Accelerate to Elevate', world: 'Watopia', distance: 41.3, elevation: 1152, leadIn: 2.3, profile: 'Mountainous', sprint: 0, punch: 0, climb: 29, pursuit: 0, endurance: 70 },
  { name: 'Beach Island Loop', world: 'Watopia', distance: 12.8, elevation: 49, leadIn: 0.2, profile: 'Flat', sprint: 27, punch: 27, climb: 0, pursuit: 44, endurance: 2 },
  { name: 'Big Flat 8', world: 'Watopia', distance: 29.2, elevation: 103, leadIn: 2.3, profile: 'Flat', sprint: 23, punch: 23, climb: 0, pursuit: 14, endurance: 41 },
  { name: 'Big Foot Hills', world: 'Watopia', distance: 67.6, elevation: 708, leadIn: 2.3, profile: 'Hilly', sprint: 12, punch: 3, climb: 10, pursuit: 0, endurance: 75 },
  { name: 'Big Loop', world: 'Watopia', distance: 42.6, elevation: 662, leadIn: 0.5, profile: 'Mountainous', sprint: 7, punch: 10, climb: 12, pursuit: 0, endurance: 71 },
  { name: 'Big Loop Reverse', world: 'Watopia', distance: 42.6, elevation: 658, leadIn: 0.2, profile: 'Mountainous', sprint: 14, punch: 3, climb: 11, pursuit: 0, endurance: 71 },
  { name: 'Bigger Loop', world: 'Watopia', distance: 53.2, elevation: 691, leadIn: 0.5, profile: 'Mountainous', sprint: 6, punch: 9, climb: 10, pursuit: 0, endurance: 75 },
  { name: 'Canopies and Coastlines', world: 'Watopia', distance: 22.6, elevation: 124, leadIn: 5.2, profile: 'Rolling', sprint: 22, punch: 5, climb: 17, pursuit: 4, endurance: 52 },
  { name: 'Climb Control', world: 'Watopia', distance: 23.7, elevation: 191, leadIn: 0.3, profile: 'Hilly', sprint: 14, punch: 16, climb: 17, pursuit: 20, endurance: 33 },
  { name: 'Climb Portal - Volcano', world: 'Watopia', distance: 7.4, elevation: 20, leadIn: 2.0, profile: 'Mountainous', sprint: 0, punch: 56, climb: 0, pursuit: 44, endurance: 0 },
  { name: "Climber's Gambit", world: 'Watopia', distance: 27.8, elevation: 671, leadIn: 0.2, profile: 'Mountainous', sprint: 1, punch: 1, climb: 37, pursuit: 0, endurance: 61 },
  { name: 'Coast Crusher', world: 'Watopia', distance: 34.6, elevation: 175, leadIn: 8.1, profile: 'Flat', sprint: 18, punch: 18, climb: 0, pursuit: 0, endurance: 63 },
  { name: 'Coast to Coast', world: 'Watopia', distance: 24.1, elevation: 154, leadIn: 2.7, profile: 'Flat', sprint: 9, punch: 36, climb: 0, pursuit: 20, endurance: 34 },
  { name: 'Coastal Crown Loop', world: 'Watopia', distance: 15.1, elevation: 185, leadIn: 8.6, profile: 'Mountainous', sprint: 1, punch: 25, climb: 21, pursuit: 23, endurance: 30 },
  { name: 'Danger Noodle', world: 'Watopia', distance: 32.1, elevation: 414, leadIn: 0.2, profile: 'Hilly', sprint: 14, punch: 5, climb: 19, pursuit: 0, endurance: 62 },
  { name: 'Deca Dash', world: 'Watopia', distance: 48.3, elevation: 484, leadIn: 4.2, profile: 'Hilly', sprint: 5, punch: 21, climb: 0, pursuit: 0, endurance: 73 },
  { name: 'Downtown Eruption', world: 'Watopia', distance: 19.4, elevation: 275, leadIn: 0.5, profile: 'Mountainous', sprint: 0, punch: 19, climb: 28, pursuit: 25, endurance: 28 },
  { name: 'Downtown Titans', world: 'Watopia', distance: 24.6, elevation: 292, leadIn: 0.9, profile: 'Hilly', sprint: 16, punch: 13, climb: 16, pursuit: 4, endurance: 52 },
  { name: 'Dust In The Wind', world: 'Watopia', distance: 52.1, elevation: 583, leadIn: 0.3, profile: 'Hilly', sprint: 12, punch: 2, climb: 10, pursuit: 0, endurance: 75 },
  { name: 'Eastern Eight', world: 'Watopia', distance: 51.7, elevation: 407, leadIn: 2.3, profile: 'Rolling', sprint: 14, punch: 2, climb: 12, pursuit: 0, endurance: 72 },
  { name: 'Elevation Evaluation', world: 'Watopia', distance: 24.6, elevation: 396, leadIn: 3.1, profile: 'Mountainous', sprint: 16, punch: 7, climb: 19, pursuit: 0, endurance: 58 },
  { name: 'Flat Out Fast', world: 'Watopia', distance: 21.4, elevation: 46, leadIn: 0.9, profile: 'Flat', sprint: 27, punch: 23, climb: 0, pursuit: 36, endurance: 14 },
  { name: 'Flat Route Reverse', world: 'Watopia', distance: 10.3, elevation: 61, leadIn: 0.2, profile: 'Flat', sprint: 28, punch: 28, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Four Horsemen', world: 'Watopia', distance: 89.8, elevation: 2109, leadIn: 0.6, profile: 'Mountainous', sprint: 12, punch: 1, climb: 12, pursuit: 0, endurance: 75 },
  { name: 'Glyph Heights', world: 'Watopia', distance: 25.4, elevation: 537, leadIn: 8.6, profile: 'Mountainous', sprint: 0, punch: 12, climb: 23, pursuit: 0, endurance: 65 },
  { name: 'Going Coastal', world: 'Watopia', distance: 16.4, elevation: 63, leadIn: 2.3, profile: 'Flat', sprint: 14, punch: 37, climb: 0, pursuit: 38, endurance: 10 },
  { name: 'Handful Of Gravel', world: 'Watopia', distance: 6.1, elevation: 75, leadIn: 4.3, profile: 'Rolling', sprint: 5, punch: 33, climb: 16, pursuit: 42, endurance: 4 },
  { name: 'Hilltop Hustle', world: 'Watopia', distance: 13.6, elevation: 336, leadIn: 2.7, profile: 'Hilly', sprint: 21, punch: 4, climb: 25, pursuit: 33, endurance: 18 },
  { name: 'Hilly Route Reverse', world: 'Watopia', distance: 9.2, elevation: 109, leadIn: 0.2, profile: 'Rolling', sprint: 13, punch: 39, climb: 3, pursuit: 44, endurance: 0 },
  { name: 'Hot Laps', world: 'Watopia', distance: 23.3, elevation: 149, leadIn: 0.2, profile: 'Rolling', sprint: 0, punch: 47, climb: 0, pursuit: 28, endurance: 24 },
  { name: 'Itza Climb Finish', world: 'Watopia', distance: 30.1, elevation: 290, leadIn: 0.9, profile: 'Hilly', sprint: 1, punch: 4, climb: 38, pursuit: 0, endurance: 57 },
  { name: 'Itza Party', world: 'Watopia', distance: 45.8, elevation: 506, leadIn: 0.5, profile: 'Hilly', sprint: 1, punch: 3, climb: 28, pursuit: 0, endurance: 69 },
  { name: 'Jarvis Seaside Sprint', world: 'Watopia', distance: 12.5, elevation: 95, leadIn: 2.8, profile: 'Rolling', sprint: 15, punch: 37, climb: 0, pursuit: 39, endurance: 9 },
  { name: 'Jungle Circuit', world: 'Watopia', distance: 7.9, elevation: 83, leadIn: 5.7, profile: 'Rolling', sprint: 21, punch: 11, climb: 21, pursuit: 40, endurance: 8 },
  { name: 'Jungle Circuit Reverse', world: 'Watopia', distance: 7.9, elevation: 83, leadIn: 6.3, profile: 'Rolling', sprint: 14, punch: 21, climb: 16, pursuit: 38, endurance: 11 },
  { name: 'Jurassic Coast', world: 'Watopia', distance: 19.3, elevation: 212, leadIn: 0.2, profile: 'Rolling', sprint: 14, punch: 12, climb: 22, pursuit: 28, endurance: 24 },
  { name: 'Legends and Lava', world: 'Watopia', distance: 24.5, elevation: 352, leadIn: 0.2, profile: 'Hilly', sprint: 0, punch: 0, climb: 44, pursuit: 9, endurance: 46 },
  { name: 'Loop de Loop', world: 'Watopia', distance: 12.4, elevation: 144, leadIn: 0.2, profile: 'Rolling', sprint: 12, punch: 28, climb: 13, pursuit: 41, endurance: 6 },
  { name: 'Loopin Lava', world: 'Watopia', distance: 14.2, elevation: 196, leadIn: 4.2, profile: 'Rolling', sprint: 24, punch: 6, climb: 18, pursuit: 31, endurance: 20 },
  { name: 'Mayan 8', world: 'Watopia', distance: 23.1, elevation: 241, leadIn: 3.1, profile: 'Hilly', sprint: 23, punch: 4, climb: 18, pursuit: 16, endurance: 38 },
  { name: 'Mayan Mash', world: 'Watopia', distance: 34.6, elevation: 755, leadIn: 3.1, profile: 'Mountainous', sprint: 16, punch: 1, climb: 15, pursuit: 0, endurance: 68 },
  { name: 'Mayan San Remo', world: 'Watopia', distance: 21.1, elevation: 217, leadIn: 0.3, profile: 'Hilly', sprint: 22, punch: 3, climb: 22, pursuit: 24, endurance: 29 },
  { name: 'Mountain Mash', world: 'Watopia', distance: 5.8, elevation: 335, leadIn: 0.2, profile: 'Mountainous', sprint: 2, punch: 0, climb: 53, pursuit: 45, endurance: 0 },
  { name: 'Muir And The Mountain', world: 'Watopia', distance: 34.1, elevation: 792, leadIn: 5.1, profile: 'Mountainous', sprint: 0, punch: 0, climb: 27, pursuit: 0, endurance: 72 },
  { name: 'Navig8', world: 'Watopia', distance: 63.9, elevation: 417, leadIn: 2.3, profile: 'Hilly', sprint: 12, punch: 4, climb: 9, pursuit: 0, endurance: 75 },
  { name: 'Ocean Lava Cliffside Loop', world: 'Watopia', distance: 19.1, elevation: 156, leadIn: 0.2, profile: 'Hilly', sprint: 25, punch: 14, climb: 11, pursuit: 34, endurance: 16 },
  { name: 'Oh Hill No', world: 'Watopia', distance: 7.9, elevation: 306, leadIn: 0.2, profile: 'Mountainous', sprint: 24, punch: 0, climb: 30, pursuit: 43, endurance: 3 },
  { name: 'Out And Back Again', world: 'Watopia', distance: 39.9, elevation: 328, leadIn: 2.3, profile: 'Hilly', sprint: 18, punch: 4, climb: 14, pursuit: 0, endurance: 64 },
  { name: 'Peak Performance', world: 'Watopia', distance: 45.8, elevation: 726, leadIn: 0.9, profile: 'Mountainous', sprint: 10, punch: 5, climb: 13, pursuit: 0, endurance: 73 },
  { name: 'Power Punches', world: 'Watopia', distance: 23.5, elevation: 205, leadIn: 0.2, profile: 'Rolling', sprint: 10, punch: 37, climb: 0, pursuit: 21, endurance: 33 },
  { name: 'Power to the Portal', world: 'Watopia', distance: 17.6, elevation: 99, leadIn: 0.9, profile: 'Rolling', sprint: 18, punch: 33, climb: 0, pursuit: 37, endurance: 12 },
  { name: 'Power to the Tower', world: 'Watopia', distance: 44.7, elevation: 1493, leadIn: 0.9, profile: 'Mountainous', sprint: 0, punch: 1, climb: 24, pursuit: 0, endurance: 75 },
  { name: 'Quatch Quest', world: 'Watopia', distance: 46.5, elevation: 1706, leadIn: 0.3, profile: 'Mountainous', sprint: 0, punch: 0, climb: 24, pursuit: 0, endurance: 75 },
  { name: 'Radio Rendezvous', world: 'Watopia', distance: 20.5, elevation: 736, leadIn: 3.1, profile: 'Mountainous', sprint: 0, punch: 0, climb: 43, pursuit: 0, endurance: 57 },
  { name: 'Repack Rush', world: 'Watopia', distance: 2.8, elevation: 28, leadIn: 0.0, profile: 'Flat', sprint: 39, punch: 20, climb: 0, pursuit: 40, endurance: 0 },
  { name: 'Road To Ruins Reverse', world: 'Watopia', distance: 29.6, elevation: 275, leadIn: 0.2, profile: 'Rolling', sprint: 21, punch: 9, climb: 12, pursuit: 0, endurance: 58 },
  { name: 'Road to Ruins', world: 'Watopia', distance: 29.6, elevation: 275, leadIn: 0.5, profile: 'Rolling', sprint: 10, punch: 16, climb: 15, pursuit: 0, endurance: 58 },
  { name: 'Road to Sky', world: 'Watopia', distance: 17.5, elevation: 1044, leadIn: 0.1, profile: 'Mountainous', sprint: 0, punch: 0, climb: 43, pursuit: 0, endurance: 57 },
  { name: 'Sand And Sequoias', world: 'Watopia', distance: 20.1, elevation: 175, leadIn: 2.3, profile: 'Hilly', sprint: 15, punch: 9, climb: 24, pursuit: 27, endurance: 25 },
  { name: 'Seaside Sprint', world: 'Watopia', distance: 6.3, elevation: 47, leadIn: 3.0, profile: 'Flat', sprint: 1, punch: 54, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Serpentine 8', world: 'Watopia', distance: 19.3, elevation: 206, leadIn: 7.4, profile: 'Rolling', sprint: 6, punch: 26, climb: 11, pursuit: 0, endurance: 58 },
  { name: 'Shorelines and Summits', world: 'Watopia', distance: 46.2, elevation: 773, leadIn: 4.2, profile: 'Mountainous', sprint: 3, punch: 12, climb: 10, pursuit: 0, endurance: 75 },
  { name: 'Snowman', world: 'Watopia', distance: 44.0, elevation: 578, leadIn: 0.2, profile: 'Mountainous', sprint: 15, punch: 2, climb: 13, pursuit: 0, endurance: 70 },
  { name: 'Southern Coast Cruise', world: 'Watopia', distance: 23.6, elevation: 136, leadIn: 2.7, profile: 'Rolling', sprint: 7, punch: 40, climb: 0, pursuit: 23, endurance: 30 },
  { name: 'Spiral into the Volcano', world: 'Watopia', distance: 55.6, elevation: 355, leadIn: 0.2, profile: 'Hilly', sprint: 0, punch: 7, climb: 23, pursuit: 0, endurance: 70 },
  { name: 'Sugar Cookie', world: 'Watopia', distance: 33.6, elevation: 250, leadIn: 5.7, profile: 'Rolling', sprint: 18, punch: 8, climb: 10, pursuit: 0, endurance: 63 },
  { name: 'Tair Dringfa Fechan', world: 'Watopia', distance: 31.1, elevation: 372, leadIn: 0.9, profile: 'Hilly', sprint: 0, punch: 4, climb: 36, pursuit: 0, endurance: 60 },
  { name: 'Temple Trek', world: 'Watopia', distance: 6.5, elevation: 25, leadIn: 4.2, profile: 'Flat', sprint: 8, punch: 47, climb: 0, pursuit: 43, endurance: 2 },
  { name: 'Tempus Fugit', world: 'Watopia', distance: 17.2, elevation: 26, leadIn: 2.4, profile: 'Flat', sprint: 27, punch: 25, climb: 0, pursuit: 39, endurance: 9 },
  { name: 'The Big Ring', world: 'Watopia', distance: 48.9, elevation: 268, leadIn: 2.3, profile: 'Rolling', sprint: 16, punch: 11, climb: 5, pursuit: 0, endurance: 67 },
  { name: 'The Classic', world: 'Watopia', distance: 4.8, elevation: 48, leadIn: 4.2, profile: 'Rolling', sprint: 11, punch: 44, climb: 1, pursuit: 44, endurance: 0 },
  { name: 'The Magnificent 8', world: 'Watopia', distance: 28.9, elevation: 155, leadIn: 0.2, profile: 'Rolling', sprint: 23, punch: 14, climb: 9, pursuit: 15, endurance: 40 },
  { name: 'The Mega Pretzel', world: 'Watopia', distance: 107.3, elevation: 1638, leadIn: 3.7, profile: 'Mountainous', sprint: 7, punch: 8, climb: 10, pursuit: 0, endurance: 75 },
  { name: 'The Uber Pretzel', world: 'Watopia', distance: 128.3, elevation: 2380, leadIn: 0.5, profile: 'Mountainous', sprint: 0, punch: 1, climb: 23, pursuit: 0, endurance: 75 },
  { name: 'Three Little Sisters', world: 'Watopia', distance: 37.7, elevation: 435, leadIn: 0.7, profile: 'Hilly', sprint: 8, punch: 12, climb: 14, pursuit: 0, endurance: 65 },
  { name: 'Three Sisters', world: 'Watopia', distance: 48.0, elevation: 896, leadIn: 0.5, profile: 'Mountainous', sprint: 12, punch: 1, climb: 11, pursuit: 0, endurance: 75 },
  { name: 'Three Sisters Reverse', world: 'Watopia', distance: 45.7, elevation: 878, leadIn: 0.2, profile: 'Mountainous', sprint: 4, punch: 5, climb: 15, pursuit: 0, endurance: 75 },
  { name: 'Three Step Sisters', world: 'Watopia', distance: 37.9, elevation: 586, leadIn: 0.2, profile: 'Mountainous', sprint: 0, punch: 5, climb: 31, pursuit: 0, endurance: 63 },
  { name: 'Tick Tock', world: 'Watopia', distance: 16.9, elevation: 53, leadIn: 2.3, profile: 'Flat', sprint: 26, punch: 26, climb: 0, pursuit: 39, endurance: 9 },
  { name: 'Tides and Temples', world: 'Watopia', distance: 36.5, elevation: 460, leadIn: 2.7, profile: 'Mountainous', sprint: 17, punch: 2, climb: 15, pursuit: 0, endurance: 66 },
  { name: 'Tour of Fire and Ice', world: 'Watopia', distance: 25.4, elevation: 1164, leadIn: 2.8, profile: 'Mountainous', sprint: 0, punch: 0, climb: 35, pursuit: 0, endurance: 64 },
  { name: 'Triple Flat Loops', world: 'Watopia', distance: 34.0, elevation: 157, leadIn: 2.3, profile: 'Flat', sprint: 21, punch: 21, climb: 0, pursuit: 0, endurance: 58 },
  { name: 'Triple Twist', world: 'Watopia', distance: 19.9, elevation: 180, leadIn: 4.6, profile: 'Rolling', sprint: 16, punch: 29, climb: 2, pursuit: 20, endurance: 33 },
  { name: 'Two Bridges Loop', world: 'Watopia', distance: 7.1, elevation: 81, leadIn: 0.2, profile: 'Rolling', sprint: 7, punch: 50, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'Volcano Circuit', world: 'Watopia', distance: 4.1, elevation: 20, leadIn: 2.8, profile: 'Flat', sprint: 9, punch: 48, climb: 0, pursuit: 42, endurance: 0 },
  { name: 'Volcano Circuit CCW', world: 'Watopia', distance: 4.1, elevation: 20, leadIn: 4.8, profile: 'Flat', sprint: 0, punch: 57, climb: 0, pursuit: 43, endurance: 0 },
  { name: 'Volcano Climb', world: 'Watopia', distance: 22.9, elevation: 203, leadIn: 0.5, profile: 'Hilly', sprint: 23, punch: 2, climb: 22, pursuit: 22, endurance: 32 },
  { name: 'Volcano Climb After Party', world: 'Watopia', distance: 39.9, elevation: 285, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 3, climb: 36, pursuit: 0, endurance: 61 },
  { name: 'Volcano Flat', world: 'Watopia', distance: 12.3, elevation: 50, leadIn: 0.5, profile: 'Flat', sprint: 14, punch: 41, climb: 0, pursuit: 44, endurance: 2 },
  { name: 'Volcano Flat Reverse', world: 'Watopia', distance: 12.3, elevation: 50, leadIn: 0.2, profile: 'Flat', sprint: 27, punch: 27, climb: 0, pursuit: 44, endurance: 1 },
  { name: 'WBR Climbing Series', world: 'Watopia', distance: 43.2, elevation: 1116, leadIn: 0.5, profile: 'Mountainous', sprint: 0, punch: 0, climb: 25, pursuit: 0, endurance: 75 },
  { name: 'Waisted 8', world: 'Watopia', distance: 30.7, elevation: 144, leadIn: 0.2, profile: 'Flat', sprint: 22, punch: 22, climb: 0, pursuit: 11, endurance: 44 },
  { name: 'Watopia Figure 8', world: 'Watopia', distance: 29.7, elevation: 254, leadIn: 0.5, profile: 'Rolling', sprint: 17, punch: 23, climb: 3, pursuit: 0, endurance: 57 },
  { name: 'Watopia Figure 8 Reverse', world: 'Watopia', distance: 29.7, elevation: 254, leadIn: 0.2, profile: 'Rolling', sprint: 22, punch: 18, climb: 4, pursuit: 0, endurance: 57 },
  { name: 'Watopia Flat Route', world: 'Watopia', distance: 10.3, elevation: 61, leadIn: 0.5, profile: 'Flat', sprint: 33, punch: 23, climb: 0, pursuit: 44, endurance: 0 },
  { name: 'Watopia Hilly Route', world: 'Watopia', distance: 9.2, elevation: 109, leadIn: 0.5, profile: 'Rolling', sprint: 21, punch: 29, climb: 5, pursuit: 44, endurance: 1 },
  { name: 'Watopia Mountain 8', world: 'Watopia', distance: 32.3, elevation: 691, leadIn: 0.5, profile: 'Mountainous', sprint: 15, punch: 3, climb: 17, pursuit: 0, endurance: 66 },
  { name: 'Watopia Mountain Route', world: 'Watopia', distance: 29.7, elevation: 683, leadIn: 0.5, profile: 'Mountainous', sprint: 18, punch: 1, climb: 17, pursuit: 0, endurance: 64 },
  { name: 'Watopia Pretzel', world: 'Watopia', distance: 72.5, elevation: 1361, leadIn: 0.5, profile: 'Mountainous', sprint: 12, punch: 2, climb: 11, pursuit: 0, endurance: 75 },
  { name: "Watopia's Waistband", world: 'Watopia', distance: 25.5, elevation: 95, leadIn: 2.3, profile: 'Flat', sprint: 23, punch: 23, climb: 0, pursuit: 23, endurance: 30 },
  { name: 'Watts of the Wild', world: 'Watopia', distance: 42.0, elevation: 309, leadIn: 0.2, profile: 'Hilly', sprint: 18, punch: 6, climb: 12, pursuit: 0, endurance: 64 },
  { name: 'Whole Lotta Lava', world: 'Watopia', distance: 12.3, elevation: 161, leadIn: 4.8, profile: 'Hilly', sprint: 0, punch: 30, climb: 20, pursuit: 34, endurance: 16 },
  { name: 'ZG25 Queen', world: 'Watopia', distance: 44.6, elevation: 894, leadIn: 0.2, profile: 'Mountainous', sprint: 1, punch: 1, climb: 25, pursuit: 0, endurance: 73 },
  { name: 'Zwift Bambino Fondo', world: 'Watopia', distance: 51.9, elevation: 580, leadIn: 0.5, profile: 'Hilly', sprint: 0, punch: 3, climb: 23, pursuit: 0, endurance: 73 },
  { name: 'Zwift Bambino Fondo 2022', world: 'Watopia', distance: 53.1, elevation: 397, leadIn: 0.2, profile: 'Hilly', sprint: 0, punch: 5, climb: 25, pursuit: 0, endurance: 69 },
  { name: 'Zwift Games 2024 Epic', world: 'Watopia', distance: 79.7, elevation: 822, leadIn: 1.9, profile: 'Hilly', sprint: 0, punch: 12, climb: 13, pursuit: 0, endurance: 75 },
  { name: 'Zwift Gran Fondo', world: 'Watopia', distance: 97.5, elevation: 1193, leadIn: 0.5, profile: 'Mountainous', sprint: 0, punch: 3, climb: 22, pursuit: 0, endurance: 75 },
  { name: 'Zwift Gran Fondo 2022', world: 'Watopia', distance: 92.6, elevation: 1114, leadIn: 0.2, profile: 'Mountainous', sprint: 1, punch: 2, climb: 22, pursuit: 0, endurance: 75 },
  { name: 'Zwift Medio Fondo', world: 'Watopia', distance: 72.5, elevation: 1006, leadIn: 0.5, profile: 'Mountainous', sprint: 0, punch: 2, climb: 23, pursuit: 0, endurance: 75 },
  { name: 'Zwift Medio Fondo 2022', world: 'Watopia', distance: 79.1, elevation: 918, leadIn: 0.2, profile: 'Mountainous', sprint: 0, punch: 2, climb: 23, pursuit: 0, endurance: 75 },
  { name: '2019 Worlds Harrogate Circuit', world: 'Yorkshire', distance: 13.8, elevation: 245, leadIn: 0.1, profile: 'Hilly', sprint: 0, punch: 44, climb: 6, pursuit: 37, endurance: 13 },
  { name: 'Duchy Estate', world: 'Yorkshire', distance: 3.0, elevation: 41, leadIn: 1.7, profile: 'Rolling', sprint: 0, punch: 58, climb: 0, pursuit: 42, endurance: 0 },
  { name: 'Harrogate Circuit Reverse', world: 'Yorkshire', distance: 13.8, elevation: 245, leadIn: 0.0, profile: 'Hilly', sprint: 9, punch: 22, climb: 19, pursuit: 36, endurance: 14 },
  { name: "Queen's Highway", world: 'Yorkshire', distance: 3.0, elevation: 41, leadIn: 2.7, profile: 'Rolling', sprint: 0, punch: 57, climb: 0, pursuit: 43, endurance: 0 },
  { name: "Queen's Highway After Party", world: 'Yorkshire', distance: 17.1, elevation: 259, leadIn: 2.8, profile: 'Hilly', sprint: 0, punch: 31, climb: 15, pursuit: 22, endurance: 31 },
  { name: 'Royal Pump Room 8', world: 'Yorkshire', distance: 27.7, elevation: 491, leadIn: 0.0, profile: 'Hilly', sprint: 7, punch: 13, climb: 19, pursuit: 0, endurance: 61 },
  { name: 'Tour Of Tewit Well', world: 'Yorkshire', distance: 10.9, elevation: 205, leadIn: 0.0, profile: 'Hilly', sprint: 10, punch: 22, climb: 21, pursuit: 41, endurance: 7 },
  { name: 'Yorkshire Double Loop', world: 'Yorkshire', distance: 29.6, elevation: 547, leadIn: 0.0, profile: 'Hilly', sprint: 0, punch: 22, climb: 15, pursuit: 0, endurance: 62 }
];

// Give each route an id and initialize as selected
let courses = ZWIFT_ROUTES.map((r, i) => ({ ...r, id: i + 1, selected: true, custom: false }));
let opponentTeam = null; 

function setOpponent(type) {
  const wkg = parseFloat(document.getElementById(`opp-wkg-${type}`).value);
  const weight = parseFloat(document.getElementById(`opp-weight-${type}`).value);

  if (isNaN(wkg) || isNaN(weight)) {
    alert("Please enter both W/kg and weight.");
    return;
  }

  // Vi omregner W/kg til en score (0-100) hvor 6.0 W/kg er top
  const score = Math.min(100, Math.round((wkg / 6.0) * 100));

  opponentTeam = {
    name: "Opponent " + type.toUpperCase(),
    tt: score,
    climber: score,
    sprint: score, 
    punch: score,
    avgWeight: weight,
    rawFtp: Math.round(wkg * weight) // Den kritiske værdi for flade ruter!
  };

  alert(`Opponent ${type.toUpperCase()} activated: ${opponentTeam.rawFtp}W FTP`);
  runMatch(); 
}

let activeWorlds = new Set(['All']); // supports multi-select; 'All' means no world filter
let searchTerm = '';
let maxDist = 25; // km — default filter

// ═══════════════════════════════════════════════════════
// FINGERPRINT ENGINE
// ═══════════════════════════════════════════════════════

// Returns the dominant route dimension, correcting for vELO "pursuit" (fp.tt) semantics.
// Pursuit = sustained 3-8 min aerobic power — NOT flat TT.
// When punch is nearly as high as pursuit, the route is punchy/aerobic, not a TT.
// When climber is nearly as high as pursuit, the route is a climbing route.
function getDominant(fp) {
  const keys = ['climber','punch','tt','sprint','medium','endurance'];
  const base = keys.reduce((a,b) => (fp[a]||0) > (fp[b]||0) ? a : b);
  if (base === 'tt') {
    if ((fp.punch   || 0) >= (fp.tt || 0) * 0.75) return 'punch';
    if ((fp.climber || 0) >= (fp.tt || 0) * 0.75) return 'climber';
  }
  return base;
}

// Uses the pre-defined route profile from zwiftracing (Flat/Rolling/Hilly/Mountainous)
// rather than deriving type from vELO weights. Falls back to getDominant(fp) if unknown.
function getProfileDominant(course, fp) {
  const profileMap = { Flat: 'tt', Rolling: 'punch', Hilly: 'medium', Mountainous: 'climber' };
  if (course && course.profile && profileMap[course.profile]) {
    return profileMap[course.profile];
  }
  return fp ? getDominant(fp) : null;
}

function getCourseFingerprint(c) {
  // Routes with explicit pre-set weights (new format from velo_weights file)
  if (c.pursuit != null) {
    return {
      tt:        Math.round(c.pursuit),
      sprint:    Math.round(c.sprint),
      punch:     Math.round(c.punch),
      medium:    0,
      climber:   Math.round(c.climb),
      endurance: Math.round(c.endurance)
    };
  }
  // Legacy computed fingerprint (fallback for custom routes without explicit weights)
  const elevPerKm   = c.elevation / c.distance;
  const flatRatio   = Math.min(1, (c.flatKm||0) / c.distance);
  const punchFactor = Math.min(1, (c.punches||0) / 8);
  const ttDistPenalty = Math.max(0, (20 - c.distance) * 3.0);
  const tt = Math.max(0, Math.min(100,
    85 * flatRatio
    - elevPerKm * 5
    - (c.punches||0) * 4
    + 10
    - ttDistPenalty
  ));
  const sprint = Math.max(0, Math.min(100,
    flatRatio * 75
    + punchFactor * 10
    - elevPerKm * 6
    - (c.punches||0) * 3
  ));
  const punch = Math.max(0, Math.min(100,
    punchFactor * 65
    + Math.min(25, elevPerKm * 4)
    - flatRatio * 10
    - Math.max(0, elevPerKm - 10) * 2
  ));
  const medium = Math.max(0, Math.min(100,
    Math.min(50, elevPerKm * 3)
    + punchFactor * 40
    - flatRatio * 20
    - Math.max(0, 12 - elevPerKm) * 3
    - Math.max(0, elevPerKm - 35) * 2
  ));
  const elevBonus = Math.min(30, c.elevation / 40);
  const punchPenalty = punchFactor * 60 * Math.max(0, 1 - c.elevation / 800);
  const climber = Math.max(0, Math.min(100,
    elevPerKm * 5
    + c.elevation / 200
    - flatRatio * 15
    - punchPenalty
    + elevBonus
  ));
  return {
    tt:        Math.round(tt),
    sprint:    Math.round(sprint),
    punch:     Math.round(punch),
    medium:    Math.round(medium),
    climber:   Math.round(climber),
    endurance: 0
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// RIDER POWER HELPERS
// getRiderWatts: returns the best available watt value for a given duration.
// Prefers measured curve data (w1min, w5min etc.) over wkg×weight estimates.
// ─────────────────────────────────────────────────────────────────────────────
function getRiderWatts(r, key) {
  // key: 'sprint'(5s) | '30s' | '1min' | '2min' | '5min' | '10min' | '20min' | '30min' | 'ftp'
  // Guard against undefined wkg fields so we never produce NaN
  const sprint   = r.sprint   || 0;
  const oneMin   = r.oneMin   || 0;
  const fiveMin  = r.fiveMin  || 0;
  const twentyMin= r.twentyMin|| 0;
  const weight   = r.weight   || 70;
  const map = {
    sprint: r.w5s   ?? Math.round(sprint   * weight),
    w15s:   r.w15s  ?? Math.round(sprint   * weight * 0.82),
    w30s:   r.w30s  ?? Math.round(sprint   * weight * 0.65),
    w1min:  r.w1min ?? Math.round(oneMin   * weight),
    w2min:  r.w2min ?? Math.round(oneMin   * weight * 0.88),
    w5min:  r.w5min ?? Math.round(fiveMin  * weight),
    w10min: r.w10min?? Math.round(fiveMin  * weight * 0.92),
    w20min: r.w20min?? Math.round(twentyMin* weight),
    w30min: r.w30min?? Math.round(twentyMin* weight * 0.96),
    ftp:    r.watt  ?? Math.round(twentyMin* weight)
  };
  return map[key] ?? map.ftp;
}

// Returns true if rider has measured power curve data
function hasCurveData(r) {
  return !!(r.w5s || r.w1min || r.w5min);
}

// Normalise a watt value to 0-100 score given reference peak watts
// References based on top Cat B / strong Cat C Zwift racers
const WATT_REF = {
  sprint: 1200,  // 5s peak ~1200W = score 100 (Cat A top level)
  w1min:  700,   // 1min ~700W
  w2min:  600,
  w5min:  500,   // 5min ~500W
  w10min: 450,
  w20min: 420,   // FTP ~420W
  w30min: 400,
  ftp:    420
};

function normWatts(watts, key) {
  return Math.round((watts / (WATT_REF[key] || 340)) * 100);
}

function getTeamProfile() {
  const selectedRiders = riders.filter(r => r.selected);
  if (!selectedRiders.length) return null;
  
  const avg = key => selectedRiders.reduce((s, r) => s + (r[key] || 0), 0) / selectedRiders.length;
  const avgW = key => selectedRiders.reduce((s, r) => s + getRiderWatts(r, key), 0) / selectedRiders.length;
  
  const sprintAvg   = avg('sprint');
  const oneMinAvg   = avg('oneMin');
  const fiveMinAvg  = avg('fiveMin');
  const ftpAvg      = avg('twentyMin');

  // Use real watt curve averages for scoring when available
  const avgW5min  = avgW('w5min');
  const avgW1min  = avgW('w1min');
  const avgWSprint= avgW('sprint');
  const avgWFtp   = avgW('ftp');

  // Hybrid scoring: blend wkg-based and watt-based scores
  const ttScore      = Math.round(((ftpAvg / 6.0) * 100 * 0.20) + (normWatts(avgWFtp,   'ftp')    * 0.80));  // flat: 20% wkg, 80% watt
  const sprintScore  = Math.round(((sprintAvg / 20.0) * 100 * 0.05) + (normWatts(avgWSprint,'sprint') * 0.95));  // sprint: 5% wkg, 95% watt
  const punchScore   = Math.round(((oneMinAvg / 9.5) * 100 * 0.45) + ((ftpAvg / 6.0) * 100 * 0.25) + (normWatts(avgW1min, 'w1min') * 0.30));  // punch: 45% 1min wkg + 25% ftp wkg + 30% watt
  const mediumScore  = Math.round(((ftpAvg / 5.5) * 100 * 0.50) + ((fiveMinAvg / 8.5) * 100 * 0.30) + (normWatts(avgWFtp, 'ftp') * 0.20));  // medium: 50% FTP wkg + 30% 5min wkg + 20% FTP watt
  const climberScore = Math.round(((ftpAvg / 5.5) * 100 * 0.90) + (normWatts(avgWFtp, 'ftp') * 0.10));  // climb: 90% FTP wkg (ref 5.5), 10% FTP watt

  return {
    tt:      ttScore,
    sprint:  sprintScore,
    punch:   punchScore,
    medium:  mediumScore,
    climber: climberScore,
    raw: {
      sprint:  sprintAvg.toFixed(1),
      oneMin:  oneMinAvg.toFixed(1),
      fiveMin: fiveMinAvg.toFixed(1),
      ftp:     ftpAvg.toFixed(2),
      wFtp:    Math.round(avgWFtp),
      wSprint: Math.round(avgWSprint),
      w1min:   Math.round(avgW1min),
      w5min:   Math.round(avgW5min)
    }
  };
}

function matchScore(team, course) {
  const fp = getCourseFingerprint(course);

  // How flat vs climbing is this course? (0=pure climb, 1=pure flat)
  const flatness = fp.tt / (fp.tt + fp.climber + fp.medium + 1);

  // Flat courses: absolute watts matter (heavy rider with 400W beats light rider with 315W)
  // Climb courses: W/kg matters (light rider with 4.5 W/kg beats heavy rider with 3.8)
  // Use raw averages if available, else fall back to profile dimensions

  let flatScore, climbScore;
  if (team.avgFtpW !== undefined) {
    // Physics-accurate: normalise against reference values
    flatScore  = Math.min(100, (team.avgFtpW   / 400) * 100); // 400W FTP = score 100
    climbScore = Math.min(100, (team.avgFtpWkg / 5.5) * 100); // 5.5 W/kg FTP = score 100
  } else {
    flatScore  = team.tt;
    climbScore = team.climber;
  }

  // Blend flat and climb score based on course character
  // Also factor in sprint and punch with their respective scores
  const sprintScore = team.sprint;
  const punchScore  = team.punch;
  const mediumScore = Math.min(100, (team.avgFtpWkg || team.medium / 5.5) / 5.5 * 100);

  const fpTotal = fp.tt + fp.sprint + fp.punch + fp.medium + fp.climber || 1;
  const score =
    (fp.tt      / fpTotal) * flatScore  +
    (fp.sprint  / fpTotal) * sprintScore +
    (fp.punch   / fpTotal) * punchScore +
    (fp.medium  / fpTotal) * (climbScore * 0.6 + flatScore * 0.4) +
    (fp.climber / fpTotal) * climbScore;

  return { score: Math.round(score * 10), fp };
}

// ── Race Metrics: beregner 6 performance-indikatorer fra ladder race historik ──
function calcRaceMetrics(races) {
  if (!races || !races.length) return null;
  const valid = races.filter(r => r.wkg1200 > 0 && r.wkg60 > 0 && r.avg_wkg > 0);
  const n = valid.length;
  if (n < 5) return null;

  const avg = arr => arr.reduce((s, x) => s + x, 0) / arr.length;
  const cv  = arr => { const a = avg(arr); if (!a) return 0; return Math.sqrt(avg(arr.map(x => (x - a) ** 2))) / a * 100; };
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function scale(v, vlo, vhi, slo, shi) {
    if (vhi === vlo) return (slo + shi) / 2;
    return clamp(slo + (v - vlo) / (vhi - vlo) * (shi - slo), Math.min(slo, shi), Math.max(slo, shi));
  }

  // Punch: avg(wkg5/wkg1200) ratio
  const punchData = valid.filter(r => r.wkg5 > 0);
  const avgPunch  = punchData.length ? avg(punchData.map(r => r.wkg5 / r.wkg1200)) : null;

  // VO₂ stability: avg(wkg300/wkg1200) + CV penalty
  const vo2Data  = valid.filter(r => r.wkg300 > 0);
  const avgVo2   = vo2Data.length ? avg(vo2Data.map(r => r.wkg300 / r.wkg1200)) : null;
  const cvVo2    = vo2Data.length ? cv(vo2Data.map(r => r.wkg300)) : null;

  // Repeatability: avg(wkg60/wkg120) + CV penalty
  const repData     = valid.filter(r => r.wkg120 > 0);
  const repeatRatios = repData.map(r => r.wkg60 / r.wkg120);
  const avgRepeat   = repData.length ? avg(repeatRatios) : null;
  const cvRepeat    = repData.length ? cv(repeatRatios) : null;

  // Pacing: avg(wkg60/avg_wkg) — lower = better paced
  const pacingRatios = valid.map(r => r.wkg60 / r.avg_wkg);
  const avgPacing    = avg(pacingRatios);

  // End sprint proxy: top-5% i velpackede løb vs overall
  const wellPaced        = valid.filter(r => r.wkg60 / r.avg_wkg < avgPacing);
  const wellPacedTop5pct = wellPaced.length ? wellPaced.filter(r => r.pos && r.pos <= 5).length / wellPaced.length : 0;
  const overallTop5pct   = valid.filter(r => r.pos && r.pos <= 5).length / n;
  const endSprintDelta   = wellPacedTop5pct - overallTop5pct;

  // Fatigue resistance: CV af wkg1200
  const cvFatigue = cv(valid.map(r => r.wkg1200));

  // Scores 1-10
  const punchScore = avgPunch != null ? Math.round(scale(avgPunch, 1.4, 3.5, 2, 10)) : null;

  let vo2Score = null;
  if (avgVo2 != null) {
    const base    = Math.round(scale(avgVo2, 1.05, 1.28, 3, 10));
    const penalty = cvVo2 != null ? Math.round(clamp(cvVo2 / 4, 0, 2)) : 0;
    vo2Score = clamp(base - penalty, 1, 10);
  }

  const pacingScore = Math.round(scale(avgPacing, 2.2, 1.3, 2, 10));

  let repeatScore = null;
  if (avgRepeat != null) {
    const base    = Math.round(scale(avgRepeat, 1.4, 1.05, 2, 9));
    const penalty = Math.round(clamp((cvRepeat || 0) / 5, 0, 2));
    repeatScore = clamp(base - penalty, 1, 10);
  }

  const endSprintScore = clamp(5 + Math.round(endSprintDelta * 8) + (avgPunch != null ? Math.round(avgPunch - 2.0) : 0), 1, 10);
  const fatigueScore   = Math.round(scale(cvFatigue, 15, 2, 2, 10));

  // Key insights (max 3)
  const insights = [];
  if (punchScore != null && punchScore >= 8) insights.push(`Extremely explosive — ${avgPunch.toFixed(1)}× sprint/FTP`);
  else if (punchScore != null && punchScore <= 4) insights.push(`Limited sprint — ${avgPunch.toFixed(1)}× sprint/FTP`);
  if (repeatScore != null && repeatScore <= 4) insights.push(`Fades quickly after spikes — ${avgRepeat.toFixed(2)} 1min/2min ratio`);
  else if (repeatScore != null && repeatScore >= 8) insights.push(`Good repeatability — maintains power after repeated spikes`);
  if (pacingScore <= 4) insights.push(`Aggressive start — ${avgPacing.toFixed(2)} 1min/AVG, burns reserves early`);
  else if (pacingScore >= 8) insights.push(`Even pacing — ${avgPacing.toFixed(2)} 1min/AVG ratio`);
  if (fatigueScore <= 4) insights.push(`Unstable FTP output — ${cvFatigue.toFixed(1)}% variation in 20min power`);
  else if (fatigueScore >= 8) insights.push(`Stable FTP engine — ${cvFatigue.toFixed(1)}% CV on 20min`);

  const confidence      = n < 5 ? 'low' : n < 10 ? 'medium' : 'high';
  const confidenceLabel = n < 5 ? `⚠ ${n} races — low confidence` : n < 10 ? `${n} races — moderate` : `${n} races — good data`;
  const confidenceColor = n < 5 ? '#ff9f43' : n < 10 ? 'var(--accent)' : 'var(--accent3)';

  return {
    n, confidence, confidenceLabel, confidenceColor,
    scores: { punch: punchScore, vo2: vo2Score, pacing: pacingScore, repeatability: repeatScore, endSprint: endSprintScore, fatigue: fatigueScore },
    ratios: { punch: avgPunch, vo2: avgVo2, pacing: avgPacing, repeat: avgRepeat, fatigue: cvFatigue },
    insights: insights.slice(0, 3)
  };
}

function scoreRiderForCourse(r, fp) {
  // vELO2 fast path: use zwiftracing.app factor ratings when available
  if (r.velo_sprint != null) {
    function normV(v) { return Math.min(100, Math.max(0, (v - 400) / 5)); }
    const vs  = normV(r.velo_sprint);
    const vp  = normV(r.velo_punch);
    const vc  = normV(r.velo_climb);
    const vpr = normV(r.velo_pursuit);
    const vtt = normV(r.velo_tt);
    const ven = normV(r.velo_endurance);
    return Math.round(
      fp.sprint    * vs  * 0.01 +
      fp.punch     * vp  * 0.01 +
      fp.climber   * vc  * 0.01 +
      fp.medium    * vpr * 0.01 +
      fp.tt        * vtt * 0.01 +
      fp.endurance * ven * 0.01
    );
  }

  // For each dimension, blend wkg-score and watt-score based on course type.
  // Flat courses: raw watts dominate. Climbs: w/kg dominates.
  // This mirrors real Zwift physics more accurately than pure w/kg.

  const wkgTT       = Math.min(100, ((r.twentyMin || 0) / 6.0) * 100);
  const wkgSprint   = Math.min(100, ((r.sprint    || 0) / 20.0)* 100);
  const wkgPunch    = Math.min(100, ((r.oneMin    || 0) / 12.0)* 100);
  const wkgMedium   = Math.min(100, ((r.fiveMin   || 0) / 8.5) * 100);
  // Climber: blend 20min (FTP) and 5min w/kg — FTP matters more on long climbs
  const wkgClimber  = Math.min(100, (
    ((r.twentyMin || 0) / 6.5) * 0.60 +
    ((r.fiveMin   || 0) / 8.5) * 0.40
  ) * 100);
  // Endurance: sustained long effort — 20min W/kg dominates, w/kg matters most
  const wkgEndurance = Math.min(100, ((r.twentyMin || 0) / 5.8) * 100);

  const wattTT       = normWatts(getRiderWatts(r, 'ftp'),    'ftp');
  const wattSprint   = normWatts(getRiderWatts(r, 'sprint'), 'sprint');
  const wattPunch    = normWatts(getRiderWatts(r, 'w1min'),  'w1min');
  const wattMedium   = normWatts(getRiderWatts(r, 'w5min'),  'w5min');
  // Climber watts: blend ftp and w5min (long climbs = FTP, medium = 5min)
  const wattClimber  = normWatts(getRiderWatts(r, 'ftp'), 'ftp') * 0.60
                     + normWatts(getRiderWatts(r, 'w5min'), 'w5min') * 0.40;
  // Endurance watts: FTP (20min) effort, some contribution from 30min power
  const wattEndurance = normWatts(getRiderWatts(r, 'w30min'), 'w30min');

  // Blend ratios reflect Zwift physics: flat = raw watts dominate, climbs = w/kg dominates
  const tt        = wkgTT        * 0.15 + wattTT        * 0.85;
  const sprint    = wkgSprint    * 0.10 + wattSprint    * 0.90;
  const punch     = wkgPunch     * 0.45 + wattPunch     * 0.55;
  const medium    = wkgMedium    * 0.65 + wattMedium    * 0.35;
  const climber   = wkgClimber   * 0.90 + wattClimber   * 0.10;
  // Endurance on climbs: W/kg dominates (lighter riders sustain pace longer)
  const endurance = wkgEndurance * 0.85 + wattEndurance * 0.15;

  // Uniform scaling: fp values sum to ~100, scores are 0-100 → result is 0-100
  return Math.round(
    (fp.tt        * tt        +
     fp.sprint    * sprint    +
     fp.punch     * punch     +
     fp.medium    * medium    +
     fp.climber   * climber   +
     fp.endurance * endurance) / 100
  );
}

function getBestLineupForCourse(course, teamSize) {
  const fp = getCourseFingerprint(course);
  const pool = riders.filter(r => r.selected);

  const scored = pool.map(r => ({
    rider: r,
    score: scoreRiderForCourse(r, fp)
  }));

  const best = scored
    .sort((a,b) => b.score - a.score)
    .slice(0, teamSize);

  const avgProfile = {
    tt:        Math.min(100, Math.round(best.reduce((s,x) => s + ((x.rider.twentyMin||0) / 6.0)*100 * 0.15 + normWatts(getRiderWatts(x.rider,'ftp'),    'ftp')    * 0.85, 0) / teamSize)),
    sprint:    Math.min(100, Math.round(best.reduce((s,x) => s + ((x.rider.sprint   ||0) / 20.0)*100* 0.10 + normWatts(getRiderWatts(x.rider,'sprint'), 'sprint') * 0.90, 0) / teamSize)),
    punch:     Math.min(100, Math.round(best.reduce((s,x) => s + ((x.rider.oneMin   ||0) / 12.0)*100* 0.45 + normWatts(getRiderWatts(x.rider,'w1min'),  'w1min')  * 0.55, 0) / teamSize)),
    medium:    Math.min(100, Math.round(best.reduce((s,x) => s + ((x.rider.fiveMin  ||0) / 8.5) *100* 0.65 + normWatts(getRiderWatts(x.rider,'w5min'),  'w5min')  * 0.35, 0) / teamSize)),
    climber:   Math.min(100, Math.round(best.reduce((s,x) => s + ((x.rider.fiveMin  ||0) / 8.5) *100* 0.80 + normWatts(getRiderWatts(x.rider,'w5min'),  'w5min')  * 0.20, 0) / teamSize)),
    endurance: Math.min(100, Math.round(best.reduce((s,x) => s + ((x.rider.twentyMin||0) / 5.8) *100* 0.70 + normWatts(getRiderWatts(x.rider,'w30min'), 'w30min') * 0.30, 0) / teamSize))
  };

  return { lineup: best, profile: avgProfile };
}

// Scores an opponent rider for a course using same hybrid logic as scoreRiderForCourse
// but using oppRiderWatts() for data access
function scoreOppRiderForCourse(r, fp, oppRiderWattsFn) {
  if (r.velo_sprint != null) {
    function normV(v) { return Math.min(100, Math.max(0, (v - 400) / 5)); }
    const vs  = normV(r.velo_sprint);
    const vp  = normV(r.velo_punch);
    const vc  = normV(r.velo_climb);
    const vpr = normV(r.velo_pursuit);
    const vtt = normV(r.velo_tt);
    const ven = normV(r.velo_endurance);
    return Math.round(
      fp.sprint    * vs  * 0.01 +
      fp.punch     * vp  * 0.01 +
      fp.climber   * vc  * 0.01 +
      fp.medium    * vpr * 0.01 +
      fp.tt        * vtt * 0.01 +
      fp.endurance * ven * 0.01
    );
  }

  const weight     = r.weight || 70;
  const wkgTT      = ((r.watt / weight) / 6.0) * 100;
  const wkgSprint  = (r.wkg / 20.0) * 100;
  const wkg1min    = (oppRiderWattsFn(r,'w1min') / weight);
  const wkgFtp     = (r.watt / weight);
  const wkgMedium  = (r.wkg / 8.5) * 100;
  // Climber: blend 20min W/kg (FTP) and 5min W/kg — mirrors scoreRiderForCourse
  const wkg5min    = (oppRiderWattsFn(r,'w5min') / weight);
  const wkgClimber = Math.min(100, (
    (wkgFtp  / 6.5) * 0.60 +
    (wkg5min / 8.5) * 0.40
  ) * 100);

  const wattTT      = normWatts(oppRiderWattsFn(r, 'ftp'),    'ftp');
  const wattSprint  = normWatts(oppRiderWattsFn(r, 'sprint'), 'sprint');
  const wattPunch   = normWatts(oppRiderWattsFn(r, 'w1min'),  'w1min');
  const wattMedium  = normWatts(oppRiderWattsFn(r, 'w5min'),  'w5min');
  // Climber watts: blend ftp and w5min — mirrors scoreRiderForCourse
  const wattClimber = normWatts(oppRiderWattsFn(r, 'ftp'),   'ftp')   * 0.60
                    + normWatts(oppRiderWattsFn(r, 'w5min'), 'w5min') * 0.40;

  const tt      = wkgTT                 * 0.15 + wattTT      * 0.85;
  const sprint  = wkgSprint             * 0.10 + wattSprint  * 0.90;
  const punch   = (wkg1min/9.5)*100     * 0.45 + (wkgFtp/6.0)*100 * 0.25 + wattPunch * 0.30;
  const medium  = (wkgFtp/5.5)*100      * 0.50 + wkgMedium   * 0.30 + normWatts(oppRiderWattsFn(r,'ftp'),'ftp') * 0.20;
  const climber = wkgClimber            * 0.90 + wattClimber * 0.10;

  const wkgEndurance  = Math.min(100, (wkgFtp / 5.8) * 100);
  const wattEndurance = normWatts(oppRiderWattsFn(r, 'w30min'), 'w30min');
  const endurance = wkgEndurance * 0.85 + wattEndurance * 0.15;

  // Uniform scaling: fp values sum to ~100, scores are 0-100 → result is 0-100
  return Math.round(
    (fp.tt        * tt        +
     fp.sprint    * sprint    +
     fp.punch     * punch     +
     fp.medium    * medium    +
     fp.climber   * climber   +
     fp.endurance * endurance) / 100
  );
}

function getBestOppLineupForCourse(course, teamSize) {
  if (!opponentTeam || !opponentTeam.riders) return null;
  const fp = getCourseFingerprint(course);
  const fn = getRiderWatts;

  const scored = opponentTeam.riders
    .filter(r => r.active !== false && (r.wkg > 0 || r.watt > 0))   // exclude inactive and no-data riders
    .map(r => ({
      rider: r,
      score: scoreOppRiderForCourse(r, fp, fn)
    })).sort((a,b) => b.score - a.score);

  const best = scored.slice(0, teamSize);
  const n    = best.length;

  // Build opponent profile from their best N — same blend as getTeamProfile()
  const avgWkg    = best.reduce((s,x) => s + x.rider.wkg,                              0) / n;
  const avgWFtp   = best.reduce((s,x) => s + fn(x.rider,'ftp'),                        0) / n;
  const avgWSprint= best.reduce((s,x) => s + fn(x.rider,'sprint'),                     0) / n;
  const avgW1min  = best.reduce((s,x) => s + fn(x.rider,'w1min'),                      0) / n;
  const avgW5min  = best.reduce((s,x) => s + fn(x.rider,'w5min'),                      0) / n;
  const avgWkg1min= best.reduce((s,x) => s + fn(x.rider,'w1min')/(x.rider.weight||70), 0) / n;

  return {
    lineup: best,
    profile: {
      tt:      Math.round(normWatts(avgWFtp,    'ftp')    * 0.80 + (avgWkg/6.0)*100   * 0.20),
      sprint:  Math.round(normWatts(avgWSprint, 'sprint') * 0.95 + (avgWkg/20.0)*100  * 0.05),
      punch:   Math.round((avgWkg1min/9.5)*100  * 0.45    + (avgWkg/6.0)*100 * 0.25   + normWatts(avgW1min,'w1min') * 0.30),
      medium:  Math.round((avgWkg/5.5)*100      * 0.50    + (avgWkg/8.5)*100 * 0.30   + normWatts(avgWFtp,'ftp') * 0.20),
      climber: Math.round((avgWkg/5.5)*100      * 0.90    + normWatts(avgWFtp,'ftp')   * 0.10),
      wFtp: Math.round(avgWFtp), wSprint: Math.round(avgWSprint),
      w1min: Math.round(avgW1min), w5min: Math.round(avgW5min),
      names: best.map(x => x.rider.name)
    }
  };
}

// ═══════════════════════════════════════════════════════
// UI — OPPONENT ROSTER
// ═══════════════════════════════════════════════════════
function renderOppRoster() {
  const card    = document.getElementById('opp-roster-card');
  const listEl  = document.getElementById('opp-rider-list');
  const countEl = document.getElementById('opp-roster-count');
  if (!card || !listEl || !opponentTeam || !opponentTeam.riders) return;

  card.style.display = 'block';

  const active = opponentTeam.riders.filter(r => r.active !== false);
  countEl.textContent = `${active.length} / ${opponentTeam.riders.length} ACTIVE`;

  listEl.innerHTML = opponentTeam.riders.map((r, i) => {
    const isActive = r.active !== false;
    const wFtp    = getRiderWatts(r, 'ftp');
    const wSprint = getRiderWatts(r, 'sprint');
    const w5min   = getRiderWatts(r, 'w5min');
    const hasCurve = !!(r.w5s || r.w1min);

    const curveRows = [
      ['5s',   r.w5s,   r.wkg5s],
      ['30s',  r.w30s,  r.wkg30s],
      ['1min', r.w1min, r.wkg1min],
      ['2min', r.w2min, r.wkg2min],
      ['5min', r.w5min, r.wkg5min],
      ['10min',r.w10min,r.wkg10min],
      ['20min',r.w20min,r.wkg20min],
      ['30min',r.w30min,r.wkg30min],
    ].filter(([,w]) => w && w !== 0);

    const curveHTML = curveRows.map(([label, watts, wkg]) => `
      <div style="display:flex;gap:0;align-items:center">
        <span style="width:40px;color:var(--text-dim);font-size:0.6rem">${label}</span>
        <span style="width:50px;color:var(--accent2);font-weight:600;font-size:0.60rem">${watts}W</span>
        <span style="color:var(--text-dim);font-size:0.6rem">${wkg ? wkg.toFixed(1) + ' W/kg' : ''}</span>
      </div>`).join('');

    const veloDims = [
      ['Sprint',  r.velo_sprint,    '#f7d084'],
      ['Punch',   r.velo_punch,     '#b48eff'],
      ['Climb',   r.velo_climb,     'var(--accent3)'],
      ['Pursuit', r.velo_pursuit,   '#ff9f43'],
      ['TT',      r.velo_tt,        'var(--accent)'],
      ['Endu',    r.velo_endurance, '#ff6b9d'],
    ];
    const veloHTML = r.velo_sprint != null ? veloDims.map(([label, val, color]) => {
      const pct = Math.min(100, Math.max(0, ((val||0) - 400) / 5));
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1">
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.50rem;color:var(--text-dim)">${label}</span>
        <div style="width:100%;height:3px;background:rgba(255,255,255,0.1);border-radius:2px">
          <div style="width:${pct}%;height:100%;background:${color};border-radius:2px"></div>
        </div>
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.60rem;color:${color};font-weight:600">${val}</span>
      </div>`;
    }).join('') : null;

    return `
      <div style="background:var(--surface2); border:1px solid ${isActive ? 'var(--border)' : 'rgba(255,68,85,0.2)'}; opacity:${isActive ? '1' : '0.45'}; margin-bottom:4px;">
        <div style="display:flex; align-items:center; gap:10px; padding:8px 10px; cursor:pointer;" onclick="toggleOppExpand('opp-detail-${i}', 'opp-arrow-${i}')">
          <input type="checkbox" ${isActive ? 'checked' : ''} onchange="event.stopPropagation();toggleOppRider(${i})" style="cursor:pointer; accent-color:var(--accent2); flex-shrink:0;">
          <div style="flex:1; min-width:0;">
			<div style="font-family:'JetBrains Mono',monospace; font-size:0.75rem; font-weight:600; color:${isActive ? 'var(--text)' : 'var(--text-dim)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ${r.name}
            </div>
            <div style="font-family:'JetBrains Mono',monospace; font-size:0.62rem; color:var(--text-dim); display:flex; gap:8px; margin-top:2px; flex-wrap:wrap;">
              <span>${(r.wkg || r.twentyMin || 0).toFixed(2)} W/kg</span>
              <span style="color:var(--accent)">${wFtp}W FTP</span>
              <span style="color:var(--accent2)">${wSprint}W spr</span>
              <span style="color:var(--accent3)">${w5min}W 5m</span>
              ${hasCurve ? '<span style="color:var(--accent3); font-size:0.55rem;">● curve</span>' : '<span style="opacity:0.4; font-size:0.55rem;">○ est</span>'}
            </div>
          </div>
          <span id="opp-arrow-${i}" style="color:var(--text-dim);font-size:0.65rem;flex-shrink:0">▶</span>
        </div>
        <div id="opp-detail-${i}" style="display:none; padding:0 12px 12px 12px; border-top:1px solid var(--border);">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:10px;">
            <div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:6px">Power Curve</div>
              ${curveHTML || '<span style="color:var(--text-dim);font-size:0.7rem">No curve data</span>'}
            </div>
            <div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:6px">Profile</div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.60rem;display:flex;flex-direction:column;gap:3px">
                <div><span style="color:var(--text-dim)">Weight  </span><strong>${r.weight || '?'}kg</strong></div>
                <div><span style="color:var(--text-dim)">FTP     </span><strong style="color:var(--accent)">${wFtp}W</strong> · ${(r.wkg || r.twentyMin || 0).toFixed(2)} W/kg</div>
                <div><span style="color:var(--text-dim)">Sprint  </span><strong style="color:var(--accent2)">${wSprint}W</strong></div>
                <div><span style="color:var(--text-dim)">1min    </span><strong style="color:var(--purple)">${r.w1min || '—'}W</strong></div>
                <div><span style="color:var(--text-dim)">5min    </span><strong style="color:var(--accent3)">${w5min}W</strong></div>
              </div>
            </div>
          </div>
          ${veloHTML ? `
          <div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--border)">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:6px">vELO2</div>
            <div style="display:flex;gap:6px">${veloHTML}</div>
          </div>` : ''}
        </div>
      </div>`;
  }).join('');
}

function toggleOppExpand(detailId, arrowId) {
  const detail = document.getElementById(detailId);
  const arrow  = document.getElementById(arrowId);
  if (!detail) return;
  const open = detail.style.display === 'block';
  detail.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▶' : '▼';
}

function toggleAllOppRiders(checked) {
  if (!opponentTeam || !opponentTeam.riders) return;
  opponentTeam.riders.forEach(function(r) { r.active = checked; });
  renderOppRoster();
  updateContextBar();
  runMatch();
}

function toggleOppRider(index) {
  if (!opponentTeam || !opponentTeam.riders[index]) return;
  const r = opponentTeam.riders[index];
  r.active = r.active === false ? true : false;
  renderOppRoster();
  updateContextBar();
  runMatch();
  saveToStorage();
}

// ═══════════════════════════════════════════════════════
// UI — TABS
// ═══════════════════════════════════════════════════════
function showResultsReady() {
  const banner = document.getElementById('rp-no-routes-banner');
  if (banner) {
    const hasRoutes = courses.some(c => c.selected);
    banner.style.display = hasRoutes ? 'none' : 'block';
  }

  const grid = document.getElementById('results-grid');
  if (grid) grid.innerHTML = '';
}

function switchTab(tab) {
  // Match tabs by their onclick value, not by index (order in DOM may differ from tabs array)
  document.querySelectorAll('.tab').forEach(t => {
    const onclick = t.getAttribute('onclick') || '';
    const match = onclick.match(/switchTab\(['"](\w+)['"]\)/);
    if (match) t.classList.toggle('active', match[1] === tab);
  });
  document.querySelectorAll('.panel').forEach(p => {
    p.classList.toggle('active', p.id === `panel-${tab}`);
  });
  
  const routesBlock = document.getElementById('ctx-routes-block');
  const teamSizeBlock = document.getElementById('ctx-teamsize-block');
  const raceRouteBlock = document.getElementById('ctx-raceroute-block');

  const contextBar = document.getElementById('context-bar');

  const hideContextBar = tab === 'profile' || tab === 'rung' || tab === 'fixtures';
  if (contextBar) contextBar.style.display = hideContextBar ? 'none' : '';

  if (tab === 'analyze') {
    if (routesBlock) routesBlock.style.display = 'none';
    if (teamSizeBlock) teamSizeBlock.style.display = 'none';
    if (raceRouteBlock) raceRouteBlock.style.display = 'flex';
    populateMatchupRoutes();
    renderMatchupAnalysis();
  } else {
    if (routesBlock) routesBlock.style.display = 'flex';
    if (teamSizeBlock) teamSizeBlock.style.display = 'flex';
    if (raceRouteBlock) raceRouteBlock.style.display = 'none';
  }

  if (tab === 'results') { updateMatchMode(); populateCourseSelect(); showResultsReady(); }
  if (tab === 'courses') { filterCourses(); }
  if (tab === 'rung') { autoSelectOwnRung(); renderRungOverview(); }
  if (tab === 'profile') { const w = document.getElementById('leqp-rider-btns'); if (w && !w.children.length) _profileBuildLeqpBtns(); }
  if (tab === 'fixtures') { _renderFixturesList((typeof LEQP_FIXTURES !== 'undefined' ? LEQP_FIXTURES : []).filter(f => new Date(f.date) >= new Date(new Date().setHours(0,0,0,0))).sort((a,b) => new Date(a.date+' '+a.time) - new Date(b.date+' '+b.time))); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════
// UI — RIDERS
// ═══════════════════════════════════════════════════════
function addRider() {
  const name = document.getElementById('r-name').value;
  const weight = parseFloat(document.getElementById('r-weight').value);
  
  // Check IDs match your HTML (r-20min instead of r-20m)
  const twentyMin = parseFloat(document.getElementById('r-20min').value);
  
  // Vi beregner watt automatisk hvis feltet er tomt
  let watt = parseFloat(document.getElementById('r-watt')?.value);
  if (isNaN(watt)) watt = Math.round(twentyMin * weight);

  if (!name || isNaN(weight)) {
    // Vi bruger din eksisterende alert-boks i stedet for en popup
    const alertEl = document.getElementById('rider-alert');
    if (alertEl) {
        alertEl.style.display = 'block';
        setTimeout(() => alertEl.style.display = 'none', 3000);
    }
    return;
  }

  const rider = {
    id: Date.now(),
    name: name,
    weight: weight,
    watt: watt,
    twentyMin: twentyMin,
    // Ensure these IDs also match (r-1min and r-5min)
    fiveMin: parseFloat(document.getElementById('r-5min').value) || 0,
    oneMin: parseFloat(document.getElementById('r-1min').value) || 0,
    sprint: parseFloat(document.getElementById('r-sprint').value) || 0,
    selected: true
  };

  riders.push(rider);
  
  // Hvis du bruger localStorage, gemmer vi
  if (typeof saveToStorage === "function") saveToStorage();
  
  renderRiders();
  
  // Reset name field so it's ready for next rider
  document.getElementById('r-name').value = '';
}

function deleteRider(id) {
  riders = riders.filter(r => r.id !== id);
  saveToStorage();
  renderRiders();
  runMatch();
}

function toggleSelectAll(checked) {
  riders.forEach(r => r.selected = checked);
  saveToStorage();
  renderRiders();
  runMatch();
}

function updateMyTeamRung(key) {
  const rungEl = document.getElementById('my-team-rung');
  const posEl  = document.getElementById('my-team-pos');
  if (!rungEl) return;
  let rung = null;
  let pos  = null;

  // Tjekker om rung er gemt under det aktive hold eller i modstander-biblioteket
  if (MY_TEAMS[key] && MY_TEAMS[key].rung) {
    rung = MY_TEAMS[key].rung;
    pos  = MY_TEAMS[key].ladderPosition || null;
  } else if (OPPONENT_LIBRARY[key] && OPPONENT_LIBRARY[key].rung) {
    rung = OPPONENT_LIBRARY[key].rung;
    pos  = OPPONENT_LIBRARY[key].ladderPosition || null;
  }

  if (rung) {
    rungEl.textContent = 'R' + rung;
    rungEl.style.display = 'inline-block';
  } else {
    rungEl.style.display = 'none';
  }

  if (posEl) {
    if (pos) {
      posEl.textContent = '#' + pos;
      posEl.style.display = 'inline-block';
    } else {
      posEl.style.display = 'none';
    }
  }
}

function switchMyTeam(key) {
  if (!MY_TEAMS[key]) return;
  // Save current selection state before switching
  activeMyTeamKey = key;
  riders = MY_TEAMS[key].riders;
  // Update captains block
  const capBlock = document.getElementById('captains-block');
  if (capBlock) capBlock.innerHTML = MY_TEAMS[key].captainsHTML || '';
  // Update page title badge
  const sel = document.getElementById('my-team-select');
  if (sel) sel.value = key;
  // Rebuild opponent dropdown own-teams section
  rebuildOppOwnTeams();
  
  updateMyTeamRung(key); // <--- NY LINJE TILFØJET HER
  
  saveToStorage();
  renderRiders();
  updateContextBar();
  runMatch();
}

function populateOppByRung() {
  const rungSel  = document.getElementById('opp-rung-select');
  const teamSel  = document.getElementById('opp-library-select');
  const rungVal  = rungSel.value;

  // Reset team dropdown
  teamSel.innerHTML = '<option value="">— Select team —</option>';
  teamSel.disabled = !rungVal;
  if (!rungVal) return;

  // Clear current opponent
  opponentTeam = null;
  document.getElementById('opp-roster-card').style.display = 'none';
  document.getElementById('opp-team-stats').innerHTML = '';
  updateContextBar();
  runMatch();

  if (rungVal === 'own') {
    // Own teams — populated by rebuildOppOwnTeams logic
    Object.entries(MY_TEAMS).forEach(([key, team]) => {
      const opt = document.createElement('option');
      opt.value = 'MY_TEAM::' + key;
      opt.textContent = '⚡ ' + team.name;
      teamSel.appendChild(opt);
    });
  } else {
    // Filter by rung number
    const rungNum = parseInt(rungVal);
    Object.entries(OPPONENT_LIBRARY).forEach(([key, team]) => {
      if (team.rung === rungNum && key !== 'FIXTURES') {
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = team.name;
        teamSel.appendChild(opt);
      }
    });
  }
}

function rebuildOppOwnTeams() {
  const sel = document.getElementById('opp-library-select');
  if (!sel) return;
  // Remove existing own-teams optgroup if present
  const existing = sel.querySelector('optgroup[data-own]');
  if (existing) existing.remove();
  // Build new optgroup
  const grp = document.createElement('optgroup');
  grp.label = '── Own Teams ──';
  grp.dataset.own = '1';
  Object.entries(MY_TEAMS).forEach(([key, team]) => {
    const opt = document.createElement('option');
    opt.value = 'MY_TEAM::' + key;
    opt.textContent = '⚡ ' + team.name;
    grp.appendChild(opt);
  });
  // Insert at bottom
  sel.appendChild(grp);
}

function toggleRiderExpand(id) {
  const detail = document.getElementById('rider-detail-' + id);
  const arrow  = document.getElementById('rider-arrow-' + id);
  if (!detail) return;
  const open = detail.style.display === 'block';
  detail.style.display = open ? 'none' : 'block';
  if (arrow) arrow.textContent = open ? '▶' : '▼';
}

function renderRiders() {
  const listEl = document.getElementById('rider-list');
  const bar    = document.getElementById('team-profile-bar');
  if (!listEl) return;

  if (riders.length === 0) {
    listEl.innerHTML = '<div class="empty">No riders added yet</div>';
    if (bar) bar.style.display = 'none';
    return;
  }

  const ridersHTML = riders.map(r => {
    const ftpWatts = r.watt ? r.watt : Math.round((r.twentyMin || 0) * (r.weight || 70));
    const hasCurve = hasCurveData(r);

    // Full curve rows — only shown if data exists
    const curveRows = [
      ['5s',   r.w5s,   r.sprint   ? r.sprint.toFixed(1)   : '—'],
      ['30s',  r.w30s,  '—'],
      ['1min', r.w1min, r.oneMin   ? r.oneMin.toFixed(1)   : '—'],
      ['2min', r.w2min, '—'],
      ['5min', r.w5min, r.fiveMin  ? r.fiveMin.toFixed(1)  : '—'],
      ['10min',r.w10min,'—'],
      ['20min',r.w20min,r.twentyMin? r.twentyMin.toFixed(2): '—'],
      ['30min',r.w30min,'—'],
    ].filter(([,w]) => w && w !== 0 && w !== 'null' && w !== null);

    const curveHTML = curveRows.map(([label, watts, wkg]) => `
      <div style="display:flex;gap:0;align-items:center">
        <span style="width:40px;color:var(--text-dim);font-size:0.6rem">${label}</span>
        <span style="width:50px;color:var(--accent);font-weight:600;font-size:0.60rem">${watts}W</span>
        <span style="color:var(--text-dim);font-size:0.6rem">${wkg !== '—' ? wkg + ' W/kg' : ''}</span>
      </div>`).join('');

    const myVeloDims = [
      ['Sprint',  r.velo_sprint,    '#f7d084'],
      ['Punch',   r.velo_punch,     '#b48eff'],
      ['Climb',   r.velo_climb,     'var(--accent3)'],
      ['Pursuit', r.velo_pursuit,   '#ff9f43'],
      ['TT',      r.velo_tt,        'var(--accent)'],
      ['Endu',    r.velo_endurance, '#ff6b9d'],
    ];
    const myVeloHTML = r.velo_sprint != null ? myVeloDims.map(([label, val, color]) => {
      const pct = Math.min(100, Math.max(0, ((val||0) - 400) / 5));
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;flex:1">
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.50rem;color:var(--text-dim)">${label}</span>
        <div style="width:100%;height:3px;background:rgba(255,255,255,0.1);border-radius:2px">
          <div style="width:${pct}%;height:100%;background:${color};border-radius:2px"></div>
        </div>
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.60rem;color:${color};font-weight:600">${val}</span>
      </div>`;
    }).join('') : null;

    return `
      <div class="rider-card" style="background:var(--surface2);border:1px solid var(--border);margin-bottom:6px;${r.selected ? 'border-color:rgba(0,229,255,0.35)' : ''}">
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;cursor:pointer" onclick="toggleRiderExpand(${r.id})">
          <input type="checkbox" ${r.selected ? 'checked' : ''} onchange="event.stopPropagation();toggleRiderSelection(${r.id})" style="cursor:pointer;flex-shrink:0">
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;color:var(--text);font-size:0.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.name}</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.60rem;color:var(--text-dim);display:flex;gap:8px;flex-wrap:wrap;margin-top:2px">
              <span style="color:var(--text)">${(r.twentyMin||0).toFixed(2)} W/kg</span>
              <span><strong style="color:var(--accent)">${ftpWatts}W</strong> FTP</span>
              <span style="color:var(--accent2)">🔥 ${r.w5s || Math.round((r.sprint||0)*(r.weight||70))}W spr</span>
              <span style="color:var(--accent3)">⛰ ${r.w5min || Math.round((r.fiveMin||0)*(r.weight||70))}W 5min</span>
              ${hasCurve ? '<span style="color:var(--accent3);font-size:0.58rem">● CURVE</span>' : '<span style="color:var(--text-dim);font-size:0.58rem">○ est.</span>'}
            </div>
          </div>
          <span id="rider-arrow-${r.id}" style="color:var(--text-dim);font-size:0.65rem;flex-shrink:0">▶</span>
        </div>

        <div id="rider-detail-${r.id}" style="display:none;padding:0 12px 12px 12px;border-top:1px solid var(--border)">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:10px">

            <div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:6px">Power Curve</div>
              ${curveHTML || '<span style="color:var(--text-dim);font-size:0.7rem">No curve data</span>'}
            </div>

            <div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:6px">Profile</div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:0.60rem;display:flex;flex-direction:column;gap:3px">
                <div><span style="color:var(--text-dim)">Weight  </span><strong>${r.weight || '?'}kg</strong></div>
                <div><span style="color:var(--text-dim)">FTP     </span><strong style="color:var(--accent)">${ftpWatts}W</strong> · ${(r.twentyMin||0).toFixed(2)} W/kg</div>
                <div><span style="color:var(--text-dim)">Sprint  </span><strong style="color:var(--accent2)">${(r.sprint||0).toFixed(1)} W/kg</strong></div>
                <div><span style="color:var(--text-dim)">1min    </span><strong style="color:var(--purple)">${(r.oneMin||0).toFixed(1)} W/kg</strong></div>
                <div><span style="color:var(--text-dim)">5min    </span><strong style="color:var(--accent3)">${(r.fiveMin||0).toFixed(1)} W/kg</strong></div>
              </div>
            </div>
          </div>
          ${myVeloHTML ? `
          <div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--border)">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:6px">vELO2</div>
            <div style="display:flex;gap:6px">${myVeloHTML}</div>
          </div>` : ''}
          ${(typeof RIDER_BIOS !== 'undefined' && RIDER_BIOS[String(r.zwift_id)]) ? `
          <div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--border)">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:6px">Scout Report</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--text-dim);line-height:1.7">${RIDER_BIOS[String(r.zwift_id)]}</div>
          </div>` : ''}
          ${(() => {
            const lrEntry = (typeof LADDER_RACES !== 'undefined') && (LADDER_RACES[String(r.zwift_id)] || LADDER_RACES[r.zwift_id]);
            const rm = calcRaceMetrics(lrEntry ? lrEntry.races : []);
            if (!rm) return '';
            const base = "font-family:'JetBrains Mono',monospace;";
            const dims = [
              ['🥊', 'Punch',     rm.scores.punch,        rm.ratios.punch  != null ? rm.ratios.punch.toFixed(1)+'× spr/FTP'      : '', '#f7d084'],
              ['🫁', 'VO₂ stab.', rm.scores.vo2,          rm.ratios.vo2    != null ? rm.ratios.vo2.toFixed(2)+' 5m/20m'           : '', '#b48eff'],
              ['🎯', 'Pacing',    rm.scores.pacing,       rm.ratios.pacing != null ? rm.ratios.pacing.toFixed(2)+' 1m/AVG'        : '', 'var(--accent)'],
              ['🔁', 'Repeat.',   rm.scores.repeatability,rm.ratios.repeat != null ? rm.ratios.repeat.toFixed(2)+' 1m/2m'         : '', 'var(--accent2)'],
              ['🏁', 'Fin.spr.',  rm.scores.endSprint,    'proxy',                                                                    'var(--accent3)'],
              ['💪', 'Fatigue',   rm.scores.fatigue,      rm.ratios.fatigue!= null ? rm.ratios.fatigue.toFixed(1)+'% CV 20m'     : '', '#ff9f43'],
            ].filter(([,,score]) => score != null);
            const rows = dims.map(([icon, label, score, detail, color]) => {
              const pct = score * 10;
              return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
                <span style="font-size:0.7rem;width:14px">${icon}</span>
                <span style="${base}font-size:0.57rem;color:var(--text-dim);width:58px">${label}</span>
                <div style="flex:1;height:3px;background:rgba(255,255,255,0.1);border-radius:2px">
                  <div style="width:${pct}%;height:100%;background:${color};border-radius:2px"></div>
                </div>
                <span style="${base}font-size:0.65rem;font-weight:700;color:${color};width:14px;text-align:right">${score}</span>
                <span style="${base}font-size:0.54rem;color:var(--text-dim);width:90px;text-align:right">${detail}</span>
              </div>`;
            }).join('');
            const insightHTML = rm.insights.length ? `<div style="margin-top:5px;${base}font-size:0.57rem;color:var(--text-dim);line-height:1.7">${rm.insights.map(i => '· '+i).join('<br>')}</div>` : '';
            return `<div style="margin-top:10px;padding-top:8px;border-top:1px solid var(--border)">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px">
                <div style="${base}font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase">Race Analysis</div>
                <div style="${base}font-size:0.54rem;color:${rm.confidenceColor}">${rm.confidenceLabel}</div>
              </div>
              ${rows}${insightHTML}
            </div>`;
          })()}
        </div>
      </div>
    `;
  }).join('');

  const selectedRiders = riders.filter(r => r.selected);
  const totalWatts = selectedRiders.reduce((s, r) => s + (r.watt ? r.watt : (r.twentyMin || 0) * (r.weight || 70)), 0);

  const totalHTML = selectedRiders.length > 0 ? `
    <div style="margin-bottom:12px;padding:10px;border-bottom:1px dashed var(--border);font-family:'JetBrains Mono';font-size:0.75rem;color:var(--text-dim)">
      SELECTED LINEUP TOTAL: <span style="color:var(--accent2)">${Math.round(totalWatts)}W</span>
      <span style="margin-left:12px;color:var(--text-dim)">(${selectedRiders.length} riders)</span>
    </div>` : '';

  listEl.innerHTML = totalHTML + ridersHTML;

  if (bar) {
    if (selectedRiders.length > 0) {
      const tp = getTeamProfile();
      bar.style.display = 'block';
      bar.innerHTML = `
        <div style="font-family:monospace;font-size:0.65rem;color:var(--text-dim);margin-bottom:10px;letter-spacing:1px;text-transform:uppercase">
          Active Line-up Profile (${selectedRiders.length} riders)
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          ${[['TT','tt','var(--accent)'],['Sprint','sprint','var(--accent2)'],['Punch','punch','var(--purple)'],['Medium','medium','#ff9f43'],['Climb','climber','var(--accent3)']].map(([label,key,color])=>`
            <div class="breakdown-item" style="flex:1;min-width:80px">
              <span class="breakdown-label" style="font-size:0.6rem;display:block;margin-bottom:4px">${label}</span>
              <div class="breakdown-bar-wrap" style="background:rgba(255,255,255,0.1);height:4px;border-radius:2px;overflow:hidden;margin-bottom:4px">
                <div class="breakdown-bar" style="width:${tp[key]}%;background:${color};height:100%"></div>
              </div>
              <span class="breakdown-val" style="font-size:0.7rem;font-weight:bold">${tp[key]}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      bar.style.display = 'none';
    }
  }

  const countEl = document.getElementById('roster-count');
  if (countEl) countEl.textContent = `${riders.length} RIDERS`;
  updateContextBar();
}
// toggleRiderSelection updates the rider list and runs match in background
function toggleRiderSelection(id) {
  const rider = riders.find(r => r.id === id);
  if (rider) {
    rider.selected = !rider.selected;
    // Also sync into MY_TEAMS so openDSSheet always sees current selection
    const myTeamRider = MY_TEAMS[activeMyTeamKey]?.riders.find(r => r.id === id);
    if (myTeamRider) myTeamRider.selected = rider.selected;
    
    // Save and update list locally
    saveToStorage();
    renderRiders(); 
    
    // Run calculation in background so numbers are ready
    // men uden at kalde showPanel('results')
    runMatch(); 
  }
}

// ═══════════════════════════════════════════════════════
// UI — COURSES
// ═══════════════════════════════════════════════════════
function getWorlds() {
  const worlds = ['All', ...new Set(courses.map(c => c.world))].sort((a,b) => a === 'All' ? -1 : a.localeCompare(b));
  return worlds;
}

function renderWorldFilter() {
  const worlds = getWorlds();
  document.getElementById('world-filter').innerHTML = worlds.map(w => {
    const isActive = w === 'All' ? activeWorlds.has('All') : activeWorlds.has(w);
    return `<button class="world-btn ${isActive ? 'active' : ''}" onclick="toggleWorld('${w}')">${w}</button>`;
  }).join('');
}

function toggleWorld(w) {
  if (w === 'All') {
    // All resets everything
    activeWorlds = new Set(['All']);
  } else {
    activeWorlds.delete('All'); // leaving 'All' mode
    if (activeWorlds.has(w)) {
      activeWorlds.delete(w);
      if (activeWorlds.size === 0) activeWorlds.add('All'); // nothing left → back to All
    } else {
      activeWorlds.add(w);
    }
  }
  renderWorldFilter();
  filterCourses();
}

function filterCourses() {
  searchTerm = document.getElementById('course-search').value.toLowerCase();
  const sliderEl = document.getElementById('dist-filter');
  maxDist = sliderEl ? parseFloat(sliderEl.value) : 9999;

  const visible = courses.filter(c => {
    const matchWorld  = activeWorlds.has('All') || activeWorlds.has(c.world);
    const matchSearch = !searchTerm || c.name.toLowerCase().includes(searchTerm) || c.world.toLowerCase().includes(searchTerm);
    const matchDist   = c.distance <= maxDist;
    return matchWorld && matchSearch && matchDist;
  });
  renderCourseList(visible);
  updateSelectedCount();
}

function renderCourseList(list) {
  const el = document.getElementById('course-list');
  if (!list.length) { el.innerHTML = '<div class="empty">No routes match your filter</div>'; return; }

  el.innerHTML = list.map(c => {
    const fp = getCourseFingerprint(c);
    const tags = [];
    // Always show dominant type badge
    const fpEntries = [
      { key:'tt',        label:'PURSUIT',   css:'tag-tt'        },
      { key:'sprint',    label:'SPRINT',    css:'tag-sprint'    },
      { key:'punch',     label:'PUNCH',     css:'tag-punch'     },
      { key:'medium',    label:'MEDIUM',    css:'tag-medium'    },
      { key:'climber',   label:'CLIMB',     css:'tag-climber'   },
      { key:'endurance', label:'ENDURANCE', css:'tag-endurance' },
    ];
    const dominant = fpEntries.reduce((a,b) => fp[a.key] > fp[b.key] ? a : b);
    tags.push('<span class="tag ' + dominant.css + '">' + dominant.label + '</span>');
    // Also show secondary if close to dominant (within 15 points) and above 30
    fpEntries.forEach(function(e) {
      if (e.key !== dominant.key && fp[e.key] >= 30 && fp[e.key] >= fp[dominant.key] - 15) {
        tags.push('<span class="tag ' + e.css + '" style="opacity:0.65">' + e.label + '</span>');
      }
    });
    const fpBars = [
      ['SPR', fp.sprint,    '#f7d084'],
      ['PUN', fp.punch,     '#b48eff'],
      ['CLM', fp.climber,   'var(--accent3)'],
      ['PUR', fp.tt,        'var(--accent)'],
      ['END', fp.endurance, '#ff6b9d'],
    ].map(([label, val, color]) => `
      <div style="display:flex;align-items:center;gap:3px;flex:1;min-width:30px">
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.48rem;color:var(--text-dim);width:20px;flex-shrink:0">${label}</span>
        <div style="flex:1;height:3px;background:rgba(255,255,255,0.08);border-radius:1px;overflow:hidden">
          <div style="width:${val}%;height:100%;background:${color};border-radius:1px"></div>
        </div>
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.48rem;color:var(--text-dim);width:18px;text-align:right">${val}</span>
      </div>`).join('');

    return `
      <div class="course-item ${c.selected ? 'selected' : ''}" onclick="toggleCourse(${c.id})" id="ci-${c.id}">
        <div class="course-name-wrap">
          <div class="course-name">${c.selected ? '✓ ' : ''}${c.name}</div>
          <div class="course-meta">${c.world} · ${c.distance}km · ${c.elevation}m ↑${c.leadIn ? ' · ' + c.leadIn + 'km lead-in' : ''}</div>
          <div style="display:flex;gap:8px;margin-top:6px">${fpBars}</div>
        </div>
        <div class="course-tags">${tags.join('')}</div>
        <button class="remove-btn eye-btn" id="eye-${c.id}" onclick="event.stopPropagation();showCourseDetail(${c.id})">👁</button>
      </div>
      <div class="course-detail-inline" id="cd-${c.id}"></div>
    `;
  }).join('');
}

function toggleCourse(id) {
  const c = courses.find(x => x.id === id);
  if (c) { c.selected = !c.selected; filterCourses(); saveToStorage(); }
}

function selectAll(val) {
  const visible = courses.filter(c => {
    const matchWorld  = activeWorlds.has('All') || activeWorlds.has(c.world);
    const matchSearch = !searchTerm || c.name.toLowerCase().includes(searchTerm);
    const matchDist   = c.distance <= maxDist;
    return matchWorld && matchSearch && matchDist;
  });
  visible.forEach(c => c.selected = val);
  filterCourses();
  saveToStorage();
}

function updateSelectedCount() {
  const sliderEl = document.getElementById('dist-filter');
  const distLimit = sliderEl ? parseFloat(sliderEl.value) : 9999;
  const n = courses.filter(c => {
    if (!c.selected) return false;
    const matchWorld = activeWorlds.has('All') || activeWorlds.has(c.world);
    const matchSearch = !searchTerm || c.name.toLowerCase().includes(searchTerm) || c.world.toLowerCase().includes(searchTerm);
    const matchDist = c.distance <= distLimit;
    return matchWorld && matchSearch && matchDist;
  }).length;
  const selCount = document.getElementById('selected-count');
  const courseCount = document.getElementById('course-count');
  if (selCount) selCount.textContent = `${n} selected`;
  if (courseCount) courseCount.textContent = n;
  updateContextBar();
}

function showCourseDetail(id) {
  const c = courses.find(x => x.id === id);
  if (!c) return;
  const panel = document.getElementById('cd-' + id);
  if (!panel) return;

  // Toggle: close if already open
  if (panel.classList.contains('open')) {
    panel.classList.remove('open');
    const eyeBtn = document.getElementById('eye-' + id);
    if (eyeBtn) eyeBtn.classList.remove('active');
    return;
  }

  // Close any other open panels
  document.querySelectorAll('.course-detail-inline.open').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.eye-btn.active').forEach(el => el.classList.remove('active'));

  const fp = getCourseFingerprint(c);
  const elevPerKm = (c.elevation / c.distance).toFixed(1);
  const lapDist = c.leadIn != null ? (c.distance - c.leadIn).toFixed(1) : null;

  const dims = [
    ['Pursuit',   'tt',        'var(--accent)'],
    ['Sprint',    'sprint',    'var(--accent2)'],
    ['Punch',     'punch',     'var(--purple)'],
    ['Climb',     'climber',   'var(--accent3)'],
    ['Endurance', 'endurance', '#26c6da'],
  ];
  const dominant = dims.reduce((a, b) => fp[a[1]] > fp[b[1]] ? a : b);

  panel.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr auto;gap:20px;align-items:start">

      <!-- LEFT: fingerprint bars -->
      <div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);margin-bottom:10px">COURSE FINGERPRINT</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${dims.map(([label, key, color]) => `
            <div style="display:grid;grid-template-columns:80px 1fr 32px;gap:8px;align-items:center">
              <span style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:${fp[key] === fp[dominant[1]] ? color : 'var(--text-dim)'};text-align:right">${label}</span>
              <div style="height:7px;background:var(--border);border-radius:1px">
                <div style="height:100%;width:${fp[key]}%;background:${color};border-radius:1px;transition:width 0.6s ease"></div>
              </div>
              <span style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:${color}">${fp[key]}</span>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:14px;font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--text-dim);line-height:1.7">
          ${generateCourseDescription(c, fp)}
        </div>
        <div style="margin-top:10px">
          <a href="https://zwiftinsider.com/route/${c.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}"
             target="_blank"
             style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:1px;color:var(--accent);text-decoration:none;border:1px solid rgba(0,229,255,0.3);padding:4px 10px;display:inline-block;transition:background 0.2s"
             onmouseover="this.style.background='rgba(0,229,255,0.1)'"
             onmouseout="this.style.background='transparent'">
            🔗 ZWIFT INSIDER ↗
          </a>
        </div>
      </div>

      <!-- RIGHT: stats -->
      <div style="min-width:160px">
        <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);margin-bottom:10px">ROUTE STATS</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${[
            ['Distance',    c.distance + ' km'],
            ['Elevation',   c.elevation + ' m ↑'],
            ['Elev/km',     elevPerKm + ' m/km'],
            ['Lead-in',     c.leadIn != null ? c.leadIn + ' km' : '—'],
            ['Lap dist',    lapDist ? lapDist + ' km' : '—'],
            ['Profile',     c.profile || '—'],
            ['World',       c.world],
          ].map(([k, v]) => `
            <div style="display:flex;justify-content:space-between;gap:12px;font-family:'JetBrains Mono',monospace;font-size:0.6rem;border-bottom:1px solid var(--border);padding-bottom:4px">
              <span style="color:var(--text-dim)">${k}</span>
              <span style="color:var(--text)">${v}</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  panel.classList.add('open');
  const eyeBtn = document.getElementById('eye-' + id);
  if (eyeBtn) eyeBtn.classList.add('active');

  // Scroll the panel into view smoothly
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generateCourseDescription(c, fp) {
  const elevPerKm = (c.elevation / c.distance).toFixed(1);
  let desc = `${c.distance}km route with ${c.elevation}m total elevation (${elevPerKm}m/km average gradient). `;
  if (fp.climber > 70)      desc += 'Heavily climbing-oriented — sustained high power output required. Best for pure climbers with strong 5-20min W/kg. ';
  else if (fp.endurance > 55) desc += 'Long endurance effort — sustained power over 20+ minutes is decisive. Riders with strong FTP and high W/kg thrive here. ';
  else if (fp.medium > 55)  desc += 'Repeated climbs of 3-10 min demand strong 5-min power. All-rounders with good W/kg and sustained efforts thrive here. ';
  else if (fp.tt > 65)      desc += 'Pursuit / TT effort — favours riders with high sustained power (FTP) and raw watts. ';
  else if (fp.punch > 60)   desc += 'Short sharp climbs demand repeated 1-min power bursts. Punchy riders and all-rounders thrive here. ';
  else if (fp.sprint > 65)  desc += 'Multiple sprint opportunities and flat run-ins make this a sprinter-friendly course. ';
  return desc;
}

function addCustomCourse() {
  const name = document.getElementById('c-name').value.trim();
  if (!name) { showAlert('course-alert'); return; }
  const newId = Math.max(...courses.map(c => c.id)) + 1;
  courses.push({
    id: newId,
    name,
    world: document.getElementById('c-world').value || 'Custom',
    distance: parseFloat(document.getElementById('c-dist').value),
    elevation: parseFloat(document.getElementById('c-elev').value),
    punches: parseInt(document.getElementById('c-punches').value),
    flatKm: parseFloat(document.getElementById('c-flat').value),
    type: 'custom',
    selected: true,
    custom: true
  });
  document.getElementById('c-name').value = '';
  filterCourses();
  renderWorldFilter();
}

// ═══════════════════════════════════════════════════════
// UI — MATCH
// ═══════════════════════════════════════════════════════
function updateMatchMode() {
  const mode = document.getElementById('match-mode').value;
  document.getElementById('rider-filter-wrap').style.display = mode === 'rider' ? 'block' : 'none';
}

function populateCourseSelect() {
  const sel = document.getElementById('match-course-select');
  const selected = courses.filter(c => c.selected);
  sel.innerHTML = selected.map(c => `<option value="${c.id}">${c.name} (${c.world})</option>`).join('');
}

// ═══════════════════════════════════════════════════════
// FEEDBACK SYSTEM
// ═══════════════════════════════════════════════════════

function getFeedback(courseId) {
  try {
    const fb = JSON.parse(localStorage.getItem('zwift_feedback') || '{}');
    return fb[courseId] || null;
  } catch(e) { return null; }
}

function setFeedback(courseId, type, btn) {
  try {
    const fb = JSON.parse(localStorage.getItem('zwift_feedback') || '{}');
    // Toggle off if same button clicked again
    if (fb[courseId] === type) {
      delete fb[courseId];
    } else {
      fb[courseId] = type;
    }
    localStorage.setItem('zwift_feedback', JSON.stringify(fb));
    // Update button styles in this card
    const card = btn.closest('.result-card');
    card.querySelectorAll('.fb-btn').forEach(b => {
      b.className = 'fb-btn';
    });
    if (fb[courseId]) {
      btn.className = `fb-btn active-${fb[courseId]}`;
    }
  } catch(e) {}
}

function getFeedbackSummary() {
  try {
    const fb = JSON.parse(localStorage.getItem('zwift_feedback') || '{}');
    const counts = {correct:0, high:0, low:0};
    Object.values(fb).forEach(v => { if (counts[v] !== undefined) counts[v]++; });
    return counts;
  } catch(e) { return {correct:0, high:0, low:0}; }
}

function runMatch() {
  const alertEl = document.getElementById('match-alert');
  const grid = document.getElementById('results-grid');
  alertEl.className = 'alert';

  // 1. Find selected riders
  const selectedRiders = riders.filter(r => r.selected);

  const teamSize = parseInt(document.getElementById('team-size').value) || 5;
  if (selectedRiders.length < teamSize) {
    alertEl.textContent = `Not enough riders selected — need at least ${teamSize} (have ${selectedRiders.length} selected)`;
    alertEl.className = 'alert show';
    return;
  }

  // Validation: check if same rider is on both teams
  if (opponentTeam) {
    const myNames = new Set(selectedRiders.map(r => r.name.trim().toLowerCase()));
    const oppNames = opponentTeam.riders.filter(r => r.active !== false).map(r => r.name.trim().toLowerCase());
    const overlap = oppNames.filter(n => myNames.has(n));
    if (overlap.length > 0) {
      alertEl.textContent = `⚠️ The same rider is selected on both teams — check your lineup`;
      alertEl.className = 'alert show';
      return;
    }
  }
  
  const sliderEl = document.getElementById('dist-filter');
  const _sv = sliderEl ? parseFloat(sliderEl.value) : Infinity;
  const activeDist = (sliderEl && _sv >= parseFloat(sliderEl.max)) ? Infinity : _sv;
  const selected = courses.filter(c =>
    c.selected &&
    c.distance <= activeDist &&
    (activeWorlds.has('All') || activeWorlds.has(c.world))
  );
  if (!selected.length) { 
    alertEl.textContent = 'No routes match your current distance filter — try increasing the max distance slider'; 
    alertEl.className = 'alert show'; 
    return; 
  }

  const mode = document.getElementById('match-mode').value;
  const team = getTeamProfile();

  // Calculate average raw watts and weight for physics engine (uses curve data if available)
  const avgRawFtp = selectedRiders.reduce((s, r) => s + getRiderWatts(r, 'ftp'), 0) / selectedRiders.length;
  const avgRawSprint = selectedRiders.reduce((s, r) => s + getRiderWatts(r, 'sprint'), 0) / selectedRiders.length;
  const avgWeight = selectedRiders.reduce((s, r) => s + r.weight, 0) / selectedRiders.length;

  // Update info-bar with watt curve data
  // Info bar is updated per-result after lineup is picked — cleared here
  document.getElementById('run-info').textContent = `${riders.length} riders in pool · best ${teamSize} picked per route`;

  if (mode === 'course') {
    const ranked = selected.map(c => {
      const fp = getCourseFingerprint(c);

      // Pick the optimal lineup for THIS course based on its fingerprint
      const { lineup, profile } = getBestLineupForCourse(c, teamSize);

      // Build a team profile from the optimal lineup (not all selected riders)
      const lineupProfile = {
        tt:      Math.min(100, Math.round(profile.tt)),
        sprint:  Math.min(100, Math.round(profile.sprint)),
        punch:   Math.min(100, Math.round(profile.punch)),
        medium:  Math.min(100, Math.round(profile.medium)),
        climber: Math.min(100, Math.round(profile.climber)),
        // Raw averages for physics-accurate flat vs climb scoring
        avgFtpW:   lineup.reduce((s,x) => s + getRiderWatts(x.rider,'ftp'), 0) / lineup.length,
        avgFtpWkg: lineup.reduce((s,x) => s + ((x.rider.twentyMin||0) > 0 ? x.rider.twentyMin : getRiderWatts(x.rider,'ftp')/(x.rider.weight||70)), 0) / lineup.length
      };

      const result = matchScore(lineupProfile, c);
      let strategicDiff = 0;
      let vsHTML = "";

      if (opponentTeam) {
        // Pick opponent's best N for THIS course
        const oppBest = getBestOppLineupForCourse(c, teamSize);
        const oppProfile = oppBest ? oppBest.profile : null;

        if (oppProfile) {
          const adv_tt      = lineupProfile.tt      - oppProfile.tt;
          const adv_sprint  = lineupProfile.sprint  - oppProfile.sprint;
          const adv_punch   = lineupProfile.punch   - oppProfile.punch;
          const adv_climber = lineupProfile.climber - oppProfile.climber;

          strategicDiff = (
            fp.tt      * adv_tt      * 0.35 +
            fp.sprint  * adv_sprint  * 0.20 +
            fp.punch   * adv_punch   * 0.25 +
            fp.climber * adv_climber * 0.20
          ) / 100;

          const color = strategicDiff >= 0 ? 'var(--accent3)' : 'var(--red)';
          const sign  = strategicDiff >= 0 ? '+' : '';
          vsHTML = `<div style="font-family:monospace; font-size:0.7rem; color:${color}; margin-bottom:8px; border-left: 2px solid ${color}; padding-left: 8px;">
                      STRATEGIC ADVANTAGE VS ${opponentTeam.name}: ${sign}${strategicDiff.toFixed(1)}
                      <span style="opacity:0.5;margin-left:8px">their best lineup: ${oppProfile.names.join(' · ')}</span>
                    </div>`;
        }
      }

      return {
        course: c,
        score: result.score,
        diff: strategicDiff,
        vsHTML: vsHTML,
        fp: fp,
        lineup: lineup   // now the best N riders for this specific course
      };
    })
    .sort((a, b) => opponentTeam ? b.diff - a.diff : b.score - a.score);

    const maxScore = Math.max(...ranked.map(r => r.score));
    const maxDiff  = opponentTeam ? Math.max(...ranked.map(r => r.diff)) : null;

    const noOppNote = !opponentTeam
      ? `<div style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--accent2);letter-spacing:1px;padding:10px 14px;background:rgba(255,107,53,0.08);border:1px solid rgba(255,107,53,0.25);border-radius:3px;margin-bottom:16px">
           ⚠ NO OPPONENT SELECTED — routes ranked by how well your riders' strengths match each route's demands. Select an opponent for full strategic advantage analysis.
         </div>`
      : '';

    grid.innerHTML = noOppNote + ranked.map((r, i) => {
      const pct      = Math.round((r.score / (maxScore || 1)) * 100);
      const isBest   = opponentTeam ? r.diff === maxDiff : r.score === maxScore;
      const why = generateMatchWhy(team, r.course, r.fp, isBest);

      // Pre-compute lineup stats outside the template literal to avoid nesting issues
      const ln = r.lineup.length;
      const lAvgFtp    = Math.round(r.lineup.reduce((s,x) => s + getRiderWatts(x.rider,'ftp'),    0) / ln);
      const lAvgSprint = Math.round(r.lineup.reduce((s,x) => s + getRiderWatts(x.rider,'sprint'), 0) / ln);
      const lAvg1min   = Math.round(r.lineup.reduce((s,x) => s + getRiderWatts(x.rider,'w1min'),  0) / ln);
      const lAvg5min   = Math.round(r.lineup.reduce((s,x) => s + getRiderWatts(x.rider,'w5min'),  0) / ln);
      const lAvgWkg    = (r.lineup.reduce((s,x) => s + x.rider.twentyMin, 0) / ln).toFixed(2);
      const lCurve     = r.lineup.some(x => hasCurveData(x.rider)) ? ' ★ curve' : '';
      const lineupStats = `Lineup avg: ${lAvgFtp}W FTP · ${lAvgSprint}W sprint · ${lAvg1min}W 1min · ${lAvg5min}W 5min · ${lAvgWkg} W/kg${lCurve}`;

      return `
        <div class="result-card ${isBest ? 'rank-1' : ''}" style="animation:slideIn 0.25s ease ${i*0.06}s both">
          <div class="result-rank" style="color:${isBest ? 'var(--accent2)' : 'var(--border)'}">${i+1}</div>
          <div class="result-info">
            <div class="result-course-name">
              ${r.course.name}
              ${isBest ? '<span style="font-family:\'JetBrains Mono\',monospace;font-size:0.6rem;color:var(--accent2);margin-left:8px;letter-spacing:1px">★ BEST MATCH</span>' : ''}
            </div>
            <div class="result-meta">${r.course.world} · ${r.course.distance}km · ${r.course.elevation}m ↑ (${(r.course.elevation/r.course.distance).toFixed(1)} m/km)</div>
            ${r.vsHTML}
            <div class="result-why">${why}</div>
            <div style="margin-top:6px;font-family:monospace;font-size:0.65rem;color:var(--accent)">
              Lineup: ${r.lineup.map(x => x.rider.name).join(' · ')}
            </div>
            <div style="font-family:monospace;font-size:0.6rem;color:var(--text-dim);margin-top:2px">
              ${lineupStats}
            </div>
            <div class="breakdown">
              ${[['TT','tt','var(--accent)'],['Sprint','sprint','var(--accent2)'],['Punch','punch','var(--purple)'],['Medium','medium','#ff9f43'],['Climb','climber','var(--accent3)']].map(([label,key,color])=>`
                <div class="breakdown-item">
                  <span class="breakdown-label">${label}</span>
                  <div class="breakdown-bar-wrap"><div class="breakdown-bar" style="width:${r.fp[key]}%;background:${color}"></div></div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="result-score-wrap">
            <div class="result-score">${Math.round(r.score)}</div>
            <span class="result-score-label">MATCH SCORE</span>
            <div class="score-bar"><div class="score-bar-fill" style="width:${pct}%"></div></div>

          </div>
        </div>
      `;
    }).join('');

  } else {
    // Rider mode: Rank riders for a specific route
    const courseId = parseInt(document.getElementById('match-course-select').value);
    const baseCourse = courses.find(c => c.id === courseId);
    if (!baseCourse) return;
    const laps = Math.max(1, parseInt(document.getElementById('match-laps').value) || 1);
    const _lapDist = Math.round((baseCourse.distance - (baseCourse.leadIn || 0)) * 10) / 10;
    const course = laps === 1 ? baseCourse : Object.assign({}, baseCourse, {
      distance: Math.round(((baseCourse.leadIn || 0) + _lapDist * laps) * 10) / 10,
      elevation: Math.round(baseCourse.elevation * ((baseCourse.leadIn || 0) / baseCourse.distance + (_lapDist / baseCourse.distance) * laps)),
      flatKm: Math.round(baseCourse.flatKm * laps * 10) / 10,
      punches: baseCourse.punches * laps,
      endurance: baseCourse.endurance != null ? Math.min(75, baseCourse.endurance + (laps - 1) * 7) : undefined,
      sprint: baseCourse.sprint != null ? Math.max(0, baseCourse.sprint - (laps - 1) * 3) : undefined
    });

    const fp = getCourseFingerprint(course);
    const riderScores = riders.map(r => {
      const score = scoreRiderForCourse(r, fp);
      // Build individual dimension scores for display
      const wFtp    = getRiderWatts(r, 'ftp');
      const wSprint = getRiderWatts(r, 'sprint');
      const w1min   = getRiderWatts(r, 'w1min');
      const w5min   = getRiderWatts(r, 'w5min');
      const hasCurve = hasCurveData(r);
      return { rider: r, score, wFtp, wSprint, w1min, w5min, hasCurve };
    }).sort((a, b) => b.score - a.score);

    grid.innerHTML = `
      <div style="font-family:monospace;font-size:0.75rem;color:var(--text-dim);margin-bottom:8px;letter-spacing:1px">
        Riders ranked for: <span style="color:var(--accent)">${course.name}</span>
        <span style="color:var(--text-dim);margin-left:12px">(score uses real watts where available)</span>
      </div>
      ${riderScores.map((r, i) => `
        <div class="result-card rank-${i+1}">
          <div class="result-rank">${i+1}</div>
          <div class="result-info">
            <div class="result-course-name">${r.rider.name}</div>
            <div class="result-meta" style="display:flex;gap:16px;flex-wrap:wrap;margin-top:4px">
              <span>FTP <strong style="color:var(--accent)">${r.wFtp}W</strong> (${r.rider.twentyMin.toFixed(2)} W/kg)</span>
              <span>Sprint <strong style="color:var(--accent2)">${r.wSprint}W</strong></span>
              <span>1min <strong style="color:var(--purple)">${r.w1min}W</strong></span>
              <span>5min <strong style="color:var(--accent3)">${r.w5min}W</strong></span>
              ${r.hasCurve ? '<span style="color:var(--accent3);font-size:0.6rem">● CURVE DATA</span>' : '<span style="color:var(--text-dim);font-size:0.6rem">○ estimated</span>'}
            </div>
          </div>
          <div class="result-score-wrap">
            <div class="result-score">${r.score}</div>
            <span class="result-score-label">MATCH SCORE</span>
          </div>
        </div>
      `).join('')}
    `;
  }
}

function generateMatchWhy(team, course, fp, isBest) {
  const reasons = [];
  if (fp.tt > 60 && team.tt > 50)               reasons.push('Pursuit/TT effort plays to your team\'s sustained power');
  if (fp.sprint > 60 && team.sprint > 55)        reasons.push('Sprint finish suits your team\'s peak power numbers');
  if (fp.punch > 60 && team.punch > 55)          reasons.push('Punchy climbs match your team\'s 1-min W/kg strength');
  if (fp.medium > 55 && team.medium > 50)        reasons.push('Medium climbs of 3-10 min suit your team\'s 5-min power');
  if (fp.climber > 65 && team.climber > 55)      reasons.push('Sustained climbing suits your team\'s FTP W/kg (20-min power)');
  if (fp.endurance > 50 && team.endurance > 45)  reasons.push('Long endurance demand suits your team\'s sustained FTP output');
  if (fp.climber > 65 && team.climber < 35)      reasons.push('⚠ Significant climbing may expose team weaknesses');
  if (fp.medium > 55 && team.medium < 35)        reasons.push('⚠ Sustained medium climbs may not suit your team profile');
  if (fp.sprint > 65 && team.sprint < 40)        reasons.push('⚠ Sprint-heavy parcours may not suit your team profile');
  if (fp.endurance > 55 && team.endurance < 35)  reasons.push('⚠ Long endurance demands may expose team weaknesses');
  if (!reasons.length) reasons.push(`Moderate match — ${course.distance}km / ${course.elevation}m`);
  return reasons[0] + (isBest ? ' ★ Best pick' : '');
}

// ═══════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// CONTEXT BAR
// ═══════════════════════════════════════════════════════
function updateContextBar() {
  const selectedRiders = riders.filter(r => r.selected);
  const routeCount = courses.filter(c => {
    const sliderEl = document.getElementById('dist-filter');
    const dist = sliderEl ? parseFloat(sliderEl.value) : Infinity;
    return c.selected && c.distance <= dist && (activeWorlds.has('All') || activeWorlds.has(c.world));
  }).length;
  const teamSize = parseInt(document.getElementById('team-size')?.value) || 5;

  // My team block
  const myTeamEl = document.getElementById('ctx-myteam');
  if (myTeamEl) {
    if (selectedRiders.length === 0) {
      myTeamEl.textContent = 'No riders selected';
      myTeamEl.className = 'ctx-value warning';
    } else {
      const avgWkg = (selectedRiders.reduce((s,r) => s + r.twentyMin, 0) / selectedRiders.length).toFixed(2);
      myTeamEl.textContent = `${selectedRiders.length} riders · ${avgWkg} W/kg avg`;
      myTeamEl.className = 'ctx-value has-data';
    }
  }

  // VS block
  const vsEl = document.getElementById('ctx-vs');
  if (vsEl) vsEl.className = opponentTeam ? 'ctx-vs active' : 'ctx-vs';

  // Opponent block
  const oppEl = document.getElementById('ctx-opponent');
  if (oppEl) {
    if (opponentTeam) {
      const activeOpp = opponentTeam.riders.filter(r => r.active !== false);
      oppEl.textContent = `${opponentTeam.name} · ${activeOpp.length} riders`;
      oppEl.className = 'ctx-value vs-active';
    } else {
      oppEl.textContent = 'None — absolute scoring';
      oppEl.className = 'ctx-value';
    }
  }

  // Routes block
  const routesEl = document.getElementById('ctx-routes');
  if (routesEl) {
    routesEl.textContent = routeCount === 0 ? 'No routes selected' : `${routeCount} routes selected`;
    routesEl.className = routeCount === 0 ? 'ctx-value warning' : 'ctx-value has-data';
  }

  // Team size block
  // team size is shown directly via the #team-size select in the context bar
}

function showAlert(id) {
  const el = document.getElementById(id);
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

function toggleCollapsible(header) {
  const body = document.getElementById('manual-add-body');
  const arrow = header.querySelector('span');
  body.classList.toggle('open');
  arrow.textContent = body.classList.contains('open') ? '▼' : '▶';
}

// ═══════════════════════════════════════════════════════
// INIT & STORAGE
// ═══════════════════════════════════════════════════════

const APP_VERSION = 'v1.3.116'; // bump this on every update
const RIDERS_VERSION = 'v5.1'; // bump this whenever the built-in roster changes

function saveToStorage() {
  localStorage.setItem('zwift_riders', JSON.stringify(riders));
  localStorage.setItem('zwift_active_team', activeMyTeamKey);
  localStorage.setItem('zwift_courses_version', APP_VERSION);
  const deselected = courses.filter(c => !c.selected && !c.custom).map(c => c.name);
  localStorage.setItem('zwift_courses_deselected', JSON.stringify(deselected));
}

function loadFromStorage() {
  // Restore active team
  const savedTeam = localStorage.getItem('zwift_active_team');
  if (savedTeam && MY_TEAMS[savedTeam]) {
    activeMyTeamKey = savedTeam;
    riders = MY_TEAMS[activeMyTeamKey].riders;
    const sel = document.getElementById('my-team-select');
    if (sel) sel.value = activeMyTeamKey;
    const capBlock = document.getElementById('captains-block');
    if (capBlock) capBlock.innerHTML = MY_TEAMS[activeMyTeamKey].captainsHTML || '';
  }
  // Restore rider selection state
  const savedVersion = localStorage.getItem('zwift_riders_version');
  if (savedVersion === RIDERS_VERSION) {
    const saved = localStorage.getItem('zwift_riders');
    if (saved) {
      const savedRiders = JSON.parse(saved);
      riders = riders.map(r => {
        const s = savedRiders.find(sr => sr.name === r.name);
        return s ? { ...r, selected: s.selected } : r;
      });
    }
  } else {
    localStorage.removeItem('zwift_riders');
    localStorage.setItem('zwift_riders_version', RIDERS_VERSION);
  }
  // Restore course selection state (version-gated — new routes always appear selected)
  const savedCoursesVersion = localStorage.getItem('zwift_courses_version');
  if (savedCoursesVersion === APP_VERSION) {
    const savedDeselected = localStorage.getItem('zwift_courses_deselected');
    if (savedDeselected) {
      const deselectedNames = new Set(JSON.parse(savedDeselected));
      courses.forEach(c => { if (!c.custom) c.selected = !deselectedNames.has(c.name); });
    }
  } else {
    localStorage.removeItem('zwift_courses_deselected');
    localStorage.setItem('zwift_courses_version', APP_VERSION);
  }
  // Sync selected state back into MY_TEAMS so all code paths see the same data
  if (MY_TEAMS[activeMyTeamKey]) {
    MY_TEAMS[activeMyTeamKey].riders.forEach(r => {
      const match = riders.find(lr => lr.name === r.name);
      if (match) r.selected = match.selected;
    });
  }
}

// Ensure everything is rendered when the page loads

// ═══════════════════════════════════════════════════════
// RUNG OVERVIEW
// ═══════════════════════════════════════════════════════

function calcTeamPowerIndex(teamRiders) {
  // Use active riders only (or all if active not set)
  var active = teamRiders.filter(function(r) { return r.active !== false; });
  if (!active.length) active = teamRiders;

  function avg(fn) {
    var vals = active.map(fn).filter(function(v){ return v > 0; });
    return vals.length ? vals.reduce(function(a,b){ return a+b; }, 0) / vals.length : 0;
  }

  var avgFtpWkg  = avg(function(r){ return r.wkg20min || r.twentyMin || r.wkg || 0; });
  var avgSprint  = avg(function(r){ return r.wkg5s    || r.sprint    || 0; });
  var avgPunch   = avg(function(r){ return r.wkg1min  || r.oneMin    || 0; });
  var avgMed     = avg(function(r){ return r.wkg5min  || r.fiveMin   || 0; });
  var avgFtpW    = avg(function(r){ return r.w20min   || r.watt      || 0; });

  // Weighted power index: FTP W/kg most important, then 5min, 1min, sprint
  var index = avgFtpWkg * 30 + avgMed * 20 + avgPunch * 15 + avgSprint * 2 + avgFtpW * 0.05;

  return {
    index:     Math.round(index * 10) / 10,
    ftpWkg:    Math.round(avgFtpWkg * 100) / 100,
    sprintWkg: Math.round(avgSprint * 100) / 100,
    punchWkg:  Math.round(avgPunch  * 100) / 100,
    medWkg:    Math.round(avgMed    * 100) / 100,
    ftpW:      Math.round(avgFtpW),
    count:     active.length
  };
}

function renderRungOverview() {
  var rungNum = parseInt(document.getElementById('rung-overview-select').value);
  var contentEl = document.getElementById('rung-overview-content');
  var challengeOnly = document.getElementById('rung-challenge-filter') && document.getElementById('rung-challenge-filter').checked;
  var challengeInfo = document.getElementById('rung-challenge-info');
  if (!rungNum) return;

  var allTeams = [];
  var myTeamKeys = Object.keys(MY_TEAMS);
  Object.entries(OPPONENT_LIBRARY).forEach(function(entry) {
    var key = entry[0], team = entry[1];
    if (key === activeMyTeamKey) return; // skip only the currently active team
    if (team.riders && team.riders.length) {
      var stats = calcTeamPowerIndex(team.riders);
      allTeams.push({ name: team.name, key: key, isOwn: false, rung: team.rung,
        ladderPosition: team.ladderPosition || null, positionInRung: team.positionInRung || null, stats: stats });
    }
  });
    // Only add the active own team once
  var _own = MY_TEAMS[activeMyTeamKey];
  if (_own && _own.riders && _own.riders.length) {
    var _ownRung = _own.rung;
    if (!_ownRung && OPPONENT_LIBRARY[activeMyTeamKey]) {
      _ownRung = OPPONENT_LIBRARY[activeMyTeamKey].rung;
    }
    if (!_ownRung) _ownRung = rungNum;
    var _active = _own.riders.filter(function(r){ return r.selected !== false; });
    var _stats = calcTeamPowerIndex(_active.length ? _active : _own.riders);
    // Get ladder positions from OPPONENT_LIBRARY since MY_TEAMS doesn't store them
    var _oppRef = OPPONENT_LIBRARY[activeMyTeamKey] || {};
    allTeams.push({ name: _own.name + ' ★', key: activeMyTeamKey, isOwn: true, rung: _ownRung,
      ladderPosition: _own.ladderPosition || _oppRef.ladderPosition || null,
      positionInRung: _own.positionInRung || _oppRef.positionInRung || null, stats: _stats });
  };

  allTeams.sort(function(a, b) {
    var ap = a.ladderPosition || (a.rung * 100 + (a.positionInRung || 99));
    var bp = b.ladderPosition || (b.rung * 100 + (b.positionInRung || 99));
    return ap - bp;
  });
  allTeams.forEach(function(t, i) { t.globalPos = i + 1; });

  var ownTeam = allTeams.find(function(t) { return t.isOwn && t.key === activeMyTeamKey; })
             || allTeams.find(function(t) { return t.isOwn; });
  var ownFtpWkg   = ownTeam ? ownTeam.stats.ftpWkg   : 0;
  var ownMedWkg   = ownTeam ? ownTeam.stats.medWkg   : 0;
  var ownPunchWkg = ownTeam ? ownTeam.stats.punchWkg : 0;
  var ownGlobalPos = ownTeam ? ownTeam.globalPos : null;

  var teams;
  if (challengeOnly && ownTeam !== null && ownTeam !== undefined) {
    // Use real ladderPosition for challenge range — not globalPos
    var ownPos = ownTeam.ladderPosition || ownTeam.globalPos;
    var lo = ownPos - 7;
    var hi = ownPos + 7;
    teams = allTeams.filter(function(t) {
      var pos = t.ladderPosition || t.globalPos;
      return pos >= lo && pos <= hi;
    });
    if (challengeInfo) challengeInfo.style.display = 'block';
  } else {
    teams = allTeams.filter(function(t) { return t.rung === rungNum; });
    if (challengeInfo) challengeInfo.style.display = 'none';
  }

  if (!teams.length) { contentEl.innerHTML = '<div class="empty" style="padding:40px">No teams found</div>'; return; }

  var base = "font-family:'JetBrains Mono',monospace;";
  var luMatch = document.documentElement.innerHTML.match(/LAST_UPDATED_START -->(.*?)<!/);
  var lastUpdated = luMatch ? luMatch[1].trim() : '';

  var ownInList = teams.find(function(t){ return t.isOwn && t.key === activeMyTeamKey; });
  var ownRank = ownInList ? (teams.indexOf(ownInList) + 1) : null;

  var html = '<div style="' + base + 'font-size:0.6rem;color:var(--text-dim);letter-spacing:1px;margin-bottom:16px;display:flex;flex-wrap:wrap;gap:12px;align-items:center">';
  html += '<span>' + teams.length + ' TEAMS</span>';
  if (ownRank) html += '<span style="color:var(--accent)">You: #' + ownRank + ' of ' + teams.length + '</span>';
  if (lastUpdated) html += '<span style="opacity:0.5">\u00b7 ' + lastUpdated + '</span>';
  html += '</div>';

  html += '<div style="display:grid;grid-template-columns:32px 1fr 90px 90px 90px;gap:4px;align-items:center;' + base + 'font-size:0.5rem;color:var(--text-dim);letter-spacing:1px;padding:0 6px;margin-bottom:4px">';
  html += '<div></div><div>TEAM</div>';
  html += '<div style="text-align:center">FTP W/KG<br><span style="opacity:0.5">vs you</span></div>';
  html += '<div style="text-align:center">5MIN W/KG<br><span style="opacity:0.5">vs you</span></div>';
  html += '<div style="text-align:center">1MIN W/KG<br><span style="opacity:0.5">vs you</span></div>';
  html += '</div>';

  teams.forEach(function(team, i) {
    var rank = i + 1;
    var isOwn = team.isOwn && team.key === activeMyTeamKey;

    function pct(theirs, ours) {
      if (isOwn || ours <= 0) return null;
      return Math.round((theirs - ours) / ours * 100);
    }
    function pctHtml(v) {
      if (v === null) return '<span style="color:var(--accent)">YOU \u2605</span>';
      var color = v > 5 ? 'var(--red)' : v < -5 ? 'var(--accent3)' : 'var(--text-dim)';
      return '<span style="color:' + color + '">' + (v > 0 ? '+' : '') + v + '%</span>';
    }

    var rankColor = rank === 1 ? '#ffd700' : rank === 2 ? '#c0c0c0' : rank === 3 ? '#cd7f32' : 'var(--text-dim)';
    var rowBg = isOwn ? 'background:rgba(0,229,255,0.07);border:1px solid rgba(0,229,255,0.3);' : 'background:var(--surface2);border:1px solid var(--border);';
    var rungBadge = challengeOnly ? ' <span style="' + base + 'font-size:0.47rem;background:var(--surface2);border:1px solid var(--border);color:var(--text-dim);padding:1px 4px">R' + team.rung + '</span>' : '';

    html += '<div style="' + rowBg + 'padding:7px 10px;margin-bottom:3px;display:grid;grid-template-columns:32px 1fr 90px 90px 90px;gap:4px;align-items:center">';
    html += '<div style="font-family:Bebas Neue,sans-serif;font-size:1.1rem;color:' + rankColor + ';line-height:1">' + rank + '</div>';
    html += '<div style="min-width:0">';
    html += '<div style="font-family:Bebas Neue,sans-serif;font-size:0.85rem;letter-spacing:1px;color:' + (isOwn ? 'var(--accent)' : 'var(--text)') + ';overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + team.name + rungBadge + '</div>';
    html += '<div style="' + base + 'font-size:0.5rem;color:var(--text-dim);margin-top:1px">';
    if (team.ladderPosition) html += '#' + team.ladderPosition + ' ladder';
    if (team.positionInRung) html += ' \u00b7 #' + team.positionInRung + ' in rung';
    html += '</div></div>';
    html += '<div style="text-align:center;' + base + 'font-size:0.68rem;font-weight:700">' + pctHtml(pct(team.stats.ftpWkg,   ownFtpWkg))   + '</div>';
    html += '<div style="text-align:center;' + base + 'font-size:0.68rem;font-weight:700">' + pctHtml(pct(team.stats.medWkg,   ownMedWkg))   + '</div>';
    html += '<div style="text-align:center;' + base + 'font-size:0.68rem;font-weight:700">' + pctHtml(pct(team.stats.punchWkg, ownPunchWkg)) + '</div>';
    html += '</div>';
  });

  contentEl.innerHTML = html;
}

function autoSelectOwnRung() {
  var team = MY_TEAMS[activeMyTeamKey];
  if (!team || !team.rung) return;
  var sel = document.getElementById('rung-overview-select');
  if (!sel) return;
  sel.value = String(team.rung);
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = isLight ? '🌙 Dark' : '☀ Light';
  localStorage.setItem('leqp_theme', isLight ? 'light' : 'dark');
  document.documentElement.className = isLight ? 'light-mode' : '';
}

function applyStoredTheme() {
  const isLight = localStorage.getItem('leqp_theme') !== 'dark';
  document.body.classList.toggle('light-mode', isLight);
  document.documentElement.className = isLight ? 'light-mode' : '';
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = isLight ? '🌙 Dark' : '☀ Light';
}

window.addEventListener('resize', _updateTabScrollHint);

window.onload = function() {
  // Hide context bar on default tab (profile)
  const cb = document.getElementById('context-bar');
  if (cb) cb.style.display = 'none';
  // Build LEQP rider buttons on load (profile is default tab, switchTab never called)
  _profileBuildLeqpBtns();
  // Init fixtures
  initFixtures();
  // Sæt route-antal dynamisk
  var rc = document.getElementById('route-count');
  if (rc && typeof ZWIFT_ROUTES !== 'undefined') rc.textContent = Object.keys(ZWIFT_ROUTES).length;
  // Inject app version
  const logoSub = document.getElementById('logo-sub');
  if (logoSub) logoSub.textContent = `Course × Rider Intelligence System · LEQP Edition ${APP_VERSION} · Live on 49.dk`;
  document.querySelectorAll('.app-version-text').forEach(el => el.textContent = `COURSE × RIDER INTELLIGENCE SYSTEM · LEQP EDITION ${APP_VERSION}`);
  applyStoredTheme();
  // Read saved team BEFORE populating dropdown to avoid flash
  const savedTeam = localStorage.getItem('zwift_active_team');
  if (savedTeam && MY_TEAMS[savedTeam]) activeMyTeamKey = savedTeam;

  // Populate my-team dropdown from MY_TEAMS
  const myTeamSel = document.getElementById('my-team-select');
  if (myTeamSel) {
    myTeamSel.innerHTML = Object.entries(MY_TEAMS).map(([key, team]) =>
      `<option value="${key}">● ${team.name}</option>`
    ).join('');
    myTeamSel.value = activeMyTeamKey;
  }
  rebuildOppOwnTeams(); // Add own teams to opponent dropdown

  loadFromStorage();   // 1. Load from storage

  updateMyTeamRung(activeMyTeamKey); // <--- NY LINJE TILFØJET HER

  // Safety: if riders is empty after loadFromStorage, reload from MY_TEAMS
  if (!riders || riders.length === 0) {
    riders = MY_TEAMS[activeMyTeamKey].riders;
  }

  renderRiders();      // 2. Render riders
  renderWorldFilter(); // 3. Render world filter buttons

  // Set distance slider max to the longest route in the database
  const longestRoute = Math.ceil(Math.max(...courses.map(c => c.distance)));
  const sliderEl = document.getElementById('dist-filter');
  const labelEl  = document.getElementById('dist-max-label');
  if (sliderEl) { sliderEl.max = longestRoute; sliderEl.value = 25; }
  if (labelEl)  { labelEl.textContent = longestRoute + ' km'; }
  const distValEl = document.getElementById('dist-val');
  if (distValEl) { distValEl.textContent = '25 km'; }

  filterCourses();     // 4. Render courses
  updateSelectedCount();
  updateContextBar();  // 5. Update context bar
};

// ═══════════════════════════════════════════════════════
// MATCHUP ROUTE SELECTOR
// ═══════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════
// MATCHUP ROUTE SELECTOR
// ═══════════════════════════════════════════════════════

function populateMatchupRoutes() {
  const sel = document.getElementById('matchup-route-select');
  if (!sel) return;
  const searchInput = document.getElementById('matchup-route-search');
  const search = (searchInput?.value || '').toLowerCase();
  const saved  = sel.value; // Bevar nuværende valg hvis muligt
  
  sel.innerHTML = '<option value="">— No specific route selected —</option>';
  const sorted = [...courses].sort((a,b) => a.name.localeCompare(b.name));
  
  let matchFound = false;

  sorted.forEach(c => {
    if (search && !c.name.toLowerCase().includes(search) && !c.world.toLowerCase().includes(search)) return;
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = c.name + ' (' + c.world + ' · ' + c.distance + 'km · ' + c.elevation + 'm)';
    if (c.name === saved) {
      opt.selected = true;
      matchFound = true;
    }
    sel.appendChild(opt);
  });

  // Hvis man søger, og det gamle valg ikke længere passer, så vælg det første hit automatisk!
  if (search && !matchFound && sel.options.length > 1) {
    sel.selectedIndex = 1;
  } else if (!search && !matchFound) {
    sel.selectedIndex = 0;
  }
}

function filterMatchupRoutes() {
  populateMatchupRoutes();
  // Update analysis live while typing, but do NOT scroll
  const sel = document.getElementById('matchup-route-select');
  const tag = document.getElementById('matchup-route-tag');
  const name = sel?.value;
  if (!name || !tag) { if (tag) tag.style.display = 'none'; renderMatchupAnalysis(); return; }
  const course = getSelectedMatchupCourse();
  if (course && tag) {
    const fp = getCourseFingerprint(course);
    const dominant = getProfileDominant(course, fp);
    const labels = { climber:'⛰ Climbing', punch:'💥 Punchy', tt:'➡ Flat/TT', sprint:'⚡ Sprint finish', medium:'📈 Hilly', endurance:'⏱ Endurance' };
    const colors = { climber:'var(--accent3)', punch:'var(--accent2)', tt:'var(--accent)', sprint:'var(--purple,#b388ff)', medium:'var(--accent2)', endurance:'var(--accent3)' };
    tag.textContent = labels[dominant] || 'Mixed';
    tag.style.background = colors[dominant] || 'var(--border)';
    tag.style.color = 'var(--bg)';
    tag.style.display = 'inline-block';
  }
  renderMatchupAnalysis();
}

function onMatchupRouteChange() {
  const sel  = document.getElementById('matchup-route-select');
  const tag  = document.getElementById('matchup-route-tag');
  const name = sel?.value;
  if (!name || !tag) { if (tag) tag.style.display = 'none'; renderMatchupAnalysis(); return; }
  const course = getSelectedMatchupCourse();
  if (course && tag) {
    const fp = getCourseFingerprint(course);
    const dominant = getProfileDominant(course, fp);
    const labels = { climber:'⛰ Climbing', punch:'💥 Punchy', tt:'➡ Flat/TT', sprint:'⚡ Sprint finish', medium:'📈 Hilly', endurance:'⏱ Endurance' };
    const colors = { climber:'var(--accent3)', punch:'var(--accent2)', tt:'var(--accent)', sprint:'var(--purple,#b388ff)', medium:'var(--accent2)', endurance:'var(--accent3)' };
    tag.textContent  = labels[dominant] || 'Mixed';
    tag.style.background = colors[dominant] || 'var(--border)';
    tag.style.color  = 'var(--bg)';
    tag.style.display = 'inline-block';
  }
  renderMatchupAnalysis();
  // Scroll to top of page so route selector bar is visible
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
}

function getSelectedMatchupCourse() {
  const name = document.getElementById('matchup-route-select')?.value;
  if (!name) return null;
  const base = courses.find(c => c.name === name) || null;
  if (!base) return null;
  const laps = Math.max(1, parseInt(document.getElementById('matchup-laps')?.value) || 1);
  if (laps === 1) return base;
  const _lapDist = Math.round((base.distance - (base.leadIn || 0)) * 10) / 10;
  return Object.assign({}, base, {
    distance: Math.round(((base.leadIn || 0) + _lapDist * laps) * 10) / 10,
    elevation: Math.round(base.elevation * ((base.leadIn || 0) / base.distance + (_lapDist / base.distance) * laps)),
    flatKm: Math.round(base.flatKm * laps * 10) / 10,
    punches: base.punches * laps,
    endurance: base.endurance != null ? Math.min(75, base.endurance + (laps - 1) * 7) : undefined,
    sprint: base.sprint != null ? Math.max(0, base.sprint - (laps - 1) * 3) : undefined
  });
}

// ═══════════════════════════════════════════════════════
// ANALYZE MATCHUP FEATURE
// ═══════════════════════════════════════════════════════

function buildRouteAnalysis(course, flatAdv, climbAdv, punchAdv, sprintAdv, laps=1) {
  if (!course) {
    return '<div class="matchup-section"><div class="matchup-section-title">\ud83d\uddfa Route Analysis</div>' +
      '<div style="font-family:JetBrains Mono,monospace;font-size:0.7rem;color:var(--text-dim);padding:20px 0">' +
      'Select a route in the bar above to see how this matchup plays out on that specific course.</div></div>';
  }

  var fp = getCourseFingerprint(course);
  var dominant = getProfileDominant(course, fp);
  var routeTypeMap = { climber:'\u26f0 Climbing', punch:'\ud83d\udca5 Punchy', tt:'\u27a1 Flat/TT', sprint:'\u26a1 Sprint finish', medium:'\ud83d\udcc8 Hilly', endurance:'\u23f1 Endurance' };
  var routeType = routeTypeMap[dominant] || '\ud83d\udd00 Mixed terrain';

  // Duration modifier: total race distance shifts emphasis subtly.
  // Short races (<20km) → sprint matters more, endurance matters less.
  // Long races (>40km)  → TT/climb matter more, sprint matters less.
  // Effect is capped at ±20% so it nudges rather than overrides route character.
  var totalDist = course.distance; // already scaled by laps via getSelectedMatchupCourse()
  // sprintMod: +0.2 at 10km, 0 at 25km, -0.2 at 50km+
  var sprintMod  = Math.max(-0.20, Math.min(0.20, (25 - totalDist) / 75));
  // endurMod: inverse — longer = more weight on TT and climb
  var endurMod   = Math.max(-0.15, Math.min(0.20, (totalDist - 25) / 100));

  var score = 0;
  score += (flatAdv   > 0 ? fp.tt      * flatAdv   / 300  : fp.tt      * flatAdv   / 200)  * (1 + endurMod);
  score += (climbAdv  > 0 ? fp.climber * climbAdv  * 8    : fp.climber * climbAdv  * 12)   * (1 + endurMod);
  score += (punchAdv  > 0 ? fp.punch   * punchAdv  * 8    : fp.punch   * punchAdv  * 12);
  score += (sprintAdv > 0 ? fp.sprint  * sprintAdv / 400  : fp.sprint  * sprintAdv / 300)  * (1 + sprintMod);

  var scoreColor = score > 1.5 ? 'var(--accent3)' : score < -1.5 ? 'var(--red)' : 'var(--text-dim)';
  var sign = score > 0 ? '+' : '';

  var verdict = score > 1.5  ? '\u2705 This route plays to your strengths' :
                score > 0    ? '\ud83d\udfe1 Slight advantage on this route' :
                score > -1.5 ? '\ud83d\udfe0 Slight disadvantage on this route' :
                               '\u274c This route favours the opponent';

  // Build narrative description of the route demands
  var narrativeParts = [];
  if (fp.climber > 50) narrativeParts.push('sustained climbing where W/kg is decisive');
  else if (fp.climber > 30) narrativeParts.push('some climbing that rewards good W/kg');
  if (fp.punch > 50) narrativeParts.push('repeated punchy accelerations requiring explosive 1-min power');
  else if (fp.punch > 30) narrativeParts.push('occasional punchy efforts');
  if (fp.tt > 50) narrativeParts.push('long sustained efforts where raw watts and FTP dominate');
  else if (fp.tt > 30) narrativeParts.push('sustained stretches rewarding higher FTP');
  if (fp.sprint > 40) narrativeParts.push('a likely bunch sprint finish');
  if (fp.medium > 40) narrativeParts.push('medium-length climbs of 3-10 minutes');
  if (fp.endurance > 40) narrativeParts.push('long endurance demands where sustained power over 20+ minutes is crucial');
  var narrative = narrativeParts.length ? 'This route features ' + narrativeParts.join(', ') + '.' : '';
  // Append duration note when laps meaningfully shift the character
  if (laps > 1 && course.distance >= 40) narrative += (narrative ? ' ' : '') + 'At ' + course.distance + 'km total, endurance and sustained power become increasingly decisive.';
  else if (laps === 1 && course.distance <= 15 && fp.sprint > 30) narrative += (narrative ? ' ' : '') + 'The short distance keeps the bunch together — a sprint finish is very likely.';

  // Build advantage/disadvantage lists with richer labels
  var advantages = [];
  var disadvantages = [];
  if (flatAdv   > 10  && fp.tt      > 25) advantages.push('Flat power: your riders average +' + Math.round(flatAdv) + 'W on sustained efforts');
  if (climbAdv  > 0.1 && fp.climber > 25) advantages.push('Climbing: +' + climbAdv.toFixed(2) + ' W/kg advantage on the ascents');
  if (punchAdv  > 0.1 && fp.punch   > 25) advantages.push('Punch: +' + punchAdv.toFixed(2) + ' W/kg on short climbs and accelerations');
  if (sprintAdv > 20  && fp.sprint  > 25) advantages.push('Sprint: +' + Math.round(sprintAdv) + 'W in the final kick');
  if (flatAdv   < -10 && fp.tt      > 25) disadvantages.push('Flat power: opponent averages +' + Math.abs(Math.round(flatAdv)) + 'W on flat sections');
  if (climbAdv  < -0.1 && fp.climber > 25) disadvantages.push('Climbing: opponent has +' + Math.abs(climbAdv).toFixed(2) + ' W/kg on the climbs');
  if (punchAdv  < -0.1 && fp.punch  > 25) disadvantages.push('Punch: opponent has +' + Math.abs(punchAdv).toFixed(2) + ' W/kg on short efforts');
  if (sprintAdv < -20  && fp.sprint > 25) disadvantages.push('Sprint: opponent has +' + Math.abs(Math.round(sprintAdv)) + 'W finishing power');

  // Tactical tip based on situation
  var tip = '';
  if (score > 1.5) tip = '\ud83c\udfaf Tactic: Put your strongest riders in early and control the race from the front.';
  else if (score < -1.5) tip = '\ud83c\udfaf Tactic: Consider selecting a different route or focusing on a smaller, stronger lineup.';
  else if (score > 0) tip = '\ud83c\udfaf Tactic: A slight edge — ride aggressively on the sections that favour you.';
  else tip = '\ud83c\udfaf Tactic: Close matchup — rider selection and tactics on the day will be decisive.';

  var base = 'font-family:JetBrains Mono,monospace;';
  var html = '<div class="matchup-section" style="overflow:hidden">';
  html += '<div class="matchup-section-title">\ud83d\uddfa Route Analysis</div>';

  // Header card
  html += '<div style="background:var(--surface2);border:1px solid var(--border);padding:16px;margin-bottom:12px;overflow:hidden">';
  html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">';
  html += '<div style="min-width:0;flex:1">';
  html += '<div style="font-family:Bebas Neue,sans-serif;font-size:1.3rem;letter-spacing:3px;color:var(--text);word-break:break-word">' + course.name + '</div>';
  var baseDist = Math.round(course.distance / laps * 10) / 10;
  var baseElev = Math.round(course.elevation / laps);
  var lapsBadge = ' &nbsp;&#183;&nbsp; <span style="font-family:JetBrains Mono,monospace;font-size:0.62rem;background:var(--surface);border:1px solid var(--border);padding:1px 6px;border-radius:2px;color:var(--accent2);font-weight:700">' + laps + (laps > 1 ? ' laps' : ' lap') + '</span>';
  var distStr = laps > 1 ? '<span style="color:var(--accent2);font-weight:700">' + course.distance + ' km</span> (' + baseDist + ' &times; ' + laps + ')' : course.distance + ' km';
  var elevStr = laps > 1 ? '<span style="color:var(--accent2);font-weight:700">' + course.elevation + ' m ↑</span> (' + baseElev + ' &times; ' + laps + ')' : course.elevation + ' m ↑';
  html += '<div style="' + base + 'font-size:0.62rem;color:var(--text-dim);margin-top:3px">' + course.world + ' &nbsp;&#183;&nbsp; ' + distStr + ' &nbsp;&#183;&nbsp; ' + elevStr + ' &nbsp;&#183;&nbsp; ' + routeType + lapsBadge + '</div>';
  if (narrative) html += '<div style="' + base + 'font-size:0.62rem;color:var(--text-dim);margin-top:8px;line-height:1.6">' + narrative + '</div>';
  html += '<div style="' + base + 'font-size:0.7rem;margin-top:10px;color:' + scoreColor + ';font-weight:700">' + verdict + '</div>';
  html += '</div>';
  html += '<div style="font-family:Bebas Neue,sans-serif;font-size:2.2rem;letter-spacing:2px;color:' + scoreColor + ';text-align:right;flex-shrink:0">' + sign + score.toFixed(1) + '</div>';
  html += '</div>';
  html += '</div>';

  // Fingerprint bars for this route
  html += '<div style="background:var(--surface2);border:1px solid var(--border);padding:12px 16px;margin-bottom:12px">';
  html += '<div style="' + base + 'font-size:0.55rem;color:var(--text-dim);letter-spacing:1px;margin-bottom:8px">ROUTE DEMANDS</div>';
  var dims = [
    {key:'tt',      label:'Flat / TT',     color:'var(--accent)'},
    {key:'sprint',  label:'Sprint',        color:'var(--accent2)'},
    {key:'punch',   label:'Punch',         color:'var(--purple)'},
    {key:'medium',  label:'Med. Climb',    color:'#ff9f43'},
    {key:'climber', label:'Climb',         color:'var(--accent3)'}
  ];
  dims.forEach(function(d) {
    html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">';
    html += '<span style="' + base + 'font-size:0.58rem;color:var(--text-dim);width:70px;flex-shrink:0">' + d.label + '</span>';
    html += '<div style="flex:1;height:5px;background:var(--border)">';
    html += '<div style="height:100%;width:' + fp[d.key] + '%;background:' + d.color + '"></div>';
    html += '</div>';
    html += '<span style="' + base + 'font-size:0.58rem;color:' + d.color + ';width:28px;text-align:right">' + fp[d.key] + '</span>';
    html += '</div>';
  });
  html += '</div>';

  // Advantages / disadvantages
  if (advantages.length || disadvantages.length) {
    html += '<div style="background:var(--surface2);border:1px solid var(--border);padding:12px 16px;margin-bottom:12px">';
    if (advantages.length) {
      html += '<div style="' + base + 'font-size:0.58rem;color:var(--accent3);letter-spacing:1px;margin-bottom:6px">\u25b2 YOUR ADVANTAGES ON THIS ROUTE</div>';
      advantages.forEach(function(a) {
        html += '<div style="' + base + 'font-size:0.63rem;color:var(--accent3);padding:2px 0">&#9679; ' + a + '</div>';
      });
    }
    if (advantages.length && disadvantages.length) html += '<div style="height:8px"></div>';
    if (disadvantages.length) {
      html += '<div style="' + base + 'font-size:0.58rem;color:var(--red);letter-spacing:1px;margin-bottom:6px">\u25bc OPPONENT ADVANTAGES ON THIS ROUTE</div>';
      disadvantages.forEach(function(d) {
        html += '<div style="' + base + 'font-size:0.63rem;color:var(--red);padding:2px 0">&#9679; ' + d + '</div>';
      });
    }
    html += '</div>';
  } else {
    html += '<div style="background:var(--surface2);border:1px solid var(--border);padding:12px 16px;margin-bottom:12px;' + base + 'font-size:0.63rem;color:var(--text-dim)">&#9679; Balanced matchup — no significant power advantages on this route.</div>';
  }

  // Tactical tip
  html += '<div style="background:rgba(0,229,255,0.05);border:1px solid rgba(0,229,255,0.15);padding:10px 14px;' + base + 'font-size:0.63rem;color:var(--text-dim);line-height:1.6">' + tip + '</div>';

  html += '</div>';
  return html;
}

function toggleCompareSection(id, arrowEl) {
  const el = document.getElementById(id);
  if (!el) return;
  const hidden = el.style.display === 'none' || el.style.display === '';
  el.style.display = hidden ? 'table-row-group' : 'none';
  if (arrowEl) arrowEl.textContent = hidden ? '▼' : '▶';
}

window.printMatchup = function printMatchup() {
  // Expand all collapsed sections before printing
  document.querySelectorAll('[id^="cmp"]').forEach(el => {
    el.style.display = 'table-row-group';
  });
  document.querySelectorAll('.arr').forEach(el => {
    el.textContent = '▼';
  });
  // Set document title so Chrome uses it as filename
  const oldTitle = document.title;
  const myTeamEl = document.querySelector('.my-team-name');
  const oppTeamEl = document.querySelector('.opp-team-name');
  const myN  = myTeamEl  ? myTeamEl.textContent.trim()  : (window._h2hData ? window._h2hData.myName  : 'My Team');
  const oppN = oppTeamEl ? oppTeamEl.textContent.trim() : (window._h2hData ? window._h2hData.oppName : 'Opponent');
  document.title = 'Race Matchup - ' + myN + ' vs ' + oppN;
  window.print();
  document.title = oldTitle;
};

function buildComparisonTable(selectedRiders, oppRiders, fn, myName, oppName) {
  const intervals = [
    { label:'5 sec',  short:'5s',  wattKey:'sprint', wkgMinutes:'5s'    },
    { label:'15 sec', short:'15s', wattKey:'w15s',   wkgMinutes:'15s'   },
    { label:'30 sec', short:'30s', wattKey:'w30s',   wkgMinutes:'30s'   },
    { label:'1 min',  short:'1m',  wattKey:'w1min',  wkgMinutes:'1min'  },
    { label:'2 min',  short:'2m',  wattKey:'w2min',  wkgMinutes:'2min'  },
    { label:'5 min',  short:'5m',  wattKey:'w5min',  wkgMinutes:'5min'  },
    { label:'20 min', short:'20m', wattKey:'ftp',    wkgMinutes:'20min' },
  ];

  var myR  = selectedRiders;
  var oppR = oppRiders;

  const wkgMap = {
    '5s':   function(r) { return r.wkg5s   || fn(r,'sprint')/(r.weight||70); },
    '15s':  function(r) { return r.wkg15s  || fn(r,'w15s')  /(r.weight||70); },
    '30s':  function(r) { return r.wkg30s  || fn(r,'w30s')  /(r.weight||70); },
    '1min': function(r) { return r.wkg1min || fn(r,'w1min') /(r.weight||70); },
    '2min': function(r) { return r.wkg2min || fn(r,'w2min') /(r.weight||70); },
    '5min': function(r) { return r.wkg5min || fn(r,'w5min') /(r.weight||70); },
    '20min':function(r) { return r.wkg     || fn(r,'ftp')   /(r.weight||70); },
  };
  const wMap2 = {'5s':'sprint','15s':'w15s','30s':'w30s','1min':'w1min','2min':'w2min','5min':'w5min','20min':'ftp'};

  function myRiderW(r, key)  { return getRiderWatts(r, key); }
  function myRiderK(r, min)  { var k = wMap2[min]||'ftp'; return getRiderWatts(r,k)/(r.weight||70); }
  function oppRiderW(r, key) { return fn(r, key); }
  function oppRiderK(r, min) { return (wkgMap[min] ? wkgMap[min](r) : 0); }

  function teamAvgW(riders, key, getW) { return riders.reduce(function(s,r){ return s+getW(r,key); },0)/riders.length; }
  function teamAvgK(riders, min, getK) { return riders.reduce(function(s,r){ return s+getK(r,min); },0)/riders.length; }

  var myW  = intervals.map(function(iv){ return teamAvgW(myR,  iv.wattKey,    myRiderW); });
  var oppW = intervals.map(function(iv){ return teamAvgW(oppR, iv.wattKey,    oppRiderW); });
  var myK  = intervals.map(function(iv){ return teamAvgK(myR,  iv.wkgMinutes, myRiderK); });
  var oppK = intervals.map(function(iv){ return teamAvgK(oppR, iv.wkgMinutes, oppRiderK); });
  var dW   = intervals.map(function(_,i){ return Math.round(myW[i])-Math.round(oppW[i]); });
  var dK   = intervals.map(function(_,i){ return Math.round(myK[i]*100)/100 - Math.round(oppK[i]*100)/100; });
  var maxDW = Math.max.apply(null, dW.map(Math.abs).concat([1]));
  var maxDK = Math.max.apply(null, dK.map(Math.abs).concat([0.1]));

  function cellBg(delta, max) {
    var t = Math.min(1, Math.abs(delta) / max);
    if (delta > 0) return 'rgba(50,' + Math.round(100+t*100) + ',70,0.55)';
    if (delta < 0) return 'rgba(' + Math.round(120+t*100) + ',40,50,0.55)';
    return 'transparent';
  }
  function cellColor(delta) {
    return delta > 0 ? 'var(--accent3)' : delta < 0 ? 'var(--red)' : 'var(--text-dim)';
  }

  var base   = 'font-family:JetBrains Mono,monospace;';
  var thBase = base + 'font-size:0.58rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-dim);padding:6px 8px;border-bottom:1px solid var(--border);white-space:nowrap;';
  var tdAvg  = base + 'font-size:0.72rem;text-align:center;padding:5px 8px;color:var(--text);';
  var tdSub  = base + 'font-size:0.65rem;text-align:center;padding:4px 8px;color:var(--text-dim);';

  var uid = 'cmp' + Date.now();

  function riderRow(r, getW, getK, color, bg) {
    var row = '<tr style="background:' + bg + ';border-top:1px solid rgba(255,255,255,0.04)">';
    row += '<td style="' + tdSub + 'text-align:left;padding-left:20px;color:' + color + ';opacity:0.85">' + r.name + '</td>';
    intervals.forEach(function(iv) {
      var w = getW(r, iv.wattKey);
      var k = getK(r, iv.wkgMinutes);
      row += '<td style="' + tdSub + '">' + Math.round(w) + '</td>';
      row += '<td style="' + tdSub + '">' + k.toFixed(2) + '</td>';
    });
    row += '</tr>';
    return row;
  }

  var html = '<div class="matchup-section-title">&#128202; Power Comparison</div>';

    html += '<div id="cmp-table-wrap" style="overflow-x:auto;margin-bottom:4px">';

  // === W/KG TABLE (left section) ===
  html += '<table style="width:100%;border-collapse:collapse;background:var(--surface2);border:1px solid var(--border);margin-bottom:12px;table-layout:fixed"><colgroup><col style="width:160px"><col style="width:80px"><col style="width:80px"><col style="width:80px"><col style="width:80px"><col style="width:80px"><col style="width:80px"><col style="width:80px"></colgroup>';

  // Header row 1
  html += '<tr>';
  html += '<th style="' + thBase + 'text-align:left;min-width:130px">W/KG</th>';
  intervals.forEach(function(iv) {
    html += '<th style="' + thBase + 'text-align:center">' + iv.short + '</th>';
  });
  html += '</tr>';

  // My team avg row - W/KG
  html += '<tr style="background:rgba(0,229,255,0.06);cursor:pointer" onclick="toggleCompareSection(\'' + uid + '-my-k\', this.querySelector(\'.arr\'))">';
  html += '<td style="' + tdAvg + 'text-align:left;color:var(--accent);font-weight:600"><span class="arr" style="font-size:0.55rem;margin-right:6px;opacity:0.6">&#9654;</span>' + myName + ' <span style="font-size:0.55rem;font-weight:400;opacity:0.5">avg</span></td>';
  intervals.forEach(function(_,i) {
    html += '<td style="' + tdAvg + '">' + myK[i].toFixed(2) + '</td>';
  });
  html += '</tr>';
  html += '<tbody id="' + uid + '-my-k" style="display:none">';
  var myKMaxes = intervals.map(function(iv) {
    return Math.max.apply(null, myR.map(function(r) { return myRiderK(r, iv.wkgMinutes); }));
  });
  myR.forEach(function(r) {
    var row = '<tr style="background:rgba(0,229,255,0.03);border-top:1px solid rgba(255,255,255,0.04)">';
    row += '<td style="' + tdSub + 'text-align:left;padding-left:20px;color:var(--accent);opacity:0.85">' + r.name + '</td>';
    intervals.forEach(function(iv, i) {
      var val = myRiderK(r, iv.wkgMinutes);
      var isTop = val > 0 && val >= myKMaxes[i];
      row += '<td style="' + tdSub + (isTop ? 'color:#00e5ff;font-weight:700' : '') + '">' + val.toFixed(2) + '</td>';
    });
    row += '</tr>';
    html += row;
  });
  html += '</tbody>';

  // Opp avg row - W/KG
  html += '<tr style="background:rgba(255,107,53,0.06);cursor:pointer" onclick="toggleCompareSection(\'' + uid + '-opp-k\', this.querySelector(\'.arr\'))">';
  html += '<td style="' + tdAvg + 'text-align:left;color:var(--accent2);font-weight:600"><span class="arr" style="font-size:0.55rem;margin-right:6px;opacity:0.6">&#9654;</span>' + oppName + ' <span style="font-size:0.55rem;font-weight:400;opacity:0.5">avg</span></td>';
  intervals.forEach(function(_,i) {
    html += '<td style="' + tdAvg + '">' + oppK[i].toFixed(2) + '</td>';
  });
  html += '</tr>';
  html += '<tbody id="' + uid + '-opp-k" style="display:none">';
  var oppKMaxes = intervals.map(function(iv) {
    return Math.max.apply(null, oppR.map(function(r) { return oppRiderK(r, iv.wkgMinutes); }));
  });
  oppR.forEach(function(r) {
    var row = '<tr style="background:rgba(255,107,53,0.03);border-top:1px solid rgba(255,255,255,0.04)">';
    row += '<td style="' + tdSub + 'text-align:left;padding-left:20px;color:var(--accent2);opacity:0.85">' + r.name + '</td>';
    intervals.forEach(function(iv, i) {
      var val = oppRiderK(r, iv.wkgMinutes);
      var isTop = val > 0 && val >= oppKMaxes[i];
      row += '<td style="' + tdSub + (isTop ? 'color:#00e5ff;font-weight:700' : '') + '">' + val.toFixed(2) + '</td>';
    });
    row += '</tr>';
    html += row;
  });
  html += '</tbody>';

  // Delta row - W/KG
  html += '<tr style="border-top:2px solid var(--border)">';
  html += '<td style="' + tdAvg + 'text-align:left;color:var(--text-dim);font-weight:600">AVG DIFF</td>';
  intervals.forEach(function(_,i) {
    var kSign = dK[i] >= 0 ? '+' : '';
    html += '<td style="' + tdAvg + 'background:' + cellBg(dK[i],maxDK) + ';color:' + cellColor(dK[i]) + ';font-weight:700">' + kSign + dK[i].toFixed(2) + '</td>';
  });
  html += '</tr>';
  html += '</table>';

  // === WATT TABLE (right section) ===
  html += '<table style="width:100%;border-collapse:collapse;background:var(--surface2);border:1px solid var(--border);table-layout:fixed"><colgroup><col style="width:160px"><col style="width:80px"><col style="width:80px"><col style="width:80px"><col style="width:80px"><col style="width:80px"><col style="width:80px"><col style="width:80px"></colgroup>';

  // Header row 1
  html += '<tr>';
  html += '<th style="' + thBase + 'text-align:left;min-width:130px">WATT</th>';
  intervals.forEach(function(iv) {
    html += '<th style="' + thBase + 'text-align:center">' + iv.short + '</th>';
  });
  html += '</tr>';

  // My team avg row - Watt
  html += '<tr style="background:rgba(0,229,255,0.06);cursor:pointer" onclick="toggleCompareSection(\'' + uid + '-my-w\', this.querySelector(\'.arr\'))">';
  html += '<td style="' + tdAvg + 'text-align:left;color:var(--accent);font-weight:600"><span class="arr" style="font-size:0.55rem;margin-right:6px;opacity:0.6">&#9654;</span>' + myName + ' <span style="font-size:0.55rem;font-weight:400;opacity:0.5">avg</span></td>';
  intervals.forEach(function(_,i) {
    html += '<td style="' + tdAvg + '">' + Math.round(myW[i]) + '</td>';
  });
  html += '</tr>';
  html += '<tbody id="' + uid + '-my-w" style="display:none">';
  var myWMaxes = intervals.map(function(iv) {
    return Math.max.apply(null, myR.map(function(r) { return myRiderW(r, iv.wattKey); }));
  });
  myR.forEach(function(r) {
    var row = '<tr style="background:rgba(0,229,255,0.03);border-top:1px solid rgba(255,255,255,0.04)">';
    row += '<td style="' + tdSub + 'text-align:left;padding-left:20px;color:var(--accent);opacity:0.85">' + r.name + '</td>';
    intervals.forEach(function(iv, i) {
      var val = Math.round(myRiderW(r, iv.wattKey));
      var isTop = val > 0 && val >= Math.round(myWMaxes[i]);
      row += '<td style="' + tdSub + (isTop ? 'color:#00e5ff;font-weight:700' : '') + '">' + val + '</td>';
    });
    row += '</tr>';
    html += row;
  });
  html += '</tbody>';

  // Opp avg row - Watt
  html += '<tr style="background:rgba(255,107,53,0.06);cursor:pointer" onclick="toggleCompareSection(\'' + uid + '-opp-w\', this.querySelector(\'.arr\'))">';
  html += '<td style="' + tdAvg + 'text-align:left;color:var(--accent2);font-weight:600"><span class="arr" style="font-size:0.55rem;margin-right:6px;opacity:0.6">&#9654;</span>' + oppName + ' <span style="font-size:0.55rem;font-weight:400;opacity:0.5">avg</span></td>';
  intervals.forEach(function(_,i) {
    html += '<td style="' + tdAvg + '">' + Math.round(oppW[i]) + '</td>';
  });
  html += '</tr>';
  html += '<tbody id="' + uid + '-opp-w" style="display:none">';
  var oppWMaxes = intervals.map(function(iv) {
    return Math.max.apply(null, oppR.map(function(r) { return oppRiderW(r, iv.wattKey); }));
  });
  oppR.forEach(function(r) {
    var row = '<tr style="background:rgba(255,107,53,0.03);border-top:1px solid rgba(255,255,255,0.04)">';
    row += '<td style="' + tdSub + 'text-align:left;padding-left:20px;color:var(--accent2);opacity:0.85">' + r.name + '</td>';
    intervals.forEach(function(iv, i) {
      var val = Math.round(oppRiderW(r, iv.wattKey));
      var isTop = val > 0 && val >= Math.round(oppWMaxes[i]);
      row += '<td style="' + tdSub + (isTop ? 'color:#00e5ff;font-weight:700' : '') + '">' + val + '</td>';
    });
    row += '</tr>';
    html += row;
  });
  html += '</tbody>';

  // Delta row - Watt
  html += '<tr style="border-top:2px solid var(--border)">';
  html += '<td style="' + tdAvg + 'text-align:left;color:var(--text-dim);font-weight:600">AVG DIFF</td>';
  intervals.forEach(function(_,i) {
    var wSign = dW[i] >= 0 ? '+' : '';
    html += '<td style="' + tdAvg + 'background:' + cellBg(dW[i],maxDW) + ';color:' + cellColor(dW[i]) + ';font-weight:700">' + wSign + Math.round(dW[i]) + '</td>';
  });
  html += '</tr>';
  html += '</table>';

  html += '</div>';
  html += '<div style=\'font-family:JetBrains Mono,monospace;font-size:0.55rem;color:var(--text-dim);margin-top:6px;padding:2px 0\'>Click a team row to expand individual riders</div>';
  return html;
}

function renderMatchupAnalysis() {
  const content = document.getElementById('matchup-panel-content');
  const laps = Math.max(1, parseInt(document.getElementById('matchup-laps')?.value) || 1);
  
  const selectedRiders = riders.filter(r => r.selected);
  if (!opponentTeam) {
    content.innerHTML = '<div class="empty" style="padding:60px">Select an opponent team in the Riders tab, then click 🔍 Matchup</div>';
    return;
  }
  if (selectedRiders.length < 2) {
    content.innerHTML = '<div class="empty" style="padding:60px">Select at least 2 riders to analyse</div>';
    return;
  }

  const teamSize = parseInt(document.getElementById('team-size').value) || 5;
  const myName = (document.getElementById('my-team-select')?.selectedOptions[0]?.text || 'My Team').replace('● ','');

  // Get active opp riders
  const oppRiders = opponentTeam.riders.filter(r => r.active !== false);
  const fn = getRiderWatts;

  // Helper to get avg for my team
  function myAvg(key) {
    return selectedRiders.reduce((s,r) => s + getRiderWatts(r, key), 0) / selectedRiders.length;
  }
  function myAvgWkg(minutes) {
    // Use direct wkg fields when available, fallback to watts/weight
    const wkgFieldMap = { '5s':'wkg5s', '15s':'wkg15s', '30s':'wkg30s', '1min':'wkg1min', '2min':'wkg2min', '5min':'wkg5min', '20min':'wkg20min' };
    const wattKeyMap  = { '5s':'sprint', '15s':'w15s', '30s':'w30s', '1min':'w1min', '2min':'w2min', '5min':'w5min', '20min':'ftp' };
    const wkgKey  = wkgFieldMap[minutes];
    const wattKey = wattKeyMap[minutes] || 'ftp';
    return selectedRiders.reduce((s,r) => {
      const v = (wkgKey && r[wkgKey]) ? r[wkgKey] : getRiderWatts(r, wattKey) / (r.weight || 70);
      return s + v;
    }, 0) / selectedRiders.length;
  }

  // Helper to get avg for opp
  function oppAvg(key) {
    return oppRiders.reduce((s,r) => s + fn(r, key), 0) / oppRiders.length;
  }
  function oppAvgWkg(minutes) {
    const wMap = { '5s':'sprint', '30s':'w30s', '1min':'w1min', '2min':'w2min', '5min':'w5min', '20min':'ftp' };
    const wkgMap = {
      '5s':   r => r.wkg5s   || fn(r,'sprint') / (r.weight||70),
      '15s':  r => r.wkg15s  || fn(r,'w15s')   / (r.weight||70),
      '30s':  r => r.wkg30s  || fn(r,'w30s')   / (r.weight||70),
      '1min': r => r.wkg1min || fn(r,'w1min')  / (r.weight||70),
      '2min': r => r.wkg2min || fn(r,'w2min')  / (r.weight||70),
      '5min': r => r.wkg5min || fn(r,'w5min')  / (r.weight||70),
      '20min':r => r.wkg     || r.wkg20min     || fn(r,'ftp')/(r.weight||70),
    };
    const extractor = wkgMap[minutes] || (r => r.wkg || 0);
    return oppRiders.reduce((s,r) => s + extractor(r), 0) / oppRiders.length;
  }

  // Define intervals to compare
  const intervals =[
    { label:'5 sec',  short:'5s',  wattKey:'sprint', wkgMinutes:'5s'  },
    { label:'15 sec', short:'15s', wattKey:'w15s',   wkgMinutes:'15s' },
    { label:'30 sec', short:'30s', wattKey:'w30s',   wkgMinutes:'30s' },
    { label:'1 min',  short:'1m',  wattKey:'w1min',  wkgMinutes:'1min'},
    { label:'2 min',  short:'2m',  wattKey:'w2min',  wkgMinutes:'2min'},
    { label:'5 min',  short:'5m',  wattKey:'w5min',  wkgMinutes:'5min'},
    { label:'20 min', short:'20m', wattKey:'ftp',    wkgMinutes:'20min'},
  ];

  // Compute deltas
  const wattDeltas = intervals.map(iv => ({
    ...iv,
    myVal:   myAvg(iv.wattKey),
    oppVal:  oppAvg(iv.wattKey),
    delta:   myAvg(iv.wattKey) - oppAvg(iv.wattKey)
  }));

  const wkgDeltas = intervals.map(iv => ({
    ...iv,
    myVal:   myAvgWkg(iv.wkgMinutes),
    oppVal:  oppAvgWkg(iv.wkgMinutes),
    delta:   myAvgWkg(iv.wkgMinutes) - oppAvgWkg(iv.wkgMinutes)
  }));

  // Find max absolute delta for scaling
  const maxWattDelta = Math.max(...wattDeltas.map(d => Math.abs(d.delta)), 1);
  const maxWkgDelta  = Math.max(...wkgDeltas.map(d => Math.abs(d.delta)), 0.1);

  // Rider profiling for my team
  function classifyRider(r) {
    const ftp = getRiderWatts(r, 'ftp');
    const spr = getRiderWatts(r, 'sprint');
    const w1  = getRiderWatts(r, 'w1min');
    const w5  = getRiderWatts(r, 'w5min');
    const wkg = r.twentyMin || (ftp / (r.weight||70));
    const labels =[];
    if (ftp > 0 && spr / ftp > 2.8)       labels.push('SPRINTER');
    if (ftp > 0 && w1  / ftp > 1.65)      labels.push('PUNCHEUR');
    if (wkg > 4.2 && (r.weight||70) < 72) labels.push('CLIMBER');
    if (labels.length === 0)               labels.push('DIESEL');
    return labels;
  }
  function classifyOppRider(r) {
    const ftp = fn(r,'ftp');
    const spr = fn(r,'sprint');
    const w1  = fn(r,'w1min');
    const wkg = r.wkg || r.twentyMin || 0;
    const labels =[];
    if (ftp > 0 && spr / ftp > 2.8)       labels.push('SPRINTER');
    if (ftp > 0 && w1  / ftp > 1.65)      labels.push('PUNCHEUR');
    if (wkg > 4.2 && (r.weight||70) < 72) labels.push('CLIMBER');
    if (labels.length === 0)               labels.push('DIESEL');
    return labels;
  }

  const chipClass = { 'SPRINTER':'chip-sprinter', 'PUNCHEUR':'chip-puncheur', 'CLIMBER':'chip-climber', 'DIESEL':'chip-diesel' };

  // Count profiles
  function countProfiles(classifications) {
    const counts = { SPRINTER:0, PUNCHEUR:0, CLIMBER:0, DIESEL:0 };
    classifications.forEach(labels => labels.forEach(l => { if(counts[l]!==undefined) counts[l]++; }));
    return counts;
  }

  const myClassifications  = selectedRiders.map(classifyRider);
  const oppClassifications = oppRiders.map(classifyOppRider);
  const myCounts   = countProfiles(myClassifications);
  const oppCounts  = countProfiles(oppClassifications);

  // Strategic verdict
  const wkgAdvIntervals  = wkgDeltas.filter(d => d.delta > 0.05);
  const wkgDisadvIntervals = wkgDeltas.filter(d => d.delta < -0.05);
  const wattAdvIntervals = wattDeltas.filter(d => d.delta > 5);
  const wattDisadvIntervals = wattDeltas.filter(d => d.delta < -5);

  const course    = getSelectedMatchupCourse();
  const flatAdv   = wattDeltas.find(d => d.label==='20 min')?.delta || 0;
  const climbAdv5 = wkgDeltas.find(d => d.label==='5 min')?.delta  || 0;
  const climbAdv20= wkgDeltas.find(d => d.label==='20 min')?.delta || 0;
  const sprintAdv = wattDeltas.find(d => d.label==='15 sec')?.delta || 0;
  const punchAdv  = wkgDeltas.find(d => d.label==='1 min')?.delta  || 0;

  // Determine route type early so we can pick the right climb metric
  const _fp0 = course ? getCourseFingerprint(course) : null;
  const _dom0 = course ? getProfileDominant(course, _fp0) : null;
  // On true climbing routes use 20min W/kg (FTP W/kg) as primary climb metric;
  // on medium/punch routes use 5min W/kg; blend otherwise
  const climbAdv = _dom0 === 'climber'
    ? climbAdv20 * 0.70 + climbAdv5 * 0.30
    : _dom0 === 'medium'
      ? climbAdv5 * 0.60 + climbAdv20 * 0.40
      : climbAdv5;

  function buildVerdict() {
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const lines = [];

    // Determine route type from fingerprint (if course is selected)
    const fp = course ? getCourseFingerprint(course) : null;
    const dominant = course ? getProfileDominant(course, fp) : null;
    const isClimb   = dominant === 'climber';
    const isPunch   = dominant === 'punch';
    const isFlat    = dominant === 'tt';
    const isSprint  = dominant === 'sprint';
    const isMedium  = dominant === 'medium';

    // Sprint — only relevant on flat/sprint routes
    if (!isClimb && sprintAdv > 30) lines.push(pick([
      `🔥 You've got +${Math.round(sprintAdv)}W over them at 15 seconds. If it comes to a sprint, you win.`,
      `🔥 +${Math.round(sprintAdv)}W of pure sprint advantage — that's a real weapon. Don't let them break things up before you get there.`,
      `🔥 Sprint power gap: +${Math.round(sprintAdv)}W in your favour. Get to the line with a group and it's yours.`,
      `🔥 Over 30 watts clear at 15 seconds. If you can manufacture a bunch finish, there's only one winner.`,
      `🔥 Their legs won't match yours in the final seconds. Keep it together and trust the sprint — +${Math.round(sprintAdv)}W doesn't lie.`,
    ]));
    else if (!isClimb && sprintAdv < -30) lines.push(pick([
      `⚠️ They've got +${Math.abs(Math.round(sprintAdv))}W over you at 15 seconds. A bunch sprint is their race — look to attack before it comes to that.`,
      `⚠️ Don't gift them a sprint finish — they have +${Math.abs(Math.round(sprintAdv))}W on you there. Make the race hard before the final straight.`,
      `⚠️ A clean sprint finish is a gift to them. Get away early, stay away, and don't let it come down to the line.`,
      `⚠️ +${Math.abs(Math.round(sprintAdv))}W sprint deficit. The only way to win this is to make sure it never comes to a sprint — attack, fragment, survive.`,
      `⚠️ They're built for the finish. You're not. Force the race to be decided long before the line.`,
    ]));

    // Punch — relevant on punch/medium routes, less so on pure climbers or TT
    if ((isPunch || isMedium) && punchAdv > 0.15) lines.push(pick([
      `⛰ Your team is +${punchAdv.toFixed(2)} W/kg better over 1-minute efforts. Rolling terrain with repeated punchy kicks will hurt them more than you.`,
      `⛰ +${punchAdv.toFixed(2)} W/kg advantage at 1 minute. Courses that go up, come down, and go up again are exactly where you want to be.`,
      `⛰ Every punch on this course is a chance to shed riders. You have +${punchAdv.toFixed(2)} W/kg over 1 minute — use the terrain relentlessly.`,
      `⛰ This is a match for your punchers. +${punchAdv.toFixed(2)} W/kg at 1 minute means you can accelerate out of every corner and climb — they can't hold that wheel.`,
      `⛰ Repeated short climbs are your arena. Hit them hard at the top of each ramp and let the legs do the talking.`,
    ]));
    else if ((isPunch || isMedium) && punchAdv < -0.15) lines.push(pick([
      `⚠️ They're +${Math.abs(punchAdv.toFixed(2))} W/kg better over 1-minute efforts. Punchy, rolling races are where they'll attack and you'll bleed time.`,
      `⚠️ Those repeated short climbs? They love them. +${Math.abs(punchAdv.toFixed(2))} W/kg at 1 min means they'll be making moves you can barely follow.`,
      `⚠️ Every punch on this course is a danger zone. Sit in, conserve, and wait for a moment they haven't planned for.`,
      `⚠️ Don't get drawn into a punching contest — that's their game. Smooth the pace, reduce surges, and try to get to the final with your best riders intact.`,
      `⚠️ They're better at the sharp, explosive efforts this course demands. Discipline and positioning will matter more than matching them punch for punch.`,
    ]));
    // On climbing routes, mention 1min only if it's extreme
    else if (isClimb && punchAdv < -0.25) lines.push(pick([
      `⚠️ Even on a sustained climb, their 1-min punch (+${Math.abs(punchAdv.toFixed(2))} W/kg) will make the steep ramps hurt. Pace steady and don't respond to accelerations.`,
      `⚠️ Watch the steep ramps — their 1-min power (+${Math.abs(punchAdv.toFixed(2))} W/kg) means they can hurt you even on a long climb. Stay in your rhythm and don't react.`,
      `⚠️ They'll try to detonate the race on the steepest sections. Ride your own tempo — the climb is long enough that steady pace beats panic surges.`,
    ]));
    else if (isClimb && punchAdv > 0.25) lines.push(pick([
      `⛰ Your 1-min power advantage (+${punchAdv.toFixed(2)} W/kg) helps on the steeper ramps — use them to thin the group.`,
      `⛰ The steep sections of this climb are where you can hurt them. +${punchAdv.toFixed(2)} W/kg at 1 minute — surge the ramps and don't ease off at the top.`,
      `⛰ Use the gradient changes as your weapon. Hit the steep pitches hard — your 1-min power advantage will do the selection for you.`,
    ]));

    // Flat/FTP
    if (flatAdv > 15) lines.push(pick([
      `💨 +${Math.round(flatAdv)}W advantage at 20 minutes. ${isClimb ? 'That raw watt advantage translates into sustained climbing pace — keep the tempo high and they crack.' : 'TT-style routes where the pace never lets up will grind them down.'}`,
      `💨 Your team pushes +${Math.round(flatAdv)}W more over 20 minutes. ${isClimb ? 'Ride hard from the bottom and make the climb a war of attrition.' : 'The longer and flatter the course, the bigger the gap.'}`,
      `💨 ${isClimb ? `+${Math.round(flatAdv)}W of raw engine power on a climb — that's a slow, relentless advantage. Set a high tempo from the start and let attrition do the work.` : `+${Math.round(flatAdv)}W at FTP. Go to the front, set a suffocating pace, and make it a race of pure endurance.`}`,
      `💨 ${isClimb ? `Raw watts matter even on climbs — +${Math.round(flatAdv)}W translates to sustained speed on long gradients. Don't ride at their tempo, ride at yours.` : `This is a diesel race and you have the bigger engine. Control the tempo from the gun and don't let anyone recover.`}`,
      `💨 ${isClimb ? `The climb will feel long for them — you're pushing ${Math.round(flatAdv)}W more for the same effort. Get the pace high early and keep it there.` : `Sustained power wins sustained races. +${Math.round(flatAdv)}W means you can dictate terms from start to finish.`}`,
    ]));
    else if (flatAdv < -15) lines.push(pick([
      `💨 Raw FTP advantage of +${Math.abs(Math.round(flatAdv))}W. ${isClimb ? 'They can sustain more power up the climb — stay patient and don\'t chase every surge.' : 'Use that on courses where sustained power is everything — go early and make them suffer.'}`,
      `💨 ${isClimb ? `They have +${Math.abs(Math.round(flatAdv))}W of sustained power — expect a relentless tempo up the climb. Don't panic, ride your own effort, and look for moments when the pace briefly drops.` : `+${Math.abs(Math.round(flatAdv))}W FTP deficit. This is their kind of race — you'll need to make it unpredictable to have a chance.`}`,
      `💨 ${isClimb ? `Their engine is bigger on the long gradients. Get through the early climb conservatively and hope the selective finale favours your lighter riders.` : `They can grind you down over distance. Disrupt the rhythm — attacks, surges, anything to stop this becoming a paced TT.`}`,
      `💨 ${isClimb ? `+${Math.abs(Math.round(flatAdv))}W of raw advantage going uphill. Your only answer is to make the race chaotic before the climb decides it.` : `Sustained pace is exactly what they want. Your best weapon is unpredictability — don't let them settle into a rhythm.`}`,
    ]));

    // Climbing W/kg
    if (climbAdv > 0.1) lines.push(pick([
      `⛰ ${isClimb ? `W/kg advantage of +${climbAdv.toFixed(2)} on sustained efforts (20min/FTP W/kg) — exactly what matters here. Ride tempo from the foot and let the climb do the selection.` : `+${climbAdv.toFixed(2)} W/kg over 5 minutes. Any climb on the route is where you make the difference.`}`,
      `⛰ ${isClimb ? `This is a climbers' race and you're the stronger climbers by +${climbAdv.toFixed(2)} W/kg (FTP). Go hard on the ascent and don't look back.` : `+${climbAdv.toFixed(2)} W/kg at 5 minutes — use the climbs to split the group.`}`,
      `⛰ ${isClimb ? `+${climbAdv.toFixed(2)} W/kg where it counts most. The longer the climb, the more this margin compounds — push from the bottom and never ease.` : `Your W/kg edge at 5 minutes gives you a decisive weapon on every ascent. Hit the climbs hard and don't let them regroup.`}`,
      `⛰ ${isClimb ? `They can't match your power-to-weight on the long gradients. Establish a tempo they can't sustain and make them dig deep from the very first kilometre.` : `Every hill on this course is a potential selection point. Use your W/kg advantage to stretch the group and whittle it down.`}`,
      `⛰ ${isClimb ? `Gravity is your friend today. +${climbAdv.toFixed(2)} W/kg — ride a controlled but relentless tempo and trust that the numbers will do the damage.` : `You climb better. Simple as that. Make sure there are enough climbs left in the race when you decide to go.`}`,
    ]));
    else if (climbAdv < -0.1) lines.push(pick([
      `⚠️ ${isClimb ? `They're stronger climbers by +${Math.abs(climbAdv.toFixed(2))} W/kg (FTP W/kg) — this route is their playground. Make it hurt on the flat before the climb.` : `They have +${Math.abs(climbAdv.toFixed(2))} W/kg over 5 minutes. Every ascent is dangerous — try to keep it together and contest on the descent or flat.`}`,
      `⚠️ ${isClimb ? `The climb is their home ground. Your only option is to arrive at the foot of it with as little left to lose as possible — make it messy, not controlled.` : `Every climb on this course is a threat. Keep the group together as long as you can and avoid letting the race be decided on the ascents.`}`,
      `⚠️ ${isClimb ? `+${Math.abs(climbAdv.toFixed(2))} W/kg going against you on a climb like this is a significant deficit. Look for tactical opportunities — a well-timed attack before the climb can neutralise raw W/kg.` : `They're lighter and sharper uphill. Keep the pace manageable on the climbs and put your energy into the flat and technical sections.`}`,
      `⚠️ ${isClimb ? `This route suits them more than it suits you. Disrupt, attack early, and avoid letting it become a clean climbing contest — that's a race you won't win.` : `Protect your riders on the climbs. Save the legs, stay in contact, and contest the result where the road flattens out.`}`,
    ]));

    // Generic if nothing clear
    if (!lines.length) lines.push(pick([
      `📊 It's a close matchup on paper. Race IQ, positioning, and teamwork will decide it — whoever races smarter takes it.`,
      `📊 No dominant advantage either way. Tactical racing and conserving energy for the right moment will be decisive.`,
      `📊 The numbers don't separate you clearly. This will come down to who reads the race better and acts at the right moment.`,
      `📊 Evenly matched across the board. Expect a hard, tactical race — the team that races as a unit will edge it.`,
      `📊 On paper, it's a coin flip. In practice, experience and composure under pressure will decide it.`,
    ]));

    return lines;
  }

  // Route suggestions based on matchup — only selected routes respecting all filters
  function getRouteSuggestions() {
    const sliderEl = document.getElementById('dist-filter');
    const _sv2 = sliderEl ? parseFloat(sliderEl.value) : Infinity;
    const activeDist = (sliderEl && _sv2 >= parseFloat(sliderEl.max)) ? Infinity : _sv2;
    const filtered = courses.filter(c =>
      c.selected &&
      c.distance <= activeDist &&
      (activeWorlds.has('All') || activeWorlds.has(c.world))
    );
    return filtered.map(c => {
      const fp = getCourseFingerprint(c);
      // Score this route for our advantages
      let score = 0;
      score += (flatAdv   > 0 ? fp.tt      * flatAdv   / 30  : fp.tt      * flatAdv   / 30)  * 0.35;
      score += (climbAdv  > 0 ? fp.climber * climbAdv  / 0.5 : fp.climber * climbAdv  / 0.5) * 0.30;
      score += (punchAdv  > 0 ? fp.punch   * punchAdv  / 0.3 : fp.punch   * punchAdv  / 0.3) * 0.20;
      score += (sprintAdv > 0 ? fp.sprint  * sprintAdv / 80  : fp.sprint  * sprintAdv / 80)  * 0.15;
      return { course:c, fp, score };
    }).sort((a,b) => b.score - a.score);
  }

  // Format a numeric value with decimals and unit (used in delta rows and tooltips)
  function fmtDelta(val, decimals, unit) {
    return (decimals === 0 ? Math.round(val || 0) : (val || 0).toFixed(decimals)) + unit;
  }

  // Build split-bar HTML for a single metric comparison row
  function buildDeltaRow(label, delta, maxDelta, unit, decimals, myVal, oppVal) {
    const fmt    = val => fmtDelta(val, decimals, unit);
    const pct    = maxDelta > 0 ? Math.min(46, Math.abs(delta) / maxDelta * 46) : 0;
    const valStr = (delta >= 0 ? '+' : '') + fmt(delta);

    let barHtml = '', numHtml = '';
    if (delta > 0) {
      barHtml = `<div style="position:absolute;left:50%;width:${pct}%;height:10px;top:50%;transform:translateY(-50%);background:var(--accent3);opacity:0.85;border-radius:0 2px 2px 0;"></div>`;
      numHtml = `<div style="position:absolute;left:calc(50% + ${pct}% + 5px);top:50%;transform:translateY(-50%);font-size:0.6rem;font-weight:600;color:var(--accent3);white-space:nowrap;">${valStr}</div>`;
    } else if (delta < 0) {
      barHtml = `<div style="position:absolute;right:50%;width:${pct}%;height:10px;top:50%;transform:translateY(-50%);background:var(--red);opacity:0.8;border-radius:2px 0 0 2px;"></div>`;
      numHtml = `<div style="position:absolute;right:calc(50% + ${pct}% + 5px);top:50%;transform:translateY(-50%);font-size:0.6rem;font-weight:600;color:var(--red);white-space:nowrap;text-align:right;">${valStr}</div>`;
    } else {
      numHtml = `<div style="position:absolute;left:50%;transform:translate(-50%,-50%);top:50%;font-size:0.58rem;color:var(--text-dim);">0</div>`;
    }

    return `<div class="delta-row" style="display:flex;align-items:center;height:26px;" title="${fmt(myVal)} vs ${fmt(oppVal)}">
      <div class="delta-label">${label}</div>
      <div style="flex:1;position:relative;height:100%;">
        <div style="position:absolute;left:50%;top:15%;bottom:15%;width:1px;background:rgba(255,255,255,0.15);"></div>
        ${barHtml}${numHtml}
      </div>
    </div>`;
  }

  // Rider name list shown above each delta section (my team + opponent, first names only)
  function riderNamesBlock(mb) {
    const firstName = r => (r.name || '').replace(/\s*[\(\[][^\)\]]*[\)\]]\s*/g, '').trim().split(' ')[0];
    const myNames  = selectedRiders.map(firstName).filter(Boolean).join(', ');
    const oppNames = oppRiders.map(firstName).filter(Boolean).join(', ');
    return `<div style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:var(--text-dim);margin-bottom:${mb}px;line-height:1.6;letter-spacing:0.5px">
      <span style="color:var(--accent3)">▸ ${myName}:</span> ${myNames}<br>
      <span style="color:var(--accent2)">▸ ${opponentTeam.name}:</span> ${oppNames}
    </div>`;
  }

  const verdictLines = buildVerdict();

  // ── Compute per-interval best rider data for the H2H chart ──
  const chartIntervals =[
    { label:'5s',   myKey:'sprint', oppKey:'sprint',  wkgMy:'5s',   wkgOpp:'5s'   },
    { label:'15s',  myKey:'w15s',   oppKey:'w15s',    wkgMy:'15s',  wkgOpp:'15s'  },
    { label:'30s',  myKey:'w30s',   oppKey:'w30s',    wkgMy:'30s',  wkgOpp:'30s'  },
    { label:'1m',   myKey:'w1min',  oppKey:'w1min',   wkgMy:'1min', wkgOpp:'1min' },
    { label:'2m',   myKey:'w2min',  oppKey:'w2min',   wkgMy:'2min', wkgOpp:'2min' },
    { label:'5m',   myKey:'w5min',  oppKey:'w5min',   wkgMy:'5min', wkgOpp:'5min' },
    { label:'20m',  myKey:'ftp',    oppKey:'ftp',     wkgMy:'20min',wkgOpp:'20min'},
  ];

  // Best single rider per interval (for dots)
  function myBestWatt(key)  { return Math.max(...selectedRiders.map(r => getRiderWatts(r, key))); }
  function myBestWkg(min)   {
    const wMap = { '5s':'sprint','30s':'w30s','1min':'w1min','2min':'w2min','5min':'w5min','20min':'ftp' };
    return Math.max(...selectedRiders.map(r => getRiderWatts(r, wMap[min]) / (r.weight||70)));
  }
  function oppBestWatt(key) { return Math.max(...oppRiders.map(r => fn(r, key))); }
  function oppBestWkg(min)  {
    const wkgExtract = {
      '5s':   r => r.wkg5s   || fn(r,'sprint')/(r.weight||70),
      '30s':  r => r.wkg30s  || fn(r,'w30s')  /(r.weight||70),
      '1min': r => r.wkg1min || fn(r,'w1min') /(r.weight||70),
      '2min': r => r.wkg2min || fn(r,'w2min') /(r.weight||70),
      '5min': r => r.wkg5min || fn(r,'w5min') /(r.weight||70),
      '20min':r => r.wkg     || fn(r,'ftp')   /(r.weight||70),
    };
    return Math.max(...oppRiders.map(wkgExtract[min]));
  }

  content.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:24px; margin-bottom:32px; border-bottom:1px solid var(--border); padding-bottom:16px;" class="no-print-hide">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <h1 style="font-family:'Bebas Neue',sans-serif; font-size:2.2rem; letter-spacing:4px; color:var(--accent); margin:0; line-height:1;">Matchup Analysis</h1>
        <div style="display:flex;gap:8px;align-items:center;">
          <button onclick="openDSSheet()" class="btn btn-secondary btn-sm" style="margin:0; border-radius:2px; border-color:var(--accent2); color:var(--accent2);">📋 DS Sheet</button>
          <button onclick="generateMatchupStrategy()" class="btn btn-sm btn-ai no-print-hide" style="margin:0;border-radius:2px;">🤖 AI-Strategi</button>
          <button id="pdf-download-btn" onclick="printMatchup()" class="btn btn-secondary btn-sm" style="margin:0; border-radius:2px;">⬇ Download PDF</button>
        </div>
      </div>
      <div style="font-family:'JetBrains Mono',monospace; font-size:0.65rem; letter-spacing:1.5px; color:var(--text-dim);">
        DIRECT POWER COMPARISON · AVG OF SELECTED RIDERS · DELTA = MY TEAM MINUS OPPONENT
      </div>
    </div>

    <div class="matchup-section">
      <div class="matchup-vs-header">
        <div class="matchup-team-name" style="color:var(--accent)">${myName}</div>
        <div class="matchup-vs-badge">VS</div>
        <div class="matchup-team-name" style="color:var(--accent2)">${opponentTeam.name}</div>
      </div>
      ${buildComparisonTable(selectedRiders, oppRiders, fn, myName, opponentTeam.name)}
    </div>

    <div class="matchup-section">
    <!-- POWER HEAD TO HEAD CHART -->
    <div class="matchup-section-title">⚡ Power Delta (my team minus opponent)</div>
    <div style="background:var(--surface2);border:1px solid var(--border);padding:16px;">
      ${riderNamesBlock(10)}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div style="display:flex;gap:16px;font-family:'JetBrains Mono',monospace;font-size:0.6rem;">
          <span><span style="color:var(--accent3)">▲</span> above zero = ${myName} stronger</span>
          <span><span style="color:var(--red)">▼</span> below zero = ${opponentTeam.name} stronger</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button id="h2h-watt-btn" onclick="renderH2HChart('watt')"
            style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:1px;padding:4px 10px;border:1px solid var(--border);background:transparent;color:var(--text-dim);cursor:pointer;">WATT</button>
          <button id="h2h-wkg-btn" onclick="renderH2HChart('wkg')"
            style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:1px;padding:4px 10px;border:1px solid var(--accent);background:var(--accent);color:var(--bg);cursor:pointer;">W/KG</button>
        </div>
      </div>
      <canvas id="h2h-canvas" style="width:100%;height:220px;display:block;"></canvas>
    </div>

    <!-- Legend -->
    <div style="display:flex;gap:20px;font-family:'JetBrains Mono',monospace;font-size:0.58rem;margin-top:10px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
      <span style="display:flex;align-items:center;gap:6px;">
        <svg width="28" height="10" style="flex-shrink:0"><line x1="0" y1="5" x2="28" y2="5" stroke="rgba(127,255,107,0.9)" stroke-width="2.5"/><circle cx="14" cy="5" r="4" fill="rgba(127,255,107,1)" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/></svg>
        <span style="color:var(--accent3)">${myName}</span>
      </span>
      <span style="display:flex;align-items:center;gap:6px;">
        <svg width="28" height="10" style="flex-shrink:0"><line x1="0" y1="5" x2="28" y2="5" stroke="rgba(255,68,85,0.85)" stroke-width="2.5" stroke-dasharray="6,3"/><circle cx="14" cy="5" r="4" fill="rgba(255,68,85,1)" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/></svg>
        <span style="color:var(--accent2)">${opponentTeam.name}</span>
      </span>
    </div>

    </div>

    <div class="matchup-section">
<div class="matchup-section">
    <!-- WATT COMPARISON -->
    <div class="matchup-section-title">🔥 Pure Watt Delta (avg per interval)</div>
    <div style="background:var(--surface2);padding:14px 16px;border:1px solid var(--border)">
      ${riderNamesBlock(12)}
      
      <div style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;margin-bottom:16px;background:var(--bg);padding:10px 12px;border:1px solid rgba(255,255,255,0.05);border-radius:4px;">
        <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px; margin-bottom:8px;">
          <span style="color:var(--text-dim); letter-spacing:1px; width:70px; flex-shrink:0;">MY TEAM</span>
          ${wattDeltas.map(d=>`<span style="color:var(--accent); white-space:nowrap;">${d.label}: <strong>${Math.round(d.myVal)}W</strong></span>`).join('<span style="opacity:0.2">|</span>')}
        </div>
        <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
          <span style="color:var(--text-dim); letter-spacing:1px; width:70px; flex-shrink:0;">OPPONENT</span>
          ${wattDeltas.map(d=>`<span style="color:var(--accent2); white-space:nowrap;">${d.label}: <strong>${Math.round(d.oppVal)}W</strong></span>`).join('<span style="opacity:0.2">|</span>')}
        </div>
      </div>

      ${wattDeltas.map(d => buildDeltaRow(d.label, d.delta, maxWattDelta, 'W', 0, d.myVal, d.oppVal)).join('')}
    </div>

    </div>

    <div class="matchup-section">
    <!-- W/KG COMPARISON -->
    <div class="matchup-section-title">⛰ W/kg Delta (avg per interval)</div>
    <div style="background:var(--surface2);padding:14px 16px;border:1px solid var(--border)">
      ${riderNamesBlock(12)}
      
      <div style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;margin-bottom:16px;background:var(--bg);padding:10px 12px;border:1px solid rgba(255,255,255,0.05);border-radius:4px;">
        <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px; margin-bottom:8px;">
          <span style="color:var(--text-dim); letter-spacing:1px; width:70px; flex-shrink:0;">MY TEAM</span>
          ${wkgDeltas.map(d=>`<span style="color:var(--accent); white-space:nowrap;">${d.label}: <strong>${d.myVal.toFixed(2)}</strong></span>`).join('<span style="opacity:0.2">|</span>')}
        </div>
        <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
          <span style="color:var(--text-dim); letter-spacing:1px; width:70px; flex-shrink:0;">OPPONENT</span>
          ${wkgDeltas.map(d=>`<span style="color:var(--accent2); white-space:nowrap;">${d.label}: <strong>${d.oppVal.toFixed(2)}</strong></span>`).join('<span style="opacity:0.2">|</span>')}
        </div>
      </div>

      ${wkgDeltas.map(d => buildDeltaRow(d.label, d.delta, maxWkgDelta, ' W/kg', 2, d.myVal, d.oppVal)).join('')}
    </div>

    </div>

    <div class="matchup-section">
    <!-- RIDER PROFILES -->
    <div class="matchup-section-title">🎭 Rider Profiles</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div style="background:var(--surface2);border:1px solid var(--border);padding:12px 14px">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:0.9rem;letter-spacing:2px;color:var(--accent);margin-bottom:8px">${myName}</div>
        ${selectedRiders.map((r, i) => {
          const labels = myClassifications[i];
          return `<div style="margin-bottom:4px;font-family:'JetBrains Mono',monospace;font-size:0.65rem">
            <span style="color:var(--text)">${r.name.split(' ').slice(0,2).join(' ')}</span>
            ${labels.map(l=>`<span class="profile-chip ${chipClass[l]}">${l}</span>`).join('')}
          </div>`;
        }).join('')}
        <div style="margin-top:10px;font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:var(--text-dim);border-top:1px solid var(--border);padding-top:6px">
          ${Object.entries(myCounts).filter(([,v])=>v>0).map(([k,v])=>`<span class="profile-chip ${chipClass[k]}">${v}× ${k}</span>`).join('')}
        </div>
      </div>
      <div style="background:var(--surface2);border:1px solid var(--border);padding:12px 14px">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:0.9rem;letter-spacing:2px;color:var(--accent2);margin-bottom:8px">${opponentTeam.name}</div>
        ${oppRiders.map((r, i) => {
          const labels = oppClassifications[i];
          return `<div style="margin-bottom:4px;font-family:'JetBrains Mono',monospace;font-size:0.65rem">
            <span style="color:var(--text)">${r.name.split(' ').slice(0,2).join(' ')}</span>
            ${labels.map(l=>`<span class="profile-chip ${chipClass[l]}">${l}</span>`).join('')}
          </div>`;
        }).join('')}
        <div style="margin-top:10px;font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:var(--text-dim);border-top:1px solid var(--border);padding-top:6px">
          ${Object.entries(oppCounts).filter(([,v])=>v>0).map(([k,v])=>`<span class="profile-chip ${chipClass[k]}">${v}× ${k}</span>`).join('')}
        </div>
      </div>
    </div>

    </div>

    <div class="matchup-section">
    <!-- TACTICAL VERDICT -->
    <div class="matchup-section-title">🎯 Tactical Verdict</div>
    <div class="verdict-box">
      <div style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--text-dim);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
        <span style="background:rgba(0,229,255,0.12);border:1px solid rgba(0,229,255,0.25);color:var(--accent);padding:3px 9px;letter-spacing:1.5px;">The big picture</span>
      </div>
      ${verdictLines.map(l=>`<div style="margin-bottom:8px;line-height:1.6">${l}</div>`).join('')}
    </div>

    </div>

    ${buildRouteAnalysis(getSelectedMatchupCourse(), flatAdv, climbAdv, punchAdv, sprintAdv, laps)}
    ${buildMatchPrediction(selectedRiders, oppRiders, myName, opponentTeam.name, course, fn)}
    <div id="ai-strategy-output" style="display:none;margin-top:16px;padding:20px 24px;background:var(--surface2);border:1px solid rgba(0,229,255,0.3);font-family:'JetBrains Mono',monospace;font-size:0.72rem;line-height:1.9;color:var(--text);white-space:pre-wrap;border-radius:2px;"></div>`;

  // Store chart data on window so renderH2HChart can access it after innerHTML is set
  window._h2hData = {
    intervals: chartIntervals,
    myAvg, myAvgWkg, myBestWatt, myBestWkg,
    oppAvg, oppAvgWkg, oppBestWatt, oppBestWkg,
    wattDeltas, wkgDeltas,
    myName, oppName: opponentTeam.name
  };

  // Store matchup data for AI strategy generation
  window._matchupData = {
    myName,
    oppName: opponentTeam.name,
    course,
    laps,
    fp: _fp0,
    dominant: _dom0,
    myRiders: selectedRiders.map(r => {
      const lrEntry = (typeof LADDER_RACES !== 'undefined') && (LADDER_RACES[r.zwift_id] || LADDER_RACES[parseInt(r.zwift_id)]);
      const positions = lrEntry ? lrEntry.races.map(x => x.pos).filter(p => p > 0) : [];
      const avgPos = positions.length ? (positions.reduce((a,b)=>a+b,0)/positions.length).toFixed(1) : null;
      return {
        name: r.name,
        profile: classifyRider(r).join('/'),
        weight: r.weight || 70,
        wkg20: +(r.twentyMin || 0).toFixed(2),
        wkg5:  +(r.fiveMin   || 0).toFixed(2),
        wkg1:  +(r.oneMin    || 0).toFixed(2),
        wkg15s: r.w15s && r.weight ? +((r.w15s / r.weight)).toFixed(1) : null,
        wkg5s:  r.sprint && r.weight ? +((r.sprint / r.weight)).toFixed(1) : null,
        ftp:   Math.round(getRiderWatts(r, 'ftp')),
        score: _fp0 ? Math.round(scoreRiderForCourse(r, _fp0)) : null,
        avgPos: avgPos ? +avgPos : null,
        races:  positions.length,
        raceMetrics: calcRaceMetrics(lrEntry ? lrEntry.races : [])
      };
    }),
    oppRiders: oppRiders.map(r => ({
      name: r.name,
      profile: classifyOppRider(r).join('/'),
      weight: r.weight || 70,
      wkg20: +(r.wkg || r.wkg20min || fn(r,'ftp')/(r.weight||70) || 0).toFixed(2),
      ftp:   Math.round(fn(r, 'ftp')),
      score: _fp0 ? Math.round(scoreOppRiderForCourse(r, _fp0, fn)) : null
    })),
    wattDeltas,
    wkgDeltas
  };

  // Render chart after DOM is updated
  requestAnimationFrame(() => {
    renderH2HChart('wkg');
  });
}

// ── AI Strategy Generator ──
const GEMINI_PROXY = 'https://raspy-darkness-fb9e.peterthers.workers.dev';

async function generateMatchupStrategy() {
  let out = document.getElementById('ai-strategy-output');
  if (!out) {
    const content = document.getElementById('matchup-panel-content');
    if (!content) { alert('Åbn matchup-siden og vælg ryttere først.'); return; }
    out = document.createElement('div');
    out.id = 'ai-strategy-output';
    out.style.cssText = 'margin-top:16px;margin-bottom:24px;padding:20px 24px;background:var(--surface2);border:1px solid rgba(0,229,255,0.3);font-family:\'JetBrains Mono\',monospace;font-size:0.72rem;line-height:1.9;color:var(--text);border-radius:2px;';
    content.appendChild(out);
  }
  out.style.display = 'block';
  out.innerHTML = '<div style="text-align:center;padding:16px 0;font-family:\'JetBrains Mono\',monospace;font-size:0.8rem;letter-spacing:3px;color:var(--accent);animation:pulse 1.2s ease-in-out infinite">⏳ ANALYSING MATCHUP...</div>';
  setTimeout(() => out.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);

  const d = window._matchupData;
  if (!d) { out.innerHTML = '⚠️ No matchup data — open the matchup page and select riders first.'; return; }
  if (!d.course) { out.innerHTML = '⚠️ Select a route first — AI strategy requires a route to be meaningful.'; return; }

  // Build data block for prompt
  const routeInfo = d.course
    ? `Rute: ${d.course.name} (${d.course.world}) · ${d.course.distance}km · ${d.course.elevation}m stigning · Profil: ${d.course.profile || 'Ukendt'} · ${d.laps} omgang(e)`
    : 'Ingen rute valgt';

  const fpInfo = d.fp
    ? `Rute-fingerprint: Flat/TT=${d.fp.tt}% · Sprint=${d.fp.sprint}% · Punch=${d.fp.punch}% · Klatring=${d.fp.climber}% · Dominerende type: ${d.dominant || '?'}`
    : '';

  const myRiderLines = (d.myRiders || []).map(r => {
    let raceRating = '';
    if (r.avgPos != null) {
      const label = r.avgPos <= 2 ? 'MATCH WINNER' : r.avgPos <= 4 ? 'RELIABLE' : r.avgPos <= 6 ? 'VARIABLE' : 'STRUGGLES';
      raceRating = ` · Race rating: ${label} (avg #${r.avgPos} over ${r.races} races)`;
    } else {
      raceRating = ' · Race rating: NO DATA';
    }
    const sprintWkg = r.wkg15s || r.wkg5s;
    const sprintLabel = r.wkg15s ? '15s' : '5s';
    const sprintStr = sprintWkg ? `${sprintLabel}=${sprintWkg}W/kg (${Math.round(sprintWkg * r.weight)}W)` : null;
    const w1min = r.wkg1 ? `1min=${r.wkg1}W/kg (${Math.round(r.wkg1 * r.weight)}W)` : null;
    let line = `  - ${r.name} [${r.profile}] ${r.weight}kg · 20min=${r.wkg20}W/kg · 5min=${r.wkg5}W/kg · ${w1min || ''}${sprintStr ? ' · '+sprintStr : ''} · FTP=${r.ftp}W`;
    if (r.score != null) line += ` · Route score=${r.score}`;
    line += raceRating;
    if (r.raceMetrics) {
      const s = r.raceMetrics.scores;
      const label = {
        punch:         v => v >= 8 ? 'explosive' : v >= 6 ? 'decent' : v === 5 ? 'average' : v >= 3 ? 'weak' : 'no punch',
        vo2:           v => v >= 8 ? 'strong VO2' : v >= 6 ? 'good VO2' : v === 5 ? 'average VO2' : v >= 3 ? 'inconsistent VO2' : 'poor VO2',
        pacing:        v => v >= 8 ? 'disciplined pacer' : v >= 6 ? 'good pacing' : v === 5 ? 'moderate pacing' : v >= 3 ? 'aggressive starter, fades' : 'goes all-in early, fades badly',
        repeatability: v => v >= 8 ? 'high repeatability' : v >= 6 ? 'good repeatability' : v === 5 ? 'moderate repeatability' : v >= 3 ? 'fades after hard efforts' : 'poor repeatability',
        endSprint:     v => v >= 8 ? 'strong closer' : v >= 6 ? 'decent closer' : v === 5 ? 'average closer' : v >= 3 ? 'weak closer' : 'no closing sprint',
        fatigue:       v => v >= 8 ? 'fatigue-resistant' : v >= 6 ? 'good fatigue resistance' : v === 5 ? 'average fatigue resistance' : v >= 3 ? 'fades in hard races' : 'poor fatigue resistance',
      };
      const parts = [];
      if (s.punch        != null) parts.push(`Punch: ${label.punch(s.punch)}`);
      if (s.vo2          != null) parts.push(`VO2: ${label.vo2(s.vo2)}`);
      if (s.pacing       != null) parts.push(`Pacing: ${label.pacing(s.pacing)}`);
      if (s.repeatability!= null) parts.push(`Repeatability: ${label.repeatability(s.repeatability)}`);
      if (s.endSprint    != null) parts.push(`EndSprint: ${label.endSprint(s.endSprint)}`);
      if (s.fatigue      != null) parts.push(`Fatigue: ${label.fatigue(s.fatigue)}`);
      if (parts.length) line += ` · RaceProfile (${r.raceMetrics.confidence} conf, ${r.raceMetrics.n} races): ${parts.join(' | ')}`;
      if (r.raceMetrics.insights.length) line += ` · Notes: ${r.raceMetrics.insights.join('; ')}`;
    }
    return line;
  }).join('\n');

  const oppRiderLines = (d.oppRiders || []).map(r => {
    const sprintWkg = r.wkg15s || r.wkg5s;
    const sprintLabel = r.wkg15s ? '15s' : '5s';
    const sprintStr = sprintWkg ? ` · ${sprintLabel}=${sprintWkg}W/kg (${Math.round(sprintWkg * r.weight)}W)` : '';
    const w1min = r.wkg1 ? ` · 1min=${r.wkg1}W/kg (${Math.round(r.wkg1 * r.weight)}W)` : '';
    return `  - ${r.name} [${r.profile}] ${r.weight}kg · 20min=${r.wkg20}W/kg${w1min}${sprintStr} · FTP=${r.ftp}W${r.score != null ? ' · Route score='+r.score : ''}`;
  }).join('\n');

  const deltaLines = (d.wkgDeltas || []).map(iv => {
    const sign = iv.delta >= 0 ? '+' : '';
    return `  ${iv.label}: ${sign}${iv.delta.toFixed(2)} W/kg (LEQP avg ${iv.myVal.toFixed(2)} vs ${iv.oppVal.toFixed(2)})`;
  }).join('\n');

  const wattLines = (d.wattDeltas || []).map(iv => {
    const sign = iv.delta >= 0 ? '+' : '';
    return `  ${iv.label}: ${sign}${Math.round(iv.delta)}W (LEQP avg ${Math.round(iv.myVal)}W vs ${Math.round(iv.oppVal)}W)`;
  }).join('\n');

  const prompt = `You are race strategist for Zwift ladder team ${d.myName}. Write a sharp tactical race plan — max 450 words.

Race format: team points race. Points: 1st=10, 2nd=9, 3rd=8, 4th=7, 5th=6, 6th=5, 7th=4, 8th=3, 9th=2, 10th=1. Team score = sum of all 5 riders. All tactics are team-first. Individual sacrifice is valid if it helps the team total.

Field size: 10 riders (5 vs 5). Breakaways are rare and hard to sustain. Expect the race to stay together until late splits on climbs, punchy sections, or sprint segments.

DRAFTING MECHANICS (critical for realistic tactics):
- Riders in the draft save ~25-30% energy vs the rider pulling at the front
- A rider pulling at FTP is easy to follow — draft riders only need ~3.0-3.5W/kg
- Riding at FTP on the front does NOT deter attacks — it lets the group recover
- To suppress attacks, the puller must go 8-10% above FTP — this hurts everyone in the group
- A classic attack has 3 phases: (1) explosive opener at ~80% of the rider's 15-sec sprint power (use 5-sec sprint if 15-sec unavailable) for just a few seconds to create the gap, (2) sustain at approximately the rider's 5-min power for 1-2 minutes, (3) settle to ~FTP+8-10% once the gap is established — use each rider's actual numbers
- In a final sprint, a rider can go to 100% of sprint power. Mid-race attacks should use 80% — full sprint power mid-race burns matches the team cannot afford
- Never recommend "maintain FTP on the front to deter attacks" — it has the opposite effect
- Weight vs. raw Watts: on flat sections, absolute Watts matter more than W/kg. A heavier rider with high raw power can force lighter riders to go over-threshold just to stay in the draft, even if the lighter rider has a higher W/kg
- Formation matters: a wide "blob" allows easy counter-attacks from the back. A high-pace "string" (single file) makes it nearly impossible to jump away undetected — use this when the team wants to control the race

Energy discipline:
- Riders should avoid sustained efforts above 120% FTP for more than ~30 seconds unless it is a decisive move
- Long tempo pulls should be ~102–108% FTP — enough to stress the group without burning matches

Attacks should be rare and purposeful. In a 5v5 race, constant attacking harms the attacking team more than the opponent. Each attack must have a clear team objective.

RaceProfile scores (1–10, derived from actual ladder race history — use these to sharpen role assignments):
- Punch (1–10): explosive short-burst power relative to FTP. ≥8 = effective attacker on punchy sections. ≤4 = avoid leading sprint attacks.
- VO2 (1–10): 5min power stability relative to 20min. ≥8 = can sustain hard accelerations. ≤4 = struggles to bridge or respond to sustained efforts.
- Pacing (1–10): how evenly distributed effort is across the race. ≥8 = disciplined pacer, dangerous in the final phase — prioritise as finisher. ≤4 = goes too hard early and fades — expose them with a late attack or a slow start.
- Repeatability (1–10): ability to recover power after hard spikes. ≤4 = weakens significantly after repeated efforts — target them in the second half. ≥8 = can attack repeatedly without fading.
- EndSprint (1–10): closing sprint proxy. ≥8 = dangerous finisher in well-paced races. ≤4 = sprint finish is not a weapon — do not assign captain/finisher role.
- Fatigue (1–10): consistency of 20min power across races. ≤4 = unpredictable output — may have a bad day; do not over-rely on their average numbers. ≥8 = reliable, race after race.
Only use RaceProfile scores marked "medium" or "high" confidence. Ignore "low" confidence scores.

Tactical principles to apply where relevant:
- Assign riders to mark specific dangerous opponents — one rider shadows one opponent
- If an opponent is clearly strongest in the race, consider letting them go rather than destroying team cohesion chasing them
- Decide: offensive (attack early, force the race) or defensive (sit in, react, sprint finish) — base this on the points delta vs ${d.oppName}
- Identify 1-2 specific attack points on the route where efforts should be launched
- Watch for a sprint start from ${d.oppName} — if they have sprint-type riders, expect an early hard effort
- Avoid double-marking: ensure two riders do not waste energy chasing the same opponent move. If a Marker is assigned, teammates must trust them to close the gap unless the Marker is clearly cracked
- Counter-attacking: if an opponent attack is neutralized, immediately consider a counter-attack while the opponent is in their recovery phase (anaerobic debt) — this is the highest-value attack window
- This race is unpredictable — give a contingency: what to do if the plan breaks down

Base ALL tactical recommendations strictly on the provided rider power numbers and route profile. Do not invent abilities or weaknesses that are not present in the data. Avoid generic advice such as "ride smart", "stay together", or "communicate" — every recommendation must be specific and actionable.

Use EXACTLY this structure:

0. **Threat Assessment**
   Identify the two most dangerous riders on ${d.oppName} and explain briefly why (based on their W/kg data).

1. **Strategy: [punchy title]**
   Offensive or defensive? Why. 2 sentences max.

2. **Rider Roles**
   One bullet per ${d.myName} rider. Assign each rider one of these roles: Captain (protected finisher), Enforcer (controls pace / suppresses attacks), Attacker (creates splits), Marker (shadows a specific opponent), Sacrifice rider (burns matches for team advantage).
   Include: assigned role, target position, who (if anyone) they should mark.
   CRITICAL: Each rider has a "Race rating" label — this is ground truth and OVERRIDES W/kg. MATCH WINNER = highest finishing potential, target top positions, but must still contribute actively — close gaps, follow attacks, apply pressure. Do NOT make them passive. RELIABLE = solid points scorer, active role. VARIABLE = capable but results vary, use tactically. STRUGGLES = sacrifice role candidate. Never assign sacrifice role to a MATCH WINNER. Never assign a top finishing role to VARIABLE or STRUGGLES.
   This is a TEAM points race — total team score matters more than any single rider winning. Getting positions 2nd, 3rd and 4th (26 pts) beats 1st, 4th and 5th (23 pts). Never build a strategy around protecting one rider at the expense of team points.
   Position targets must be specific and meaningful — use the rider's avg finish position as a realistic baseline. NEVER use "top 10" as a target when there are 10 riders — it means nothing. For sacrifice roles, describe what the sacrifice achieves for the team (e.g. "drain opponent X", "create chaos to help Brendon break free").
   Finish alignment: match the Captain/Match Winner role to the finish profile. If the route fingerprint shows high Punch% or Climber%, prioritize riders with high 1-min W/kg. If high Sprint% or Flat/TT%, prioritize riders with high 15-sec raw Watts and heavier builds.
   RaceProfile requirement: for every rider who has a RaceProfile with medium or high confidence, the role assignment MUST explicitly cite the relevant descriptors. Examples: a rider labelled "disciplined pacer" should be noted as a reliable finisher; a rider labelled "fades after hard efforts" must not be assigned repeated attack duties; a rider labelled "weak closer" or "no closing sprint" must not be the designated sprint finisher; a rider labelled "fatigue-resistant" is well suited for pacemaking. Do not assign a role that contradicts the RaceProfile without explaining why.

3. **Race Plan — ${d.course ? d.course.name : 'selected route'}**
   4-5 bullets. Lap by lap: start approach, key attack point(s), how to handle ${d.oppName}'s strongest rider, final move.
   IMPORTANT: Base the race plan ONLY on the route data provided (distance, elevation, profile, fingerprint %). Do NOT invent or name specific climbs, segments or features — use generic terms like "the climb", "the flat section", "the sprint point".

4. **If The Plan Breaks Down**
   Two concrete scenarios:
   - Scenario A (Match Winner dropped): if our primary Captain is distanced, Reliable riders pivot immediately to a "negative race" — disrupting ${d.oppName}'s lead-out and minimising the points delta rather than chasing hopelessly
   - Scenario B (Opponent 2-man split, no Marker present): the closest rider bridges immediately regardless of assigned role; the remaining riders sit in and force the opponents to do 100% of the work in the chase group

Reply ONLY in English. Be tactical and direct — use actual W/kg numbers.

--- DATA ---
${d.myName} vs ${d.oppName}
${routeInfo}
${fpInfo}

${d.myName} (${(d.myRiders||[]).length} riders):
${myRiderLines}

${d.oppName} (${(d.oppRiders||[]).length} riders):
${oppRiderLines}

W/kg delta (${d.myName} minus ${d.oppName}):
${deltaLines}

Watt delta:
${wattLines}`;

  try {
    const res = await fetch(GEMINI_PROXY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || `HTTP ${res.status}`);
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '(tomt svar)';
    const formatted = text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      // numbered section headers: "1. Title" or "1. **Title**"
      .replace(/^(\d+)\.\s+\*\*(.*?)\*\*/gm, '<div style="margin-top:18px;margin-bottom:4px;font-size:0.78rem;letter-spacing:2px;color:var(--accent);font-weight:700">$1. $2</div>')
      .replace(/^(\d+)\.\s+(.+)/gm, '<div style="margin-top:18px;margin-bottom:4px;font-size:0.78rem;letter-spacing:2px;color:var(--accent);font-weight:700">$1. $2</div>')
      // bold inline
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>')
      // bullet points
      .replace(/^\s*[-*]\s+(.+)/gm, '<div style="padding-left:16px;margin:2px 0">▸ $1</div>')
      .replace(/\n/g, '<br>');
    const pdfBtn = `<button onclick="printAIStrategy()" style="float:right;margin-top:-2px;font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:1px;padding:3px 10px;background:transparent;border:1px solid rgba(0,229,255,0.4);color:var(--accent);cursor:pointer;border-radius:2px" title="Download as PDF">⬇ PDF</button>`;
    out.innerHTML =
      `<div style="margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid rgba(0,229,255,0.2);font-size:0.85rem;letter-spacing:3px;color:var(--accent);font-weight:700">🤖 YOUR WINNING STRATEGY${pdfBtn}</div>` +
      formatted;
  } catch (e) {
    out.innerHTML = '⚠️ Could not fetch strategy.<br><span style="font-size:0.6rem;color:var(--text-dim)">' + e.message + '</span>';
  }
}

function printAIStrategy() {
  const out = document.getElementById('ai-strategy-output');
  if (!out) return;
  const d = window._matchupData;
  const title = d ? `${d.myName} vs ${d.oppName}${d.course ? ' — ' + d.course.name : ''}` : 'AI Race Strategy';
  const w = window.open('', '_blank');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Bebas+Neue&display=swap');
  * { box-sizing:border-box; margin:0; padding:0; }
  body { font-family:'JetBrains Mono',monospace; font-size:11px; line-height:1.8; color:#111; background:#fff; padding:32px 40px; }
  h1 { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:4px; color:#0077cc; margin-bottom:4px; }
  .sub { font-size:9px; letter-spacing:2px; color:#888; margin-bottom:24px; }
  .content { white-space:pre-wrap; }
  .content div[style*="letter-spacing:2px"] { color:#0077cc !important; font-weight:700; margin-top:16px; margin-bottom:4px; }
  strong { color:#111; }
  @media print { body { padding:16px 24px; } button { display:none; } }
</style></head><body>
<h1>${title}</h1>
<div class="sub">LEQP LADDER · AI RACE STRATEGY · ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase()}</div>
<div class="content">${out.innerHTML}</div>
<script>setTimeout(()=>window.print(),400);<\/script>
</body></html>`);
  w.document.close();
}

// ── AI Rider Training Plan ──
async function generateRiderTrainingPlan() {
  const out = document.getElementById('profile-training-plan-output');
  if (!out) return;

  if (!_profileName || (!_profileRaces.length && !_profileOtherRaces.length &&
      !_profileZrlRaces.length && !_profileFrrRaces.length &&
      !_profileEcroRaces.length && !_profileWtrlRaces.length)) {
    out.style.display = 'block';
    out.innerHTML = '⚠️ Load a rider first.';
    return;
  }

  const startBtn = document.getElementById('profile-training-start-btn');
  if (startBtn) startBtn.style.display = 'none';
  out.style.display = 'block';
  out.innerHTML = '<div style="text-align:center;padding:16px 0;font-family:\'JetBrains Mono\',monospace;font-size:0.8rem;letter-spacing:3px;color:#7fff6b;animation:pulse 1.2s ease-in-out infinite">⏳ GENERATING COACH REPORT...</div>';
  setTimeout(() => out.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);

  // Collect all races across all types
  const allRaces = [..._profileRaces, ..._profileZrlRaces, ..._profileFrrRaces,
                    ..._profileEcroRaces, ..._profileWtrlRaces, ..._profileOtherRaces];

  // Best power outputs — last 90 days across all race types
  const best = { wkg5:0, wkg15:0, wkg30:0, wkg60:0, wkg120:0, wkg300:0, wkg1200:0 };
  const cutoff = Date.now() / 1000 - 90 * 86400;
  for (const r of allRaces) {
    if ((r.event_date || 0) < cutoff) continue;
    for (const k of Object.keys(best)) if ((r[k] || 0) > best[k]) best[k] = r[k];
  }

  const weight    = allRaces.length ? (allRaces[0].weight || 0) : 0;
  const riderType = _profileRiderType(best, weight);
  const ftp       = best.wkg1200 && weight ? Math.round(best.wkg1200 * weight) : 0;

  // Race stats per type
  const typeStats = (races, label) => {
    if (!races.length) return null;
    const withPos = races.filter(r => r.position > 0);
    const avgPos  = withPos.length ? (withPos.reduce((s, r) => s + r.position, 0) / withPos.length).toFixed(1) : null;
    return `${label}: ${races.length} races${avgPos ? `, avg finish #${avgPos}` : ''}`;
  };
  const statsLines = [
    typeStats(_profileRaces,     'Ladder'),
    typeStats(_profileZrlRaces,  'ZRL'),
    typeStats(_profileFrrRaces,  'FRR'),
    typeStats(_profileEcroRaces, 'ECRO'),
    typeStats(_profileWtrlRaces, 'WTRL'),
    typeStats(_profileOtherRaces,'Other'),
  ].filter(Boolean).join('\n');

  // Race metrics if available from analysis
  const analysis = _profileGenerateAnalysis(_profileGetRaces());
  let metricsBlock = '';
  if (window._lastRaceMetrics) {
    const s = window._lastRaceMetrics.scores;
    const n = window._lastRaceMetrics.n;
    const conf = window._lastRaceMetrics.confidence;
    metricsBlock = `Race profile metrics (${conf} confidence, ${n} races):
  Punch: ${s.punch ?? '—'}/10 · VO2: ${s.vo2 ?? '—'}/10 · Pacing: ${s.pacing ?? '—'}/10
  Repeatability: ${s.repeatability ?? '—'}/10 · End sprint: ${s.endSprint ?? '—'}/10 · Fatigue resistance: ${s.fatigue ?? '—'}/10`;
  }

  const f1 = v => v > 0 ? v.toFixed(1) : '—';

  const prompt = `You are an expert cycling coach specialising in Zwift racing. Analyse this rider and write a personalised coaching report. All data is from race results over the last 90 days across all race types combined.

RIDER: ${_profileName}
Rider type: ${riderType.label}
Weight: ${weight > 0 ? weight.toFixed(1) + ' kg' : 'unknown'}
FTP (20-min peak): ${ftp > 0 ? ftp + 'W (' + best.wkg1200.toFixed(2) + ' W/kg)' : 'unknown'}

Peak power outputs (best recorded in any race, last 90 days):
  5s:   ${f1(best.wkg5)} W/kg  (${best.wkg5 && weight ? Math.round(best.wkg5 * weight) + 'W' : '—'})
  15s:  ${f1(best.wkg15)} W/kg (${best.wkg15 && weight ? Math.round(best.wkg15 * weight) + 'W' : '—'})
  30s:  ${f1(best.wkg30)} W/kg (${best.wkg30 && weight ? Math.round(best.wkg30 * weight) + 'W' : '—'})
  1min: ${f1(best.wkg60)} W/kg (${best.wkg60 && weight ? Math.round(best.wkg60 * weight) + 'W' : '—'})
  2min: ${f1(best.wkg120)} W/kg (${best.wkg120 && weight ? Math.round(best.wkg120 * weight) + 'W' : '—'})
  5min: ${f1(best.wkg300)} W/kg (${best.wkg300 && weight ? Math.round(best.wkg300 * weight) + 'W' : '—'})
  20min:${f1(best.wkg1200)} W/kg (${ftp > 0 ? ftp + 'W' : '—'})

Note: these are peak values recorded within races — not dedicated tests. Short intervals (≤2min) may be lower than true maxes if the rider did not go all-out at those durations in any race.

Race history (last 90 days):
${statsLines}

${metricsBlock}

Write the report in this exact order:

**1. Rider Profile**
2–3 sentences describing what kind of rider this is, based on the power numbers and rider type. Be specific — reference the actual W/kg values.

**2. Strengths**
2–3 bullet points. Cite the actual numbers that back each strength.

**3. Key Limiters**
2–3 bullet points. The most important areas to improve for better race results. Be honest and specific.

**4. Coaching Recommendations**
3–4 actionable, specific tips tailored to this rider. Reference their actual W/kg numbers when suggesting target intensities. Include session types such as threshold intervals, VO₂max efforts, sprint work, or endurance — whichever are most relevant to this rider's profile.

**5. Race Readiness**
1 short paragraph: which route types and race formats suit this rider best right now, and one focus area for the next racing block.

**6. 12-Week Training Overview**
High-level only — no detailed session prescriptions. One short paragraph per phase:
- Base (weeks 1–4)
- Build (weeks 5–8)
- Peak (weeks 9–10)
- Recovery (weeks 11–12)

Reply in English. Max 550 words total. Be direct and coach-like — no generic filler.`;

  try {
    const res = await fetch(GEMINI_PROXY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || `HTTP ${res.status}`);
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '(empty response)';
    const formatted = text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/^(\d+)\.\s+\*\*(.*?)\*\*/gm, '<div style="margin-top:18px;margin-bottom:4px;font-size:0.78rem;letter-spacing:2px;color:#7fff6b;font-weight:700">$1. $2</div>')
      .replace(/^(\d+)\.\s+(.+)/gm,          '<div style="margin-top:18px;margin-bottom:4px;font-size:0.78rem;letter-spacing:2px;color:#7fff6b;font-weight:700">$1. $2</div>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>')
      .replace(/^\s*[-*]\s+(.+)/gm, '<div style="padding-left:16px;margin:2px 0">▸ $1</div>')
      .replace(/\n/g, '<br>');
    out.innerHTML =
      `<div style="margin-bottom:4px;font-size:0.85rem;letter-spacing:3px;color:#7fff6b;font-weight:700">🏋 COACH REPORT</div>` +
      `<div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(127,255,107,0.2);font-size:0.78rem;letter-spacing:2px;color:var(--accent2);font-weight:700">${_profileName.toUpperCase()}</div>` +
      formatted;
    setTimeout(() => out.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  } catch (e) {
    out.innerHTML = '⚠️ Could not generate training plan.<br><span style="font-size:0.6rem;color:var(--text-dim)">' + e.message + '</span>';
  }
}

function printRiderAnalysis() {
  const name       = document.getElementById('profile-name')?.textContent || 'Rider';
  const headerEl   = document.getElementById('profile-header');
  const raEl       = document.getElementById('profile-race-analysis');
  const daEl       = document.getElementById('profile-detailed-analysis');
  const headerHTML = headerEl ? headerEl.innerHTML : '';
  const raceHTML   = raEl && raEl.style.display !== 'none' ? raEl.innerHTML : '';
  const detailHTML = daEl ? daEl.innerHTML : '';
  if (!headerHTML && !raceHTML && !detailHTML) return;

  const isLight = document.body.classList.contains('light-mode');
  const vars = isLight
    ? `--bg:#f4f6f9; --surface:#ffffff; --surface2:#eef1f6; --border:#d1d9e6; --accent:#0077cc; --accent2:#e05a00; --accent3:#2a8a1a; --text:#1a2035; --text-dim:#6b7a99; --red:#cc1122; --purple:#7733cc;`
    : `--bg:#0a0d14; --surface:#111520; --surface2:#161c2a; --border:#1f2a40; --accent:#00e5ff; --accent2:#ff6b35; --accent3:#7fff6b; --text:#e8edf5; --text-dim:#6b7a99; --red:#ff4455; --purple:#cc88ff;`;

  const w = window.open('', '_blank');
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Rider Analysis — ${name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Bebas+Neue&display=swap');
  :root { ${vars} }
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; print-color-adjust:exact; -webkit-print-color-adjust:exact; }
  body { font-family:'JetBrains Mono',monospace; font-size:11px; line-height:1.7; background:var(--bg); color:var(--text); padding:32px 40px; }
  h1 { font-family:'Bebas Neue',sans-serif; font-size:28px; letter-spacing:4px; color:var(--accent); margin-bottom:4px; }
  .sub { font-size:9px; letter-spacing:2px; color:var(--text-dim); margin-bottom:24px; }
  .section { background:var(--surface); border:1px solid var(--border); padding:20px 24px; margin-bottom:16px; }
  table { border-collapse:collapse; width:100%; }
  button { display:none; }
  @media print { body { padding:16px 24px; } }
</style></head><body>
<div class="sub">LEQP LADDER · RIDER ANALYSIS · ${new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase()}</div>
${headerHTML ? `<div class="section">${headerHTML}</div>` : ''}
${raceHTML   ? `<div class="section">${raceHTML}</div>`   : ''}
${detailHTML ? `<div class="section"><div style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;font-weight:700;color:var(--text);letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--border)">📊 Detailed Rider Analysis</div>${detailHTML}</div>` : ''}
<script>setTimeout(()=>window.print(),400);<\/script>
</body></html>`);
  w.document.close();
}

// ── Match Prediction ──
function buildMatchPrediction(myRiders, oppRiders, myName, oppName, course, fn) {
  const MAX = 5;

  // Route is required — prediction without a course context is meaningless
  if (!course) {
    const _sorted = [...courses].sort((a,b) => a.name.localeCompare(b.name));
    const _opts = _sorted.map(c => `<option value="${c.name}">${c.name} (${c.world} · ${c.distance}km · ${c.elevation}m)</option>`).join('');
    return `
    <div class="matchup-section">
      <div class="matchup-section-title">⚡ Match Prediction</div>
      <div style="padding:24px 16px;background:var(--surface2);border:1px solid var(--border);
                  font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:var(--text-dim);text-align:center;line-height:1.8">
        <div style="font-size:1.4rem;margin-bottom:10px">🗺</div>
        Select a route to see the match prediction.<br>
        <span style="font-size:0.62rem;letter-spacing:1px">Riders are ranked by suitability for the specific course,<br>
        weighting raw watts on flat routes and W/kg on climbs.</span>
        <div style="margin-top:16px;display:flex;gap:6px;align-items:center;justify-content:center;flex-wrap:wrap">
          <input type="text" placeholder="Search route..." oninput="
            var q=this.value.toLowerCase();
            var sel=this.nextElementSibling;
            Array.from(sel.options).forEach(function(o){o.hidden=q&&!o.text.toLowerCase().includes(q);});"
            style="width:90px;font-family:'JetBrains Mono',monospace;font-size:0.7rem;padding:4px 8px;background:var(--bg);border:1px solid var(--border);color:var(--text);outline:none;">
          <select onchange="document.getElementById('matchup-route-search').value=''; document.getElementById('matchup-route-select').value=this.value; onMatchupRouteChange();"
            style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;padding:4px 6px;background:var(--bg);border:1px solid var(--border);color:var(--text);outline:none;max-width:320px;">
            <option value="">— Select route —</option>
            ${_opts}
          </select>
        </div>
      </div>
    </div>`;
  }

  const fp = getCourseFingerprint(course);

  // Race metrics modifier: adjusts base score by up to ±5 based on behavioural data
  function raceMetricsModifier(rm, fp) {
    if (!rm || rm.confidence === 'low') return 0;
    const s = rm.scores;
    let mod = 0;
    // Pacing: disciplined pacer = more reliable output on any course
    if (s.pacing != null) mod += (s.pacing - 5.5) * 0.45;
    // Fatigue resistance: consistency across races
    if (s.fatigue != null) mod += (s.fatigue - 5.5) * 0.35;
    // Repeatability: especially valuable on punchy/hilly courses
    if (s.repeatability != null) {
      const punchWeight = ((fp.punch || 0) + (fp.medium || 0)) / 100;
      mod += (s.repeatability - 5.5) * 0.6 * punchWeight;
    }
    // End sprint: matters most on sprint/flat finishes
    if (s.endSprint != null) {
      const sprintWeight = ((fp.sprint || 0) + (fp.tt || 0)) / 100;
      mod += (s.endSprint - 5.5) * 0.5 * sprintWeight;
    }
    return Math.max(-5, Math.min(5, mod));
  }

  function scoreMyRider(r)  { return scoreRiderForCourse(r, fp) + raceMetricsModifier(r.raceMetrics, fp); }
  // my-team-style opponents (LEQP teams) have twentyMin/fiveMin/sprint — same structure as my riders
  // library opponents only have wkg/watt — use the dedicated opp scorer
  function scoreOppRider(r) { return r.twentyMin != null ? scoreRiderForCourse(r, fp) : scoreOppRiderForCourse(r, fp, fn); }

  const mySorted  = [...myRiders].map(r => ({ rider:r, score:scoreMyRider(r),  team:'my'  }))
                                  .sort((a,b) => b.score - a.score).slice(0, MAX);
  const oppSorted = [...oppRiders].map(r => ({ rider:r, score:scoreOppRider(r), team:'opp' }))
                                   .sort((a,b) => b.score - a.score).slice(0, MAX);

  const allRiders = [...mySorted, ...oppSorted].sort((a,b) => b.score - a.score);
  const total = allRiders.length;

  let myPoints = 0, oppPoints = 0;
  const rows = allRiders.map((entry, i) => {
    const pts = total - i;
    if (entry.team === 'my') myPoints  += pts;
    else                     oppPoints += pts;
    return { entry, pts };
  });

  const diff    = myPoints - oppPoints;
  const winner  = diff > 0 ? 'my' : diff < 0 ? 'opp' : 'draw';

  function getCategory() {
    const spread = Math.abs(myPoints - oppPoints);
    if (spread === 0) return 'draw';
    if (spread <= 1)  return 'very_close';
    if (spread <= 4)  return 'close';
    if (spread <= 9)  return 'clear';
    return 'dominant';
  }
  const category = getCategory();

  // fp already declared above — derive dominant route type from profile
  const dominant = course ? getProfileDominant(course, fp) : (fp ? getDominant(fp) : null);
  const routeCtx = {
    climber: 'on this climbing route, sustained W/kg is everything — ride tempo and let the climb do the selection',
    punch:   'on this punchy course, 1-min power and repeated accelerations decide it',
    tt:      'on this flat route, raw watts and pacing discipline win races',
    sprint:  'on this sprint course, positioning and explosive power in the final metres are decisive',
    medium:  'on this hilly course, 5-min power and the ability to recover between efforts matters most'
  };
  const routeAdvice = routeCtx[dominant] || 'route demands are mixed — versatility and race IQ will be key';

  function getStrategistAdvice() {
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const winName = winner === 'my' ? myName : oppName;
    const losing  = winner === 'opp';

    if (category === 'draw') {
      return pick([
        `This is a coin-flip on paper — ${routeAdvice}. In a draw, the defending team takes it on ladder rules. Every rider needs to be at their best; there is no room for a bad day.`,
        `Perfectly matched on the numbers — ${routeAdvice}. The defending team wins ties on the ladder, so treat this as a must-win. One dropped position changes everything.`,
        `The data says it's level — ${routeAdvice}. That means the result will be decided by composure, positioning, and who wants it more on the day.`,
        `Neither team has an edge on paper — ${routeAdvice}. In a dead heat, the ladder rules favour the defender. Come out fighting from the gun.`,
      ]);
    }
    if (category === 'very_close') {
      if (losing) return pick([
        `The numbers give ${winName} a marginal edge, but ${routeAdvice}. Close the gap by committing fully to your strengths — one strong performance can flip this result.`,
        `A one-point swing separates you — ${routeAdvice}. This is absolutely winnable. Get your best riders into the right positions and race without hesitation.`,
        `${winName} edges it on paper, but margins this small mean nothing on race day — ${routeAdvice}. Outrace them tactically and the points will follow.`,
        `Razor-thin on paper — ${routeAdvice}. Don't overthink the numbers. Race aggressively, trust your lineup, and let the legs decide it.`,
      ]);
      return pick([
        `Marginal advantage on paper — ${routeAdvice}. Don't let them back in: control the race early and protect your strongest riders for the key moments.`,
        `The smallest of edges, but an edge nonetheless — ${routeAdvice}. Keep it calm, keep it controlled, and make sure the race is decided on your terms.`,
        `You're ahead by the thinnest of margins — ${routeAdvice}. Don't let it become chaotic. A disciplined race plays to your favour.`,
        `Slight numerical advantage — ${routeAdvice}. Back your riders to deliver and don't waste energy chasing shadows. Steady racing wins close ones.`,
      ]);
    }
    if (category === 'close') {
      if (losing) return pick([
        `${winName} has a small but real advantage — ${routeAdvice}. Don't race their race: force early breaks, make it unpredictable, and get your best riders into winning position.`,
        `They have a consistent edge across the lineup — ${routeAdvice}. Your best chance is disruption: change the tempo, create uncertainty, and make them react to you rather than the other way around.`,
        `The points gap is small but meaningful — ${routeAdvice}. You need to manufacture chaos. A clean, controlled race suits them more than it suits you.`,
        `Down on paper but not out — ${routeAdvice}. Target the riders close to yours in ability and beat them individually. Small gains across the lineup add up to a result.`,
      ]);
      return pick([
        `Small but consistent advantage across the lineup — ${routeAdvice}. Stay disciplined, set the tempo, and avoid letting it become a lottery finish.`,
        `You have a real advantage here — ${routeAdvice}. Don't let nerves or overconfidence disrupt a clean race. Execute the plan and trust the numbers.`,
        `A solid edge on this course — ${routeAdvice}. Take control early and make them chase. The longer you dictate the race, the more it plays to your strengths.`,
        `The matchup favours you — ${routeAdvice}. Be the aggressor, but smart about it. Make the race hard for them without exposing your own team unnecessarily.`,
      ]);
    }
    if (category === 'clear') {
      if (losing) return pick([
        `${winName} has a clear edge on this course — ${routeAdvice}. Your best chance is disrupting their rhythm: attack early, fragment the race, and keep your strongest rider fresh for the finale.`,
        `They're clearly better suited to this course — ${routeAdvice}. Conventional racing won't work. Go high-risk early and try to reshape the race before their advantages take over.`,
        `A significant gap to close — ${routeAdvice}. Don't let this become a race of attrition where their depth shows. Make it a race about moments, not overall strength.`,
        `The numbers aren't kind here — ${routeAdvice}. Your only path to a result is making the race hard enough, early enough, that their best riders can't control it.`,
      ]);
      return pick([
        `Clear favourites on this course — ${routeAdvice}. Use your stronger riders to control the race from the front. Don't let them gamble their way back into it.`,
        `A clear advantage from start to finish — ${routeAdvice}. Ride with confidence, set a high tempo early, and shut down any attempts to make the race unpredictable.`,
        `The course suits you well and the numbers back it up — ${routeAdvice}. Race assertively. The bigger the gap becomes, the harder it is for them to respond.`,
        `You have the depth and the power for this course — ${routeAdvice}. Keep the pressure on throughout and don't let them breathe. A controlled, dominant race is within reach.`,
      ]);
    }
    // dominant
    if (losing) return pick([
      `${winName} is significantly stronger across the board here — ${routeAdvice}. This requires a high-risk strategy: aggressive early attacks, unpredictable racing, and getting lucky. Don't race conservatively.`,
      `The gap is substantial — ${routeAdvice}. There's no value in racing defensively. Attack from the gun, force chaos, and hope their favourites have a bad day. Conventional racing loses this.`,
      `This is a tough one — ${routeAdvice}. Your only realistic path is to dismantle their race plan before it unfolds. Go all-in early and make them work for every single point.`,
      `The numbers are against you significantly — ${routeAdvice}. Forget a clean race — it won't work. Burn matches early, split the group, and try to drag the strongest opponent riders into a war of attrition.`,
    ]);
    return pick([
      `Dominant on paper — ${routeAdvice}. The race is yours to lose. Control, tempo, and protecting your key riders is all that's needed. Don't over-race it.`,
      `A commanding advantage across the board — ${routeAdvice}. Race with authority. Set the terms from the start and make them spend energy just trying to stay in touch.`,
      `You're significantly stronger here — ${routeAdvice}. Don't get complacent. A dominant lead on paper still needs to be ridden. Take control early and never relinquish it.`,
      `Total numerical dominance on this course — ${routeAdvice}. Ride to your strengths, protect your best riders, and make it a statement performance. This is a race you should win convincingly.`,
    ]);
  }

  const categoryLabels = {
    draw:       'Dead heat · Defending team wins on ladder rules',
    very_close: 'Marginal edge',
    close:      'Slight advantage',
    clear:      'Clear advantage',
    dominant:   'Dominant'
  };
  const winnerColor = winner === 'my' ? 'var(--accent3)' : winner === 'opp' ? 'var(--red)' : 'var(--text-dim)';
  const winnerLabel = winner === 'my' ? myName : winner === 'opp' ? oppName : '';
  const myPtsColor  = myPoints >= oppPoints ? 'var(--accent3)' : 'var(--red)';
  const oppPtsColor = oppPoints >= myPoints  ? 'var(--accent3)' : 'var(--red)';

  function shortName(r) {
    return (r.name || '').replace(/\s*[\(\[][^\)\]]*[\)\]]\s*/g,'').trim().split(' ').slice(0,2).join(' ');
  }

  const rowsHTML = rows.map(({ entry, pts }, i) => {
    const isMe      = entry.team === 'my';
    const nameColor = isMe ? 'var(--accent3)' : 'var(--accent2)';
    const teamLabel = isMe ? myName : oppName;
    const medal     = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
    return `<div style="display:grid;grid-template-columns:26px 1fr auto 32px;align-items:center;padding:7px 10px;
                background:${i % 2 === 0 ? 'var(--surface2)' : 'transparent'};">
      <span style="font-family:'Bebas Neue',sans-serif;font-size:0.95rem;color:var(--text-dim);text-align:center">${medal}</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:${nameColor};font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${shortName(entry.rider)}</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:var(--text-dim);text-align:right;padding-right:8px;white-space:nowrap">${teamLabel}</span>
      <span style="font-family:'Bebas Neue',sans-serif;font-size:1rem;color:${nameColor};text-align:right">${pts}</span>
    </div>`;
  }).join('');

  return `
  <div class="matchup-section">
    <div class="matchup-section-title">⚡ Match Prediction</div>

    <div style="text-align:center;margin-bottom:16px;padding:20px 16px;background:var(--surface2);border:1px solid var(--border);">
      <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:3px;color:var(--text-dim);margin-bottom:10px;text-transform:uppercase">
        Predicted Result · Best ${Math.min(MAX, myRiders.length)} vs ${Math.min(MAX, oppRiders.length)} riders
      </div>
      <div style="display:flex;justify-content:center;align-items:center;gap:20px;flex-wrap:wrap;">
        <div style="text-align:right">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:2px;color:var(--accent3);margin-bottom:2px">${myName}</div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:3.2rem;line-height:1;color:${myPtsColor}">${myPoints}</div>
        </div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--text-dim)">—</div>
        <div style="text-align:left">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:2px;color:var(--accent2);margin-bottom:2px">${oppName}</div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:3.2rem;line-height:1;color:${oppPtsColor}">${oppPoints}</div>
        </div>
      </div>
      <div style="margin-top:12px;display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.6rem;
                  letter-spacing:2px;padding:4px 14px;border:1px solid ${winnerColor};color:${winnerColor};text-transform:uppercase">
        ${categoryLabels[category]}${winnerLabel ? ' · ' + winnerLabel : ''}
      </div>
    </div>

    <!-- Chief Strategist — above the result list -->
    <div style="background:var(--surface2);border:1px solid var(--border);padding:14px 16px;margin-bottom:16px;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;letter-spacing:2px;color:var(--text-dim);
                  margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
        <span style="background:rgba(0,229,255,0.12);border:1px solid rgba(0,229,255,0.25);color:var(--accent);padding:3px 9px;letter-spacing:1.5px;">CHIEF STRATEGIST</span>
        <span style="color:var(--text);font-size:0.72rem;letter-spacing:1px">Match assessment</span>
      </div>
      <div style="font-size:0.82rem;line-height:1.7;color:var(--text)">${getStrategistAdvice()}</div>
      <div style="margin-top:10px;font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:var(--text-dim);
                  border-top:1px solid var(--border);padding-top:8px">
        ⚠ Power numbers only — race dynamics, tactics and form on the day can change this result.
      </div>
    </div>

    <!-- Result list + Stats side by side -->
    <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap;">

      <!-- Result list — 50% width -->
      <div style="flex:1 1 0;min-width:200px;border:1px solid var(--border);">
        <div style="display:grid;grid-template-columns:26px 1fr auto 32px;align-items:center;padding:5px 10px;
                    background:var(--surface);border-bottom:1px solid var(--border);">
          <span></span>
          <span style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase">Rider</span>
          <span style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;padding-right:8px">Team</span>
          <span style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;text-align:right">Pts</span>
        </div>
        ${rowsHTML}
        <div style="display:grid;grid-template-columns:26px 1fr auto 32px;align-items:center;padding:8px 10px;
                    border-top:2px solid var(--border);background:var(--surface);">
          <span></span>
          <span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;letter-spacing:1px;color:var(--text-dim);text-transform:uppercase">Total</span>
          <span style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;text-align:right;padding-right:8px">
            <span style="color:${myPtsColor}">${myPoints}</span><span style="color:var(--text-dim)"> / </span><span style="color:${oppPtsColor}">${oppPoints}</span>
          </span>
          <span></span>
        </div>
      </div>

      <!-- Stats panel -->
      ${buildMatchStats(mySorted, oppSorted, myName, oppName, myPoints, oppPoints, total, myPtsColor, oppPtsColor, fp)}

    </div>

  </div>`;
}

// ── Match Stats Panel ──
function buildMatchStats(mySorted, oppSorted, myName, oppName, myPoints, oppPoints, total, myPtsColor, oppPtsColor, fp) {
  function shortName(r) {
    return (r.name || '').replace(/\s*[\(\[][^\)\]]*[\)\]]\s*/g,'').trim().split(' ').slice(0,2).join(' ');
  }

  // Top rider per team (already sorted by score, index 0 = best)
  const myTop  = mySorted[0];
  const oppTop = oppSorted[0];

  // Biggest threat = highest-scoring opponent
  const threat = oppTop;

  // Key matchup: our best vs their best
  const myBest  = myTop;
  const oppBest = oppTop;

  // Point share bar
  const totalPts   = myPoints + oppPoints;
  const mySharePct = Math.round(myPoints  / totalPts * 100);
  const oppSharePct= 100 - mySharePct;

  // Win margin label
  const spread = Math.abs(myPoints - oppPoints);
  const marginLabel = spread === 0 ? 'Even split' : spread <= 1 ? 'Razor thin' : spread <= 4 ? 'Narrow' : spread <= 9 ? 'Clear' : 'Dominant';

  // Route key dimension label
  const dominant = fp ? getDominant(fp) : null;
  const dimLabels = { climber:'Climbing (W/kg)', punch:'Punch (1-min)', tt:'Flat TT (Watts)', sprint:'Sprint', medium:'Hilly (5-min)' };
  const keyDim = dimLabels[dominant] || '—';

  // ── Wildcard logic ──────────────────────────────────────────────────────────
  // For each rider compute per-dimension scores, then find outliers

  function riderDimScores(r, isMy) {
    // Returns { tt, sprint, punch, medium, climber } scores 0-100 for a rider
    if (isMy) {
      const wkgTT      = Math.min(100, ((r.twentyMin || 0) / 6.0) * 100);
      const wkgSprint  = Math.min(100, ((r.sprint    || 0) / 20.0)* 100);
      const wkgPunch   = Math.min(100, ((r.oneMin    || 0) / 12.0)* 100);
      const wkgMedium  = Math.min(100, ((r.fiveMin   || 0) / 8.5) * 100);
      const wkgClimber = Math.min(100, (((r.twentyMin||0)/6.5)*0.60 + ((r.fiveMin||0)/8.5)*0.40)*100);
      const fn = getRiderWatts;
      return {
        tt:      wkgTT     * 0.15 + normWatts(fn(r,'ftp'),    'ftp')    * 0.85,
        sprint:  wkgSprint * 0.10 + normWatts(fn(r,'sprint'), 'sprint') * 0.90,
        punch:   wkgPunch  * 0.45 + normWatts(fn(r,'w1min'),  'w1min')  * 0.55,
        medium:  wkgMedium * 0.65 + normWatts(fn(r,'w5min'),  'w5min')  * 0.35,
        climber: wkgClimber* 0.85 + (normWatts(fn(r,'ftp'),'ftp')*0.60 + normWatts(fn(r,'w5min'),'w5min')*0.40) * 0.15
      };
    } else {
      const fn = getRiderWatts;
      const w  = r.weight || 70;
      const wkgFtp     = r.watt / w;
      const wkg5min    = fn(r,'w5min') / w;
      const wkgClimber = Math.min(100,((wkgFtp/6.5)*0.60 + (wkg5min/8.5)*0.40)*100);
      return {
        tt:      ((r.watt/w)/6.0)*100 * 0.15 + normWatts(fn(r,'ftp'),    'ftp')    * 0.85,
        sprint:  (r.wkg/20.0)*100     * 0.10 + normWatts(fn(r,'sprint'), 'sprint') * 0.90,
        punch:   (fn(r,'w1min')/w/9.5)*100*0.45 + (wkgFtp/6.0)*100*0.25 + normWatts(fn(r,'w1min'),'w1min')*0.30,
        medium:  (wkgFtp/5.5)*100     * 0.50 + (r.wkg/8.5)*100*0.30 + normWatts(fn(r,'ftp'),'ftp')*0.20,
        climber: wkgClimber            * 0.85 + (normWatts(fn(r,'ftp'),'ftp')*0.60 + normWatts(fn(r,'w5min'),'w5min')*0.40)*0.15
      };
    }
  }

  // Secondary dimension = second highest fp value
  const fpDims = fp ? ['tt','sprint','punch','medium','climber']
    .map(k => ({ k, v: fp[k] }))
    .sort((a,b) => b.v - a.v) : [];
  const primaryDim   = fpDims[0]?.k || null;
  const secondaryDim = fpDims[1]?.k || null;

  // ONE TO WATCH: from our team (mySorted, already best-5)
  // Find rider ranked 3rd-5th (not already top-2) with highest secondary dimension score
  // relative to their primary dimension score — i.e. their secondary punches above their weight
  let oneToWatch = null;
  let oneToWatchReason = '';
  if (mySorted.length >= 3 && secondaryDim) {
    const candidates = mySorted.slice(2); // ranked 3rd and below
    let bestRatio = -Infinity;
    candidates.forEach(entry => {
      const dims = riderDimScores(entry.rider, true);
      const secScore = dims[secondaryDim] || 0;
      const priScore = dims[primaryDim]   || 1;
      const ratio = secScore / priScore; // high = strong on secondary vs primary
      if (secScore > 35 && ratio > bestRatio) {
        bestRatio = ratio;
        oneToWatch = entry;
        oneToWatchReason = dimLabels[secondaryDim];
      }
    });
  }
  // Fallback: rider with highest single-dimension outlier (max dim / overall score)
  if (!oneToWatch && mySorted.length >= 2) {
    const candidates = mySorted.slice(1);
    let bestOutlier = -Infinity;
    candidates.forEach(entry => {
      const dims = riderDimScores(entry.rider, true);
      const maxDim = Math.max(...Object.values(dims));
      const outlier = maxDim / (entry.score || 1);
      if (outlier > bestOutlier) {
        bestOutlier = outlier;
        oneToWatch = entry;
        const bestKey = Object.entries(dims).reduce((a,b) => a[1]>b[1]?a:b)[0];
        oneToWatchReason = dimLabels[bestKey] || '';
      }
    });
  }

  // DANGER RIDER: from opponent (oppSorted, best-5)
  // Find rider whose best single dimension score is disproportionately high vs overall score
  let dangerRider = null;
  let dangerReason = '';
  if (oppSorted.length >= 1) {
    let bestOutlier = -Infinity;
    oppSorted.forEach(entry => {
      const dims = riderDimScores(entry.rider, false);
      const maxDim = Math.max(...Object.values(dims));
      const outlier = maxDim / (entry.score || 1);
      // Extra weight if that dimension aligns with the route
      const bestKey = Object.entries(dims).reduce((a,b) => a[1]>b[1]?a:b)[0];
      const routeBonus = fp ? (fp[bestKey] / 100) : 0;
      const adjustedOutlier = outlier * (1 + routeBonus * 0.5);
      if (adjustedOutlier > bestOutlier && entry !== oppTop) { // exclude their obvious #1
        bestOutlier = adjustedOutlier;
        dangerRider = entry;
        dangerReason = dimLabels[bestKey] || '';
      }
    });
    // If only 1 opp rider, show them anyway
    if (!dangerRider && oppSorted.length === 1) {
      dangerRider = oppSorted[0];
      const dims = riderDimScores(oppSorted[0].rider, false);
      const bestKey = Object.entries(dims).reduce((a,b) => a[1]>b[1]?a:b)[0];
      dangerReason = dimLabels[bestKey] || '';
    }
  }

  function statRow(label, value, valueColor) {
    return `<div style="display:flex;justify-content:space-between;align-items:baseline;
                        padding:6px 0;border-bottom:1px solid var(--border);">
      <span style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:var(--text-dim);letter-spacing:1px;text-transform:uppercase">${label}</span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:${valueColor || 'var(--text)'};font-weight:600;text-align:right;max-width:55%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${value}</span>
    </div>`;
  }

  function wildcardBox(icon, label, labelColor, name, reason, bgColor) {
    return `<div style="padding:10px 12px;background:${bgColor};border:1px solid var(--border);margin-top:8px;">
      <div style="font-family:'JetBrains Mono',monospace;font-size:0.52rem;letter-spacing:2px;color:var(--text-dim);
                  text-transform:uppercase;margin-bottom:6px">${icon} ${label}</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:0.78rem;color:${labelColor};font-weight:600;
                  white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
      ${reason ? `<div style="font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:var(--text-dim);margin-top:2px">
                  Strong: ${reason}</div>` : ''}
    </div>`;
  }

  return `
  <div style="flex:1 1 0;min-width:200px;">

    <!-- Header -->
    <div style="font-family:'JetBrains Mono',monospace;font-size:0.55rem;letter-spacing:3px;color:var(--text-dim);
                text-transform:uppercase;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid var(--border);">
      Match Stats
    </div>

    <!-- Point share bar -->
    <div style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:var(--accent3)">${mySharePct}%</span>
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:var(--text-dim);letter-spacing:1px">${marginLabel}</span>
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:var(--accent2)">${oppSharePct}%</span>
      </div>
      <div style="height:6px;background:var(--surface2);border-radius:0;overflow:hidden;border:1px solid var(--border);">
        <div style="height:100%;width:${mySharePct}%;background:linear-gradient(90deg,var(--accent3),rgba(127,255,107,0.5));transition:width 0.4s"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:3px;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.52rem;color:var(--accent3);letter-spacing:1px;text-transform:uppercase;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${myName}</span>
        <span style="font-family:'JetBrains Mono',monospace;font-size:0.52rem;color:var(--accent2);letter-spacing:1px;text-transform:uppercase;max-width:45%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right">${oppName}</span>
      </div>
    </div>

    <!-- Stat rows -->
    ${statRow('Key dimension', keyDim, 'var(--text)')}
    ${statRow('Our best rider', myTop  ? shortName(myTop.rider)  : '—', 'var(--accent3)')}
    ${statRow('Their best rider', oppTop ? shortName(oppTop.rider) : '—', 'var(--accent2)')}
    ${statRow('Biggest threat', threat ? shortName(threat.rider) : '—', 'var(--red)')}

    <!-- Head to head -->
    <div style="margin-top:10px;padding:10px;background:var(--surface2);border:1px solid var(--border);">
      <div style="font-family:'JetBrains Mono',monospace;font-size:0.52rem;letter-spacing:2px;color:var(--text-dim);
                  text-transform:uppercase;margin-bottom:8px">Key matchup</div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
        <div style="text-align:left;flex:1;overflow:hidden;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:var(--accent3);font-weight:600;
                      white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${myBest ? shortName(myBest.rider) : '—'}</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:var(--text-dim)">${myBest ? Math.round(myBest.score) : '—'} pts</div>
        </div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:1rem;color:var(--text-dim);flex-shrink:0">VS</div>
        <div style="text-align:right;flex:1;overflow:hidden;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;color:var(--accent2);font-weight:600;
                      white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${oppBest ? shortName(oppBest.rider) : '—'}</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:0.58rem;color:var(--text-dim)">${oppBest ? Math.round(oppBest.score) : '—'} pts</div>
        </div>
      </div>
    </div>

    <!-- One to watch + Danger rider -->
    ${oneToWatch ? wildcardBox('👀', 'One to watch', 'var(--accent3)', shortName(oneToWatch.rider), oneToWatchReason, 'rgba(127,255,107,0.05)') : ''}
    ${dangerRider ? wildcardBox('⚡', 'Danger rider', 'var(--red)', shortName(dangerRider.rider), dangerReason, 'rgba(255,68,85,0.06)') : ''}

  </div>`;
}

// ── Power Head to Head Canvas Chart ──
function renderH2HChart(mode) {
  const canvas = document.getElementById('h2h-canvas');
  if (!canvas || !window._h2hData) return;
  const d = window._h2hData;

  // Update button styles
  const wBtn = document.getElementById('h2h-watt-btn');
  const kBtn = document.getElementById('h2h-wkg-btn');
  if (wBtn) { wBtn.style.background = mode==='watt' ? 'var(--accent)' : 'transparent'; wBtn.style.color = mode==='watt' ? 'var(--bg)' : 'var(--text-dim)'; wBtn.style.borderColor = mode==='watt' ? 'var(--accent)' : 'var(--border)'; }
  if (kBtn) { kBtn.style.background = mode==='wkg'  ? 'var(--accent)' : 'transparent'; kBtn.style.color = mode==='wkg'  ? 'var(--bg)' : 'var(--text-dim)'; kBtn.style.borderColor = mode==='wkg'  ? 'var(--accent)' : 'var(--border)'; }

  // Set canvas resolution
  const W = canvas.offsetWidth || 800;
  const H = 220;
  canvas.width  = W * window.devicePixelRatio;
  canvas.height = H * window.devicePixelRatio;
  canvas.style.height = H + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  const isDark = !document.body.classList.contains('light-mode');

  const intervals = d.intervals;
  const n = intervals.length;

  // Get values
  const myVals  = mode === 'watt'
    ? intervals.map(iv => d.myAvg(iv.myKey))
    : intervals.map(iv => d.myAvgWkg(iv.wkgMy));
  const oppVals = mode === 'watt'
    ? intervals.map(iv => d.oppAvg(iv.oppKey))
    : intervals.map(iv => d.oppAvgWkg(iv.wkgOpp));

  const allVals = [...myVals, ...oppVals].filter(v => v > 0);
  if (!allVals.length) return;

  const padL = 52, padR = 20, padT = 24, padB = 32;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const minV = Math.min(...allVals) * 0.88;
  const maxV = Math.max(...allVals) * 1.06;

  function xPos(i) { return padL + (i / (n - 1)) * chartW; }
  function yPos(v) { return padT + chartH - ((v - minV) / (maxV - minV)) * chartH; }

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let i = 0; i < n; i++) {
    const x = xPos(i);
    ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, padT + chartH); ctx.stroke();
  }
  const gridRows = 4;
  for (let g = 0; g <= gridRows; g++) {
    const y = padT + (g / gridRows) * chartH;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
    const val = maxV - (g / gridRows) * (maxV - minV);
    ctx.fillStyle = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.4)';
    ctx.font = `${10 * window.devicePixelRatio / window.devicePixelRatio}px JetBrains Mono, monospace`;
    ctx.textAlign = 'right';
    ctx.fillText(mode === 'watt' ? Math.round(val) : val.toFixed(1), padL - 4, y + 4);
  }

  // Build smooth path points using monotone interpolation helper
  function buildPath(vals) {
    const pts = vals.map((v, i) => [xPos(i), yPos(v)]);
    return pts;
  }

  function drawSmooth(pts, color, lineWidth, dash) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash(dash || []);
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      const cp1x = (pts[i-1][0] + pts[i][0]) / 2;
      ctx.bezierCurveTo(cp1x, pts[i-1][1], cp1x, pts[i][1], pts[i][0], pts[i][1]);
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function fillArea(myPts, oppPts) {
    // Fill area between curves — green where my > opp, red where opp > my
    for (let i = 0; i < myPts.length - 1; i++) {
      const x1 = myPts[i][0],  my1 = myPts[i][1],  opp1 = oppPts[i][1];
      const x2 = myPts[i+1][0], my2 = myPts[i+1][1], opp2 = oppPts[i+1][1];
      // No fill — lines only
    }
  }

  const myPts  = buildPath(myVals);
  const oppPts = buildPath(oppVals);

  // Fill between curves
  fillArea(myPts, oppPts);

  // Draw lines
  drawSmooth(oppPts, isDark ? 'rgba(255,68,85,0.85)' : 'rgba(200,30,50,0.85)',   2.5, [6,3]);
  drawSmooth(myPts,  isDark ? 'rgba(127,255,107,0.9)' : 'rgba(30,150,50,0.9)',  2.5);

  // Dots + value labels
  function drawDots(pts, vals, color) {
    pts.forEach(([x, y], i) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Value label above/below dot
      const isMyTeam = color.includes('127,255');
      ctx.fillStyle = color;
      ctx.font = `bold 9px JetBrains Mono, monospace`;
      ctx.textAlign = 'center';
      const label = mode === 'watt' ? Math.round(vals[i]) + 'W' : vals[i].toFixed(2);
      ctx.fillText(label, x, isMyTeam ? y - 10 : y + 18);
    });
  }

  drawDots(myPts,  myVals,  'rgba(127,255,107,1)');
  drawDots(oppPts, oppVals, 'rgba(255,68,85,1)');

  // X axis labels
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)';
  ctx.font = `9px JetBrains Mono, monospace`;
  ctx.textAlign = 'center';
  intervals.forEach((iv, i) => {
    ctx.fillText(iv.label, xPos(i), H - 8);
  });
}

// openMatchupAnalysis: switches to analyze tab (triggers renderMatchupAnalysis via switchTab)
function openMatchupAnalysis() {
  switchTab('analyze');
}

// Update the analyze button state when opponent changes
function updateAnalyzeBtn() {
  const btn  = document.getElementById('analyze-btn');
  const tab  = document.getElementById('analyze-tab');
  const cta  = document.getElementById('analyze-cta-bar');
  const name = document.getElementById('cta-opp-name');
  if (opponentTeam) {
    if (btn)  { btn.style.opacity = '1'; btn.title = ''; }
    if (tab)  { tab.style.opacity = '1'; tab.title = ''; }
    if (cta)  { cta.classList.add('visible'); }
    if (name) { name.textContent = opponentTeam.name; }
  } else {
    if (btn)  { btn.style.opacity = '0.5'; btn.title = 'Select an opponent to enable'; }
    if (tab)  { tab.style.opacity = '0.5'; tab.title = 'Select an opponent to enable'; }
    if (cta)  { cta.classList.remove('visible'); }
  }
}

function loadOpponentFromLibrary() {
  const key = document.getElementById('opp-library-select').value;
  const statsEl = document.getElementById('opp-team-stats');
  

  // Handle own teams as opponent
  if (key && key.startsWith('MY_TEAM::')) {
    const teamKey = key.replace('MY_TEAM::', '');
    const teamData = MY_TEAMS[teamKey];
    if (!teamData) return;
    opponentTeam = {
      name: teamData.name,
      riders: teamData.riders.map(r => ({
        name: r.name, weight: r.weight, watt: r.watt || Math.round((r.twentyMin||0)*(r.weight||70)),
        sprint: r.sprint, oneMin: r.oneMin, fiveMin: r.fiveMin, twentyMin: r.twentyMin,
        w5s: r.w5s, w10s: r.w10s, w15s: r.w15s, w30s: r.w30s,
        w1min: r.w1min, w2min: r.w2min, w5min: r.w5min, w10min: r.w10min,
        w20min: r.w20min, w30min: r.w30min, active: true
      })),
      getRiderWatts: oppRiderWatts
    };
    renderOppRoster();
    updateContextBar();
    runMatch();
    updateAnalyzeBtn();
    return;
  }
  if (!key) {
    opponentTeam = null;
    statsEl.innerHTML = "";
    runMatch();
    return;
  }

  const teamData = OPPONENT_LIBRARY[key];
  const count = teamData.riders.length;

  const avgWkg    = teamData.riders.reduce((s, r) => s + r.wkg,    0) / count;
  const avgWatt   = teamData.riders.reduce((s, r) => s + r.watt,   0) / count;  // FIX: was r.ftp
  const avgWeight = teamData.riders.reduce((s, r) => s + r.weight, 0) / count;

  // Build a proper scored profile using the same normWatts logic as our team.
  // For opponents without curve data we estimate sprint/1min/5min from wkg×weight.
  // Use real curve data per rider where available, fall back to wkg×weight estimates
  function oppRiderWatts(r, key) {
    const wMap = {
      sprint: r.w5s   ?? Math.round(r.wkg * r.weight * 2.1),
      w10s:   r.w10s  ?? Math.round(r.wkg * r.weight * 1.9),
      w15s:   r.w15s  ?? Math.round(r.wkg * r.weight * 1.75),
      w30s:   r.w30s  ?? Math.round(r.wkg * r.weight * 1.5),
      w1min:  r.w1min ?? Math.round(r.wkg * r.weight * 1.35),
      w2min:  r.w2min ?? Math.round(r.wkg * r.weight * 1.2),
      w5min:  r.w5min ?? Math.round(r.wkg * r.weight * 1.08),
      w10min: r.w10min?? Math.round(r.wkg * r.weight * 1.02),
      w20min: r.w20min?? Math.round(r.wkg * r.weight),
      ftp:    r.watt  ?? Math.round(r.wkg * r.weight)
    };
    return wMap[key] ?? wMap.ftp;
  }

  const oppHasCurve = teamData.riders.some(r => r.w5s || r.w1min);

  // Store full rider list so runMatch() can pick best N per course
  opponentTeam = {
    name:    teamData.name,
    riders:  teamData.riders,   // raw riders — best lineup computed per course in runMatch
    getRiderWatts: oppRiderWatts  // attach the helper so runMatch can use it
  };
  
  localStorage.setItem('zwift_opponent_data', JSON.stringify(teamData)); 

  // Show summary stats (all riders) for the sidebar
  const opp_wFtp    = teamData.riders.reduce((s,r) => s + oppRiderWatts(r,'ftp'),    0) / count;
  const opp_wSprint = teamData.riders.reduce((s,r) => s + oppRiderWatts(r,'sprint'), 0) / count;
  const opp_w1min   = teamData.riders.reduce((s,r) => s + oppRiderWatts(r,'w1min'),  0) / count;
  const opp_w5min   = teamData.riders.reduce((s,r) => s + oppRiderWatts(r,'w5min'),  0) / count;

  statsEl.innerHTML = `
    <div>${teamData.name} — ${avgWkg.toFixed(2)} W/kg · ${Math.round(avgWatt)}W FTP avg · ${avgWeight.toFixed(1)}kg ${oppHasCurve ? '<span style="color:var(--accent3)">● curve data</span>' : '<span style="opacity:0.5">○ estimated</span>'}</div>
    <div style="font-size:0.65rem;opacity:0.7;margin-top:3px">
      Full squad avg — FTP:${Math.round(opp_wFtp)}W · Sprint:${Math.round(opp_wSprint)}W · 1min:${Math.round(opp_w1min)}W · 5min:${Math.round(opp_w5min)}W
    </div>`;
  renderOppRoster();
  updateContextBar();
  runMatch();
  updateAnalyzeBtn();
}

function openDSSheet() {
  if (!opponentTeam || !opponentTeam.riders) {
    alert('Select an opponent team first.');
    return;
  }
  const course = getSelectedMatchupCourse();
  const myTeam = MY_TEAMS[activeMyTeamKey];
  const fn = getRiderWatts;

  function firstName(name) {
    return name.replace(/\s*[\(\[][^\)\]]*[\)\]]\s*/g, '').trim().split(' ')[0];
  }
  function getWkg(r, wkgField, wattKey) {
    if (r[wkgField] && r[wkgField] > 0) return parseFloat(r[wkgField]);
    const w = fn(r, wattKey);
    return w > 0 ? w / (r.weight || 70) : 0;
  }

  const myRidersFinal = (myTeam ? myTeam.riders.filter(r => r.selected) : []);
  const oppRiders = opponentTeam.riders.filter(r => r.active !== false);

  const cats = [
    { wkgField:'wkg15s',  wattKey:'w15s'  },
    { wkgField:'wkg1min', wattKey:'w1min' },
    { wkgField:'wkg5min', wattKey:'w5min' },
    { wkgField:'wkg20min',wattKey:'ftp'   },
  ];
  function maxVals(riders) {
    return cats.map(cat => Math.max(...riders.map(r => getWkg(r, cat.wkgField, cat.wattKey))));
  }
  const myMax  = maxVals(myRidersFinal);
  const oppMax = maxVals(oppRiders);

  // Course info
  const isLight = localStorage.getItem('leqp_theme') === 'light';
  let courseHTML = '';
  if (course) {
    const fp = getCourseFingerprint(course);
    const dominant = getProfileDominant(course, fp);
    const typeLabels = { climber:'⛰ Climbing', punch:'💥 Punchy', tt:'➡ Flat/TT', sprint:'⚡ Sprint', medium:'📈 Hilly', endurance:'⏱ Endurance' };
    const typeColors = { climber:'#a5d6a7', punch:'#ffcc80', tt:'#80deea', sprint:'#ce93d8', medium:'#fff176', endurance:'#26c6da' };
    const col = typeColors[dominant] || '#ccc';
    courseHTML = `
      <div style="background:var(--ds-surface);border:1px solid var(--ds-border);border-radius:4px;padding:14px 18px;margin-bottom:20px;display:flex;gap:32px;align-items:center;flex-wrap:wrap">
        <div>
          <div style="font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:2px;color:var(--ds-text);line-height:1">${course.name}</div>
          <div style="font-family:monospace;font-size:0.65rem;color:var(--ds-dim);margin-top:3px">${course.world || ''} &nbsp;·&nbsp; ${course.distance ? course.distance + ' km' : ''} &nbsp;·&nbsp; ${course.elevation ? course.elevation + ' m ↑' : ''}</div>
        </div>
        <div style="background:${col};color:#000;font-family:monospace;font-size:0.7rem;font-weight:700;padding:4px 12px;border-radius:2px">${typeLabels[dominant] || 'Mixed'}</div>
        <div style="display:flex;gap:16px;font-family:monospace;font-size:0.65rem;color:var(--ds-dim)">
          <span>Climb <b style="color:#a5d6a7">${Math.round(fp.climber)}</b></span>
          <span>Punch <b style="color:#ffcc80">${Math.round(fp.punch)}</b></span>
          <span>Pursuit <b style="color:#80deea">${Math.round(fp.tt)}</b></span>
          <span>Sprint <b style="color:#ce93d8">${Math.round(fp.sprint)}</b></span>
          <span>Endurance <b style="color:#26c6da">${Math.round(fp.endurance || 0)}</b></span>
        </div>
      </div>`;
  }

  function riderRow(r, maxArr) {
    const vals = cats.map(cat => getWkg(r, cat.wkgField, cat.wattKey));
    const cells = vals.map((v, i) => {
      const isTop = v > 0 && v === maxArr[i];
      const txt = v > 0 ? v.toFixed(2) : '—';
      if (isTop) {
        return `<td style="text-align:center;font-weight:700;color:#000;background:#fbbf24;padding:7px 10px">★ ${txt}</td>`;
      }
      return `<td style="text-align:center;color:#fbbf24;font-weight:700;padding:7px 10px">${txt}</td>`;
    });
    return `<tr>
      <td style="font-size:1rem;font-family:'Bebas Neue',sans-serif;letter-spacing:1px;padding:7px 10px 7px 6px;white-space:nowrap;color:var(--ds-text)">${firstName(r.name)}</td>
      <td style="text-align:center;color:var(--ds-dim);padding:7px 6px">${r.weight || '—'}</td>
      ${cells.join('')}
    </tr>`;
  }

  function buildTable(teamName, riders, maxArr, accentCol) {
    const th = txt => `<th style="text-align:center;font-size:0.6rem;letter-spacing:1px;color:var(--ds-dim);padding:5px 10px;border-bottom:1px solid var(--ds-border);white-space:nowrap">${txt}</th>`;
    const header = `<thead>
      <tr><th colspan="6" style="text-align:left;font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:2px;color:${accentCol};padding:8px 6px 4px;background:var(--ds-surface)">${teamName}</th></tr>
      <tr>${th('RIDER')}${th('KG')}${th('15s W/KG')}${th('1min W/KG')}${th('5min W/KG')}${th('20min W/KG')}</tr>
    </thead>`;
    const rows = riders.map(r => riderRow(r, maxArr)).join('');
    return `<table style="width:100%;border-collapse:collapse;font-family:monospace;font-size:0.9rem;background:var(--ds-surface);border-radius:4px;overflow:hidden">
      ${header}<tbody>${rows}</tbody>
    </table>`;
  }

  const html = `<!DOCTYPE html>
<html class="${isLight ? 'light' : ''}">
<head>
<meta charset="UTF-8">
<title>DS Sheet — ${myTeam ? myTeam.name : 'My Team'} vs ${opponentTeam.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;700&display=swap');
  * { box-sizing:border-box; margin:0; padding:0; }
  :root { --ds-bg:#0d1117; --ds-surface:#1f2937; --ds-text:#e5e7eb; --ds-dim:#9ca3af; --ds-border:#374151; --ds-stripe:rgba(255,255,255,0.03); --ds-hover:rgba(255,255,255,0.07); }
  html.light { --ds-bg:#f4f6f9; --ds-surface:#ffffff; --ds-text:#1a2035; --ds-dim:#6b7a99; --ds-border:#d1d9e6; --ds-stripe:rgba(0,0,0,0.03); --ds-hover:rgba(0,0,0,0.05); }
  body { background:var(--ds-bg); color:var(--ds-text); font-family:monospace; padding:20px; }
  h1 { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:3px; color:var(--ds-text); margin-bottom:4px; }
  .vs { color:var(--ds-dim); font-size:1.2rem; margin:0 8px; }
  .subtitle { font-size:0.6rem; color:var(--ds-dim); letter-spacing:2px; margin-bottom:20px; }
  table { width:100%;border-collapse:collapse;font-family:monospace;font-size:0.9rem;background:var(--ds-surface);border-radius:4px;overflow:hidden; }
  tr:nth-child(even) td { background:var(--ds-stripe); }
  tr:hover td { background:var(--ds-hover); }
  td, th { border-bottom:1px solid var(--ds-border); }
  .teams { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  @media (max-width:900px) { .teams { grid-template-columns:1fr; } }
</style>
</head>
<body>
  <div style="margin-bottom:16px">
    <h1>${myTeam ? myTeam.name : 'My Team'} <span class="vs">vs</span> ${opponentTeam.name}</h1>
		<div class="subtitle">DS SHEET &nbsp;·&nbsp; ${new Date().toLocaleDateString('en-GB', {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</div>
  </div>
  ${courseHTML}
  <div class="teams">
    <div>${buildTable(myTeam ? myTeam.name : 'My Team', myRidersFinal, myMax, '#00e5ff')}</div>
    <div>${buildTable(opponentTeam.name, oppRiders, oppMax, '#ff6b6b')}</div>
  </div>
  <div style="margin-top:16px;font-size:0.55rem;color:var(--ds-dim);letter-spacing:1px">★ = BEST ON THE TEAM &nbsp;·&nbsp; 90-DAY POWER FROM ZWIFTPOWER</div></body>
</html>`;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

// ── Laps clamping ────────────────────────────────────────────────────────────
function clampMatchupLaps(input) {
  // Don't interfere while user is mid-typing (empty or just a minus sign)
  if (input.value === '' || input.value === '-') return;
  const name = document.getElementById('matchup-route-select')?.value;
  const base = name ? courses.find(c => c.name === name) : null;
  let val = parseInt(input.value);
  if (isNaN(val)) return;
  val = Math.max(1, val);
  if (base) {
    const maxLaps = Math.max(1, Math.floor(39.9 / base.distance));
    // Only restrict if the route can meaningfully be run multiple times
    if (maxLaps > 1) {
      val = Math.min(val, maxLaps);
      input.max = maxLaps;
    } else {
      // Route is already close to 40km - still allow up to 3 laps max
      val = Math.min(val, 3);
      input.max = 3;
    }
  } else {
    val = Math.min(val, 10);
    input.max = 10;
  }
  input.value = val;
  // Re-render route analysis with new lap count
  if (typeof renderMatchupAnalysis === 'function') renderMatchupAnalysis();
}

function clampLaps(input) {
  const courseId = parseInt(document.getElementById('match-course-select').value);
  const course = courses.find(c => c.id === courseId);
  let val = parseInt(input.value) || 1;
  val = Math.max(1, val);
  if (course) {
    const maxLaps = Math.floor(40 / course.distance);
    val = Math.min(val, Math.max(1, maxLaps));
    input.max = Math.max(1, maxLaps);
  } else {
    val = Math.min(val, 10);
    input.max = 10;
  }
  input.value = val;
}

// ── Route Audit ──────────────────────────────────────────────────────────────
function openRouteAudit() {
  const modal = document.getElementById('route-audit-modal');
  const container = document.getElementById('route-audit-content');
  modal.classList.add('open');

  const dimCols = ['tt','sprint','punch','medium','climber','endurance'];
  const dimLabels = { tt:'Pursuit', sprint:'Sprint', punch:'Punch', medium:'Medium', climber:'Climb', endurance:'Endurance' };
  const typeColor = { tt:'var(--accent)', sprint:'var(--accent2)', punch:'#f5a623', medium:'#9b59b6', climber:'var(--red)', endurance:'#26c6da' };

  let rows = '';
  for (const route of ZWIFT_ROUTES) {
    const fp = getCourseFingerprint(route);
    // Find dominant dimension
    const dominant = dimCols.reduce((a,b) => fp[a] > fp[b] ? a : b);

    const bar = (val, col) => {
      const pct = Math.round(Math.min(100, Math.max(0, val)));
      const w = Math.round(pct * 0.18);
      return '<td style="padding:2px 3px;vertical-align:middle;"><div style="display:flex;align-items:center;gap:2px;"><div style="height:5px;width:' + w + 'px;max-width:14px;background:' + col + ';opacity:0.85;flex-shrink:0"></div><span style="font-size:0.52rem;color:var(--text-dim);flex-shrink:0">' + pct + '</span></div></td>';
    };

    const shortName = route.name.length > 18 ? route.name.slice(0,18) + '…' : route.name;
    rows += '<tr style="border-bottom:1px solid var(--border);">'
      + '<td style="padding:2px 4px;font-family:JetBrains Mono,monospace;font-size:0.58rem;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="' + route.name + '">' + shortName + '</td>'
      + '<td style="padding:2px 4px;font-family:JetBrains Mono,monospace;font-size:0.5rem;color:var(--text-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + route.world + '</td>'
      + '<td style="padding:2px 4px;font-family:JetBrains Mono,monospace;font-size:0.5rem;color:' + (typeColor[dominant]||'var(--text)') + '">' + dominant.toUpperCase() + '</td>'
      + '<td style="padding:2px 4px;font-family:JetBrains Mono,monospace;font-size:0.5rem;color:var(--text-dim)">' + route.distance + '</td>'
      + '<td style="padding:2px 4px;font-family:JetBrains Mono,monospace;font-size:0.5rem;color:var(--text-dim)">' + route.elevation + '</td>'
      + bar(fp.tt, typeColor.tt)
      + bar(fp.sprint, typeColor.sprint)
      + bar(fp.punch, typeColor.punch)
      + bar(fp.climber, typeColor.climber)
      + bar(fp.endurance || 0, typeColor.endurance || '#26c6da')
      + '</tr>';
  }

  const th = (t) => '<th style="text-align:left;padding:4px 5px;font-size:0.52rem;letter-spacing:1px;color:var(--text-dim);white-space:nowrap">' + t + '</th>';
  container.innerHTML = '<table style="width:100%;border-collapse:collapse;font-family:JetBrains Mono,monospace;table-layout:fixed;">'
    + '<thead><tr style="border-bottom:2px solid var(--border);">'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:29%">ROUTE</th>'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:9%">WORLD</th>'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:8%">DOM.</th>'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:5%">KM</th>'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:5%">ELEV</th>'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:9%">TT</th>'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:9%">SPRT</th>'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:9%">PNCH</th>'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:8%">CLB</th>'
    + '<th style="text-align:left;padding:4px 4px;font-size:0.5rem;letter-spacing:1px;color:var(--text-dim);width:8%">ENDU</th>'
    + '</tr></thead><tbody>' + rows + '</tbody></table>';
}

function openRouteAudit() {
  const modal = document.getElementById('route-audit-modal');
  const container = document.getElementById('route-audit-content');
  modal.classList.add('open');

  const dimCols = ['tt','sprint','punch','medium','climber','endurance'];
  const typeColor = { tt:'var(--accent)', sprint:'var(--accent2)', punch:'#f5a623', medium:'#9b59b6', climber:'var(--red)', endurance:'#26c6da' };

  let rows = '';
  for (const route of ZWIFT_ROUTES) {
    const fp = getCourseFingerprint(route);
    const dominant = dimCols.reduce((a,b) => fp[a] > fp[b] ? a : b);

    const bar = (val, col) => {
      const pct = Math.round(Math.min(100, Math.max(0, val)));
      return '<td style="padding:2px 4px;vertical-align:middle;"><div style="display:flex;align-items:center;gap:5px;"><div style="height:7px;width:' + pct + 'px;max-width:32px;background:' + col + ';opacity:0.8;flex-shrink:0"></div><span style="font-size:0.55rem;color:var(--text-dim);min-width:18px;flex-shrink:0">' + pct + '</span></div></td>';
    };

    rows += '<tr style="border-bottom:1px solid var(--border);">'
      + '<td style="padding:4px 6px;font-family:JetBrains Mono,monospace;font-size:0.6rem;color:var(--text);white-space:nowrap;max-width:140px;overflow:hidden;text-overflow:ellipsis" title="' + route.name + '">' + (route.name.length > 18 ? route.name.slice(0,18) + '\u2026' : route.name) + '</td>'
      + '<td style="padding:5px 8px;font-family:JetBrains Mono,monospace;font-size:0.55rem;color:var(--text-dim)">' + route.world + '</td>'
      + '<td style="padding:5px 8px;font-family:JetBrains Mono,monospace;font-size:0.6rem;color:' + (typeColor[dominant]||'var(--text)') + '">' + dominant.toUpperCase() + '</td>'
      + '<td style="padding:5px 8px;font-family:JetBrains Mono,monospace;font-size:0.6rem;color:var(--text-dim)">' + route.distance + 'km</td>'
      + '<td style="padding:5px 8px;font-family:JetBrains Mono,monospace;font-size:0.6rem;color:var(--text-dim)">' + route.elevation + 'm</td>'
      + bar(fp.tt, typeColor.tt)
      + bar(fp.sprint, typeColor.sprint)
      + bar(fp.punch, typeColor.punch)
      + bar(fp.climber, typeColor.climber)
      + bar(fp.endurance || 0, typeColor.endurance || '#26c6da')
      + '</tr>';
  }

  container.innerHTML = '<table style="width:100%;border-collapse:collapse;font-family:JetBrains Mono,monospace;">'
    + '<thead><tr style="border-bottom:2px solid var(--border);">'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">ROUTE</th>'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">WORLD</th>'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">DOMINANT</th>'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">DIST</th>'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">ELEV</th>'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">TT</th>'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">SPRINT</th>'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">PUNCH</th>'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">CLIMB</th>'
    + '<th style="text-align:left;padding:6px 8px;font-size:0.55rem;letter-spacing:2px;color:var(--text-dim)">ENDURANCE</th>'
    + '</tr></thead><tbody>' + rows + '</tbody></table>';
}

// ═══════════ RIDER PROFILE TAB ═══════════
let _profileRaces = [];
let _profileOtherRaces = [];
let _profileZrlRaces = [];
let _profileFrrRaces = [];
let _profileEcroRaces = [];
let _profileWtrlRaces = [];
let _profileRaceSource = 'combined';
let _profileName = '';
let _profileId = null;
let _profileSortKey = 'event_date';
let _profileSortDir = 1;

async function loadRiderProfile() {
  const id = document.getElementById('profile-zwift-id').value.trim();
  if (!id) return;
  const btn = document.getElementById('profile-load-btn');
  const status = document.getElementById('profile-status');
  btn.disabled = true;
  status.style.color = 'var(--accent)';
  status.textContent = 'Loading...';
  document.getElementById('profile-header').style.display = 'none';
  document.getElementById('profile-tbody').innerHTML = '';
  document.getElementById('profile-race-count').textContent = '';
  const _rsReset = document.getElementById('profile-race-search'); if (_rsReset) _rsReset.value = '';
  const _raReset = document.getElementById('profile-race-analysis');
  if (_raReset) { _raReset.style.display = 'none'; _raReset.innerHTML = ''; }
  const _daReset = document.getElementById('profile-detailed-analysis-wrap');
  if (_daReset) _daReset.style.display = 'none';
  const _daInner = document.getElementById('profile-detailed-analysis');
  if (_daInner) { _daInner.style.display = 'none'; _daInner.innerHTML = ''; }

  // Slå op i embedded LADDER_RACES — ingen API nødvendig
  const entry = (typeof LADDER_RACES !== 'undefined') && (LADDER_RACES[id] || LADDER_RACES[parseInt(id)]);
  if (entry) {
    _profileRaces = entry.races || [];
    _profileOtherRaces = ((typeof OTHER_RACES !== 'undefined') && (OTHER_RACES[id] || OTHER_RACES[parseInt(id)])) ? (OTHER_RACES[id] || OTHER_RACES[parseInt(id)]).races || [] : [];
    _profileSplitOtherRaces();
    _profileName = entry.name || 'Unknown';
    _profileId = id;
    _profileRaceSource = 'combined';
    _profileUpdateSourceTabs();
    if (_profileRaces.length === 0 && _profileOtherRaces.length === 0) {
      status.style.color = 'var(--text-dim)';
      status.textContent = 'No races found for this rider.';
    } else {
      const races = _profileGetRaces();
      _profileRenderHeader(_profileName, id, races);
      _profileRenderTable(races);
      status.style.color = 'var(--text-dim)';
      status.textContent = '';
      setTimeout(() => (document.getElementById('profile-source-tabs') || document.getElementById('profile-header')).scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
    btn.disabled = false;
    return;
  }

  // Fallback: prøv lokal API
  try {
    const res = await fetch(`http://127.0.0.1:8000/rider/${id}/ladder_races`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    _profileRaces = data.races || [];
    _profileOtherRaces = data.other_races || [];
    _profileSplitOtherRaces();
    _profileName = data.name;
    _profileId = id;
    _profileRaceSource = 'combined';
    _profileUpdateSourceTabs();
    if (_profileRaces.length === 0 && _profileOtherRaces.length === 0) {
      status.style.color = 'var(--text-dim)';
      status.textContent = 'No races found for this rider.';
    } else {
      const races = _profileGetRaces();
      _profileRenderHeader(_profileName, id, races);
      _profileRenderTable(races);
      status.style.color = 'var(--text-dim)';
      status.textContent = '';
      setTimeout(() => (document.getElementById('profile-source-tabs') || document.getElementById('profile-header')).scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    }
  } catch(e) {
    status.style.color = 'var(--text-dim)';
    status.textContent = `No data available for Zwift ID ${id}.`;
  } finally {
    btn.disabled = false;
  }
}

function _profileSplitOtherRaces() {
  _profileZrlRaces  = _profileOtherRaces.filter(r => /zwift racing league|ZRL/i.test(r.event_title || ''));
  _profileFrrRaces  = _profileOtherRaces.filter(r => /\bFRR\b/i.test(r.event_title || ''));
  _profileEcroRaces = _profileOtherRaces.filter(r => /\bECRO\b/i.test(r.event_title || ''));
  _profileWtrlRaces = _profileOtherRaces.filter(r => /\bWTRL\b/i.test(r.event_title || ''));
  _profileOtherRaces = _profileOtherRaces.filter(r =>
    !/zwift racing league|ZRL/i.test(r.event_title || '') &&
    !/\bFRR\b/i.test(r.event_title || '') &&
    !/\bECRO\b/i.test(r.event_title || '') &&
    !/\bWTRL\b/i.test(r.event_title || '')
  );
}

function _profileGetRaces() {
  if (_profileRaceSource === 'other')    return _profileOtherRaces;
  if (_profileRaceSource === 'zrl')      return _profileZrlRaces;
  if (_profileRaceSource === 'frr')      return _profileFrrRaces;
  if (_profileRaceSource === 'ecro')     return _profileEcroRaces;
  if (_profileRaceSource === 'wtrl')     return _profileWtrlRaces;
  if (_profileRaceSource === 'combined') return [..._profileRaces, ..._profileZrlRaces, ..._profileFrrRaces, ..._profileEcroRaces, ..._profileWtrlRaces, ..._profileOtherRaces].sort((a,b) => (b.event_date||0) - (a.event_date||0));
  return _profileRaces;
}

function _profileUpdateSourceTabs() {
  const wrap = document.getElementById('profile-source-tabs');
  if (!wrap) return;

  // Bestem hvilke tabs der har data
  const hasData = {
    ladder:   _profileRaces.length > 0,
    zrl:      _profileZrlRaces.length > 0,
    frr:      _profileFrrRaces.length > 0,
    ecro:     _profileEcroRaces.length > 0,
    wtrl:     _profileWtrlRaces.length > 0,
    other:    _profileOtherRaces.filter(r =>
                !/zwift racing league|ZRL/i.test(r.event_title||'') &&
                !/\bFRR\b/i.test(r.event_title||'') &&
                !/\bECRO\b/i.test(r.event_title||'') &&
                !/\bWTRL\b/i.test(r.event_title||'')).length > 0,
  };
  const typesWithData = Object.values(hasData).filter(Boolean).length;
  hasData.combined = typesWithData > 1;

  const order = ['combined','ladder','zrl','frr','ecro','wtrl','other'];
  order.forEach(s => {
    const btn = document.getElementById('pst-' + s);
    if (btn) btn.style.display = hasData[s] ? '' : 'none';
  });

  // Hvis aktiv tab ikke har data, skift til første synlige tab
  if (!hasData[_profileRaceSource]) {
    _profileRaceSource = order.find(s => hasData[s]) || 'ladder';
  }

  const hasVisible = Object.values(hasData).some(Boolean);
  wrap.style.display = hasVisible ? 'block' : 'none';

  // AI Training Plan only visible on Combined tab
  const tpWrap = document.getElementById('profile-training-plan-wrap');
  if (tpWrap) tpWrap.style.display = hasVisible ? 'block' : 'none';

  order.forEach(s => {
    const btn = document.getElementById('pst-' + s);
    if (btn) {
      btn.style.background  = s === _profileRaceSource ? 'var(--accent)' : 'var(--surface2)';
      btn.style.color       = s === _profileRaceSource ? 'var(--bg)' : 'var(--text)';
      btn.style.borderColor = s === _profileRaceSource ? 'var(--accent)' : 'var(--border)';
      btn.style.fontWeight  = s === _profileRaceSource ? '700' : '500';
      btn.style.opacity     = s === _profileRaceSource ? '1' : '0.7';
    }
  });
  _updateTabScrollHint();
}

function _updateTabScrollHint() {
  requestAnimationFrame(() => {
    const container = document.getElementById('tab-scroll-container');
    const hint      = document.getElementById('tab-scroll-hint');
    if (!container || !hint) return;
    const overflows = container.scrollWidth > container.clientWidth + 4;
    const atEnd     = container.scrollLeft + container.clientWidth >= container.scrollWidth - 4;
    hint.style.display = overflows && !atEnd ? 'flex' : 'none';
  });
}

function profileSetRaceSource(source) {
  _profileRaceSource = source;
  _profileUpdateSourceTabs();
  const races = _profileGetRaces();
  _profileRenderHeader(_profileName, _profileId, races);
  _profileRenderTable(races);
}

function _profileRenderHeader(name, id, races) {
  document.getElementById('profile-name').textContent = name;

  const cutoff90 = (Date.now() / 1000) - (90 * 86400);
  const races90  = races.filter(r => (r.event_date || 0) >= cutoff90);
  const best = {wkg5:0, wkg15:0, wkg30:0, wkg60:0, wkg120:0, wkg300:0, wkg1200:0};
  for (const r of races90) {
    for (const k of Object.keys(best)) if ((r[k]||0) > best[k]) best[k] = r[k];
  }

  const _bestsTitle = document.getElementById('profile-bests-title');
  if (_bestsTitle) {
    const _srcLabel = {ladder:'Ladder', zrl:'ZRL', frr:'FRR', ecro:'ECRO', wtrl:'WTRL', other:'Other', combined:'All Races'}[_profileRaceSource] || 'Ladder';
    _bestsTitle.textContent = `90-day ${_srcLabel} PR`;
  }

  document.getElementById('profile-bests').innerHTML = [
    ['5s',best.wkg5],['15s',best.wkg15],['30s',best.wkg30],
    ['1min',best.wkg60],['2min',best.wkg120],['5min',best.wkg300],['20min',best.wkg1200]
  ].map(([l,v]) =>
    `<div style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;background:var(--surface2);border:1px solid var(--border);padding:4px 12px;color:var(--text-dim)">${l} <span style="color:${_wkgColor(v)};font-weight:600">${v?v.toFixed(1):'—'}</span></div>`
  ).join('');

  const latestWeight = races.length ? (races[0].weight || 0) : 0;
  const type = _profileRiderType(best, latestWeight);
  const badge = document.getElementById('profile-type-badge');
  badge.textContent = type.label;
  badge.style.color = type.color;
  badge.style.borderColor = type.color;
  badge.style.background = type.color + '18';
  document.getElementById('profile-type-desc').textContent = type.desc;
  document.getElementById('profile-weight-badge').textContent = latestWeight > 0 ? latestWeight.toFixed(1) + ' kg' : '';

  const positions = races.map(r => r.pos_in_cat || r.pos).filter(p => p > 0);
  const bestPos = positions.length ? Math.min(...positions) : null;
  const avgPos = positions.length ? (positions.reduce((a,b)=>a+b,0)/positions.length).toFixed(1) : null;
  const lastRace = races.length ? new Date(races[0].event_date*1000).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}) : null;
  const pill = (label, val) => val
    ? `<div style="font-family:'JetBrains Mono',monospace;font-size:0.7rem;background:var(--surface2);border:1px solid var(--border);padding:4px 12px;color:var(--text-dim)">${label} <span style="color:var(--accent);font-weight:600">${val}</span></div>`
    : '';
  const statsTitle = document.getElementById('profile-stats-title');
  if (statsTitle) statsTitle.textContent = {ladder:'Ladder Stats', zrl:'ZRL Stats', frr:'FRR Stats', ecro:'ECRO Stats', wtrl:'WTRL Stats', other:'Other Race Stats', combined:'All Races Stats'}[_profileRaceSource] || 'Race Stats';
  document.getElementById('profile-ladder-stats').innerHTML = [
    pill('Races', races.length),
    pill('Best pos', bestPos ? '#' + bestPos : null),
    pill('Avg pos', avgPos ? '#' + avgPos : null),
    pill('Latest', lastRace),
  ].join('');

  document.getElementById('profile-header').style.display = 'block';
  _profileRenderChart(races);
  const srcLabel = {ladder:'Ladder', zrl:'ZRL', frr:'FRR', ecro:'ECRO', wtrl:'WTRL', other:'Other races', combined:'All Races'}[_profileRaceSource] || '';
  document.getElementById('profile-race-count').innerHTML =
    `${srcLabel} <span style="font-size:0.72rem;font-weight:400;color:var(--text-dim);letter-spacing:1px">(${races.length} races)</span>`;

  // Opdater Power Curve titel
  const chartTitle = document.getElementById('profile-chart-title');
  if (chartTitle) chartTitle.textContent = `Power Curve — W/kg · ${srcLabel}`;

  // Race Analysis section
  const raEl = document.getElementById('profile-race-analysis');
  if (raEl) {
    const rm = calcRaceMetrics(races);
    if (rm) {
      const base = "font-family:'JetBrains Mono',monospace;";
      const dims = [
        ['🥊', 'Punch',        rm.scores.punch,         rm.ratios.punch  != null ? rm.ratios.punch.toFixed(1)+'× spr/FTP'   : '', '#f7d084'],
        ['🫁', 'VO₂ stab.',    rm.scores.vo2,           rm.ratios.vo2    != null ? rm.ratios.vo2.toFixed(2)+' 5min/20min'    : '', '#b48eff'],
        ['🎯', 'Pacing',       rm.scores.pacing,        rm.ratios.pacing != null ? rm.ratios.pacing.toFixed(2)+' 1min/AVG'   : '', 'var(--accent)'],
        ['🔁', 'Repeatability',rm.scores.repeatability, rm.ratios.repeat != null ? rm.ratios.repeat.toFixed(2)+' 1min/2min'  : '', 'var(--accent2)'],
        ['🏁', 'Slut-sprint',  rm.scores.endSprint,     'proxy',                                                                  'var(--accent3)'],
        ['💪', 'Fatigue res.', rm.scores.fatigue,       rm.ratios.fatigue!= null ? rm.ratios.fatigue.toFixed(1)+'% CV 20min': '', '#ff9f43'],
      ].filter(([,,score]) => score != null);

      const rows = dims.map(([icon, label, score, detail, color]) => {
        const pct = score * 10;
        return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
          <span style="font-size:0.85rem;width:20px">${icon}</span>
          <span style="${base}font-size:0.62rem;color:var(--text-dim);width:110px">${label}</span>
          <div style="flex:1;height:5px;background:rgba(255,255,255,0.08);border-radius:3px">
            <div style="width:${pct}%;height:100%;background:${color};border-radius:3px"></div>
          </div>
          <span style="${base}font-size:0.78rem;font-weight:700;color:${color};width:20px;text-align:right">${score}</span>
          <span style="${base}font-size:0.60rem;color:var(--text-dim);width:130px;text-align:right">${detail}</span>
        </div>`;
      }).join('');

      const insightHTML = rm.insights.length
        ? `<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);${base}font-size:0.65rem;color:var(--text-dim);line-height:1.8">${rm.insights.map(i => '· '+i).join('<br>')}</div>`
        : '';

      // Scout report — dynamically generated based on active race source
      const scoutText = _profileGenerateScoutReport(rm, _profileRaceSource);
      const bioHTML = scoutText
        ? `<div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border)">
             <div style="${base}font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:6px">Scout Report</div>
             <div style="${base}font-size:0.68rem;color:var(--text-dim);line-height:1.8">${scoutText}</div>
           </div>`
        : '';

      raEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div class="matchup-section-title" style="font-size:0.85rem">Race Analysis — ${srcLabel}</div>
          <div style="${base}font-size:0.60rem;color:${rm.confidenceColor}">${rm.confidenceLabel}</div>
        </div>
        ${rows}${insightHTML}${bioHTML}`;
      raEl.style.display = 'block';
    } else {
      raEl.style.display = 'none';
    }

    // Detailed analysis — always shown, fallback message if insufficient data
    const daWrap = document.getElementById('profile-detailed-analysis-wrap');
    const daEl   = document.getElementById('profile-detailed-analysis');
    const daBtn  = document.getElementById('profile-analysis-btn');
    if (daWrap && daEl) {
      const analysisHTML = _profileGenerateAnalysis(races);
      if (analysisHTML) {
        daEl.innerHTML = analysisHTML;
        daEl.style.display = 'none';
        if (daBtn) daBtn.innerHTML = `📊 Detailed Rider Analysis — ${srcLabel} <span style="font-size:0.65rem;color:var(--text-dim);margin-left:8px;font-weight:400">[show]</span>`;
      } else {
        const raceCount = races ? races.filter(r => (r.wkg1200||0)>0 && (r.wkg60||0)>0 && (r.avg_wkg||0)>0).length : 0;
        daEl.innerHTML = `<div style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;color:var(--text-dim);padding:8px 0">
          Not enough races for data analysis — at least 5 races with complete power data required (${raceCount} available).
        </div>`;
        daEl.style.display = 'none';
        if (daBtn) daBtn.innerHTML = `📊 Detailed Rider Analysis — ${srcLabel} <span style="font-size:0.65rem;color:var(--text-dim);margin-left:8px;font-weight:400">[show]</span>`;
      }
      daWrap.style.display = 'block';
    }

    // AI Training Plan wrap visibility handled by _profileUpdateSourceTabs — do not reset content here

    // Cross-race type comparison — only shown if rider has data in ≥2 race types
    const ccWrap = document.getElementById('profile-cross-comparison-wrap');
    const ccEl   = document.getElementById('profile-cross-comparison');
    if (ccWrap && ccEl) {
      const ccHTML = _profileGenerateCrossComparison();
      if (ccHTML) {
        ccEl.innerHTML = ccHTML;
        ccEl.style.display = 'none';
        document.getElementById('profile-cross-btn').innerHTML = '⚖ Cross-Race Type Comparison <span style="font-size:0.65rem;color:var(--text-dim);margin-left:8px;font-weight:400">[show]</span>';
        ccWrap.style.display = 'block';
      } else {
        ccWrap.style.display = 'none';
      }
    }
  }
}

function toggleProfileCrossComparison() {
  const el  = document.getElementById('profile-cross-comparison');
  const btn = document.getElementById('profile-cross-btn');
  if (!el) return;
  const open = el.style.display === 'block';
  el.style.display = open ? 'none' : 'block';
  if (btn) btn.innerHTML = open ? '⚖ Cross-Race Type Comparison <span style="font-size:0.65rem;color:var(--text-dim);margin-left:8px;font-weight:400">[show]</span>' : '⚖ Cross-Race Type Comparison <span style="font-size:0.65rem;color:var(--text-dim);margin-left:8px;font-weight:400">[hide]</span>';
}

function _profileGenerateCrossComparison() {
  const B  = "font-family:'JetBrains Mono',monospace;";
  const f2 = v => (v != null && v > 0) ? v.toFixed(2) : '—';

  const allTypes = [
    { key: 'ladder', label: 'Ladder',      color: 'var(--accent)',  races: _profileRaces },
    { key: 'zrl',    label: 'ZRL',         color: '#b48eff',        races: _profileZrlRaces },
    { key: 'frr',    label: 'FRR',         color: '#ff9f43',        races: _profileFrrRaces },
    { key: 'ecro',   label: 'ECRO',        color: 'var(--accent3)', races: _profileEcroRaces },
    { key: 'wtrl',   label: 'WTRL',        color: '#7fff6b',        races: _profileWtrlRaces },
    { key: 'other',  label: 'Other races', color: 'var(--accent2)', races: _profileOtherRaces },
  ].filter(t => t.races.length >= 2);

  if (allTypes.length < 2) return null;

  const avg = arr => arr.length ? arr.reduce((s,x) => s+x, 0) / arr.length : null;
  const std = arr => { if (!arr.length) return null; const a = avg(arr); return Math.sqrt(avg(arr.map(x => (x-a)**2))); };
  const cv  = arr => { const a = avg(arr), s = std(arr); return (a && s) ? (s/a*100) : null; };

  const stats = allTypes.map(t => {
    const wkg5v   = t.races.filter(r => (r.wkg5  ||0) > 0).map(r => r.wkg5);
    const wkg60v  = t.races.filter(r => (r.wkg60 ||0) > 0).map(r => r.wkg60);
    const wkg300v = t.races.filter(r => (r.wkg300||0) > 0).map(r => r.wkg300);
    const wkg1200v= t.races.filter(r => (r.wkg1200||0) > 0).map(r => r.wkg1200);
    const avgWkgV = t.races.filter(r => (r.avg_wkg||0) > 0).map(r => r.avg_wkg);
    return {
      ...t,
      avgWkg:   avgWkgV.length ? avg(avgWkgV) : null,
      avg5s:    wkg5v.length   ? avg(wkg5v)   : null,
      avg1min:  wkg60v.length  ? avg(wkg60v)  : null,
      avg5min:  wkg300v.length ? avg(wkg300v) : null,
      avg20min: wkg1200v.length? avg(wkg1200v): null,
      cv20min:  wkg1200v.length >= 3 ? cv(wkg1200v) : null,
    };
  });

  const maxOf    = key => Math.max(...stats.map(s => s[key] || 0));
  const minOfKey = key => Math.min(...stats.filter(s => s[key] != null).map(s => s[key]));

  const maxAvgWkg  = maxOf('avgWkg');
  const maxAvg5s   = maxOf('avg5s');
  const maxAvg1min = maxOf('avg1min');
  const maxAvg5min = maxOf('avg5min');
  const maxAvg20   = maxOf('avg20min');
  const minCv      = minOfKey('cv20min');

  const hiVal = (val, max) => val != null && val > 0 && Math.abs(val - max) < 0.001;
  const loVal = (val, min) => val != null && Math.abs(val - min) < 0.001;
  const cell  = (val, isHi) => isHi
    ? `<span style="color:var(--accent);font-weight:700">${f2(val)}</span>`
    : `<span style="color:var(--text-dim)">${f2(val)}</span>`;
  const cellCv = (val, isLo) => val == null ? `<span style="color:var(--text-dim)">—</span>`
    : isLo
      ? `<span style="color:var(--accent);font-weight:700">${val.toFixed(1)}%</span>`
      : `<span style="color:var(--text-dim)">${val.toFixed(1)}%</span>`;

  // ── Table ──
  const tableRows = stats.map(s => `
    <tr style="border-bottom:1px solid var(--border)">
      <td style="padding:7px 10px;${B}font-size:0.65rem;color:${s.color};font-weight:600">${s.label}</td>
      <td style="padding:7px 10px;text-align:center;${B}font-size:0.65rem;color:var(--text-dim)">${s.races.length}</td>
      <td style="padding:7px 10px;text-align:center;${B}font-size:0.65rem">${cell(s.avgWkg,   hiVal(s.avgWkg,   maxAvgWkg))}</td>
      <td style="padding:7px 10px;text-align:center;${B}font-size:0.65rem">${cell(s.avg5s,    hiVal(s.avg5s,    maxAvg5s))}</td>
      <td style="padding:7px 10px;text-align:center;${B}font-size:0.65rem">${cell(s.avg1min,  hiVal(s.avg1min,  maxAvg1min))}</td>
      <td style="padding:7px 10px;text-align:center;${B}font-size:0.65rem">${cell(s.avg5min,  hiVal(s.avg5min,  maxAvg5min))}</td>
      <td style="padding:7px 10px;text-align:center;${B}font-size:0.65rem">${cell(s.avg20min, hiVal(s.avg20min, maxAvg20))}</td>
      <td style="padding:7px 10px;text-align:center;${B}font-size:0.65rem">${cellCv(s.cv20min, loVal(s.cv20min, minCv))}</td>
    </tr>`).join('');

  // ── Bar chart: avg 20min W/kg ──
  const chartMax = maxAvg20 * 1.15 || 1;
  const barRows = stats.filter(s => s.avg20min).map(s => {
    const pct = (s.avg20min / chartMax * 100).toFixed(1);
    return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
      <div style="${B}font-size:0.62rem;color:${s.color};width:90px;text-align:right;font-weight:600">${s.label}</div>
      <div style="flex:1;height:14px;background:rgba(255,255,255,0.06);border-radius:3px">
        <div style="width:${pct}%;height:100%;background:${s.color};opacity:0.75;border-radius:3px"></div>
      </div>
      <div style="${B}font-size:0.70rem;color:${s.color};font-weight:700;width:44px">${s.avg20min.toFixed(2)}</div>
    </div>`;
  }).join('');

  // ── Narrative analysis ──
  const paras = [];

  // Para 1: Power output across types
  const withPower = stats.filter(s => s.avg20min);
  if (withPower.length >= 2) {
    const best  = withPower.reduce((a,b) => a.avg20min > b.avg20min ? a : b);
    const worst = withPower.reduce((a,b) => a.avg20min < b.avg20min ? a : b);
    const diff20 = ((best.avg20min - worst.avg20min) / worst.avg20min * 100).toFixed(1);
    const withAvgWkg = stats.filter(s => s.avgWkg != null);
    let paceNote = '';
    if (withAvgWkg.length >= 2) {
      const bestPace  = withAvgWkg.reduce((a,b) => a.avgWkg > b.avgWkg ? a : b);
      const worstPace = withAvgWkg.reduce((a,b) => a.avgWkg < b.avgWkg ? a : b);
      const diffPace  = ((bestPace.avgWkg - worstPace.avgWkg) / worstPace.avgWkg * 100).toFixed(1);
      if (parseFloat(diffPace) > 4)
        paceNote = ` The average race pace also reflects this — ${bestPace.label} races run at ${bestPace.avgWkg.toFixed(2)} W/kg on average versus ${worstPace.avgWkg.toFixed(2)} in ${worstPace.label}.`;
    }
    const allSimilar = parseFloat(diff20) < 3;
    if (allSimilar) {
      paras.push(`The 20min power output is remarkably consistent across all race types — the spread between best (${best.label}: ${best.avg20min.toFixed(2)} W/kg) and worst (${worst.label}: ${worst.avg20min.toFixed(2)} W/kg) is only ${diff20}%. This suggests the rider performs at a similar level regardless of race format.${paceNote}`);
    } else {
      paras.push(`The highest avg 20min power appears in <strong>${best.label}</strong> races (${best.avg20min.toFixed(2)} W/kg), which is ${diff20}% above the lowest in <strong>${worst.label}</strong> (${worst.avg20min.toFixed(2)} W/kg).${paceNote}`);
    }
  }

  // Para 2: Consistency
  const withCv = stats.filter(s => s.cv20min != null);
  if (withCv.length >= 2) {
    const most  = withCv.reduce((a,b) => a.cv20min < b.cv20min ? a : b);
    const least = withCv.reduce((a,b) => a.cv20min > b.cv20min ? a : b);
    const cvDiff = least.cv20min - most.cv20min;
    let cvInterp = '';
    if (cvDiff < 1.5)
      cvInterp = `The difference is small — consistency is broadly similar across formats.`;
    else if (most.cv20min < 4)
      cvInterp = `A CV of ${most.cv20min.toFixed(1)}% in ${most.label} indicates very uniform power race to race — the rider knows their level and executes reliably in that format.`;
    else if (least.cv20min > 8)
      cvInterp = `The high variation in ${least.label} (CV ${least.cv20min.toFixed(1)}%) suggests the rider doesn't always bring the same engine to those races — form or pacing may fluctuate more.`;
    else
      cvInterp = `More variation in ${least.label} could reflect harder competition, less familiarity with the format, or simply a smaller sample size.`;
    paras.push(`Output is most consistent in <strong>${most.label}</strong> races (CV ${most.cv20min.toFixed(1)}%) compared to <strong>${least.label}</strong> (CV ${least.cv20min.toFixed(1)}%). ${cvInterp}`);
  }

  // Para 3: Sprint and punch profile across types
  const withSprint = stats.filter(s => s.avg5s != null);
  const withPunch  = stats.filter(s => s.avg1min != null);
  const sprintParts = [];
  if (withSprint.length >= 2) {
    const best  = withSprint.reduce((a,b) => a.avg5s > b.avg5s ? a : b);
    const worst = withSprint.reduce((a,b) => a.avg5s < b.avg5s ? a : b);
    const diff  = ((best.avg5s - worst.avg5s) / worst.avg5s * 100).toFixed(1);
    if (parseFloat(diff) > 5)
      sprintParts.push(`sprint power (5s) is ${diff}% higher in <strong>${best.label}</strong> than in ${worst.label} — pointing to more bunch finishes or harder accelerations in that format`);
  }
  if (withPunch.length >= 2) {
    const best  = withPunch.reduce((a,b) => a.avg1min > b.avg1min ? a : b);
    const worst = withPunch.reduce((a,b) => a.avg1min < b.avg1min ? a : b);
    const diff  = ((best.avg1min - worst.avg1min) / worst.avg1min * 100).toFixed(1);
    if (parseFloat(diff) > 5)
      sprintParts.push(`1min punch is ${diff}% stronger in <strong>${best.label}</strong> versus ${worst.label}`);
  }
  if (sprintParts.length > 0)
    paras.push(`Looking at explosive capacity: ${sprintParts.join(', and ')}. This can reflect both the nature of the race and how aggressively the rider chooses to ride each format.`);
  else if (withSprint.length >= 2)
    paras.push(`Sprint and punch numbers are broadly similar across race types — no single format stands out as significantly more explosive than the others.`);

  // Para 4: Overall summary
  const allWithPower = stats.filter(s => s.avg20min && s.avg5min);
  if (allWithPower.length >= 2) {
    const bestFtp    = allWithPower.reduce((a,b) => a.avg20min > b.avg20min ? a : b);
    const bestCv     = withCv.length >= 2 ? withCv.reduce((a,b) => a.cv20min < b.cv20min ? a : b) : null;
    const sameType   = bestCv && bestFtp.key === bestCv.key;
    if (sameType)
      paras.push(`Overall, <strong>${bestFtp.label}</strong> appears to be this rider's strongest format — both in absolute power output and output consistency. The other race types show either lower sustained power or higher race-to-race variation.`);
    else if (bestCv)
      paras.push(`Overall, the rider delivers the highest absolute output in <strong>${bestFtp.label}</strong> races, while showing the most consistent performances in <strong>${bestCv.label}</strong>. Whether that difference reflects race level, course type, or how the rider approaches each format is worth exploring further.`);
  }

  const narrativeHTML = paras.length
    ? `<div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--border)">
         <div style="${B}font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:12px">Analysis</div>
         ${paras.map(p => `<div style="${B}font-size:0.65rem;color:var(--text-dim);line-height:1.9;margin-bottom:10px">${p}</div>`).join('')}
       </div>`
    : '';

  return `
    <div style="${B}font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:14px">Performance by Race Type</div>
    <div style="overflow-x:auto;margin-bottom:20px">
      <table style="width:100%;border-collapse:collapse;background:var(--surface2);border:1px solid var(--border);white-space:nowrap">
        <thead>
          <tr style="border-bottom:2px solid var(--border)">
            <th style="padding:8px 10px;text-align:left;${B}font-size:0.55rem;letter-spacing:1.5px;color:var(--text-dim);text-transform:uppercase;font-weight:400">Type</th>
            <th style="padding:8px 10px;text-align:center;${B}font-size:0.55rem;letter-spacing:1.5px;color:var(--text-dim);text-transform:uppercase;font-weight:400">N</th>
            <th style="padding:8px 10px;text-align:center;${B}font-size:0.55rem;letter-spacing:1.5px;color:var(--text-dim);text-transform:uppercase;font-weight:400">AVG W/kg</th>
            <th style="padding:8px 10px;text-align:center;${B}font-size:0.55rem;letter-spacing:1.5px;color:var(--text-dim);text-transform:uppercase;font-weight:400">5s</th>
            <th style="padding:8px 10px;text-align:center;${B}font-size:0.55rem;letter-spacing:1.5px;color:var(--text-dim);text-transform:uppercase;font-weight:400">1min</th>
            <th style="padding:8px 10px;text-align:center;${B}font-size:0.55rem;letter-spacing:1.5px;color:var(--text-dim);text-transform:uppercase;font-weight:400">5min</th>
            <th style="padding:8px 10px;text-align:center;${B}font-size:0.55rem;letter-spacing:1.5px;color:var(--text-dim);text-transform:uppercase;font-weight:400">20min</th>
            <th style="padding:8px 10px;text-align:center;${B}font-size:0.55rem;letter-spacing:1.5px;color:var(--text-dim);text-transform:uppercase;font-weight:400">Consistency</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
    <div style="${B}font-size:0.55rem;letter-spacing:2px;color:var(--text-dim);text-transform:uppercase;margin-bottom:10px">Avg 20min W/kg</div>
    ${barRows}
    ${narrativeHTML}
    <div style="${B}font-size:0.52rem;color:var(--text-dim);margin-top:14px;opacity:0.45">Highlighted = best across race types · Consistency CV%: lower = more uniform output · Min 2 races per type</div>
  `;
}

function _profileRiderType(best, weight) {
  const s = best.wkg5 || 0;
  const p = best.wkg60 || 0;
  const e = best.wkg300 || 0;
  const c = best.wkg1200 || 0;
  const w = weight || 0;
  const sprintRatio = s > 0 && c > 0 ? s / c : 0;
  const punchRatio  = p > 0 && c > 0 ? p / c : 0;
  const isLight = w > 0 && w < 62;
  const absWatt = w > 0 && c > 0 ? Math.round(c * w) : 0;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  if (c === 0) return { label: 'Unknown', color: '#6b7a99', desc: 'Not enough data to determine rider type.' };
  if (sprintRatio > 3.2 && s > 12) return { label: '⚡ Sprinter', color: '#ff6b35', desc: pick([
    `Explosive sprint power of ${s.toFixed(1)} W/kg over 5 seconds — well above average. Most dangerous in finishes and routes ending with a flat sprint. Loses ground on long climbs.`,
    `${s.toFixed(1)} W/kg over 5 seconds says it all. This rider is built to win sprints — but prefers to stay away from routes with serious climbing. A classic sprinter.`,
    `The power reserve in short bursts is impressive. Strong in a compact bunch approaching the finish — but challenged by riders with better endurance on climbing routes.`,
    `Quick off the block with ${s.toFixed(1)} W/kg over 5s. Works best on flat or technical routes where the sprint decides. On long climbs the advantage disappears fast.`,
    `Pure speed. With ${s.toFixed(1)} W/kg over 5 seconds this rider can outsprint almost anyone — but needs the bunch to arrive at the line together. Exposed on any route with sustained climbing.`,
    `A finisher built for fast endings. The 5-second peak of ${s.toFixed(1)} W/kg is a serious weapon in a bunch sprint — but the engine runs out quickly on routes that demand sustained power.`,
  ])};
  if (sprintRatio > 2.6 && punchRatio > 1.8) return { label: '🥊 Puncher', color: '#cc88ff', desc: pick([
    `Strong 1-min power of ${p.toFixed(1)} W/kg combined with good explosivity. Thrives on punchy terrain with short, hard climbs and frequent tempo changes. Can surprise on the right routes.`,
    `${p.toFixed(1)} W/kg over 1 minute is a weapon on rolling and punchy routes. This rider can place attacks exactly where it hurts — and hold them. Dangerous on terrain with repeated short climbs.`,
    `The profile reveals a rider who loves chaos. Decent on the flat, but thrives when the rhythm breaks and attacks fly. The 1-min capacity of ${p.toFixed(1)} W/kg makes them dangerous on punchy routes.`,
    `A classic puncher — not the sprinter on the flat, not the climber on the summit, but potentially the most dangerous on rolling terrain. Explosive enough to put the field under pressure with short accelerations.`,
    `Attacks come naturally to this rider. The combination of ${p.toFixed(1)} W/kg over 1 minute and decent sprint speed makes them unpredictable on routes with repeated punchy sections.`,
    `Built for disruption. This rider doesn't wait for the sprint — they try to break the race apart on the climbs. With ${p.toFixed(1)} W/kg over 1 minute, they have the punch to make it stick.`,
  ])};
  if (e > 0 && c > 0 && ((e/c) > 1.15 || (isLight && (e/c) > 1.05)) && c > 3.5) return { label: '🏔️ Climber', color: '#7fff6b', desc: pick([
    `20-min power of ${c.toFixed(1)} W/kg and strong 5-min capacity. The profile clearly points to a rider who thrives on long climbs. The more elevation, the bigger the advantage.`,
    `A rider with ${c.toFixed(1)} W/kg over 20 minutes is built for mountains. Effective on anything with sustained climbing — and correspondingly hard to follow for heavier riders.`,
    `Low weight and high relative power over time gives this rider a natural home advantage on climbing routes. ${c.toFixed(1)} W/kg over 20 min is competitive on most ladder climbs.`,
    `Endurance is the keyword here. ${c.toFixed(1)} W/kg over 20 minutes combined with good 5-min power means this rider can push a high pace far up the climb — and sustain it.`,
    `The numbers tell a clear story. ${c.toFixed(1)} W/kg sustained over 20 minutes is a genuine climbing weapon — and as the gradient increases, this rider's advantage only grows.`,
    `Gravity is this rider's friend. With ${c.toFixed(1)} W/kg over 20 minutes and strong relative power throughout, they're most dangerous when the road goes up and the pace stays high.`,
  ])};
  if (punchRatio > 1.6 && e > 3.5) return { label: '🔄 Allrounder', color: '#00e5ff', desc: pick([
    `Balanced W/kg profile across intervals. Not the fastest in the sprint nor the strongest on the mountain — but can contribute on almost any route type. A valuable rider in a team with a varied schedule.`,
    `The profile shows good versatility. ${e.toFixed(1)} W/kg over 5 min and ${c.toFixed(1)} W/kg over 20 min is a combination that works on many routes. No obvious weakness, no extreme strength.`,
    `An allrounder rarely wins on a specialist's home turf — but is never completely out of the picture either. This rider is strongest where no one has a clear advantage.`,
    `Solid from sprint to endurance. ${p.toFixed(1)} W/kg over 1 min and ${c.toFixed(1)} W/kg over 20 min points to a rider who can adapt, cover attacks and hold pace — a true allrounder.`,
    `Versatility is the signature here. No single number jumps out — but the consistency across all intervals means this rider is rarely caught out whatever the route throws at them.`,
    `This rider fits in everywhere and is never truly out of their depth. ${e.toFixed(1)} W/kg over 5 minutes and ${c.toFixed(1)} W/kg over 20 minutes makes them a reliable asset across the full race calendar.`,
  ])};
  if (isLight) return { label: '🚀 Rouleur', color: '#ffd700', desc: pick([
    `${c.toFixed(1)} W/kg over 20 minutes is a strong aerobic base — but at ${w.toFixed(0)} kg the absolute output is ~${absWatt}W. On flat Zwift routes where raw watts dominate, heavier riders will have the advantage. Climbs and rolling terrain are where this profile performs best.`,
    `Solid relative power at ${c.toFixed(1)} W/kg, but the low body weight (${w.toFixed(0)} kg, ~${absWatt}W FTP) means flat routes are not the ideal hunting ground. The profile favours terrain with elevation — anything requiring sustained effort uphill suits this rider much better.`,
    `Consistent engine at ${c.toFixed(1)} W/kg over 20 minutes. At ${w.toFixed(0)} kg the power-to-weight ratio is an asset on climbs, but ~${absWatt}W absolute means flat races favour heavier, higher-wattage riders. Best used on routes with gradient.`,
  ])};
  return { label: '🚀 Rouleur', color: '#ffd700', desc: pick([
    `Smooth and efficient over mid-length intervals. Strong in time trials and routes with constant resistance. 20-min power: ${c.toFixed(1)} W/kg${absWatt ? ` (${absWatt}W)` : ''} — solid and hard to shake on flat to lightly rolling terrain.`,
    `${c.toFixed(1)} W/kg over 20 minutes reflects a rider who can hold a high pace for a long time. Classic rouleur profile — not explosive, but consistent and efficient.`,
    `The rouleur is the backbone of any team. Not the one who wins the sprint, but the one who sets the pace, closes gaps and keeps the bunch together. ${c.toFixed(1)} W/kg${absWatt ? ` / ${absWatt}W` : ''} over 20 min speaks for itself.`,
    `Consistent power is this rider's trademark. ${e.toFixed(1)} W/kg over 5 min and ${c.toFixed(1)} W/kg over 20 min paints a picture of a rider who thrives on sustained effort — and is hard to shake off.`,
    `Built for the long game. This rider won't blow anyone away in the first minute — but ${c.toFixed(1)} W/kg over 20 minutes means they're still there when it matters, grinding down the competition.`,
    `Efficiency over explosiveness. The rouleur profile suits routes where sustained power wins over short bursts — and with ${c.toFixed(1)} W/kg${absWatt ? ` (${absWatt}W)` : ''} over 20 minutes, this rider is firmly in that category.`,
  ])};
}

function toggleProfileDetailedAnalysis() {
  const el  = document.getElementById('profile-detailed-analysis');
  const btn = document.getElementById('profile-analysis-btn');
  if (!el) return;
  const _daLabel = {ladder:'Ladder', zrl:'ZRL', frr:'FRR', ecro:'ECRO', wtrl:'WTRL', other:'Other', combined:'All Races'}[_profileRaceSource] || '';
  const open = el.style.display === 'block';
  el.style.display = open ? 'none' : 'block';
  if (btn) btn.innerHTML = open ? `📊 Detailed Rider Analysis — ${_daLabel} <span style="font-size:0.65rem;color:var(--text-dim);margin-left:8px;font-weight:400">[show]</span>` : `📊 Detailed Rider Analysis — ${_daLabel} <span style="font-size:0.65rem;color:var(--text-dim);margin-left:8px;font-weight:400">[hide]</span>`;
}

function _profileGenerateAnalysis(races) {
  const valid = races.filter(r => r.wkg1200 > 0 && r.wkg60 > 0 && r.avg_wkg > 0);
  const n = valid.length;
  if (n < 5) return null;

  const avg  = arr => arr.reduce((s,x) => s+x, 0) / arr.length;
  const std  = arr => { const a = avg(arr); return Math.sqrt(avg(arr.map(x => (x-a)**2))); };
  const minv = arr => Math.min(...arr);
  const maxv = arr => Math.max(...arr);
  const f2   = v => v != null ? v.toFixed(2) : '—';
  const f1   = v => v != null ? v.toFixed(1) : '—';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const fmtDate = ts => { const d = new Date(ts*1000); return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; };
  const fmtMY   = ts => { const d = new Date(ts*1000); return `${months[d.getMonth()]} ${d.getFullYear()}`; };
  const B = "font-family:'JetBrains Mono',monospace;";

  const sorted = [...valid].sort((a,b) => a.event_date - b.event_date);
  const firstTs = sorted[0].event_date, lastTs = sorted[sorted.length-1].event_date;
  const weightMin = minv(valid.map(r => r.weight||0).filter(w => w>0));
  const weightMax = maxv(valid.map(r => r.weight||0).filter(w => w>0));
  const weightStr = weightMin === weightMax ? `${weightMin} kg` : `${weightMin}–${weightMax} kg`;
  const avgWeight = weightMin > 0 ? (weightMin + weightMax) / 2 : 0;
  const isLightRider = avgWeight > 0 && avgWeight < 62;

  // ── Temporal periods (kvartaler baseret på faktisk datospan) ──
  const spanMs = (lastTs - firstTs) * 1000;
  const numPeriods = spanMs < 90*24*3600*1000 ? 2 : spanMs < 270*24*3600*1000 ? 3 : 4;
  const periodSize = (lastTs - firstTs) / numPeriods;
  const periods = Array.from({length: numPeriods}, (_, i) => {
    const pStart = firstTs + i * periodSize;
    const pEnd   = firstTs + (i+1) * periodSize + 1;
    return sorted.filter(r => r.event_date >= pStart && r.event_date < pEnd);
  }).filter(p => p.length > 0);

  const periodRows = periods.map(pr => {
    const pAvg = avg(pr.map(r => r.avg_wkg));
    const p5   = pr.filter(r => r.wkg300 > 0).length ? avg(pr.filter(r => r.wkg300 > 0).map(r => r.wkg300)) : null;
    const p20  = avg(pr.map(r => r.wkg1200));
    const startL = fmtMY(pr[0].event_date), endL = fmtMY(pr[pr.length-1].event_date);
    const label = startL === endL ? startL : `${startL}–${endL}`;
    return `<tr style="border-bottom:1px solid var(--border)">
      <td style="padding:5px 10px;${B}font-size:0.62rem">${label} (${pr.length} races)</td>
      <td style="padding:5px 10px;text-align:center;${B}font-size:0.62rem;color:var(--accent)">${f2(pAvg)}</td>
      <td style="padding:5px 10px;text-align:center;${B}font-size:0.62rem;color:#b48eff">${p5 ? f2(p5) : '—'}</td>
      <td style="padding:5px 10px;text-align:center;${B}font-size:0.62rem;color:var(--accent3)">${f2(p20)}</td>
    </tr>`;
  }).join('');

  // Tendens (første halvdel vs. anden)
  const half = Math.floor(sorted.length / 2);
  const early = sorted.slice(0, half), late = sorted.slice(half);
  const trendWkg5  = late.filter(r=>r.wkg300>0).length && early.filter(r=>r.wkg300>0).length
    ? avg(late.filter(r=>r.wkg300>0).map(r=>r.wkg300)) - avg(early.filter(r=>r.wkg300>0).map(r=>r.wkg300)) : 0;
  const trendWkg20 = avg(late.map(r=>r.wkg1200)) - avg(early.map(r=>r.wkg1200));
  const trendAvg   = avg(late.map(r=>r.avg_wkg))  - avg(early.map(r=>r.avg_wkg));
  const trendText  = Math.abs(trendWkg20) < 0.05 && Math.abs(trendWkg5) < 0.08
    ? 'Power output is remarkably stable across the full period.'
    : trendWkg20 > 0.08
      ? `Rising trend — 20min power improved by ${f2(trendWkg20)} W/kg from the first to second half of the period.`
      : trendWkg20 < -0.08
        ? `Slight downward trend — 20min power dropped by ${f2(Math.abs(trendWkg20))} W/kg from the first to second half of the period. AVG is ${Math.abs(trendAvg) < 0.05 ? 'remarkably stable' : trendAvg > 0 ? 'however up slightly' : 'also down'}.`
        : `AVG W/kg is stable across the period. Minor fluctuations in 5min and 20min power.`;

  // ── Repeatability ──
  const repData    = valid.filter(r => r.wkg120 > 0);
  const repRatios  = repData.map(r => ({ ratio: r.wkg60/r.wkg120, r }));
  const avgRep     = repRatios.length ? avg(repRatios.map(x=>x.ratio)) : null;
  const stdRep     = repRatios.length ? std(repRatios.map(x=>x.ratio)) : null;
  const bestRep    = repRatios.length ? repRatios.reduce((a,b) => a.ratio < b.ratio ? a : b) : null;
  const worstRep   = repRatios.length ? repRatios.reduce((a,b) => a.ratio > b.ratio ? a : b) : null;
  const highSpike  = repData.filter(r => r.wkg60 > 0);
  const highSpikeThreshold = highSpike.length ? avg(highSpike.map(r=>r.wkg60)) + std(highSpike.map(r=>r.wkg60)) : null;
  const spikeLowestRep = highSpikeThreshold ? repRatios.filter(x=>x.r.wkg60 >= highSpikeThreshold) : [];
  const spikeAvgRatio  = spikeLowestRep.length ? avg(spikeLowestRep.map(x=>x.ratio)) : null;

  const repVurdering = avgRep == null ? '' : avgRep < 1.12
    ? `Good repeatability — ${f2(avgRep)} ratio with low spread (${f2(stdRep)}) indicates a rider who maintains intensity well after spikes.`
    : avgRep < 1.20
      ? `Moderate repeatability — ${f2(avgRep)} average with spread ${f2(stdRep)}. Some drop-off after hard efforts, but within an acceptable range.`
      : `High variation (${bestRep?f2(bestRep.ratio):'—'}–${worstRep?f2(worstRep.ratio):'—'}) indicates inconsistent repeatability. ${spikeAvgRatio ? `In races with high 1min power (>${f1(highSpikeThreshold)} W/kg) the 1min/2min ratio rises to ${f2(spikeAvgRatio)}, suggesting anaerobic capacity is fully tapped but cannot be sustained.` : ''}`;

  // ── Pacing ──
  const pacRatios = valid.map(r => ({ ratio: r.wkg60/r.avg_wkg, r }));
  const avgPac    = avg(pacRatios.map(x=>x.ratio));
  const bestPac   = pacRatios.reduce((a,b) => a.ratio < b.ratio ? a : b);
  const worstPac  = pacRatios.reduce((a,b) => a.ratio > b.ratio ? a : b);
  const highWkg60 = valid.reduce((a,b) => b.wkg60 > a.wkg60 ? b : a);

  const top3inBest = valid.filter(r => r.wkg60/r.avg_wkg < avgPac && r.pos > 0 && r.pos <= 3).length;
  const pacingPattern = avgPac > 2.0
    ? `Aggressive pattern — average 1min/AVG ratio of ${f2(avgPac)} reflects a rider who typically goes hard early and fades toward the finish.`
    : avgPac > 1.7
      ? `Moderately aggressive pattern — ${f2(avgPac)} 1min/AVG ratio. The rider usually opens at high intensity but sustains it better than average.`
      : `Even pacing — ${f2(avgPac)} 1min/AVG ratio suggests good ability to distribute effort across the race.`;

  // ── Stats ──
  const wkg5vals  = valid.filter(r=>r.wkg5>0).map(r=>r.wkg5);
  const wkg300vals = valid.filter(r=>r.wkg300>0).map(r=>r.wkg300);
  const wkg1200vals = valid.map(r=>r.wkg1200);
  const avgWkg5   = wkg5vals.length  ? avg(wkg5vals) : null;
  const avgWkg300 = wkg300vals.length ? avg(wkg300vals) : null;
  const avgWkg20  = avg(wkg1200vals);
  const cvFat     = std(wkg1200vals) / avgWkg20 * 100;
  const dropPct   = avgWkg20 > 0 ? ((avgWkg20 - minv(wkg1200vals)) / avgWkg20 * 100) : 0;

  // Positions
  const posValid  = valid.filter(r => r.pos > 0);
  const podiums   = posValid.filter(r => r.pos <= 3);
  const top5      = posValid.filter(r => r.pos <= 5);
  const podStr    = podiums.length
    ? podiums.slice(0,3).map(r => `P${r.pos} (${fmtDate(r.event_date)})`).join(', ')
    : null;

  // Scores first — strengths/weaknesses driven by scores (≥8 = strength, ≤5 = weakness)
  const rm = calcRaceMetrics(races);
  const strengths = [], weaknesses = [];
  if (rm) {
    const { scores, ratios } = rm;
    // Punch — not relevant in TTT format
    if (_profileRaceSource !== 'wtrl') {
      if (scores.punch != null && scores.punch >= 8 && avgWkg5 != null)
        strengths.push({ title:'Punch / short spikes (5s–30s)', text:`Avg 5s: ${f1(avgWkg5)} W/kg (range ${f1(minv(wkg5vals))}–${f1(maxv(wkg5vals))}). ${avgWkg5 > 10 ? 'Extremely explosive' : 'Solid explosive capacity'} — can go hard at key moments.` });
      else if (scores.punch != null && scores.punch <= 5 && avgWkg5 != null)
        weaknesses.push({ title:'Punch / short-burst power', text:`Avg 5s: ${f1(avgWkg5)} W/kg${scores.punch <= 4 ? ' — limited sprint capacity. Flat finishes are not ideal terrain.' : ' — below average. Not a reliable weapon in sprint finishes.'}` });
    }
    // VO₂
    if (scores.vo2 != null && scores.vo2 >= 8 && avgWkg300 != null && wkg300vals.length >= 3)
      strengths.push({ title:'VO₂ stability (5min)', text:`Avg 5min: ${f2(avgWkg300)} W/kg with low spread (${f1(minv(wkg300vals))}–${f1(maxv(wkg300vals))}). Most consistent metric — sign of a strong aerobic base.` });
    else if (scores.vo2 != null && scores.vo2 <= 5 && avgWkg300 != null)
      weaknesses.push({ title:'VO₂ stability (5min)', text:`5min avg ${f2(avgWkg300)} W/kg — ${scores.vo2 <= 4 ? 'inconsistent or low relative to 20min power. Aerobic ceiling may limit sustained efforts.' : 'below average relative to 20min power. Sustained high-intensity efforts are a limiting factor.'}` });
    // Pacing
    if (scores.pacing >= 8)
      strengths.push({ title:'Pacing / tactical judgement', text:`1min/AVG ratio of ${f2(avgPac)} is low — maintains steady output and saves energy for the finish.` });
    else if (scores.pacing <= 5)
      weaknesses.push({ title:'Pacing consistency', text:`1min/AVG ratio avg ${f2(avgPac)} (range ${f2(bestPac.ratio)}–${f2(worstPac.ratio)}). ${pacingPattern}` });
    // Repeatability
    if (scores.repeatability != null && scores.repeatability >= 8 && avgRep != null)
      strengths.push({ title:'Repeatability', text:`1min/2min ratio ${f2(avgRep)} ± ${f2(stdRep)} — very consistent after spikes. ${repVurdering}` });
    else if (scores.repeatability != null && scores.repeatability <= 5 && avgRep != null)
      weaknesses.push({ title:'Repeatability', text:`1min/2min ratio ${f2(avgRep)} ± ${f2(stdRep)}. ${repVurdering}` });
    // Fatigue resistance
    const absAvgWkg20 = avgWeight > 0 ? Math.round(avgWkg20 * avgWeight) : 0;
    const lightNote = isLightRider && absAvgWkg20 ? ` Note: at ${avgWeight.toFixed(0)} kg the absolute output is ~${absAvgWkg20}W — strong on climbs but limited on flat routes where raw watts dominate.` : '';
    if (scores.fatigue >= 8)
      strengths.push({ title:'Fatigue resistance (20min)', text:`Avg 20min: ${f2(avgWkg20)} W/kg${absAvgWkg20 ? ` (~${absAvgWkg20}W)` : ''} with only ${Math.round(dropPct)}% drop in hardest races (${f1(minv(wkg1200vals))} W/kg). Very consistent FTP output.${lightNote}` });
    else if (scores.fatigue <= 5)
      weaknesses.push({ title:'Fatigue resistance (20min)', text:`Avg 20min: ${f2(avgWkg20)} W/kg${absAvgWkg20 ? ` (~${absAvgWkg20}W)` : ''}. In the hardest races 20min drops to ${f1(minv(wkg1200vals))} W/kg — ${Math.round(dropPct)}% below average. ${scores.fatigue <= 4 ? 'Notable fatigue toward the finish.' : 'Some drop-off in the final phase.'}` });
    // Late-race sprint — not relevant in TTT format
    if (_profileRaceSource !== 'wtrl') {
      if (scores.endSprint >= 8)
        strengths.push({ title:'Late-race sprint', text:`Performs significantly better in well-paced races — suggesting strong closing ability when reserves are managed.` });
      else if (scores.endSprint <= 5)
        weaknesses.push({ title:'Late-race sprint', text:`${scores.endSprint <= 4 ? 'No clear improvement in finishing position in well-paced races — closing power may be limited.' : 'Limited upside in well-paced races — closing sprint is not a reliable finishing weapon.'}` });
    }
  }
  // Podiums: separate non-score strength
  if (podiums.length >= 2)
    strengths.push({ title:'Results in key races', text:`${podStr}${podiums.length > 3 ? ' and more' : ''} — shows ability to perform tactically at key moments.${top3inBest > 0 ? ' Best results correlate with lower 1min/AVG ratio.' : ''}` });

  // Score comments table
  const isTTT = _profileRaceSource === 'wtrl';
  const scoreComments = rm ? [
    !isTTT && ['🥊', 'Punch / short-burst power', rm.scores.punch, avgWkg5 != null ? `Avg 5s = ${f1(avgWkg5)} W/kg (${f1(minv(wkg5vals))}–${f1(maxv(wkg5vals))})` : ''],
    ['🫁', 'VO₂ stability (2–5 min)', rm.scores.vo2, avgWkg300 != null ? `5min avg ${f2(avgWkg300)} W/kg (${f1(minv(wkg300vals))}–${f1(maxv(wkg300vals))})` : ''],
    ['🎯', 'Pacing / tactical judgement', rm.scores.pacing, `1min/AVG avg ${f2(avgPac)} — ${avgPac > 1.9 ? 'aggressive pattern' : avgPac > 1.6 ? 'moderate' : 'good pacing'}`],
    ['🔁', 'Repeatability', rm.scores.repeatability, avgRep != null ? `1min/2min ${f2(avgRep)} ± ${f2(stdRep)}` : 'insufficient data'],
    !isTTT && ['🏁', 'Late-race sprint', rm.scores.endSprint, 'proxy based on pacing and finishing positions'],
    ['💪', 'Fatigue resistance (20min)', rm.scores.fatigue, `Avg ${f2(avgWkg20)} W/kg, ${Math.round(dropPct)}% drop in hardest races`],
  ].filter(row => row && row[2] != null) : [];

  // Samlet profil
  const profileTexts = [];
  if (strengths.length > 0 && weaknesses.length > 0) {
    const mainStr = strengths[0].title.toLowerCase();
    const mainWeak = weaknesses[0].title.toLowerCase();
    profileTexts.push(`Strongest in ${mainStr}${strengths.length > 1 ? ` and ${strengths[1].title.toLowerCase()}` : ''}. Primary limitation is ${mainWeak} — ${weaknesses[0].text.split('.')[0].toLowerCase()}.`);
  } else if (strengths.length > 0) {
    profileTexts.push(`A well-rounded rider with a clear edge in ${strengths.map(s=>s.title.toLowerCase()).join(' and ')}.`);
  } else {
    profileTexts.push(`Balanced profile without extreme peaks or troughs — competitive across terrain types.`);
  }
  profileTexts.push(avgPac > 1.8
    ? 'Best results come in races where the rider avoids early full efforts and saves something for the tactical key moments.'
    : avgPac < 1.6
      ? 'Typically paces well and is dangerous in the final stretch when others are running out of legs.'
      : 'Pacing is moderate — gains available by holding back early and saving for the finale.');

  const recommendation = avgRep != null && avgRep > 1.20
    ? `Train repeated sprint capacity specifically (e.g. 3×3 min with 30s max at the end). Avoid going all-out on the first punch/climb — ${avgWkg300 ? `the 5min engine (${f2(avgWkg300)} W/kg)` : 'aerobic base'} is strong enough to stay on the wheel without going into the red.`
    : `Leverage the strong aerobic base to set a steady, high tempo — and save the sprint for the decisive moments.`;

  // ── HTML rendering ──
  const sectionTitle = (t) => `<div style="${B}font-size:0.7rem;font-weight:700;color:var(--text);letter-spacing:1px;margin:14px 0 6px">${t}</div>`;
  const dimText = `color:var(--text-dim);${B}font-size:0.65rem;line-height:1.7`;
  const tableStyle = `width:100%;border-collapse:collapse;${B}font-size:0.62rem;margin-bottom:8px`;
  const thStyle = `padding:5px 10px;text-align:left;border-bottom:2px solid var(--border);color:var(--text-dim);font-size:0.58rem;letter-spacing:1px`;

  let html = `<div style="${B}font-size:0.60rem;color:${n<5?'#ff9f43':n<10?'var(--accent)':'var(--accent3)'};margin-bottom:12px">
    ${n} races analysed · Weight: ${weightStr} · Period: ${fmtDate(firstTs)} – ${fmtDate(lastTs)}
  </div>`;

  // Trin 1a: AVG over tid
  html += sectionTitle('AVG W/kg over time');
  html += `<table style="${tableStyle}"><thead><tr>
    <th style="${thStyle}">Period</th>
    <th style="${thStyle};text-align:center">AVG</th>
    <th style="${thStyle};text-align:center">5min</th>
    <th style="${thStyle};text-align:center">20min</th>
  </tr></thead><tbody>${periodRows}</tbody></table>`;
  html += `<div style="${dimText};margin-bottom:10px">${trendText}</div>`;

  // Trin 1b: Repeatability
  if (avgRep != null) {
    html += sectionTitle('Repeatability — 1-min power spikes');
    html += `<div style="${dimText};margin-bottom:6px">The 1min/2min ratio — the closer to 1.0, the better the ability to sustain intensity after a spike.</div>`;
    html += `<table style="${tableStyle}"><tbody>
      <tr style="border-bottom:1px solid var(--border)"><td style="padding:4px 10px;color:var(--text-dim);font-size:0.60rem">Avg 1min/2min ratio</td><td style="padding:4px 10px;font-size:0.62rem;color:var(--accent)">${f2(avgRep)}</td></tr>
      ${bestRep ? `<tr style="border-bottom:1px solid var(--border)"><td style="padding:4px 10px;color:var(--text-dim);font-size:0.60rem">Best ratio</td><td style="padding:4px 10px;font-size:0.62rem;color:var(--accent3)">${f2(bestRep.ratio)} (${fmtDate(bestRep.r.event_date)})</td></tr>` : ''}
      ${worstRep ? `<tr style="border-bottom:1px solid var(--border)"><td style="padding:4px 10px;color:var(--text-dim);font-size:0.60rem">Worst ratio</td><td style="padding:4px 10px;font-size:0.62rem;color:var(--accent2)">${f2(worstRep.ratio)} (${fmtDate(worstRep.r.event_date)})</td></tr>` : ''}
      <tr><td style="padding:4px 10px;color:var(--text-dim);font-size:0.60rem">Std. dev. of ratio</td><td style="padding:4px 10px;font-size:0.62rem">${f2(stdRep)}</td></tr>
    </tbody></table>`;
    html += `<div style="${dimText};margin-bottom:10px">${repVurdering}</div>`;
  }

  // Trin 1c: Pacing proxy
  html += sectionTitle('Late-race sprint / pacing proxy');
  html += `<div style="${dimText};margin-bottom:6px">High 1min/AVG ratio = aggressive start, weaker finish. Low ratio = even intensity = better closing power.</div>`;
  html += `<table style="${tableStyle}"><tbody>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:4px 10px;color:var(--text-dim);font-size:0.60rem">Avg 1min/AVG ratio</td><td style="padding:4px 10px;font-size:0.62rem;color:var(--accent)">${f2(avgPac)}</td></tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:4px 10px;color:var(--text-dim);font-size:0.60rem">Best pacing</td><td style="padding:4px 10px;font-size:0.62rem;color:var(--accent3)">${f2(bestPac.ratio)} (${fmtDate(bestPac.r.event_date)})</td></tr>
    <tr style="border-bottom:1px solid var(--border)"><td style="padding:4px 10px;color:var(--text-dim);font-size:0.60rem">Most aggressive</td><td style="padding:4px 10px;font-size:0.62rem;color:var(--accent2)">${f2(worstPac.ratio)} (${fmtDate(worstPac.r.event_date)})</td></tr>
    <tr><td style="padding:4px 10px;color:var(--text-dim);font-size:0.60rem">Peak 1min recorded</td><td style="padding:4px 10px;font-size:0.62rem">${f1(highWkg60.wkg60)} W/kg (${fmtDate(highWkg60.event_date)}, AVG ${f2(highWkg60.avg_wkg)})</td></tr>
  </tbody></table>`;
  html += `<div style="${dimText};margin-bottom:10px">${pacingPattern}</div>`;

  // Trin 2: Styrker
  if (strengths.length > 0) {
    html += sectionTitle('✅ Strengths');
    strengths.forEach(s => {
      html += `<div style="margin-bottom:8px"><div style="${B}font-size:0.65rem;color:var(--accent3);font-weight:600;margin-bottom:2px">${s.title}</div><div style="${dimText}">${s.text}</div></div>`;
    });
  }

  // Trin 2: Svagheder
  if (weaknesses.length > 0) {
    html += sectionTitle('❌ Weaknesses');
    weaknesses.forEach(w => {
      html += `<div style="margin-bottom:8px"><div style="${B}font-size:0.65rem;color:var(--accent2);font-weight:600;margin-bottom:2px">${w.title}</div><div style="${dimText}">${w.text}</div></div>`;
    });
  }

  // Trin 3: Scoretabel
  if (scoreComments.length > 0) {
    html += sectionTitle('Numerical rating (1–10)');
    html += `<table style="${tableStyle}"><thead><tr>
      <th style="${thStyle}">Parameter</th>
      <th style="${thStyle};text-align:center">Score</th>
      <th style="${thStyle}">Note</th>
    </tr></thead><tbody>${scoreComments.map(([icon, label, score, comment]) => `
      <tr style="border-bottom:1px solid var(--border)">
        <td style="padding:5px 10px;${B}font-size:0.62rem">${icon} ${label}</td>
        <td style="padding:5px 10px;text-align:center;font-weight:700;font-size:0.75rem;color:${score>=7?'var(--accent3)':score>=5?'var(--accent)':'var(--accent2)'}">${score}</td>
        <td style="padding:5px 10px;${B}font-size:0.60rem;color:var(--text-dim)">${comment}</td>
      </tr>`).join('')}</tbody></table>`;
  }

  // Samlet profil
  html += sectionTitle('Overall profile');
  html += `<div style="${dimText};margin-bottom:6px">${profileTexts.join(' ')}</div>`;
  html += `<div style="${B}font-size:0.63rem;color:var(--accent);border-left:2px solid var(--accent);padding-left:10px;margin-top:8px">Recommendation: ${recommendation}</div>`;

  return html;
}

function _profileGenerateScoutReport(rm, raceSource) {
  if (!rm || rm.n < 3) return null;

  const sc = rm.scores;
  const n  = rm.n;

  const punch    = sc.punch         ?? 5;
  const vo2      = sc.vo2           ?? 5;
  const pacing   = sc.pacing        ?? 5;
  const repeat   = sc.repeatability ?? 5;
  const fatigue  = sc.fatigue       ?? 5;
  const endSpr   = sc.endSprint     ?? 5;

  const isExplosive  = punch   >= 7;
  const hasFinish    = endSpr  >= 7;
  const isEndurance  = fatigue >= 7 && vo2 >= 6;
  const isConsistent = fatigue >= 7 && repeat >= 7;
  const isTactical   = pacing  >= 7;
  const fades        = repeat  <= 4;
  const unstable     = fatigue <= 4;
  const aggressive   = pacing  <= 4;

  const parts = [];

  if (raceSource === 'ladder') {
    if (isExplosive && hasFinish)
      parts.push(`A natural closer — explosive enough to sprint or attack in the final kilometres and hold it. The team's last card.`);
    else if (isExplosive && !hasFinish)
      parts.push(`Good punch for creating gaps and disrupting the race, but less effective as a pure finisher. Better used as an attacker or lead-out.`);
    else if (isEndurance && isConsistent)
      parts.push(`The engine — stable power output and good aerobic capacity make this rider effective at setting tempo and protecting faster teammates throughout.`);
    else if (isConsistent && !isExplosive)
      parts.push(`Steady and reliable. Suited to a domestique role: controlling tempo, covering moves, and delivering teammates into position.`);
    else
      parts.push(`No dominant quality stands out — versatile enough to fill different roles but without a clear edge in any one.`);

    if (fades)         parts.push(`Fades after repeated hard efforts — shouldn't be relied on to cover multiple attacks in quick succession.`);
    else if (unstable) parts.push(`Variable power output can make pacing unpredictable across a race.`);

  } else if (raceSource === 'other') {
    if (isExplosive && hasFinish)
      parts.push(`Dangerous whenever the race comes together — punch and end-sprint ability make this rider a genuine threat in bunch finishes.`);
    else if (isExplosive && !hasFinish)
      parts.push(`Explosive enough to attack and create selection, but less effective in a pure bunch sprint. Better going early than waiting for the line.`);
    else if (isEndurance)
      parts.push(`Built for endurance — consistent 20-minute power and good aerobic capacity means the gap to the field grows on longer and hillier routes.`);
    else if (isTactical && isConsistent)
      parts.push(`A controlled, tactical racer who builds through events. Even pacing and good repeatability are assets in races that come down to the final kilometres.`);
    else
      parts.push(`Balanced without a dominant quality — competitive across different race types but unlikely to have a strong edge in any one discipline.`);

    if (aggressive) parts.push(`Tends to go hard early — effective when the race splits on the first climb, but risky when it comes back together.`);
    if (fades)      parts.push(`Loses effectiveness after multiple hard efforts — races with frequent attacks or repeated short climbs are less favourable.`);

  } else if (raceSource === 'zrl') {
    if (isExplosive && hasFinish)
      parts.push(`A finisher — explosive enough to close out a sprint in ZRL's typically compact bunch finishes.`);
    else if (isExplosive && !hasFinish)
      parts.push(`Good punch for attacking and disrupting, but less effective as a pure sprinter. Better suited to going early than contesting a sprint.`);
    else if (isEndurance && isConsistent)
      parts.push(`A strong engine in the ZRL format — consistent output and good aerobic capacity make this rider effective at driving tempo over the course of a season.`);
    else if (isConsistent && !isExplosive)
      parts.push(`Steady and reliable in ZRL. Unlikely to win solo but valuable for controlling tempo and delivering teammates in the team format.`);
    else
      parts.push(`No dominant quality in ZRL races — competitive without a clear strength or weakness.`);

    if (fades)         parts.push(`Loses punch after repeated efforts — ZRL's repeated sprint demands may expose this over a full season.`);
    else if (unstable) parts.push(`Inconsistent power output across ZRL races — form varies noticeably from race to race.`);

  } else if (raceSource === 'frr') {
    if (isExplosive && hasFinish)
      parts.push(`Well-suited to FRR's typically punchy, competitive format — combines finishing speed with the ability to make moves stick.`);
    else if (isExplosive && !hasFinish)
      parts.push(`Explosive and capable of attacking, but less effective in a final sprint. The right moves early can still deliver a result.`);
    else if (isEndurance)
      parts.push(`Built for endurance — consistent power over longer efforts is an asset in FRR events where the race is often decided on sustained climbs or prolonged tempo.`);
    else if (isTactical && isConsistent)
      parts.push(`Reads FRR races well — disciplined pacing and good repeatability make this rider a threat in events that come down to the final kilometres.`);
    else
      parts.push(`Balanced profile in FRR — no standout quality, but no clear weakness either.`);

    if (aggressive) parts.push(`Tends to go hard early — effective when the race splits but risky when it comes back together.`);
    if (fades)      parts.push(`Loses effectiveness after multiple hard efforts — FRR races with repeated attacks are less favourable.`);

  } else if (raceSource === 'wtrl') {
    // WTRL = Team Time Trial. Punch and sprint are irrelevant — consistent 20min power is what counts.
    if (isEndurance && isConsistent)
      parts.push(`A strong TTT engine — consistent 20-minute power and good aerobic capacity are exactly what counts in a team time trial. Helps set and hold a high collective pace without disrupting the group's rhythm.`);
    else if (isEndurance && !isConsistent)
      parts.push(`Good aerobic capacity for TTT efforts, but 20-minute output varies across races. Steadiness over the full effort is key in TTT — variability creates risk for the team's collective pace.`);
    else if (isConsistent && !isEndurance)
      parts.push(`Consistent and reliable across TTT efforts — doesn't disrupt the group's rhythm. Raw 20-minute power may be a limiting factor when setting pace at the front.`);
    else if (isTactical)
      parts.push(`Even-paced and disciplined — in TTT format, avoiding power spikes and holding a steady output is often more valuable than raw numbers.`);
    else
      parts.push(`Moderate TTT profile — neither the strongest engine nor the steadiest wheel. Most effective when the team's collective pace suits their natural output range.`);

    if (unstable) parts.push(`Variable 20-minute power is a liability in TTT — the team is only as fast as its least consistent rider.`);
    if (fades)    parts.push(`Drops off after sustained hard efforts — in TTT format this risks being shelled before the group reaches the finish.`);

  } else {
    if (isExplosive)
      parts.push(`Explosive profile that shows up across both formats — capable of a finishing sprint in team races and attacking in open events.`);
    else if (isEndurance && isConsistent)
      parts.push(`Strong endurance base with consistent output across both formats — a reliable performer whether racing for the team or individually.`);
    else if (isTactical)
      parts.push(`Disciplined and consistent. Reads races well and rarely burns matches unnecessarily — an asset in both team and individual formats.`);
    else
      parts.push(`No dominant strength across either format — versatile, but unlikely to be the decisive factor in either team or open races.`);

    if (isExplosive && !isConsistent)
      parts.push(`More effective in shorter, punchier races than in events where repeated hard efforts are required.`);
    else if (isEndurance && !isExplosive)
      parts.push(`Endurance is the stronger suit — likely more competitive in open races than in tactical, explosive team formats.`);

    if (fades) parts.push(`Limited repeatability is a recurring factor — best when the race is decided by one key effort rather than many.`);
  }

  return parts.join(' ');
}

function _profileRenderTable(races) {
  const tw = document.getElementById('profile-table-wrap');
  const sw = document.getElementById('profile-search-wrap');
  if (tw) tw.style.display = races.length ? 'block' : 'none';
  if (sw) sw.style.display = races.length ? 'block' : 'none';
  const q = (document.getElementById('profile-race-search')?.value || '').toLowerCase().trim();
  const filtered = q ? races.filter(r => (r.event_title || '').toLowerCase().includes(q)) : races;
  const sorted = [...filtered].sort((a,b) => {
    const av = a[_profileSortKey] ?? -Infinity;
    const bv = b[_profileSortKey] ?? -Infinity;
    return av < bv ? _profileSortDir : av > bv ? -_profileSortDir : 0;
  });
  const tbody = document.getElementById('profile-tbody');
  tbody.innerHTML = sorted.map(r => {
    const date = r.event_date
      ? new Date(r.event_date*1000).toLocaleDateString('da-DK',{day:'2-digit',month:'short',year:'numeric'})
      : '—';
    const title = (r.event_title||'').replace('Club Ladder // ', '');
    const td = (v) => `<td style="padding:9px 12px;border-bottom:1px solid rgba(31,42,64,0.6);text-align:right;font-family:'JetBrains Mono',monospace;font-weight:600;color:${_wkgColor(v)}">${v!=null&&v>0?v.toFixed(1):'<span style="color:#333d52">—</span>'}</td>`;
    return `<tr onmouseover="this.style.background='rgba(0,229,255,0.03)'" onmouseout="this.style.background=''">
      <td style="padding:9px 12px;border-bottom:1px solid rgba(31,42,64,0.6);font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:var(--text-dim)">${date}</td>
      <td style="padding:9px 12px;border-bottom:1px solid rgba(31,42,64,0.6);color:var(--text);max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.event_title}">${title}</td>
      <td style="padding:9px 12px;border-bottom:1px solid rgba(31,42,64,0.6);text-align:right;font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--accent3)">${(r.pos_in_cat||r.pos)?`${r.pos_in_cat||r.pos} <span style="font-size:0.65rem;color:var(--text-dim);font-weight:400">${(r.category&&r.category!=='SEE LADDER SITE')?r.category:'—'}</span>`:'—'}</td>
      <td style="padding:9px 12px;border-bottom:1px solid rgba(31,42,64,0.6);text-align:right;color:var(--text-dim)">${r.weight?r.weight.toFixed(1):'—'}</td>
      ${td(r.avg_wkg)}${td(r.wkg5)}${td(r.wkg15)}${td(r.wkg30)}${td(r.wkg60)}${td(r.wkg120)}${td(r.wkg300)}${td(r.wkg1200)}
    </tr>`;
  }).join('');
}

function _wkgColor(v) {
  if (!v||v<=0) return '#333d52';
  if (v>=5) return 'var(--red)';
  if (v>=4) return 'var(--accent2)';
  if (v>=3) return '#ffcc00';
  if (v>=2) return 'var(--accent3)';
  return 'var(--text-dim)';
}

function profileSort(key) {
  if (_profileSortKey===key) _profileSortDir*=-1;
  else { _profileSortKey=key; _profileSortDir=-1; }
  _profileRenderTable(_profileGetRaces());
}

// ── RIDER PROFILE: navnesøgning ──
function initFixtures() {
  if (typeof LEQP_FIXTURES === 'undefined' || !LEQP_FIXTURES.length) {
    // Ingen data — grå fixtures tab ud
    const tab = document.getElementById('fixtures-tab');
    if (tab) { tab.classList.add('inactive'); tab.title = 'No fixture data available'; }
    return;
  }

  // Filtrer kun fremtidige kampe (fra og med i dag)
  const today = new Date();
  today.setHours(0,0,0,0);
  const upcoming = LEQP_FIXTURES.filter(f => {
    const d = new Date(f.date);
    return d >= today;
  }).sort((a,b) => new Date(a.date+' '+a.time) - new Date(b.date+' '+b.time));

  if (!upcoming.length) {
    const tab = document.getElementById('fixtures-tab');
    if (tab) { tab.classList.add('inactive'); tab.title = 'No upcoming fixtures'; }
    return;
  }

  // Byg ticker
  const tickerEl = document.getElementById('leqp-ticker');
  const wrapEl = document.getElementById('leqp-ticker-wrap');
  if (tickerEl && wrapEl) {
    const items = upcoming.map(f => {
      const d = new Date(f.date);
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const dateStr = days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()];
      return `<span class="fixtures-ticker-item">` +
        `<span class="fx-date">${dateStr} ${f.time} UTC</span> ` +
        `<span class="fx-teams">${f.home} vs ${f.away}</span> ` +
        `<span class="fx-sep">·</span> ` +
        `<span class="fx-route">${f.route}</span>` +
        `</span><span class="fixtures-ticker-item" style="color:var(--border)">◆</span>`;
    }).join('');
    // Dublér for seamless loop
    tickerEl.innerHTML = items + items;
    wrapEl.style.display = 'flex';

    // Juster animation hastighed efter antal items
    const duration = Math.max(20, upcoming.length * 8);
    tickerEl.style.animationDuration = duration + 's';
  }

  // Byg fixtures panel liste
  _renderFixturesList(upcoming);
}

function _renderFixturesList(fixtures) {
  const el = document.getElementById('fixtures-list');
  if (!el) return;

  // Gruppér efter dato
  const byDate = {};
  fixtures.forEach(f => {
    if (!byDate[f.date]) byDate[f.date] = [];
    byDate[f.date].push(f);
  });

  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  let html = `<table style="width:100%;border-collapse:collapse;table-layout:fixed">
    <colgroup>
      <col style="width:80px">
      <col style="width:22%">
      <col style="width:30px">
      <col style="width:22%">
      <col>
      <col style="width:15%">
    </colgroup>
    <tr style="font-family:'JetBrains Mono',monospace;font-size:0.58rem;letter-spacing:2px;color:var(--text-dim)">
      <th style="text-align:left;padding:6px 8px;border-bottom:1px solid var(--border)">TIME UTC</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:1px solid var(--border)">HOME</th>
      <th style="border-bottom:1px solid var(--border)"></th>
      <th style="text-align:left;padding:6px 8px;border-bottom:1px solid var(--border)">AWAY</th>
      <th style="text-align:left;padding:6px 8px;border-bottom:1px solid var(--border)">ROUTE</th>
    </tr>`;

  for (const date of Object.keys(byDate).sort()) {
    const d = new Date(date);
    const dateLabel = days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()];
    html += `<tr><td colspan="5" style="padding:14px 8px 4px;font-family:'JetBrains Mono',monospace;font-size:0.72rem;font-weight:700;color:var(--accent);letter-spacing:2px;text-transform:uppercase">${dateLabel}</td></tr>`;

    byDate[date].forEach(f => {
      const isLeqpHome = f.home.startsWith('LEQP');
      const isLeqpAway = f.away.startsWith('LEQP');
      const homeStyle = isLeqpHome ? 'color:var(--accent);font-weight:600' : 'color:var(--text)';
      const awayStyle = isLeqpAway ? 'color:var(--accent);font-weight:600' : 'color:var(--text)';
      html += `<tr style="border-bottom:1px solid rgba(255,255,255,0.04);font-family:'JetBrains Mono',monospace;font-size:0.72rem">
        <td style="padding:8px 8px;color:var(--accent2)">${f.time}</td>
        <td style="padding:8px 8px;${homeStyle};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.home}</td>
        <td style="padding:8px 8px;color:var(--text-dim);text-align:center;font-size:0.6rem">vs</td>
        <td style="padding:8px 8px;${awayStyle};overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.away}</td>
        <td style="padding:8px 8px;color:var(--text-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.route || '—'}</td>
      </tr>`;
    });
  }
  html += '</table>';

  el.innerHTML = html || '<div style="color:var(--text-dim);font-family:JetBrains Mono,monospace;font-size:0.8rem">No upcoming fixtures.</div>';
}

function _profileBuildLeqpBtns() {
  const wrap = document.getElementById('leqp-rider-btns');
  if (!wrap) return;
  const riders = [];
  const seen = new Set();
  // Brug LEQP_MEMBERS (alle aktive klubryttere) hvis tilgængelig, ellers MY_TEAMS
  if (typeof LEQP_MEMBERS !== 'undefined' && LEQP_MEMBERS.length) {
    for (const m of LEQP_MEMBERS) {
      if (!m || !m.name || !m.zwift_id) continue;
      const zid = String(m.zwift_id);
      if (seen.has(zid)) continue;
      seen.add(zid);
      riders.push({ name: m.name, id: zid });
    }
  } else {
    for (const team of Object.values(typeof MY_TEAMS !== 'undefined' ? MY_TEAMS : {})) {
      for (const r of (Array.isArray(team.riders) ? team.riders : [])) {
        if (!r || !r.name || !r.zwift_id) continue;
        const zid = String(r.zwift_id);
        if (seen.has(zid)) continue;
        seen.add(zid);
        riders.push({ name: r.name, id: zid });
      }
    }
  }
  riders.sort((a,b) => a.name.localeCompare(b.name));
  wrap.innerHTML = riders.map(r =>
    `<button onclick="profileQuickLoad('${r.id}','${r.name.replace(/'/g, "\\'")}')"
      style="font-family:'JetBrains Mono',monospace;font-size:0.65rem;padding:5px 12px;
      background:var(--surface2);border:1px solid var(--border);color:var(--text-dim);
      cursor:pointer;letter-spacing:1px;transition:all 0.15s"
      onmouseover="this.style.borderColor='var(--accent3)';this.style.color='var(--accent3)'"
      onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-dim)'"
      >${r.name}</button>`
  ).join('');
}

function profileQuickLoad(id, name) {
  document.getElementById('profile-zwift-id').value = id;
  document.getElementById('profile-name-search').value = name;
  document.getElementById('profile-name-results').style.display = 'none';
  loadRiderProfile();
}

function profileNameSearch(query) {
  const wrap = document.getElementById('profile-name-results');
  if (!query || query.length < 2) { wrap.style.display = 'none'; return; }
  const q = query.toLowerCase();
  const hits = [];
  const seenId = new Set();

  const myTeamsObj  = typeof MY_TEAMS !== 'undefined' ? MY_TEAMS : {};
  const opponentObj = typeof OPPONENT_LIBRARY !== 'undefined' ? OPPONENT_LIBRARY : {};

  // MY_TEAMS first — use zwift_id (not id which is just a sequence number)
  for (const team of Object.values(myTeamsObj)) {
    for (const r of (Array.isArray(team.riders) ? team.riders : [])) {
      if (!r || !r.name || !r.name.toLowerCase().includes(q)) continue;
      const rid = r.zwift_id ? String(r.zwift_id) : null;
      if (rid && seenId.has(rid)) continue;
      if (rid) seenId.add(rid);
      seenId.add('name:' + r.name.toLowerCase());
      hits.push({ name: r.name, id: rid, team: team.name || '' });
    }
  }
  // Opponents — disabled for now, re-enable when opponent search is ready
  // for (const team of Object.values(opponentObj)) {
  //   for (const r of (Array.isArray(team.riders) ? team.riders : [])) {
  //     if (!r || !r.name || !r.name.toLowerCase().includes(q)) continue;
  //     const rid = r.id ? String(r.id) : null;
  //     if (seenId.has('name:' + r.name.toLowerCase())) continue;
  //     if (rid && seenId.has(rid)) continue;
  //     if (rid) seenId.add(rid);
  //     seenId.add('name:' + r.name.toLowerCase());
  //     hits.push({ name: r.name, id: rid, team: team.name || '' });
  //   }
  // }

  if (!hits.length) { wrap.style.display = 'none'; return; }
  window._profileHits = hits;
  wrap.innerHTML = hits.slice(0, 20).map((h, i) =>
    `<div onclick="profileSelectRider(${i})"
      style="padding:8px 14px;cursor:pointer;border-bottom:1px solid var(--border);font-family:'JetBrains Mono',monospace;font-size:0.78rem;display:flex;align-items:center;gap:8px"
      onmouseover="this.style.background='var(--surface2)'" onmouseout="this.style.background=''">
      <span style="color:var(--text)">${h.name}</span>
      <span style="color:var(--text-dim);font-size:0.65rem">${h.team}</span>
      ${h.id ? `<span style="color:var(--accent);font-size:0.65rem;margin-left:auto">#${h.id}</span>` : '<span style="color:#333d52;font-size:0.6rem;margin-left:auto">no ID</span>'}
    </div>`
  ).join('');
  wrap.style.display = 'block';
}

function profileSelectRider(idx) {
  const h = (window._profileHits || [])[idx];
  if (!h) return;
  document.getElementById('profile-name-results').style.display = 'none';
  document.getElementById('profile-name-search').value = h.name;
  if (h.id) {
    document.getElementById('profile-zwift-id').value = h.id;
    loadRiderProfile();
  } else {
    document.getElementById('profile-status').style.color = 'var(--accent2)';
    document.getElementById('profile-status').textContent = 'No Zwift ID found for this rider — enter manually.';
  }
}
function profileClear() {
  document.getElementById('profile-name-search').value = '';
  document.getElementById('profile-zwift-id').value = '';
  document.getElementById('profile-name-results').style.display = 'none';
  document.getElementById('profile-status').textContent = '';
  document.getElementById('profile-header').style.display = 'none';
  document.getElementById('profile-race-count').innerHTML = '';
  document.getElementById('profile-tbody').innerHTML = '';
  const tw = document.getElementById('profile-table-wrap');
  if (tw) tw.style.display = 'none';
  const sw = document.getElementById('profile-search-wrap');
  if (sw) sw.style.display = 'none';
  const rs = document.getElementById('profile-race-search');
  if (rs) rs.value = '';
  const cw = document.getElementById('profile-chart-wrap');
  if (cw) cw.style.display = 'none';
  if (_profileChart) { _profileChart.destroy(); _profileChart = null; }
  const raEl = document.getElementById('profile-race-analysis');
  if (raEl) { raEl.style.display = 'none'; raEl.innerHTML = ''; }
  const daWrap = document.getElementById('profile-detailed-analysis-wrap');
  if (daWrap) daWrap.style.display = 'none';
  const daEl = document.getElementById('profile-detailed-analysis');
  if (daEl) { daEl.style.display = 'none'; daEl.innerHTML = ''; }
  const tpWrap2 = document.getElementById('profile-training-plan-wrap');
  if (tpWrap2) tpWrap2.style.display = 'none';
  const tpOut2 = document.getElementById('profile-training-plan-output');
  if (tpOut2) { tpOut2.style.display = 'none'; tpOut2.innerHTML = ''; }
  const tpBtn2 = document.getElementById('profile-training-start-btn');
  if (tpBtn2) tpBtn2.style.display = '';
  const ccWrap = document.getElementById('profile-cross-comparison-wrap');
  if (ccWrap) ccWrap.style.display = 'none';
  const ccEl = document.getElementById('profile-cross-comparison');
  if (ccEl) ccEl.innerHTML = '';
  _profileRaces = [];
  _profileOtherRaces = [];
  _profileZrlRaces = [];
  _profileFrrRaces = [];
  _profileEcroRaces = [];
  _profileWtrlRaces = [];
  _profileRaceSource = 'combined';
  _profileName = '';
  _profileId = null;
  _profileUpdateSourceTabs();
  _profilePeriod = 3;
  document.querySelectorAll('.profile-period-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.p) === 3);
  });
  window._profileHits = [];
}
document.addEventListener('click', function(e) {
  const wrap = document.getElementById('profile-name-results');
  if (wrap && !wrap.contains(e.target) && e.target.id !== 'profile-name-search') wrap.style.display = 'none';
});

// ── RIDER PROFILE: power curve ──
let _profileChart = null;
let _profilePeriod = 3;

function profileSetPeriod(months) {
  _profilePeriod = months;
  document.querySelectorAll('.profile-period-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.p) === months);
  });
  _profileRenderChart(_profileRaces);
}

function _profileRenderChart(races) {
  let filtered = races;
  if (_profilePeriod > 0) {
    const cutoff = Date.now() / 1000 - _profilePeriod * 30.5 * 24 * 3600;
    filtered = races.filter(r => (r.event_date || 0) >= cutoff);
  }

  const chartWrap = document.getElementById('profile-chart-wrap');
  let noDataMsg = document.getElementById('profile-chart-nodata');
  if (!noDataMsg) {
    noDataMsg = document.createElement('div');
    noDataMsg.id = 'profile-chart-nodata';
    noDataMsg.style.cssText = 'font-family:JetBrains Mono,monospace;font-size:0.75rem;color:var(--text-dim);text-align:center;padding:24px 0;display:none';
    noDataMsg.textContent = '';
    chartWrap.appendChild(noDataMsg);
  }
  const _srcLabelChart = {ladder:'Ladder', zrl:'ZRL', frr:'FRR', ecro:'ECRO', wtrl:'WTRL', other:'Other', combined:'All Races'}[_profileRaceSource] || 'Ladder';
  noDataMsg.textContent = `No ${_srcLabelChart} races in the selected period`;
  if (filtered.length === 0) {
    if (_profileChart) { _profileChart.destroy(); _profileChart = null; }
    document.getElementById('profile-chart').style.display = 'none';
    noDataMsg.style.display = 'block';
    chartWrap.style.display = 'block';
    return;
  }
  document.getElementById('profile-chart').style.display = 'block';
  noDataMsg.style.display = 'none';

  const labels = ['5s','15s','30s','1min','2min','5min','20min'];
  const keys   = ['wkg5','wkg15','wkg30','wkg60','wkg120','wkg300','wkg1200'];
  const best = keys.map(k => { const v = Math.max(0,...filtered.map(r=>r[k]||0)); return v>0?+v.toFixed(2):null; });
  const avg  = keys.map(k => { const v=filtered.map(r=>r[k]||0).filter(x=>x>0); return v.length?+(v.reduce((a,b)=>a+b)/v.length).toFixed(2):null; });
  chartWrap.style.display = 'block';
  const ctx = document.getElementById('profile-chart').getContext('2d');
  if (_profileChart) _profileChart.destroy();
  _profileChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [
      { label:'Best W/kg', data:best, borderColor:'#00e5ff', backgroundColor:'rgba(0,229,255,0.08)', borderWidth:2, pointRadius:4, fill:true, tension:0.3 },
      { label:'Average W/kg', data:avg, borderColor:'#ff6b35', backgroundColor:'transparent', borderWidth:1.5, borderDash:[4,3], pointRadius:3, fill:false, tension:0.3 }
    ]},
    options: {
      responsive:true,
      plugins: {
        legend:{ labels:{ color:'#6b7a99', font:{family:'JetBrains Mono',size:11} } },
        tooltip:{ callbacks:{ label: c => ` ${c.dataset.label}: ${c.parsed.y?.toFixed(2)} W/kg` } }
      },
      scales: {
        x:{ ticks:{color:'#6b7a99',font:{family:'JetBrains Mono',size:10}}, grid:{color:'#1f2a40'} },
        y:{ ticks:{color:'#6b7a99',font:{family:'JetBrains Mono',size:10},callback:v=>v.toFixed(1)}, grid:{color:'#1f2a40'}, beginAtZero:false }
      }
    }
  });
}
