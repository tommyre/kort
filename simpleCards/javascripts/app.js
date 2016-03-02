(function () {

    var suitType = { Diamond: 'diamond', Heart: 'heart', Spade: 'spade', Clubs: 'clubs' };

    function Card(suitType, cardValue, img) {
        this.suitType = suitType;
        this.cardvalue = cardValue;
        this.img = img;

    }

    var deck = [];


        for (i = 2; i < 15; i++) {

            deck.push(new Card(suitType.Clubs, i, 'img/' + i + '_of_clubs.png'));
            deck.push(new Card(suitType.Diamond, i, 'img/' + i + '_of_diamonds.png'));
            deck.push(new Card(suitType.Heart, i, 'img/' + i + '_of_hearts.png'));
            deck.push(new Card(suitType.Spade, i, 'img/' + i + '_of_spades.png'));

        }

        var aiScore = 0;
        var playerScore = 0;

    function drawRandomCard() {
        return deck[Math.floor(Math.random() * deck.length)];
    }


    function drawCard(cardSlot) {

        var xPlace = 20;
        var yPlace = 20;

        switch (cardSlot) {

            case 1:
                xPlace = 20;
                break;
            case 2:
                xPlace = 190;
                break;
            case 3:
                xPlace = 20;
                yPlace = 240;
                break;
            case 4:
                xPlace = 190;
                yPlace = 240;
                break;
        }

        var cardCanvas = document.getElementById("cardCanvas");
        var context = cardCanvas.getContext("2d");

            if (context) {

                var currentCard = drawRandomCard();
                if (currentCard) {
                    var currentImage = new Image();

                    currentImage.onload = function () {


                        context.drawImage(this, xPlace, yPlace, 150, 200);

                    };
                    currentImage.src = currentCard.img;
                    
                    //Creates cardSlotValue variables for holding the value of the card. Set value based on rules of blackjack.
                    if (currentCard.cardvalue > 10 && currentCard.cardvalue < 14) {
                        window['cardSlotValue' + cardSlot] = 10;
                    }
                    else if (currentCard.cardvalue == 14) {
                        window['cardSlotValue' + cardSlot] = 11;
                    }
                    else {
                        window['cardSlotValue' + cardSlot] = currentCard.cardvalue;
                    }

                    //Remove card from deck array, so it can't be drawn again
                    var index = deck.indexOf(currentCard);
                    if (index > -1) {
                        deck.splice(index, 1);
                    }

                }
            }

    }

    function calculateScore() {
        aiScore = cardSlotValue1 + cardSlotValue2;
        playerScore = cardSlotValue3 + cardSlotValue4;
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

        drawCard(1);
        drawCard(2);
        drawCard(3);
        drawCard(4);
        calculateScore();
        drawValue();

    });

}())