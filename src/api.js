export function productsFetchData(url) {
    return new Promise((resolve, reject) => {;
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