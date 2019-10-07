
var restarea=6 //width of the "neutral" area in the center of the gallery in px
var maxspeed=7 //top scroll speed in pixels. Script auto creates a range from 0 to top speed.

var iedom=document.all||document.getElementById
var scrollspeed=0
var movestate=""

if (iedom)
    document.write('<span id="temp" style="visibility:hidden;position:absolute;top:-100;left:-10000;"></span>')

var actualwidth=''
var cross_scroll, ns_scroll
var loadedyes=0

function ietruebody(){
    return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function getposOffset(what, offsettype){
    var totaloffset=(offsettype=="left")? what.offsetLeft: what.offsetTop;
    var parentEl=what.offsetParent;
    while (parentEl!=null){
        totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
        parentEl=parentEl.offsetParent;
    }
    return totaloffset;
}


function moveleft(){
    if (loadedyes){
        movestate="left"
    if (iedom&&parseInt(cross_scroll.style.left)>(menuwidth-actualwidth))
        cross_scroll.style.left=parseInt(cross_scroll.style.left)-scrollspeed+"px"
    }
        lefttime=setTimeout("moveleft()",10)
}

function moveright(){
    if (loadedyes){
        movestate="right"
    if (iedom&&parseInt(cross_scroll.style.left)<0)
        cross_scroll.style.left=parseInt(cross_scroll.style.left)+scrollspeed+"px"
    }
    righttime=setTimeout("moveright()",10)
}

function motionengine(e){
    var dsocx=(window.pageXOffset)? pageXOffset: ietruebody().scrollLeft;
    var dsocy=(window.pageYOffset)? pageYOffset : ietruebody().scrollTop;
    var curposy=window.event? event.clientX : e.clientX? e.clientX: ""
        curposy-=mainobjoffset-dsocx
    var leftbound=(menuwidth-restarea)/2
    var rightbound=(menuwidth+restarea)/2
    if (curposy>rightbound){
        scrollspeed=(curposy-rightbound)/((menuwidth-restarea)/2) * maxspeed
    if (window.righttime) clearTimeout(righttime)
    if (movestate!="left") moveleft()
    }
    else if (curposy<leftbound){
        scrollspeed=(leftbound-curposy)/((menuwidth-restarea)/2) * maxspeed
    if (window.lefttime) clearTimeout(lefttime)
    if (movestate!="right") moveright()
    }
    else
        scrollspeed=0
    }

function contains_ns6(a, b) {
    while (b.parentNode)
    if ((b = b.parentNode) == a)
    return true;
    return false;
}

function stopmotion(e){
    if ((window.event&&!crossmain.contains(event.toElement)) || (e && e.currentTarget && e.currentTarget!= e.relatedTarget && !contains_ns6(e.currentTarget, e.relatedTarget))){
    if (window.lefttime) clearTimeout(lefttime)
    if (window.righttime) clearTimeout(righttime)
        movestate=""
    }
}

function fillup(){
    if (iedom){
        crossmain=document.getElementById? document.getElementById("motioncontainer") : document.all.motioncontainer
        menuwidth=parseInt(crossmain.style.width)
        mainobjoffset=getposOffset(crossmain, "left")
        cross_scroll=document.getElementById? document.getElementById("motiongallery") : document.all.motiongallery
        document.getElementById("temp").innerHTML=cross_scroll.innerHTML //NEW stuff
        actualwidth=document.all? cross_scroll.offsetWidth : document.getElementById("temp").offsetWidth
    if (!window.opera) document.getElementById("temp").style.display="none"
        crossmain.onmousemove=function(e){
        motionengine(e)
    }

    crossmain.onmouseout=function(e){
    stopmotion(e)
    }
}
loadedyes=1
}
window.onload=fillup
