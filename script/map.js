/*
This script will implement a map that tells my personal history using a leaflet.
The map should: 
- Have a map in center/ middle (set by the CSS and mobile phones TBD).
- Have points data showing where I was, when it was, and what I did.
- Have a background map which should be loaded lightly and not too noisy.
- Have buttons that diplay previous/ next location 

Note: This PROTOTYPE is V1 and there are many restrictions (which you may find when you are exploring)
    - The map is only optimized for PC.
    - Only previous/ next points are implemented and therefore the GUI is poor.
    - You cannot turn off the popups by default loading 
    - and more ;(
*/

// CREATE POINTS LAYER####
class MyPoints{
    constructor(){
        this.layer = {};
        this.years = [];
        this.year_idx = 0;
    }

    // Find Point by the Start Year=====
    find_item_by_year(yr){
        let ks = Object.keys(this.layer);
        // Add 0 to the tail to return when the year is missing----
        ks.push(0);
        // Search the layer by year from the head----
        for (const k of ks){
            if (k != 0){
                let cur_item_yr = this.layer[k]["year_start"];
                if (cur_item_yr === yr){
                    return this.layer[k];
                }
            }else{
                return NaN;
            }
        }
    }

    // Add A Point to the Map====
    add_point_to_map(y){
        // Find the point by year----
        let cur_layer = find_item_by_year(y);
        let sorted = this.years.sort();
        // Define a popup and add the point and popup with default visible----
        let popup = `<b>${cur_layer.title}</b><br><i>${cur_layer.year_start}~ ${cur_layer.year_end}</i><br>${cur_layer.description}`;
        let pt = L.marker(cur_layer["geometry"],
            {"alt": cur_layer.title}
        ).addTo(map)
        .bindPopup(popup, {
            autoClose: false
        })
        .openPopup();
        
        // Pan map to the point----
        let center = this.find_item_by_year(sorted[this.year_idx]).geometry;

        map.panTo(new L.LatLng(center[0], center[1]));
    }

    // Use the Previous Function to Add ALL Points with the Zooming to the First Point====
    add_all_points_to_map(){
        let sorted = this.years.sort();

        for (const y of sorted){
            this.add_point_to_map(y);

        let center = this.find_item_by_year(sorted[this.year_idx]).geometry;

        map.panTo(new L.LatLng(center[0], center[1]));

    }
}

    // Move to the Next when the Buton is Pressed====
    /*
        The below two methods are implemented by <button ... onclick = "Class.method()"> in the HTML
    */
    move_next(){
        // Move the index to the next year---
        this.year_idx = this.year_idx + 1;
        let sorted = this.years.sort()

        // Move the index to the start if there is no more record to the last----
        if (this.year_idx >= this.years.length){
            this.year_idx = 0;
        }

        // Pan to the center----
        let new_center = this.find_item_by_year(sorted[this.year_idx]).geometry;
        map.panTo(new L.LatLng(new_center[0], new_center[1]));

    }

    // Move to the Previous=====
    move_prev(){
        // Move the index to the previous year----
        this.year_idx = this.year_idx - 1;
        let sorted = this.years.sort();

        // Move the index to the end if there is no more record to the head----
        if (this.year_idx < 0){
            this.year_idx = this.years.length - 1;
        }

        // Pan to the center----
        let new_center = this.find_item_by_year(sorted[this.year_idx]).geometry;

        map.panTo(new L.LatLng(new_center[0], new_center[1]));


    }

}

// DEFINE CLASS FOR EACH POINT####
class MyPoint{
    // Define Attributes====
    constructor(title, year_start, year_end, description,geometry){
        this.title = title;
        this.year_start = year_start;
        this.year_end = year_end;
        this.description = description;
        this.geometry = geometry;
        this.record = {
            "title": this.title,
            "year_start": this.year_start,
            "year_end": this.year_end,
            "description": this.description,
            "geometry": this.geometry
        }
    }

    // Add Some Attributes to the GeoJSON and the Year List of the Layer Class====
    add_to_gjson_and_yr_list(gjson, l){
        gjson[this.title] = this.record;
        l.push(this.year_start)
    }
}

// 
function find_item_by_year(yr){
    let ks = Object.keys(gjson_object);
    ks.push(0);
    for (const k of ks){
        if (k != 0){
            let cur_item_yr = gjson_object[k]["year_start"];

            if (cur_item_yr === yr){
                return gjson_object[k];
            }
        }else{
            return NaN;
        }
    }
}

// INITIATE THE LAYER####
let ptlayer = new MyPoints();
let gjson_object = ptlayer.layer;
let year_array = ptlayer.years;

// ADD RECORDS####
let nagoya = new MyPoint("Nagoya", 2000, 2000, "This is where I was born, and also this is where my grand parents live. I learned how interesting adventures would be from my grandfather.", [35.182305011740986, 136.906228586709]).add_to_gjson_and_yr_list(gjson_object, year_array);
let yokohama = new MyPoint("Yokohama", 2001, 2025, "This is where I have grown up. I liked swimming and kendo (a Japanese marshal art with swords) here when I was a kid.", [35.450483731146456, 139.63420623909877]).add_to_gjson_and_yr_list(gjson_object, year_array);
let sagami = new MyPoint("Aoyama Gakuin University", 2018, 2022, "In the bacheler's program, I majored in international development and with focusing on Southeeast Asia. I mainly learned about theoretical aspects of the ID and environmental issues.", [35.567077498125414, 139.4028526458497]).add_to_gjson_and_yr_list(gjson_object, year_array);
let bangkok = new MyPoint("Bangkok", 2019, 2019, "I studied at Thammasat University in 2019. I did not only study politics, culture, and economy in Southeast Asia and China, but also conducted a fieldwork about renewable energy. Plus, I travelled a lot using buses and trains!!", [13.75697327444309, 100.48970875375599]).add_to_gjson_and_yr_list(gjson_object, year_array);
let uplb = new MyPoint("UPLB & Lawaguin", 2020, 2020, "This is where volunteered to teach environmental issues to kids in a kidnergarten, in a collaboration with AIESEC in UPLB. I stayed there for 6 weeks, and conducted community outreach about environmental educatiof waste issues.", [14.16530103331443, 121.24017385396598]).add_to_gjson_and_yr_list(gjson_object, year_array);
let worcester = new MyPoint("Clark University", 2022, 2024, "My experience there could never be described in a few sentences, but I mainly studied GIS for environmental conservations and did lots of projects with students and professors. My master's thesis is about relationships between forest structures in MA and bear sighting locations.", [42.25215439231291, -71.82453810298642]).add_to_gjson_and_yr_list(gjson_object, year_array);
let tokyo = new MyPoint("Kokusai Kogyo", 2024, "Present", "As an international consultant here, I am currently working for an experiment of GIS data sharing methods in developing countries!", [35.696357861893084, 139.68929280645764]).add_to_gjson_and_yr_list(gjson_object, year_array);

let sorted_array = year_array.sort();

// ADD THE POINT DATA TO THE BACKGROUND####
// Set Up a Background & the Center====
let initial_location = ptlayer.find_item_by_year(year_array[ptlayer.year_idx]);

let white = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

let sat = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let map = L.map("map").setView(initial_location["geometry"], 12, layers = [white, sat]);

// Let Users Decide Layers Shown but Set the White Layer as Default====
white.addTo(map);
L.control.layers({
    "Carto": white,
    "Satellite Imagery": sat
}).addTo(map);

// Add All Points====
ptlayer.add_all_points_to_map();