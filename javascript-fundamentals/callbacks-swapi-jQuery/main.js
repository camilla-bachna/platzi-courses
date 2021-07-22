const API_URL = "https://swapi.dev/api/";
const PEOPLE_URL = "people/:id/";
const options = { crossDomain: true };

function onFilmUrlResponse(film) {
  return console.log(film.title);
}

function filmSigularOrPlural(films) {
  return films.length === 1
    ? "en la siguiente película"
    : "en las siguientes películas";
}

function getACharacter(id) {
  return new Promise((resolve, reject) => {
    const url = `${API_URL}${PEOPLE_URL.replace(":id", id)}`;
    $.get(url, options, function (data) {
      resolve(data);
    }).fail(() => reject(id));
  });
}

function onError(id) {
  console.log(`Sucediá un error al obtener el personaje ${id}`);
}

//Async-await
async function getCharacters() {
  const ids = [1, 2, 3, 4, 5, 6, 7];
  const promises = ids.map((id) => getACharacter(id));
  try {
    const persons = await Promise.all(promises); //await stops the execution of programme until all promises are resolved
    console.table(persons); //prints info in table form
  } catch (id) {
    onError(id);
  }
}
getCharacters();
