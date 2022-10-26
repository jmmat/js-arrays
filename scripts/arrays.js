//console.log(data);
cards = document.getElementById("cards");
// 1. instead of creating the cards manually, we should use array functions to convert the data into cards
// card = document.createElement("div");
// card.className = "card";
// card.style.width = "width: 18rem";
// for(i = 0; i < data.items.length; i++){
//     card.append(data.items[i].title)
// }
let resultingCoursesSpan = document.getElementById("resultingCourses");
let totalCreditsSpan = document.getElementById("totalCredits");
let prereqCreditsSpan = document.getElementById("prereqCreditsSpan");

resultingCoursesSpan.innerText = data.items.length;
totalCreditsSpan.innerText = data.items.length * 3;

function getNumberOfPrereqs(){
    let numPrereqs = 0;
    for(let i = 0; i < data.items.length; i++){
        numPrereqs += data.items[i].prereqs.length;
    }
    return numPrereqs;
}
prereqCreditsSpan.innerText = getNumberOfPrereqs() * 3;

function courseMarkupString(cardObj) {
    const result = `<div class="card" style="width: 18rem;">
    <h3 class="card-header">${cardObj.prefix} ${cardObj.number}</h3>
    <div class="card-body">
      <h5 class="card-title">Introduction to Programming</h5>
      <h6 class="card-subtitle mb-2 text-muted">Prequisites: None</h6>
      <p class="card-text">
        Fundamental problem-solving techniques using a modern programming language. Topics include variables, input/output, decisions, loops, functions, arrays, and objects. Students learn about algorithm development, testing strategies, and software tools.
      </p>
      <a href="https://catalog.jmu.edu/preview_course_nopop.php?catoid=50&coid=257219" class="card-link">Course Link</a>
    </div>
    <div class="card-footer">Credits: 3</div>
  </div>`
//console.log(result);
  return result;

}

// courseMarkupString(data.items[0]);
let courseCards = data.items.map(courseMarkupString);
//console.log(courseCards);
cards.innerHTML = courseCards.join("");
// 2. maybe we only show those that match the search query?

const searchButton = document.querySelector("button[type='submit']");
//console.log(searchButton);



searchButton.addEventListener("click", function (ev) {
    console.log("click", ev);
    ev.preventDefault();
    let searchText = document.querySelector("input[type='search']");
    //console.log(searchText.value);
    // use the search text value to filter data.items
    let filtered = data.items.filter((element) => {
        const isInPrefix = element.prefix.includes(searchText.value);
        const isInNumber = `${element.number}`.includes(searchText.value);
        const isInTitle = element.title.includes(searchText.value);
        const isInURL = element.url.includes(searchText.value);
        const isInDesc = element.desc.includes(searchText.value);
        const isInPrereqs = element.prereqs.join("").includes(searchText.value);
        const isInCredits = `${element.credits}`.includes(searchText.value);
        return isInPrefix || isInNumber || isInTitle || isInURL || isInDesc || isInPrereqs || isInCredits;
    });
    //console.log(filtered);


    // map the filtered items to courseMarkup
    courseCards = filtered.map(courseMarkupString);
    // replace the content of the page with new stuff
    cards.innerHTML = courseCards.join("");

    let totalCredits = filtered.reduce((prev, curr) => {
        //console.log(prev, curr);
        return prev + curr.credits;
    }, 0)


    resultingCoursesSpan.innerText = filtered.length;
    totalCreditsSpan.innerText = totalCredits;

    let totalPrereqCreditHours = 0
    for(let i = 0; i < filtered.length; i++){
        let currentCourse = filtered[i];
        for(let j = 0; j < filtered[i].prereqs.length; j++){
            let currentPrereq = currentCourse.prereqs[j];
            let filteredPrereqs = data.items.filter((element) => {
                //console.log(currentCourse, currentPrereq, element);
                return element.number === currentPrereq
            })
            //console.log(currentCourse.number, currentPrereq,filteredPrereqs);
            totalPrereqCreditHours += filteredPrereqs[0].credits;
        }
    }

    prereqCreditsSpan.innerText = totalPrereqCreditHours;
})

// 3. we update the result count and related summary info as we filter