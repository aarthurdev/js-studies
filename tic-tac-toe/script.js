const squares = document.querySelectorAll(".square-space");

class Game{
    static player = 0;
    static #characters = ["X", "O"];

    static addCharacter(square, player){
        if(squares[square].innerText == ""){
            const htmlPlayer = `<span class="played">${this.#characters[player]}</span>`;
            squares[square].insertAdjacentHTML("beforeend", htmlPlayer);
            this.changePlayer();
            return;
        }
    }

    static changePlayer(){
        if (this.player == 0){
            this.player = 1;
            return;
        }

        this.player = 0;
    }

    static checkWin(){
        const wins = [
            [0, 1, 2], [0, 3, 6], 
            [1, 4, 7], 
            [2, 4, 6], [2, 5, 8]]
    }
}

squares.forEach((elm, ind) => {
    elm.addEventListener("click", () => {
        Game.addCharacter(ind, Game.player);
    })
}) 