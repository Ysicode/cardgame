export class Game {
    public players: string[] = ['Player1', 'Player2', 'Player3', 'Player4'];
    public stack: string[] = [];
    public played_card: string[] = [];
    public current_player: number = 0;

    constructor() {
        for (let i = 2; i < 11; i++) {
            this.stack.push(i + '_of_clubs.png');
            this.stack.push(i + '_of_diamonds.png');
            this.stack.push(i + '_of_spades.png');
            this.stack.push(i + '_of_hearts.png');
        }
        this.stack.push('ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades2.png');
        this.stack.push('jack_of_clubs2.png', 'jack_of_diamonds2.png', 'jack_of_hearts2.png', 'jack_of_spades2.png');
        this.stack.push('king_of_clubs2.png', 'king_of_diamonds2.png', 'king_of_hearts2.png', 'king_of_spades2.png');
        this.stack.push('queen_of_clubs2.png', 'queen_of_diamonds2.png', 'queen_of_hearts2.png', 'queen_of_spades2.png');
        shuffle(this.stack);
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


