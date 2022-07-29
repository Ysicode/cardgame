export class Game {
    public players: string[] = [];
    public player_images: string [] = [];
    public stack: string[] = [];
    public played_card: string[] = [];
    public current_player: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {
        for (let i = 2; i < 15; i++) {
            this.stack.push(i + '_of_clubs.png');
            this.stack.push(i + '_of_diamonds.png');
            this.stack.push(i + '_of_spades.png');
            this.stack.push(i + '_of_hearts.png');
        }
        shuffle(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            player_images: this.player_images,
            stack: this.stack,
            played_card: this.played_card,
            current_player: this.current_player,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
        }
    }
}


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


