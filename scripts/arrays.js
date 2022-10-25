console.log(data);
cards = document.getElementById("cards");
// 1. instead of creating the cards manually, we should use array functions to convert the data into cards
card = document.createElement("div");
card.className = "card";
card.style.width = "width: 18rem";
for(i = 0; i < data.items.length; i++){
    card.append(data.items[i].title)
}
// 2. maybe we only show those that match the search query?

// 3. we update the result count and related summary info as we filter