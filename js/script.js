let allTotal = 0;

// Funkcija koja se poziva kada se klikne na dugme "Dodaj"
function addToCart(element) {
    // Pronalazi najblizi div sa klasom "single-item"
    let mainEl = element.closest('.single-item');
    // Pronalazi cijenu proizvoda
    let price = mainEl.querySelector('.price').innerText;
    // Pronalazi ime proizvoda
    let name = mainEl.querySelector('h3').innerText;
    // Pronalazi kolicinu proizvoda
    let quantity = mainEl.querySelector('input').value;

    // Pronalazi div sa klasom "cart-items"
    let cartItems = document.querySelector('.cart-items');

    // Ako je kolicina proizvoda veca od nule
    if (parseInt(quantity) > 0) {
        // Uklanja simbol "$" iz cijene
        price = price.substring(1);
        // Pretvara string u broj
        price = parseInt(price);
        // Racuna ukupnu cijenu proizvoda (kolicina * cijena)
        let total = price * parseInt(quantity);

        // Dodaje ukupnu cijenu svih proizvoda u korpi
        allTotal += total;

        // Dodaje proizvod u korpu (prikazuje informacije o proizvodu kao H3 i paragraf)
        cartItems.innerHTML += `<div class="cart-single-item">
                                    <h3>${name}</h3>
                                    <p>$${price} x ${quantity} = $<span>${total}</span></p>
                                    <button onclick="removeFromCart(this)" class="remove-item">Ukloni</button>
                                </div>`;
        // Izračunava i prikazuje ukupnu cijenu svih proizvoda u korpi
        document.querySelector('.total').innerText = `Total: $${allTotal}`;
        
        // Mijenja tekst buttona na "Dodato" i onemogućuje daljnje dodavanje istog proizvoda u korpu
        element.innerText = 'Dodato';
        element.setattribute('disabled', 'true');
        
        } else {
        // Ukoliko korisnik nije odabrao kolicinu proizvoda, javlja mu se poruka
        alert('Odaberi kolicinu');
    }
};

// Funkcija uklanja proizvod iz korpe (uklanja informacije o proizvodu kao H3 i paragraf)
function removeFromCart(element) {
    let mainEl = element.closest('.cart-single-item');
    // Uzima cijenu proizvoda iz elementa <span> unutar paragrafa
    let price = mainEl.querySelector('p span').innerText;
    // Uzima ime proizvoda iz elementa <h3>
    let name = mainEl.querySelector('h3').innerText;
    // Uzima sve elemente sa klasom "single-item" (proizvode koji se nalaze na stranici)
    let vegetables = document.querySelectorAll('.single-item');

    // Pretvara cijenu proizvoda u integer
    price = parseInt(price);
    // Oduzima cijenu proizvoda iz ukupnog totala
    allTotal -= price;
    // Prikazuje novi ukupni total na stranici
    document.querySelector('.total').innerText = `Total: $${allTotal}`;

    // Uklanja proizvod iz korpe (HTML element)
    mainEl.remove();

    // Za svaki proizvod na stranici
    vegetables.forEach(function (vege) {
        // Uzima ime proizvoda
        let itemName = vege.querySelector('.si-content h3').innerText;
        // Ako ime proizvoda odgovara imenu proizvoda koji se uklanja iz korpe
        if(itemName === name) {
            // Postavlja vrijednost input polja na 0
            vege.querySelector('.actions input').value = 0;
            // Uklanja atribut "disabled" sa dugmeta
            vege.querySelector('.actions button').removeAttribute('disabled');
            // Postavlja tekst dugmeta na "Dodaj"
            vege.querySelector('.actions button').innerText = 'Dodaj';
        }
    });
};