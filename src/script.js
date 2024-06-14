
function playSubmit(){

    // should use typescript but i'm not too familiar with that (yet)
    let numPlayers = parseInt($("#numPlayers").val());

    // reset state
    $(".text-ans-row").remove();
    $("#text-ans").empty();
    $("#text-ans").addClass("hidden");
    $("#card-grids .player-template:not(.hidden)").remove();1

    $.ajax({
        contentType: "application/json",
        type: 'POST',
        url: '/game/startNewGame',
        data: JSON.stringify({ 
            numPlayers: numPlayers
        }),
        success: function(res){

            if(res["status"] == "success")
            {
                let cards = res["cards"];

                // for the specified number of players, generate a row for them
                for(let i = 0; i < numPlayers; i++){
                    let playerRow = $(".player-template.hidden").clone()
                    playerRow.removeClass("hidden");
                    playerRow.attr("id", "player-" + i)
                    $(playerRow).find(".player-no").html((i + 1))
                    $("#card-grids").append(playerRow)
                }
    
                // put all the cards into each player's hands
                let keys = Object.keys(cards);
                for(let i = 0; i < keys.length; i++){
                    let player = cards[[keys[i]]]; // the player
                    let card = keys[i]; // the card value 
                    
                    let playerCardsRow = $("#player-" + player + " .player-cards");
                    let playerCardTemplate = $(playerCardsRow).find(".player-card.hidden").clone();
    
                    playerCardTemplate.removeClass("hidden");
                    playerCardTemplate.addClass("to-show");
                    playerCardTemplate.html(card);
                    $(playerCardsRow).append(playerCardTemplate);
                }
    
                // deal cards animation 
                setTimeout(function(){
                    $(".player-card.to-show").removeClass("to-show");
                    $("#textAnswerBtn").removeClass("opacity-0");
                }, 200)
            }
            else 
            {
                $("#text-ans").text("Input value does not exist or value is invalid.")
                $("#text-ans").removeClass("hidden");
            }
        }
    });
}

function getTextAnswer(){
    let ansContainer = $("#text-ans");

    $(".player-template").each(function(){
        let playerId = $(this).find(".player-no").html();
        jQuery('<div>', {
            id: 'text-' + playerId,
            class: 'text-ans-row',
        }).appendTo(ansContainer);
        
        let textRow = $(this).find(".player-card:not(.hidden)").map(function(i, opt) {
            return $(opt).text();
        }).toArray().join(',');

        $("#text-" + playerId).text(textRow);
    })

    $(ansContainer).removeClass("hidden");

}