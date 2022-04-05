class Movie{
    constructor(name,price){

        this.movieName = name;
        this.ticketPrice = Number(price);
        this.screenings = [];
        this._revenue =0;
        this._ticketsSold = 0;

    }

    newScreening(date,hall,description){

        
                if(this.screenings.some(s => s.date == date && s.hall == hall)){
                    throw new Error(`Sorry, ${hall} hall is not available on ${date}`)
                }
       
        this.screenings.push({
            date,
            hall,
            description
        });

        return `New screening of ${this.movieName} is added.`
    }

    endScreening(date,hall,tickets){
const screening = this.screenings.find(s => s.date == date && s.hall == hall);

if(screening == undefined){
    throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`)
}

const index = this.screenings.indexOf(screening);

this.screenings.splice(index,1);

const currentProfit = this.ticketPrice*tickets;

this._revenue += currentProfit;
this._ticketsSold += tickets;

return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`


    }

    toString(){

        const result = [

            `${this.movieName} full information:`,
            `Total profit: ${this._revenue.toFixed(0)}$`,
            `Sold Tickets: ${this._ticketsSold}`
        ];

        if (this.screenings.length == 0) {
            result.push('No more screenings!')
        }else{
            result.push('Reamaining film screenings:');

            this.screenings
            .sort((a,b) => a.hall.localeCompare(b.hall))
            .forEach(s=> result.push(`${s.hall} - ${s.date} - ${s.description}`));
        }
        
        return result.join('\n');
    }
}

let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));
console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

m.newScreening('October 4, 2020', '235', `regular`);
m.newScreening('October 5, 2020', 'Main', `regular`);
m.newScreening('October 3, 2020', '235', `regular`);
m.newScreening('October 4, 2020', 'Main', `regular`);
console.log(m.toString());


