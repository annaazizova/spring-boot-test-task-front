import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Hamoni from "hamoni-sync";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      name: "",
      brand: "",
      price: "",
      quantity: ""
    };
  }

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

  handleSubmit = event => {
    event.preventDefault();
  };

  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          let row = this.state.data[cellInfo.index];
          row[cellInfo.column.id] = e.target.innerHTML;
          this.listPrimitive.update(cellInfo.index, row);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };

  render() {
    const { data } = this.state;
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
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Brand:
              <input
                type="text"
                name="brand"
                value={this.state.brand}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Quantity:
              <input
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </label> 
            <input type="submit" value="Add" />
          </form>
        </p>
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Name",
                accessor: "name",
                Cell: this.renderEditable
              },
              {
                Header: "Brand",
                accessor: "brand",
                Cell: this.renderEditable
              },
              {
                Header: "Price",
                accessor: "price",
                Cell: this.renderEditable
              },
              {
                Header: "Quantity",
                accessor: "quantity",
                Cell: this.renderEditable
              },
              {
                Header: "Name and Brand",
                id: "prioduct",
                accessor: d => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: d.name + " " + d.brand
                    }}
                  />
                )
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  };

  componentDidMount() {
    let hamoni = new Hamoni("41eacaa1-9b87-4c0c-823c-0bdf7ee6036e", "1089a468da6f44e1ab9c80e50055d39f");
    hamoni
      .connect()
      .then(() => {
          hamoni
        .get("datagrid")
        .then(listPrimitive => {
          this.listPrimitive = listPrimitive;
          this.setState({
            data: [...listPrimitive.getAll()]
          });
          listPrimitive.onItemAdded(item => {
            this.setState({ data: [...this.state.data, item.value] });
          });
          listPrimitive.onItemUpdated(item => {
            let data = [
            ...this.state.data.slice(0, item.index),
            item.value,
            ...this.state.data.slice(item.index + 1)
            ];
            this.setState({ data: data });
          });
          listPrimitive.onSync(data => {
            this.setState({ data: data });
          });
      })
      .catch(console.log);
      })
      .catch(console.log);
  };

  handleSubmit = event => {
    this.listPrimitive.push({
        name: this.state.name,
        brand: this.state.brand,
        price: this.state.price,
        quantity: this.state.quantity
    });
    this.setState({ name: "", brand: "", price: "", quantity:"" });
    event.preventDefault();
  };
}

export default App;
