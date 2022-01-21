let form = document.getElementById('loginForm');
form.addEventListener('submit',function(event){
    event.preventDefault();
    let info = new FormData(form);
    let sendObject={
        username:info.get('username')
    }
    fetch('/login',{
        method:"POST",
        body:JSON.stringify(sendObject),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>{
        location.replace('./pages/chat&products.html')
    })
})
