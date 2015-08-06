var i,j,h,h2;
var yeuxX,yeuxY,chouetteX,chouetteY;
var temps,temps2;
var ctx;
var canvas = document.querySelector("#canvas");
var W,H;
var keys = [];
var imgChercheur = new Image();
imgChercheur.src = "css/main/chercheur.png";
var chercheurH = 44;
var chercheurW = 33;
var chercheurX;
var chercheurY;
var imgJoueur1 = new Image();
imgJoueur1.src = "css/main/joueur1.png";
var joueur1H = 45;
var joueur1W = 33;
var joueur1X;
var joueur1Y;
var imgHalo = new Image();
imgHalo.src = "css/main/halo.png";
var haloH = 1064;
var haloW = 1000;
var imgBuisson = new Image();
var buissonW = 116;
var buissonH = 82;
var buissons = [[60,80,"a"],[200,93,"b"],[135,209,"a"],[350,207,"a"],[350,307,"a"],[391,308,"b"],[456,307,"c"],[40,440,"a"],[111,438,"c"],[35,480,"a"],[120,480,"b"],[360,475,"c"]];
var imgYeux = new Image();
imgYeux.src = "css/main/yeux.gif";
var imgChouette = new Image();

function rnd(max){
    return Math.floor(Math.floor(Math.random()*max));
}

function draw(i) {
    for (j = 0; j < buissons.length; j++){
        if (i == buissons[j][1] - buissonH / 2){
            imgBuisson.src = "css/main/buisson" + buissons[j][2] + ".png";
            ctx.drawImage(imgBuisson,buissons[j][0] - buissonW / 2,buissons[j][1] - buissonH);
        }
    }
    if (i == joueur1Y - joueur1H){
        ctx.drawImage(imgJoueur1,joueur1X - joueur1W / 2,i);
    }
    if (i == chercheurY - chercheurH){
        ctx.drawImage(imgChercheur,chercheurX - chercheurW / 2,i);
    }
}

function start(){
    h = rnd(100);
    h2 = rnd(100);
    W = canvas.width;
    ctx = canvas.getContext("2d");
    H = canvas.height;
    chercheurX = W / 2;
    chercheurY = H / 2;
    joueur1X = W / 4;
    joueur1Y = H / 4;
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            keys[event.keyCode] = 1;
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            keys[event.keyCode] = 0;
        }
    );
    var f = function(t) {
        paint(t);
        window.requestAnimationFrame(f);
    };
    window.requestAnimationFrame(f);
}

function paint(t) {
    ctx.fillStyle = "rgb(30,30,70)";
    ctx.fillRect(0,0,W,H);
    if (1 == keys[39] &&  chercheurX < W) chercheurX += 2;
    if (1 == keys[37] &&  chercheurX > 0) chercheurX -= 2;
    if (1 == keys[40] &&  chercheurY < H) chercheurY += 2;
    if (1 == keys[38] &&  chercheurY > chercheurH) chercheurY -= 2;
    if (1 == keys[99] &&  joueur1X < W) joueur1X += 3;
    if (1 == keys[97] &&  joueur1X > 0) joueur1X -= 3;
    if (1 == keys[98] &&  joueur1Y < H) joueur1Y += 3;
    if (1 == keys[101] &&  joueur1Y > joueur1H) joueur1Y -= 3;
    for (i = -40; i < H; i++){
        draw(i);
    }
    if (h > 0) h = rnd(1000);
    if (h < 0) {
        if (h == -1) imgYeux.src = "css/main/yeux.gif";
        if (t - temps > 250){
            h -= 1;
            temps = t;
            if (h == -2) imgYeux.src = "css/main/yeux2.gif";
            if (h == -3) imgYeux.src = "css/main/yeux3.gif";
            if (h == -4) h = 150;
        }
        ctx.drawImage(imgYeux,yeuxX,yeuxY); 
    }
    if (h == 0){
        h = -1;
        temps = t;
        yeuxX = rnd(W);
        yeuxY = rnd(H);
    }

    if (h2 > 0) h2 = rnd(2000);
    if (h2 < 0) {
        if (h2 == -1) imgChouette.src = "css/main/chouette1.png";
        chouetteX += 2;
        if (t - temps2 > 200){
            h2 -= 1;
            temps2 = t;
            if (h2 == -2) imgChouette.src = "css/main/chouette2.png";
            if (h2 == -3) imgChouette.src = "css/main/chouette3.png";
            if (h2 == -4) imgChouette.src = "css/main/chouette2.png";
            if (h2 == -5) h2 = -1;
            if (chouetteX > W) h2 = 150;
        }
        ctx.drawImage(imgChouette,chouetteX,chouetteY); 
    }
    if (h2 == 0){
        h2 = -1;
        temps2 = t;
        chouetteX = 0;
        chouetteY = rnd(H / 2);
    }

    ctx.drawImage(imgHalo, chercheurX - haloW / 2 , chercheurY - haloH / 2);
}

start();
