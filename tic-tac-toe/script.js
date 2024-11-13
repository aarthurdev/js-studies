class Game{
    static player = 0;
    static #characters = ["X", "O"];
    static tries = 0
    
    static addCharacter(square, player){
        const squares = document.querySelectorAll(".square-space");

        if(squares[square].innerText == ""){
            const htmlPlayer = `<span class="played">${this.#characters[player]}</span>`;
            squares[square].insertAdjacentHTML("beforeend", htmlPlayer);

            if(this.checkWin(this.player)){
                document.querySelector(".game-ended").classList.remove("invisible")
                document.querySelector(".player").innerText = this.player + 1;
                return
            }

            if(!this.checkWin(this.player)){
                this.tries++
                if(this.tries == 9){
                    document.querySelector(".game-ended").classList.remove("invisible")
                    document.querySelector(".game-ended").innerText = "It's a draw!";
                }
            }

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

    static checkWin(player){
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        const squares = document.querySelectorAll(".square-space");
       
        return wins.some(combination => {
            return combination.every(index => {
                return squares[index].innerText == this.#characters[player];
            })
        })
    }

    static restartGame(){
        
    }

}


document.querySelectorAll(".square-space").forEach((elm, ind) => {
    elm.addEventListener("click", () => {
        Game.addCharacter(ind, Game.player);
    })
}) 