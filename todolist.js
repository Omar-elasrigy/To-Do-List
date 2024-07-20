// getting elements
let container=document.getElementById("containerParent")
let input=document.querySelector("input[type='text']")
let button=document.getElementsByTagName("button")[0]
let deleteButton=document.getElementById("image2")
let id=0

id = Object.keys(localStorage).length + 1;
button.addEventListener("click",function(e){
    // localStorage.clear()
    if(input.value=="")
        {
                e.preventDefault()
            return
        }
    if(button.innerText=="Add")
    {
        let toDo=input.value;
        id+=1
        localStorage.setItem(id,JSON.stringify(toDo))
        let item=JSON.parse(localStorage.getItem(id))
        let html=`
        <div class="container2 each" data-id="${id}">
            <div id="c1" class="itemValue">${item}</div>
            <div id="c2"><img id="image1" src="images/edit.png" class="edit"></div>
            <div id="c3"><img id="image2" class="delete" src="images/delete.png"></div>
        </div>
      `
       container.insertAdjacentHTML("beforeend",html)
       input.value="";
    }
    else if(button.innerText=="Edit")
    {
        let row=document.querySelector(".nowEditing")
        
        let rowId=row.getAttribute("data-id")
        localStorage.setItem(rowId,JSON.stringify(input.value))
        let editedItem=JSON.parse(localStorage.getItem(rowId))
        row.querySelector(".itemValue").innerText=editedItem
        button.innerText="Add"
        input.value=""
    } 
})
container.addEventListener("click",function(e){
    if(e.target.classList.contains("delete"))
    {
        let row=e.target.closest(".each")
        row.remove()
        let rowId=row.getAttribute("data-id")
        localStorage.removeItem(rowId)
    }

    if(e.target.classList.contains("edit"))
        {
        let row=e.target.closest(".each")
        let value = row.querySelector(".itemValue").innerText
           input.value=value
           button.innerText="Edit"
           document.querySelectorAll(".nowEditing").forEach(function(item){
            item.classList.remove("nowEditing")
           })
           row.classList.add("nowEditing")
        }
})


