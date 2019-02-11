export function productHasErrored(bool) {
    return {
        type: 'PRODUCT_HAS_ERRORED',
        hasErrored: bool
    };
}

export function productIsLoading(bool) {
    return {
        type: 'PRODUCT_IS_LOADING',
        isLoading: bool
    };
}

export function productAddNew(url, name, brand, price, quantity) {
    return (dispatch) => {
        dispatch(productIsLoading(true));

        fetch(url, 
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name:name, brand:brand, price:price, quantity:quantity})
            })
            .then((response) => {
                if (!response.ok) { //TODO change status
                    throw Error(response.statusText);
                }

                dispatch(productIsLoading(false));

                return response;
            })
            .catch(() => dispatch(productHasErrored(true)));
    };
  };

export function productEdit(id, name, brand, price, quantity) {
    return {
        type: 'PRODUCT_EDIT',
        id,
        name,
        brand,
        price, 
        quantity
    };
}

export function productDelete(id) {
    return {
        type: 'PRODUCT_DELETE',
        id
    };
}