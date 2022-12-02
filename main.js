const add_button=document.querySelector(".add_button")
const title_input=document.querySelector(".title_input")
const author_input=document.querySelector(".author_input")
const pages_input=document.querySelector(".pages_input")
const read_input=document.querySelector(".read_input")
const table=document.querySelector(".table")
const newButton=document.querySelector(".newButton")
const form=document.querySelector(".form-invisible")

let bookArray=[]

newButton.addEventListener("click",function(){
    form.setAttribute("class","form-visible")
})

add_button.addEventListener("click",function(){
    if(title_input.value!="" || author_input.value!="" || pages_input.value!="")
    {
        bookArray.push(new book(title_input.value,author_input.value,pages_input.value,read_input.checked,table))
        title_input.value=""
        author_input.value=""
        pages_input.value=""
        read_input.checked=false
        bookArray[bookArray.length-1].makeBookRow()
    }
    form.setAttribute("class","form-invisible")
})

function book(title,author,pages,read,table){
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read
    this.table=table
    this.list=[title,author,pages,read]
    this.listSelector=[]
    
    this.makeBookRow=function(){
        this.bookRow=document.createElement("div")
        this.table.appendChild(this.bookRow)
        for(i in [1,2,3,4]){
            this.newCell=document.createElement("div")
            this.listSelector.push(this.newCell)
            this.newCell.textContent=this.list[i]
            this.bookRow.appendChild(this.newCell)
        }
        
        this.newCell=document.createElement("div")
        this.listSelector.push(this.newCell)
        this.newCell.setAttribute("class","readButton")
        this.newCell.textContent="mark as read"
        this.bookRow.appendChild(this.newCell)
        this.newCell.setAttribute("data",bookArray.length-1)
        this.newCell.addEventListener("click",function(e){
            index=parseInt(e.target.getAttribute("data"))
            bookArray[index].read="true"
            bookArray[index].listSelector[3].textContent="true"
            e.target.setAttribute("class","invisible")
        })

        this.newCell=document.createElement("div")
        this.listSelector.push(this.newCell)
        this.newCell.setAttribute("class","delete-button")
        this.newCell.textContent="x"
        this.newCell.setAttribute("data",bookArray.length-1)
        this.bookRow.appendChild(this.newCell)
        this.newCell.addEventListener("click",function(e){
            index=parseInt(e.target.getAttribute("data"))
            bookArray[index].bookRow.remove()
            bookArray.splice(index,1)
            for(i=0 ;i<bookArray.length;i++){
                bookArray[i].listSelector[4].setAttribute("data",i)
                bookArray[i].listSelector[5].setAttribute("data",i)
            }
        })

    }
}