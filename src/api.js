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
                if (response.status !== 201) {
                    reject({
                        status: response.status,
                    });
                }

                return response;
            })
            .then(response => response.json())
            .then(product => {
                resolve(product.id);
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
                if (response.status !== 204) {
                    reject({
                        status: response.status,
                    });
                }
                return response;
            })
            .then(() => {
                resolve(id);
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
                if (response.status !== 200) {
                    reject({
                        errorCode: response.status,
                    });
                }
                return;
            })
            .then(() => {
                resolve(id, name, brand, price, quantity);
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
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status !== 200) {
                    reject({
                        errorCode: response.status,
                    });
                }
                return response;
            })
            .then(() => { 
                resolve();
            })
            .catch(reject);
    });
}

export function login(url, username, password) {
    let details = {
        'username': username,
        'password': password
    };

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return new Promise((resolve, reject) => {
        fetch(url,
            {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: formBody
            })
            .then(response => {
                if (response.status !== 200) {
                    reject({
                        errorCode: response.status,
                    });
                }

                return response;
            })
            .then(response => response.json())
            .then(userRole => { 
                resolve(userRole);
            })
            .catch(reject);
    });
}
