// ADD PROJECTS BOXES####
const pel = document.getElementById("projects");
pel.style.display = "grid";
pel.style.gridTemplateColumns = "1fr 1fr 1fr";

function add_project(photo_url, title, description, proj_url){
    let new_el = `<a href = ${proj_url} class = "link_to_project"><div class = "project"><h3 class = "proj_title">${title}</h3><img src = ${photo_url} class = "proj_photo"><div class = "proj_txt">${description}</div></div></a>`;
    pel.innerHTML += new_el;
}

add_project("./data/pexels-mali-142497.jpg", "Municipality- based forest fragmentation", "<p>I analyzed forest fragmentation change in towns in Massachusetts between 2006 and 2016 based on bears' home range. I applyed local Moran's I to interval metrices.</p>", "https://github.com/naoyamorishita/main/blob/main/fragmentationGainIntensityAnalysisPerMunicipalities.ipynb")
add_project("./data/pexels-setengah-lima-sore-1061582751-30733227.jpg", "New method to identify irrigation gain", "<p>I applied interval variable metrices and TOC curve to Normalized Difference Moisture Index (NDMI) to identify irrigatino gains in Bahia, Brazil.</p>", "https://github.com/naoyamorishita/main/blob/main/irrigationRDN.ipynb")
add_project("./data/pexels-not-silly-as-cool-2151921349-32063041.jpg", "Nightlight research in R", "<p>I analyzed relationships between public housing presence, night light radiance, and other variables in R.</p>", "https://github.com/naoyamorishita/nightlight2");
// Set Properties====
for (const el of document.getElementsByClassName("project")){
    el.style.padding = "0.5rem"
    el.style.margin = "0.5rem"
    el.style.outline = "solid"
    el.style.outlineColor = "#73AABF"
    el.style.height = "30rem"
    
}

for (const el of document.getElementsByClassName("proj_title")){
    el.style.padding = "1rem"
}

for (const el of document.getElementsByClassName("proj_photo")){
    el.style.width = "50%"
    el.style.padding = "1rem"
    el.style.display = "block"
    el.style.margin = "auto"
}

for (const el of document.getElementsByClassName("proj_txt")){
    el.style.padding = "0.5rem"
    el.firstChild.style.textDecorationLine = "none"
}

