const fs = require('fs');

function getUserNamesList(){
    return new Promise((resolve, reject) => {
        // Read folders in userdata dir
        fs.readdir(process.env.USER_DATA_DIR, (err, files) => {
            if (err){
                reject(err)
            }
            else{
                let names = [];
                // Filter out hidden files (deleted users)
                for (let file of files){
                    if (!file.startsWith('.')){
                        names.push(file)
                    }
                }

                resolve(names);
            }
        })
    })
}

function createUser(user){
    return new Promise((resolve, reject) => {
        if (user){
            if (!user.startsWith('.')){
                if (!checkExists(user)){
                    // Create folder for user in userdata dir
                    fs.mkdir(getUserPath(user), (err) => {
                        if (err){
                            reject(err)
                        }
                        else{
                            resolve();
                        }
                    })
                }
                else{
                    reject(new Error('Username already in use'));
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

function deleteUser(user){
    return new Promise((resolve, reject) => {
        if (user){
            if (!user.startsWith('.')){
                if (checkExists(user)){
                    // Rename user folder to hidden and append timestamp
                    let newpath = `${process.env.USER_DATA_DIR}/.${user}-${new Date().getTime()}`;
                    fs.rename(getUserPath(user), newpath, (err) => {
                        if (err){
                            reject(err)
                        }
                        else{
                            resolve();
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

function getUserPath(user){
    return `${process.env.USER_DATA_DIR}/${user}`
}

function checkExists(user){
    return fs.existsSync(getUserPath(user));
}

module.exports = {getUserNamesList, createUser, deleteUser};