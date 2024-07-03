
const myLibrary = [];
const content = document.querySelector(".content");

function Book(title, author, pages, hasRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

    let book1 = new Book("Animal Farm","George Orwell",24,false);
    let book2 = new Book("Dracula","Bram Stoker",212,true);
    let book3 = new Book("Fahrenheit 451","Ray Bradbury",30,true);
    myLibrary.push(book1,book2,book3);

let textOutput = "";
Book.prototype.outputHasRead = function(){
    if(this.hasRead === true){
        textOutput = "Read";
    }else if(this.hasRead === false){
        textOutput = "Not Read";
    }else{
        textOutput = "Error";
    }
    return textOutput;
}

function render(){
    const display = document.getElementById('Libary');
    const books = document.querySelectorAll('.card');
    books.forEach(book => display.removeChild(book));
   
    for (i=0; i<myLibrary.length; i++){
        createCard(i);
    }
}
function createCard(index){
    let Card = document.createElement("div");
    Card.setAttribute("class","card");
    Card.setAttribute("id","data-index-"+myLibrary[index].title);
    content.appendChild(Card);

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.setAttribute("onClick",`deleteBook("${myLibrary[index].title}")`);
    deleteButton.textContent = ("X");
    Card.appendChild(deleteButton);

    let Title = document.createElement("p");
    Title.setAttribute("id","title");
    Title.textContent = (myLibrary[index].title);
    Card.appendChild(Title);

    let Author = document.createElement("p");
    Author.setAttribute("id","author");
    Author.textContent = (myLibrary[index].author);
    Card.appendChild(Author);

    let Pages = document.createElement("p");
    Pages.setAttribute("id","pages");
    Pages.textContent = (myLibrary[index].pages);
    Card.appendChild(Pages);
    
    myLibrary[index].outputHasRead();

    let isRead = document.createElement("button");
    isRead.setAttribute("id",`read${index}`);
    isRead.setAttribute("onClick",`readStatus(${index})`);
    isRead.textContent = (textOutput);
    Card.appendChild(isRead);
}

const newBookButton = document.querySelector("#newBook");
newBookButton.addEventListener("click", function(){addBookToLibrary()});

function AddBookButton(){
    let title = document.getElementById("titleBox").value;
    let author = document.getElementById("authorBox").value;
    let pages = document.getElementById("pagesBox").value;
    let hasRead = document.getElementById("hasReadBox").checked;
    let newBook = new Book(title,author,pages,hasRead);
    myLibrary.push(newBook);
    render();
    container.remove();
    container = undefined;
}

let container = undefined
function addBookToLibrary(){
    
    if(container === undefined){
    container = document.createElement('div');
    container.setAttribute("class","form");
    content.appendChild(container);

    let header = document.createElement('p');
    header.textContent = "New Book";
    container.appendChild(header);

    let form = document.createElement('form');
    form.setAttribute("id","formBox");
    form.setAttribute("method","post");
    container.appendChild(form);

    let title = document.createElement('label');
    title.setAttribute("for","titleBox");
    title.textContent = "Title: ";
    form.appendChild(title);

    let titleBox = document.createElement('input');
    titleBox.setAttribute('type','text');
    titleBox.setAttribute('id','titleBox');
    titleBox.setAttribute('name','title');
    form.appendChild(titleBox);

    let author = document.createElement('label');
    author.setAttribute('for','authorBox');
    author.textContent = "Author: ";
    form.appendChild(author);

    let authorBox = document.createElement('input');
    authorBox.setAttribute('type','text');
    authorBox.setAttribute('id','authorBox');
    authorBox.setAttribute('name','author');
    form.appendChild(authorBox);

    let pages = document.createElement('label');
    pages.setAttribute('for','pagesBox');
    pages.textContent = "Pages: ";
    form.appendChild(pages);

    let pagesBox = document.createElement('input');
    pagesBox.setAttribute('id','pagesBox');
    pagesBox.setAttribute('type','number');
    pagesBox.setAttribute('name','pages')
    form.appendChild(pagesBox);

    let isRead = document.createElement('label');
    isRead.setAttribute('for','hasReadBox');
    isRead.textContent = "Is read?";
    form.appendChild(isRead);

    let isReadBox = document.createElement('input');
    isReadBox.setAttribute('id','hasReadBox');
    isReadBox.setAttribute('type','checkbox');
    isReadBox.setAttribute('name','hasRead')
    form.appendChild(isReadBox);

    let newBookButton = document.createElement('button');
    newBookButton.setAttribute('id','addBookButton');
    newBookButton.setAttribute('type','button');
    newBookButton.setAttribute("onclick",`AddBookButton()`);
    newBookButton.textContent = "Add Book";
    form.appendChild(newBookButton);
    }
}

function deleteBook(input){
    const getIndexNumber = myLibrary.findIndex(i => i.title === input);
    myLibrary.splice(getIndexNumber, 1);
    render();
}

function readStatus(input){
    
    if(myLibrary[input].hasRead === true){
        myLibrary[input].hasRead = false;
        let buttonText = document.querySelector(`#read${input}`);
        myLibrary[input].outputHasRead();
        buttonText.textContent = (textOutput);
    }else{
        myLibrary[input].hasRead = true;
        let buttonText = document.querySelector(`#read${input}`);
        myLibrary[input].outputHasRead();
        buttonText.textContent = (textOutput);
    }
}
render();