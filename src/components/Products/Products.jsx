import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Products/Products.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import { productsFetchData, productAddNew, productEdit, productDeleteById, leftoversFetchData, exportToXLS, newNameChanged, newBrandChanged, newPriceChanged, newQuantityChanged } from '../../actions';


class Products extends Component {
  render() {
    const { data, isLoading, name, brand, price, quantity, hasError, errorCode } = this.props;
    return (
      <div className="Products">
        {hasError && <h1 style={{color : 'red', fontSize: '16px'}}>Something went wrong. Error {errorCode}</h1>}
        <p className="Products-intro">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Brand:
              <input
                type="text"
                name="brand"
                value={brand}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={price}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Quantity:
              <input
                type="text"
                name="quantity"
                value={quantity}
                onChange={this.handleChange}
              />
            </label>{" "}  
            <input type="submit" value="Add" />
          </form>
        </p>
        <div>
          <ReactTable
            data={data}
            ref={(r) => {
              this.selectTable = r;
            }}
            filterable
            defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
            columns={[
              {
                Header: "ID",
                accessor: "id",
              },
              {
                Header: "Name",
                accessor: "name",
                Cell: this.renderEditable,
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["name"] }),
                filterAll: true
              },
              {
                Header: "Brand",
                accessor: "brand",
                Cell: this.renderEditable,
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["brand"] }),
                filterAll: true
              },
              {
                Header: "Price",
                accessor: "price",
                Cell: this.renderEditable,
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["price"] }),
                filterAll: true
              },
              {
                Header: "Quantity",
                accessor: "quantity",
                Cell: this.renderEditable,
                filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ["quantity"] }),
                filterAll: true
              },
              {
                id: "update",
                accessor: d => (
                  <button onClick={() => this.updateProduct(d.id, d.name, d.brand, d.price, d.quantity)}>Update</button>
                ),
                filterable: false
              },
              {
                id: "delete",
                accessor: d => (
                  <button onClick={() => this.deleteProduct(d.id)}>Delete</button>
                ),
                filterable: false
              }
            ]}
            loading={isLoading}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
        <div>
        <button onClick={this.exportToXLS}>Export shown to xls</button>
        <label/>{"   "}
        <button onClick={this.showLeftovers}>Show leftovers</button>
        </div>
      </div>
    );
  };

  handleChange = event => {
    if (event.target.name === "name")
      this.props.newNameChanged(event.target.value);
    if (event.target.name === "brand")
      this.props.newBrandChanged(event.target.value);
    if (event.target.name === "price")
      this.props.newPriceChanged(event.target.value);
    if (event.target.name === "quantity")
      this.props.newQuantityChanged(event.target.value);
  };

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.props.data[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  componentDidMount() {
    this.props.productsFetchData(`http://localhost:8080/api/products`);
  };

  handleSubmit = event => {
    this.props.productAddNew(`http://localhost:8080/api/products`, this.props.name, this.props.brand, this.props.price, this.props.quantity);
    event.preventDefault();
  };

  deleteProduct(id) {
    this.props.productDeleteById(`http://localhost:8080/api/products`, id);
  }

  updateProduct(id, name, brand, price, quantity) {
    this.props.productEdit(`http://localhost:8080/api/products`, id, name, brand, price, quantity);
  }

  exportToXLS = event => {
    const newData = this.selectTable.getResolvedState().sortedData.map(elem => ({ 
                                                                                  id: elem.id, 
                                                                                  name: elem.name, 
                                                                                  brand: elem.brand, 
                                                                                  price: elem.price, 
                                                                                  quantity: elem.quantity}));
    this.props.exportToXLS(`http://localhost:8080/api/products/export`, newData);
    event.preventDefault();
  }

  showLeftovers = event => {
    this.props.leftoversFetchData(`http://localhost:8080/api/products/leftovers`);
    event.preventDefault();
  }
}

const mapStateToProps = (state) => {
  return {
      data: state.data,
      hasError: state.hasError,
      errorCode: state.errorCode,
      isLoading: state.isLoading,
      page:state.page,
      id:state.id,
      name: state.name,
      brand:state.brand,
      price:state.price,
      quantity:state.quantity
  };
};

const mapDispatchToProps = {
  productsFetchData, 
  productAddNew, 
  productEdit, 
  productDeleteById,
  leftoversFetchData,
  exportToXLS,
  newNameChanged,
  newBrandChanged,
  newPriceChanged,
  newQuantityChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);