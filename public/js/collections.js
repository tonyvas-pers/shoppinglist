document.body.onload = () => {
    if (window.name){
        loadCollections()
    }
    else{
        window.location = '/'
    }
}

function loadCollections(){
    fetchCollectionNames().then(names => {
        for (let name of names){
            fetchCollection(name).then(collection => {
                createCollectionTable(collection);
            }).catch(err => {
                console.error(err);
                alert(`Error: ${err.message}`)
            })
        }
    }).catch(err => {
        console.error(err);
        alert(`Error: ${err.message}`)
    })
}

function createCollectionTable(collection){
    let main = document.getElementsByTagName('main')[0]
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let table = document.createElement('table');

    h2.innerHTML = collection.name
    
    table.appendChild(createCollectionTableColg())
    table.appendChild(createCollectionTableHead())
    table.appendChild(createCollectionTableBody(collection))
    div.appendChild(h2)
    div.appendChild(table)
    main.appendChild(div)
}

function createCollectionTableColg(){
    let colg = document.createElement('colgroup');
    let nameCol = document.createElement('col')
    let priceCol = document.createElement('col')

    nameCol.style.width = '80%'
    priceCol.style.width = '20%'

    colg.appendChild(nameCol)
    colg.appendChild(priceCol)

    return colg;
}

function createCollectionTableHead(){
    let thead = document.createElement('thead');
    let nameTH = document.createElement('th')
    let priceTH = document.createElement('th')

    nameTH.innerHTML = 'Name'
    priceTH.innerHTML = 'Price'

    thead.appendChild(nameTH)
    thead.appendChild(priceTH)

    return thead;
}

function createCollectionTableBody(collection){
    let tbody = document.createElement('tbody');

    collectionRange = calculateCollectionPriceRange(collection);
    tbody.appendChild(createCollectionTableBodyRow(`Collection: ${collection.name}`, `${collectionRange.min} - ${collectionRange.max}`, 'lime', 0))

    for (let item of collection.contents.items){
        tbody.appendChild(createCollectionTableBodyRow(item.name, item.price, 'green', 1))
    }

    for (let choice of collection.contents.choices){
        let choiceRange = calculateChoicePriceRange(choice);
        tbody.appendChild(createCollectionTableBodyRow(`Choice: ${choice.name}`, `${choiceRange.min} - ${choiceRange.max}`, 'green', 1))

        for (let option of choice.contents.options){
            let price = calculateItemsPrice(option.contents.items);
            tbody.appendChild(createCollectionTableBodyRow(`Option: ${option.name}`, price, 'darkgreen', 2))

            for (let item of option.contents.items){
                tbody.appendChild(createCollectionTableBodyRow(item.name, item.price, 'white', 3))
            }
        }
    }

    return tbody;
}

function createCollectionTableBodyRow(name, price, color, indent = 0){
    let tr = document.createElement('tr');
    let nameTD = document.createElement('td');
    let priceTD = document.createElement('td');

    nameTD.innerHTML = `${'----'.repeat(indent)}${name}`;
    priceTD.innerHTML = price

    nameTD.style.color = color;
    priceTD.style.color = color;

    tr.appendChild(nameTD)
    tr.appendChild(priceTD)

    return tr;
}

function calculateCollectionPriceRange(collection){
    let min = 0;
    let max = 0;

    for (let choice of collection.contents.choices){
        let range = calculateChoicePriceRange(choice);
        min += range.min;
        max += range.max;
    }

    return {min, max}
}

function calculateChoicePriceRange(choice){
    let min = null;
    let max = null;

    for (let option of choice.contents.options){
        let price = calculateItemsPrice(option.contents.items);
        
        if (min === null){
            min = price
            max = price
        }
        else{
            if (price < min){
                min = price
            }
            if (price > max){
                max = price
            }
        }
    }

    return {min, max}
}

function calculateItemsPrice(items){
    let price = 0;
    for (let item of items){
        price += item.price;
    }
    return price;
}


function fetchCollectionNames(){
    return new Promise((resolve, reject) => {
        fetch(`/api/user/collection?user=${window.name}`).then(res => res.json()).then(res => {
            if (res.error){
                reject(new Error(res.data));
            }
            else{
                resolve(res.data);
            }
        }).catch(err => {
            reject(err)
        })
    })
}

function fetchCollection(name){
    return new Promise((resolve, reject) => {
        fetch(`/api/user/collection?user=${window.name}&collection=${name}`).then(res => res.json()).then(res => {
            if (res.error){
                reject(new Error(res.data));
            }
            else{
                resolve(res.data);
            }
        }).catch(err => {
            reject(err)
        })
    })
}