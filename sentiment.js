let table_ag
let table_b
let table_be
let table_dl
let table_es
let table_jb
let table_kp
let table_m5
let table_nm
let table_sg
let table_ts

let slider;

function preload() {
    table_ag = loadTable('csv/arianagrande.csv', 'csv', 'header');
    table_b = loadTable('csv/beyonce.csv', 'csv', 'header');
    table_be = loadTable('csv/billieeilish.csv', 'csv', 'header');
    table_dl = loadTable('csv/dualipa.csv', 'csv', 'header');
    table_es = loadTable('csv/edsheeran.csv', 'csv', 'header');
    table_jb = loadTable('csv/justinbieber.csv', 'csv', 'header');
    table_kp = loadTable('csv/katyperry.csv', 'csv', 'header');
    table_m5 = loadTable('csv/maroon5.csv', 'csv', 'header');
    table_nm = loadTable('csv/nickiminaj.csv', 'csv', 'header');
    table_sg = loadTable('csv/selenagomez.csv', 'csv', 'header');
    table_ts = loadTable('csv/taylorswift.csv', 'csv', 'header');


}

function setup() {
    let cnv = createCanvas(800, 120);
    cnv.parent("mySketch");


    sel = createSelect();
    sel.position(0, 1630)
    sel.option('arianagrande')
    sel.option('beyonce')
    sel.option('billieeilish')
    sel.option('dualipa')
    sel.option('edsheeran')
    sel.option('justinbieber')
    sel.option('katyperry')
    sel.option('maroon5')
    sel.option('nickiminaj')
    sel.option('selenagomez')
    sel.option('taylorswift')
    sel.changed(allArtists)


    slider = createSlider(0, 152, 0, 1);
    slider.position(0, 1750);
    slider.style('width', '800px');

}

function draw() {
    allArtists();
}

// all artists gooo
function allArtists() {
    let artist = sel.value();

    let artists = {
        arianagrande: table_ag,
        beyonce: table_b,
        billieeilish: table_be,
        dualipa: table_dl,
        edsheeran: table_es,
        justinbieber: table_jb,
        katyperry: table_kp,
        maroon5: table_m5,
        nickiminaj: table_nm,
        selenagomez: table_sg,
        taylorswift: table_ts
    }

    displayArtist(artists[artist])

}


function displayArtist(artist) {
    val = slider.value();
    displaySong(artist.getRow(val).arr);
}

function displaySong(song) {
    let artistName = song[0]
    let songName = song[1]
    background(getColor(song));
    textFont('Georgia')
    textAlign(LEFT, TOP)
    textSize(20)
    fill('white')
    text(artistName, 10, 20)
    textSize(40)
    text(songName, 10, 50);

}


function getColor(song) {

    let songSentiment = +song[11]
    let percent = map(songSentiment, 0, 1, 0, 255);
    if (song[10] == 'Positive') {
        let c1 = color(255, 0, 0);
        let c2 = color(100, 0, 0);
        col = lerpColor(c1, c2, percent);
    } else if (song[10] == 'Negative') {
        let c1 = color(0, 0, 255)
        let c2 = color(0, 0, 100)
        col = lerpColor(c1, c2, percent);
    } else {
        col = (0)
    }

    return col;
}