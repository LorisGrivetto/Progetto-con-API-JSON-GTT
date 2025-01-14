let URL = "https://gpa.madbob.org/query.php?stop=";

function aggiungiPassaggio(linea, orari) {
    let div = document.createElement("div");
    div.classList.add("col-12", "col-md-6", "mb-4", "text-center");

    // Crea i dettagli del passaggio
    let p1 = document.createElement("p");
    p1.innerHTML = `<strong>Linea:</strong> ${linea}`;
    p1.classList.add("mb-1", "fw-bold");

    // Mostra il numero di orari disponibili
    let p2 = document.createElement("p");
    p2.innerHTML = `<strong>Orari disponibili:</strong> ${orari.length}`;
    p2.classList.add("text-secondary");

    // Crea la lista degli orari
    let orariList = document.createElement("ul");
    orariList.classList.add("list-group", "text-start");
    orari.forEach(orario => {
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = orario;
        orariList.appendChild(li);
    });

    // Aggiungi i dettagli e la lista degli orari al contenitore
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(orariList);

    // Aggiungi il contenitore alla lista
    document.getElementById("lista").appendChild(div);
}


function mostra(lista) {
    // Svuota il contenitore prima di aggiungere nuovi passaggi
    document.getElementById("lista").innerHTML = "";

    // Aggiungi un messaggio se non ci sono passaggi
    if (lista.length === 0) {
        let div = document.createElement("div");
        div.innerHTML = "<p class='text-danger'>Nessun passaggio trovato</p>";
        div.classList.add("text-center");
        document.getElementById("lista").appendChild(div);
        return;
    }

    // Raggruppa gli orari per linea
    let raggruppatiPerLinea = {};
    lista.forEach(passaggio => {
        if (!raggruppatiPerLinea[passaggio.line]) {
            raggruppatiPerLinea[passaggio.line] = [];
        }
        raggruppatiPerLinea[passaggio.line].push(passaggio.hour);
    });

    // Aggiungi i risultati al DOM
    for (let linea in raggruppatiPerLinea) {
        aggiungiPassaggio(linea, raggruppatiPerLinea[linea]);
    }
}

function cercafermata() {
    let fermata = document.getElementById("num").value;
    if (!fermata) {
        alert("Inserisci un numero di fermata valido!");
        return;
    }

    fetch(URL + fermata)
        .then(response => response.json())
        .then(data => mostra(data))
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        });
}
