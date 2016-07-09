(function () {

    var suitType = { Diamond: 'diamond', Heart: 'heart', Spade: 'spade', Clubs: 'clubs' };

    function Card(suitType, cardValue, img) {
        this.suitType = suitType;
        this.cardvalue = cardValue;
        this.img = img;

    }

    //Creating an array with a deck of cards.
    var deck = [];


    for (i = 2; i < 15; i++) {

        deck.push(new Card(suitType.Clubs, i, 'img/' + i + '_of_clubs.png'));
        deck.push(new Card(suitType.Diamond, i, 'img/' + i + '_of_diamonds.png'));
        deck.push(new Card(suitType.Heart, i, 'img/' + i + '_of_hearts.png'));
        deck.push(new Card(suitType.Spade, i, 'img/' + i + '_of_spades.png'));

    }

    //Score variables.
    var aiScore = 0;
    var playerScore = 0;

    // Draws a random card from the deck.
    function drawRandomCard() {
        return deck[Math.floor(Math.random() * deck.length)];
    }

    // Draws cards for ai, drawing them on canvas and sets score value.
    function drawCardAi() {

            var currentCard = drawRandomCard();
            if (currentCard) {
                var currentImage = new Image();
                currentImage.src = currentCard.img;
                currentImage.onload = function () {
                

                    $('#aiCards').append('<div class="col-xs-1"><img src="' + currentCard.img + '" class="card" />')

                };
                

                // Sets the value of aiScore to the correct value with the rules of blackjack
                if (currentCard.cardvalue > 10 && currentCard.cardvalue < 14) {
                    aiScore += 10;
                }
                else if (currentCard.cardvalue == 14 && aiScore > 10) {
                    aiScore += 1;
                }
                else if (currentCard.cardvalue == 14 && aiScore < 11) {
                    aiScore += 11;
                }
                else {
                    aiScore += currentCard.cardvalue;
                }

                //Remove card from deck array, so it can't be drawn again
                var index = deck.indexOf(currentCard);
                if (index > -1) {
                    deck.splice(index, 1);
                }

            }
        

    }

    // Draws cards for player, drawing them on canvas and sets score value.
    function drawCardPlayer() {

        var currentCard = drawRandomCard();
        if (currentCard) {
            var currentImage = new Image();
            currentImage.src = currentCard.img;
            currentImage.onload = function () {
                

                $('#playerCards').append('<div class="col-xs-1"><img src="' + currentCard.img + '" class="card" />')

            };

                // Sets the value of playerScore to the correct value with the rules of blackjack
                if (currentCard.cardvalue > 10 && currentCard.cardvalue < 14) {
                    playerScore += 10;
                }
                else if (currentCard.cardvalue == 14 && playerScore > 10) {
                    playerScore += 1;
                }
                else if (currentCard.cardvalue == 14 && playerScore < 11) {
                    playerScore += 11;
                }
                else {
                    playerScore += currentCard.cardvalue;
                }

                //Remove card from deck array, so it can't be drawn again
                var index = deck.indexOf(currentCard);
                if (index > -1) {
                    deck.splice(index, 1);
                }

            }

    }

    function clearScore() {
        aiScore = 0;
        playerScore = 0;
    }

    function drawValue() {
        var c = document.getElementById("cardCanvas");
        var ctx = c.getContext("2d");

        ctx.font = "20px Georgia";

        //clears a rectagle of the canvas so the text doesn't write over it.
        ctx.clearRect(460, 0, 50, 500);

        ctx.fillText(aiScore, 460, 105);
        ctx.fillText(playerScore, 460, 340);
    }

    $("#btnDraw").on("click", function () {

        drawCardAi(1);
        drawCardAi(2);
        drawCardPlayer(3);
        drawCardPlayer(4);
        //calculateScore();
        drawValue();
        clearScore();

    });

    $("#btnDraw2").on("click", function () {

        drawCardAi();
        drawCardPlayer();

    });

    //Creates cardSlotValue variables for holding the value of the card. Set value based on rules of blackjack.
    /* if (currentCard.cardvalue > 10 && currentCard.cardvalue < 14) {
        window['cardSlotValue' + cardSlot] = 10;
    }
    else if (currentCard.cardvalue == 14) {
        window['cardSlotValue' + cardSlot] = 11;
    }
    else {
        window['cardSlotValue' + cardSlot] = currentCard.cardvalue;
    }
    */

}())