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

    function drawRandomCard() {
        return deck[Math.floor(Math.random() * deck.length)];
    }

    function drawCard(nmbOfCards) {

            var cardCanvas = document.getElementById("cardCanvas");
            var context = cardCanvas.getContext("2d");

            for (i = 0; i < nmbOfCards; i++) {
                if (context) {
                    var xPlacement = 20;
                    var xCards = 1;

                    if (xCards > 1) {
                        xPlacement = (160 * xCards) + 10
                    }

                    var currentCard = drawRandomCard();
                    if (currentCard) {
                        var currentImage = new Image();

                        currentImage.onload = function () {

                            context.drawImage(this, xPlacement, 20, 150, 200);

                        };

                        currentImage.src = currentCard.img;
                    }
                }
                xCards++;
            }
    }



    $("#btnDraw").on("click", function () {

        drawCard(2);

    });

}())