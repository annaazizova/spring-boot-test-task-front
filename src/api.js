export function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    reject({
                        status: response.status,
                    });
                }

                return response;
            })
            .then(response => response.json())
            .then(data => {
                if ('errorCode' in data) {
                    reject(data);
                } else {
                    resolve(data);
                }
            })
            .catch(reject);
    });
}

export function productAddNew(url, name, brand, price, quantity) {
    return new Promise((resolve, reject) => {
        fetch(url,
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name:name, brand:brand, price:price, quantity:quantity})
              }
            )
            .then(response => {
                if (response.status !== 200) {//TODO change status
                    reject({
                        status: response.status,
                    });
                }

                return response;
            })
            .then(response => response.json())
            .then(id => {
                if ('errorCode' in id) {
                    reject(id);
                } else {
                    resolve(id);
                }
            })
            .catch(reject);
    });
}

export function productDeleteById(url, id) {
    return new Promise((resolve, reject) => {
        fetch(url + '/' + id,
            {
                method: 'DELETE',
              }
            )
            .then(response => {
                if (response.status !== 200) {//TODO change status
                    reject({
                        status: response.status,
                    });
                }

                return response;
            })
            .then(response => response.json())
            .then(data => { //TODO maybe remove data
                if ('errorCode' in data) {
                    reject();
                } else {
                    resolve();
                }
            })
            .catch(reject);
    });
}

export function productEdit(url, id, name, brand, price, quantity) {
    return new Promise((resolve, reject) => {
        fetch(url + '/' + id,
            {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({id:id, name:name, brand:brand, price:price, quantity:quantity})
            })
            .then(response => {
                if (response.status !== 200) {//TODO change status
                    reject({
                        status: response.status,
                    });
                }

                return response;
            })
            .then(response => response.json())
            .then(data => { //TODO maybe remove data
                if ('errorCode' in data) {
                    reject();
                } else {
                    resolve();
                }
            })
            .catch(reject);
    });
}

export function exportToXLS(url, data) {
    return new Promise((resolve, reject) => {
        fetch(url,
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ data })
            })
            .then(response => {
                if (response.status !== 200) {//TODO change status
                    reject({
                        status: response.status,
                    });
                }

                return response;
            })
            .then(response => response.json())
            .then(data => { //TODO maybe remove data
                if ('errorCode' in data) {
                    reject();
                } else {
                    resolve();
                }
            })
            .catch(reject);
    });
}

export function login(url, username, password) {
    return new Promise((resolve, reject) => {
        fetch(url,
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ username:username, password:password })
            })
            .then(response => {
                if (response.status !== 200) {//TODO change status
                    reject({
                        status: response.status,
                    });
                }

                return response;
            })
            .then(response => response.json())
            .then(userRole => { //TODO maybe remove data
                if ('errorCode' in userRole) {
                    reject();
                } else {
                    resolve(userRole);
                }
            })
            .catch(reject);
    });
}

export function logout(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.status !== 200) {//TODO change status
                    reject({
                        status: response.status,
                    });
                }

                return response;
            })
            .then(response => response.json())
            .then(data => { //TODO maybe remove data
                if ('errorCode' in data) {
                    reject();
                } else {
                    resolve();
                }
            })
            .catch(reject);
    });
}