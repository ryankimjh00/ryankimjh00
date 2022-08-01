const sparks = 50;
const speed = 40;
const bangs = 5;
const colours = new Array('cornflowerblue');

const intensity = [];
const Xpos = [];
const Ypos = [];
const dX = [];
const dY = [];
const stars = [];
const decay = [];
const timers = [];
let newwide = 800;
let newhigh = 600;
let newleft = sdown = 0;
let count = 0;

function addLoadEvent(funky) {
var oldonload=window.onload;
if (typeof(oldonload)!='function') window.onload=funky;
else window.onload=function() {
if (oldonload) oldonload();
funky();
}
}

addLoadEvent(clicksplode);

function clicksplode() { if (document.getElementById) {
var i, j;
window.onscroll=set_scroll;
window.onresize=set_width;
document.onclick=eksplode;
set_width();
set_scroll();
for (i=0; i<bangs; i++) for (j=sparks*i; j<sparks+sparks*i; j++) {
stars[j]=createDiv('*', 13);
document.body.appendChild(stars[j]);
}
}}

function createDiv(char, size) {
var div, sty;
div=document.createElement('div');
sty=div.style;
sty.font=size+'px monospace';
sty.position='absolute';
sty.backgroundColor='transparent';
sty.visibility='hidden';
sty.zIndex='101';
div.appendChild(document.createTextNode(char));
return (div);
}

function bang(N) {
var i, Z, A=0;
for (i=sparks*N; i<sparks*(N+1); i++) {
if (decay[i]) {
Z=stars[i].style;
Xpos[i]+=dX[i];
Ypos[i]+=(dY[i]+=1.25/intensity[N]);
if (Xpos[i]>=newwide || Xpos[i]<0 || Ypos[i]>=newhigh+sdown || Ypos[i]<0) decay[i]=1;
else {
Z.left=Xpos[i]+'px';
Z.top=Ypos[i]+'px';
}
if (decay[i]==15) Z.fontSize='7px';
else if (decay[i]==7) Z.fontSize='2px';
else if (decay[i]==1) Z.visibility='hidden';
decay[i]--;
}
else A++;
}
if (A!=sparks) timers[N]=setTimeout('bang('+N+')', speed);
}

function eksplode(e) {
var x, y, i, M, Z, N;
set_scroll();
y=(e)?e.pageY:event.y+sdown;
x=(e)?e.pageX:event.x+newleft;
N=++count%bangs;
M=Math.floor(Math.random()*3*colours.length);
intensity[N]=5+Math.random()*4;
for (i=N*sparks; i<(N+1)*sparks; i++) {
Xpos[i]=x;
Ypos[i]=y-5;
dY[i]=(Math.random()-0.5)*intensity[N];
dX[i]=(Math.random()-0.5)*(intensity[N]-Math.abs(dY[i]))*1.25;
decay[i]=16+Math.floor(Math.random()*16);
Z=stars[i].style;
if (M<colours.length) Z.color=colours[i%2?count%colours.length:M];
else if (M<2*colours.length) Z.color=colours[count%colours.length];
else Z.color=colours[i%colours.length];
Z.fontSize='13px';
Z.visibility='visible';
}
clearTimeout(timers[N]);
bang(N);
}

function set_width() {
var sw_min=999999;
var sh_min=999999;
if (document.documentElement && document.documentElement.clientWidth) {
if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
}
if (typeof(self.innerWidth)=='number' && self.innerWidth) {
if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
}
if (document.body.clientWidth) {
if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
}
if (sw_min==999999 || sh_min==999999) {
sw_min=800;
sh_min=600;
}
    newwide=sw_min-7;
    newhigh=sh_min-7;
}

function set_scroll() {
if (typeof(self.pageYOffset)=='number') {
sdown=self.pageYOffset;
    newleft=self.pageXOffset;
}
else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
sdown=document.body.scrollTop;
    newleft=document.body.scrollLeft;
}
else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    newleft=document.documentElement.scrollLeft;
sdown=document.documentElement.scrollTop;
}
else {
sdown=0;
    newleft=0;
}
}

