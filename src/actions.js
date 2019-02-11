import * as api from './api';

export function fetchData(url) {
    return (dispatch) => {
        setTimeout(() => {
            
            dispatch({
                type: 'IS_LOADING',
            });

            api.fetchData(url)
                .then(data => {
                    dispatch({
                        type: 'PRODUCTS_FETCH_DATA_RESOLVE',
                        data,
                    });
                })
                .catch(() => {
                    dispatch({
                        type: 'HAS_ERROR',
                    });
                });
        }, 0);
    };
}

export function productAddNew(url, name, brand, price, quantity) {
    return (dispatch) => {
        setTimeout(() => {
            
            dispatch({
                type: 'IS_LOADING',
            });

            api.fetchData(url, {
                
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name:name, brand:brand, price:price, quantity:quantity})
                

            })
                .then(id => {
                    dispatch({
                        type: 'PRODUCT_ADD_NEW_RESOLVE',
                        id,
                    });
                })
                .catch(() => {
                    dispatch({
                        type: 'HAS_ERROR',
                    });
                });
        }, 0);
    };
  };