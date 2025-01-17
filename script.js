let URL = "https://gpa.madbob.org/query.php?stop=";


function aggiungiPassaggio(linea, orariProgrammati, orariReali) {
    let div = document.createElement("div");
    div.classList.add("col-12", "mb-4");

    let header = document.createElement("h4");
    header.innerHTML = `Linea: <span class="numeroLinea">${linea}</span>`;
    div.appendChild(header);

    
    let programmati = document.createElement("div");
    if (orariProgrammati.length > 0) {
        programmati.innerHTML = "<strong>Orari Programmati:</strong>";
        orariProgrammati.forEach(orario => {
            let span = document.createElement("span");
            span.classList.add("orario-programmato");
            span.textContent = orario;
            programmati.appendChild(span);
        });
    } else {
        programmati.innerHTML = "<p class='text-warning'>Nessun orario programmato disponibile</p>";
    }
    div.appendChild(programmati);

  
    let reali = document.createElement("div");
    if (orariReali.length > 0) {
        reali.innerHTML = "<strong>Orari Tempo Reale:</strong>";
        orariReali.forEach(orario => {
            let span = document.createElement("span");
            span.classList.add("orario-tempo-reale");
            span.textContent = orario;
            reali.appendChild(span);
        });
    } else {
        reali.innerHTML = "<p class='text-danger'>Nessun orario in tempo reale disponibile</p>";
    }
    div.appendChild(reali);

   
    document.getElementById("lista").appendChild(div);
}


function mostra(lista) {
    document.getElementById("lista").innerHTML = ""; // Svuota lista
    if (!lista.length) {
        document.getElementById("lista").innerHTML = "<p class='text-danger'>Nessun passaggio trovato.</p>";
        return;
    }

  
    let raggruppati = {};
    lista.forEach(passaggio => {
        if (!raggruppati[passaggio.line]) {
            raggruppati[passaggio.line] = { programmati: [], reali: [] };
        }
        if (passaggio.real_time) {
            raggruppati[passaggio.line].reali.push(passaggio.hour);
        } else {
            raggruppati[passaggio.line].programmati.push(passaggio.hour);
        }
    });

    
    for (let linea in raggruppati) {
        aggiungiPassaggio(linea, raggruppati[linea].programmati, raggruppati[linea].reali);
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
        .then(data => {
            console.log("Dati ricevuti:", data); 
            mostra(data);
        })
        .catch(error => {
            console.error("Errore nella richiesta:", error);
            alert("Si è verificato un errore. Riprova più tardi.");
        });
}
