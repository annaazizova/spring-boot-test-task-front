import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import { productsFetchData, productAddNew, productEdit, productDeleteById, leftoversFetchData, exportToXLS } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { data, isLoading, name, brand, price, quantity } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spring boot test task</h1>
        </div>
        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <h3>Add new product</h3>
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
        <button onClick={this.exportToXLS}>Export shown to xls</button>
        <label/>{" "}
        <button onClick={this.showLeftovers}>Show leftovers</button>
        </div>
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
                Cell: this.renderEditable
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
      </div>
    );
  };

  handleChange = event => {
    if (event.target.name === "name")
      this.setState({ name: event.target.value });
    if (event.target.name === "brand")
      this.setState({ brand: event.target.value });
    if (event.target.name === "price")
      this.setState({ price: event.target.value });
    if (event.target.name === "quantity")
      this.setState({ quantity: event.target.value });
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
          this.listPrimitive.update(cellInfo.index, row);
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
    this.props.productAddNew(`http://localhost:8080/api/products`, event.name, event.brand, event.price, event.quantity);
    event.preventDefault();
  };

  deleteProduct(id) {
    this.props.productDeleteById(`http://localhost:8080/api/products`, id);
  }

  exportToXLS = event => {
    console.log('Export data to xls = [' + this.selectTable.getResolvedState().sortedData + ']');
    this.props.exportToXLS(`http://localhost:8080/api/products/export`, this.selectTable.getResolvedState().sortedData);
    event.preventDefault();
  }

  showLeftovers() {
    this.props.leftoversFetchData(`http://localhost:8080/api/products/leftovers`);
  }
}

const mapStateToProps = (state) => {
  return {
      data: state.data,
      hasError: state.hasError,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);