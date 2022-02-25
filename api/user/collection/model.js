const fs = require('fs');

function getCollectionNames(user){
    return new Promise((resolve, reject) => {
        if (user){
            if (!user.startsWith('.')){
                if (checkUserExists(user)){
                    fs.readdir(getUserPath(user), (err, files) => {
                        if (err){
                            reject(err)
                        }
                        else{
                            let names = [];
                            // Filter out hidden files (deleted collections)
                            for (let file of files){
                                if (!file.startsWith('.')){
                                    names.push(file)
                                }
                            }
            
                            resolve(names);
                        }
                    })
                }
                else{
                    reject(new Error('User does not exist'));
                }
            }
            else{
                reject(new Error('Username cannot start with a "."'));
            }
        }
        else{
            reject(new Error('No username provided'));
        }
    })
}

function getCollection(user, collection){
    return new Promise((resolve, reject) => {
        // Check user
        if (user){
            if (!user.startsWith('.')){
                if (checkUserExists(user)){
                    // Check collection
                    if (collection){
                        if (!collection.startsWith('.')){
                            if (checkCollectionExists(user, collection)){
                                // Read the collection json
                                fs.readFile(getCollectionPath(user, collection), 'utf-8', (err, data) => {
                                    if (err){
                                        reject(err)
                                    }
                                    else{
                                        // Parse json and return it
                                        resolve(JSON.parse(data));
                                    }
                                })
                            }
                            else{
                                reject(new Error('Collection does not exist'));
                            }
                        }
                        else{
                            reject(new Error('Collection name cannot start with a "."'));
                        }
                    }
                    else{
                        reject(new Error('No collection name provided'));
                    }
                }
                else{
                    reject(new Error('User does not exist'));
                }
            }
            else{
                reject(new Error('Username cannot start with a "."'));
            }
        }
        else{
            reject(new Error('No username provided'));
        }
    })
}

function createCollection(user, collection){
    return new Promise((resolve, reject) => {
        // Check user
        if (user){
            if (!user.startsWith('.')){
                if (checkUserExists(user)){
                    // Check collection
                    if (collection){
                        if (!collection.startsWith('.')){
                            if (!checkCollectionExists(user, collection)){
                                // Read default collection json
                                fs.readFile(process.env.DEFAULT_COLLECTION_JSON_PATH, 'utf-8', (err, data) => {
                                    if (err){
                                        reject(err)
                                    }
                                    else{
                                        // Parse and rename default collection
                                        let collectionObj = JSON.parse(data);
                                        collectionObj.name = collection;
                                        // Write new collection
                                        fs.writeFile(getCollectionPath(user, collection), JSON.stringify(collectionObj), 'utf-8', (err) => {
                                            if (err){
                                                reject(err);
                                            }
                                            else{
                                                resolve();
                                            }
                                        })
                                    }
                                })
                            }
                            else{
                                reject(new Error('Collection already exists'));
                            }
                        }
                        else{
                            reject(new Error('Collection name cannot start with a "."'));
                        }
                    }
                    else{
                        reject(new Error('No collection name provided'));
                    }
                }
                else{
                    reject(new Error('User does not exist'));
                }
            }
            else{
                reject(new Error('Username cannot start with a "."'));
            }
        }
        else{
            reject(new Error('No username provided'));
        }
    })
}

function updateCollection(user, collection, json){
    return new Promise((resolve, reject) => {
        // Check user
        if (user){
            if (!user.startsWith('.')){
                if (checkUserExists(user)){
                    // Check collection
                    if (collection){
                        if (!collection.startsWith('.')){
                            if (checkCollectionExists(user, collection)){
                                // Write json to file
                                fs.writeFile(getCollectionPath(user, collection), json, (err) => {
                                    if (err){
                                        reject(err)
                                    }
                                    else{
                                        resolve();
                                    }
                                })
                            }
                            else{
                                reject(new Error('Collection does not exist'));
                            }
                        }
                        else{
                            reject(new Error('Collection name cannot start with a "."'));
                        }
                    }
                    else{
                        reject(new Error('No collection name provided'));
                    }
                }
                else{
                    reject(new Error('User does not exist'));
                }
            }
            else{
                reject(new Error('Username cannot start with a "."'));
            }
        }
        else{
            reject(new Error('No username provided'));
        }
    })
}

function deleteCollection(user, collection){
    return new Promise((resolve, reject) => {
        // Check user
        if (user){
            if (!user.startsWith('.')){
                if (checkUserExists(user)){
                    // Check collection
                    if (collection){
                        if (!collection.startsWith('.')){
                            if (checkCollectionExists(user, collection)){
                                // Rename collection json to hidden and append timestamp
                                let newpath = `${getUserPath(user)}/.${collection}-${new Date().getTime()}.json`;
                                fs.rename(getCollectionPath(user, collection), newpath, (err) => {
                                    if (err){
                                        reject(err)
                                    }
                                    else{
                                        resolve();
                                    }
                                })
                            }
                            else{
                                reject(new Error('Collection does not exist'));
                            }
                        }
                        else{
                            reject(new Error('Collection name cannot start with a "."'));
                        }
                    }
                    else{
                        reject(new Error('No collection name provided'));
                    }
                }
                else{
                    reject(new Error('User does not exist'));
                }
            }
            else{
                reject(new Error('Username cannot start with a "."'));
            }
        }
        else{
            reject(new Error('No username provided'));
        }
    })
}

function getUserPath(user){
    return `${process.env.USER_DATA_DIR}/${user}`
}

function getCollectionPath(user, collection){
    return `${getUserPath(user)}/${collection}.json`
}

function checkUserExists(user){
    return fs.existsSync(getUserPath(user));
}

function checkCollectionExists(user, collection){
    return fs.existsSync(getCollectionPath(user, collection));
}

module.exports = {getCollectionNames, getCollection, createCollection, updateCollection, deleteCollection};