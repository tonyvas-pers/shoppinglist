document.body.onload = () => {
    setupUserTable();
    setupCreateUser();
}

function setupCreateUser(){
    document.getElementById('name_btn').onclick = () => {
        let username = document.getElementById('name_txt').value;
    
        fetch('/api/user', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({user: username})
        }).then(res => res.json()).then(res => {
            if (res.error){
                console.error(error);
                alert(`Error: ${res.data}`)
            }
            else{
                addUserRow(username);
            }
        }).catch(err => {
            console.error(err);
            alert('Fetch error!')
        })
    }
}

function setupUserTable(){
    fetch('/api/user').then(res => res.json()).then(res => {
        if (res.error){
            console.error(res);
            alert(`Error: ${res.data}`)
        }
        else{
            for (let name of res.data){
                addUserRow(name);
            }
        }
    }).catch(err => {
        console.error(err);
        alert('Fetch error!')
    })
}

function addUserRow(name){
    let tbody = document.getElementById('user_tbody');
    let tr = document.createElement('tr'); 
    let nameTD = document.createElement('td');
    let optionsTD = document.createElement('td');
    let loginBtn = document.createElement('button')
    let deleteBtn = document.createElement('button')

    tbody.appendChild(tr)
    tr.appendChild(nameTD);
    tr.appendChild(optionsTD);
    optionsTD.appendChild(loginBtn);
    optionsTD.appendChild(deleteBtn);

    nameTD.innerHTML = name;

    optionsTD.style.display = 'flex'
    optionsTD.style.justifyContent = 'space-between'

    loginBtn.innerHTML = 'Login';
    loginBtn.onclick = () => {
        window.name = name;
        window.location = '/collections'
    }

    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = () => {
        fetch('/api/user', {
            method: 'DELETE', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({user: name})
        }).then(res => res.json()).then(res => {
            if (res.error){
                console.error(error);
                alert(`Error: ${res.data}`)
            }
            else{
                tbody.removeChild(tr);
            }
        }).catch(err => {
            console.error(err);
            alert('Fetch error!')
        })
    }
}