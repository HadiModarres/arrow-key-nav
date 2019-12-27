let navigables = undefined;
let classN = "arrow-navigable";

function setNavigableClassName(className){
  classN = className;
}

document.onkeydown = function(ev){
        ev.preventDefault();
        navigables = Array.from(document.getElementsByClassName(classN));
        for (let n of navigables){
            n.tabIndex="0";
        }
         // Array.from(navigables)[Math.floor(Math.random()*navigables.length)].focus();
        let elem = null;
        switch (ev.code) {
            case "ArrowUp":
                elem = getClosestUpElementTo(...getRefPointForSide(document.activeElement,"up"));
                break;
            case "ArrowDown":
                elem = getClosestDownElementTo(...getRefPointForSide(document.activeElement,"down"));
                break;
            case "ArrowLeft":
                elem = getClosestLeftElementTo(...getRefPointForSide(document.activeElement,"left"));
                break;
            case "ArrowRight":
                elem = getClosestRightElementTo(...getRefPointForSide(document.activeElement,"right"));
                break;
        }
        console.log(elem);
        if (elem){
            elem.focus();
        }
};

function getClosestUpElementTo(x,y){
    let upperElems = navigables.filter(elem => {
        return elem.getBoundingClientRect().y < y;
    });
    return closestElementToReferencePoint(upperElems,[x,y],"down");
}
function getClosestDownElementTo(x,y){
    let bottomElems = navigables.filter(elem => {
        return elem.getBoundingClientRect().y > y;
    });
    return closestElementToReferencePoint(bottomElems,[x,y],"up");
}
function getClosestLeftElementTo(x,y){
    let leftElems = navigables.filter(elem => {
        return elem.getBoundingClientRect().x < x;
    });
    return closestElementToReferencePoint(leftElems,[x,y],"right");
}
function getClosestRightElementTo(x,y){
    let rightElems = navigables.filter(elem => {
        return elem.getBoundingClientRect().x > x;
    });
    return closestElementToReferencePoint(rightElems,[x,y],"left");
}

function closestElementToReferencePoint(elements,refPoint,side) {
   let min_dist = Infinity;
   let outputElem = undefined;
   for (let elem of elements){
       let dist = pointsDist(getRefPointForSide(elem,side),refPoint);
      if (dist<min_dist){
          min_dist = dist;
          outputElem = elem;
      }
   }
   return outputElem;
}
function getRefPointForSide(elem,side) {
   let boundR = elem.getBoundingClientRect();
   switch (side) {
       case "right":
           return [boundR.right,boundR.y+boundR.height/2];
       case "left":
           return [boundR.x,boundR.y+boundR.height/2];
       case "up":
           return [boundR.x,boundR.y];
       case "down":
           return [boundR.x,boundR.bottom];
   }
}

function pointsDist(point1,point2) {
   let a = point1[0] - point2[0];
   let b = point1[1] - point2[1];
   b *=4;
   return Math.sqrt(a*a + b*b);
}

function getCurrentXY() {
    let boundR = document.activeElement.getBoundingClientRect();
    return [boundR.x,boundR.y];
}

module.exports = {setNavigableClassName}
