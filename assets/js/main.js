const navlinks = document.querySelectorAll('a.nav-link');

for (let index = 0; index < navlinks.length; index++) {
    navlinks[index].addEventListener('click' , function(){
        let activeElement = document.querySelector('.active').classList.remove('active')
        this.classList.add('active');
    })
}

fetch("https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/")
.then(res => res.json())
.then(res => fecthFeatBooks(res));

function fecthFeatBooks(res){
    let BooksContaienr = document.querySelector('.feat-books');    
    let lastFourBooks = res.slice((res.length - 4), res.length);    
    for(let i = 0 ; i< lastFourBooks.length ; i++){
        let newBook = document.createElement('div');
        newBook.classList.add('book');
        newBook.innerHTML =
        `
        <div class="img-container p-4 d-flex align-items-center justify-content-center mb-4 border">
            <img src="${lastFourBooks[i].simple_thumb}" alt=".." class = "rounded">
        </div>
        <div class="info text-center">
            <p class="fs-4 text-warning-emphasis mb-1 text-capitalize">${lastFourBooks[i].title}</p>
            <p class="fs-6 font-rob text-body-secondary">${lastFourBooks[i].author}</p>
        </div>
        `;
        BooksContaienr.append(newBook);
    }
}

// api all books:======      https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/   ======
//one book API========= https://wolnelektury.pl/api/books/studnia-i-wahadlo/ =========
fetch("https://wolnelektury.pl/api/books/studnia-i-wahadlo/")
.then(oneBook => oneBook.json())
.then(oneBook => fetchBook(oneBook));

function fetchBook(oneBook){    
    const bookImage = document.querySelector('.bookImage');
    const bookAuthour = document.querySelector('.bookAuthour');
    const bookTitle = document.querySelector('.bookTitle');
    const bookDesc = document.querySelector('.bookDesc');
    
    bookImage.innerHTML =
    `
        <img src="${oneBook.cover}" class="w-100 rounded">
    `
    bookAuthour.innerHTML=
    `
        by ${oneBook.authors[0].name}

    `
    bookTitle.innerHTML=
    `
        ${oneBook.fragment_data.title}
    `
    bookDesc.innerHTML=`
        ${oneBook.fragment_data.html}
    `
}


fetch("https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/parent_books/")
.then(allBooks => allBooks.json())
.then(allBooks => fecthAllBooks(allBooks));

function fecthAllBooks(allBooks){
    let requiredBooks = allBooks.slice(0 , 8);//0 -> 7 the 8th element is not taken 8
    let BigContaienr = document.querySelector('.first-tab .row');
    console.log(BigContaienr);
    
    for(let i = 0 ; i<requiredBooks.length ; i++){
        BigContaienr.innerHTML += `
        <div class= "col-lg-3 col-md-6 col-sm-12">
            <div class="book">
                <div class="img-container p-4 d-flex align-items-center justify-content-center mb-4 border">
                    <img src="${requiredBooks[i].simple_thumb}" alt=".." class = "rounded">
                </div>
                <div class="info text-center">
                    <p class="fs-4 text-warning-emphasis mb-1 text-capitalize">${requiredBooks[i].title}</p>
                    <p class="fs-6 font-rob text-body-secondary">${requiredBooks[i].author}</p>
                </div>
            </div>
        </div>
        `
    }
}