import Dot from './Dot.js';

export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

export default class Line{

    static getRandomInstance(){
        return new Line(
            new Dot(getRandomInt(1000), getRandomInt(800)),
            new Dot(getRandomInt(1000), getRandomInt(800))
        );
    }

    /**
     * @param dot1 {Dot}
     * @param dot2 {Dot}
     */
    constructor(dot1, dot2) {
        this.dot1 = dot1;
        this.dot2 = dot2;

        this.color = getRandomColor();
    }

    det(a, b){
        return a[0] * b[1] - a[1] * b[0];
    }

    /**
     * get Intersect Point
     * @param line {Line}
     */
    getIntersectPoint(line){
        let line1 = [[this.dot1.x, this.dot1.y], [this.dot2.x, this.dot2.y]];
        let line2 = [[line.dot1.x, line.dot1.y], [line.dot2.x, line.dot2.y]];

        let xdiff = [line1[0][0] - line1[1][0], line2[0][0] - line2[1][0]];
        let ydiff = [line1[0][1] - line1[1][1], line2[0][1] - line2[1][1]];

        let div = this.det(xdiff, ydiff);

        let d = [this.det(...line1), this.det(...line2)];
        let x = this.det(d, xdiff) / div;
        let y = this.det(d, ydiff) / div;
        // console.log(x, y)

        return {x,y};
    }

}