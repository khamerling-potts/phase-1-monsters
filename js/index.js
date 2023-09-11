document.addEventListener("DOMContentLoaded", () => {
  //Initial load of monsters in DOM
  let offset = 1;
  loadMonsters(offset);

  function loadMonsters(offset) {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${offset}`)
      .then((res) => res.json())
      .then((data) => data.forEach(displayMonster));
  }

  //Display monster in DOM
  function displayMonster(monster) {
    const div = document.createElement("div");
    const name = document.createElement("p");
    name.innerText = monster.name;
    const age = document.createElement("p");
    age.innerText = monster.age;
    const description = document.createElement("p");
    description.innerText = monster.description;
    div.append(name, age, description);
    document.getElementById("monster-container").appendChild(div);
  }

  //event listener for submitting new monster
  document
    .getElementById("monster-form")
    .addEventListener("submit", postMonster);

  function postMonster(event) {
    event.preventDefault();
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        description: document.getElementById("description").value,
      }),
    };
    fetch("http://localhost:3000/monsters", configObj)
      .then((res) => res.json())
      .then((data) => displayMonster(data));
  }

//load next 50 monsters and remove previous ones from screen
document.getElementById('forward').addEventListener('click', event =>{
  document.getElementById('monster-container').innerHTML = '';
  offset++;
  loadMonsters(offset);
});

//load previous 50 monsters and remove previous ones from screen
document.getElementById('back').addEventListener('click', event =>{
  document.getElementById('monster-container').innerHTML = '';
  offset--;
  loadMonsters(offset);
});

});
