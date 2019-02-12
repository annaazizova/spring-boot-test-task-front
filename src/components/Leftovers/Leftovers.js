import React, { Component } from 'react';
import '../Leftovers/Leftovers.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { productsFetchData } from '../../actions';
import { connect } from 'react-redux';

class Leftovers extends Component {
  render() {
    const { data, isLoading } = this.props;
    return (
      <div className="Products">
        <button onClick={this.backToProducts}>Back to products</button>
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "ID",
                accessor: "id",
                Cell: this.renderEditable
              },
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
                Cell: this.renderEditable,
              },
              {
                Header: "Quantity",
                accessor: "quantity",
                Cell: this.renderEditable
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

  backToProducts = () => {
    this.props.productsFetchData(`http://localhost:8080/api/products`);
  }
}

const mapStateToProps = (state) => {
  return {
      data: state.data,
      hasError: state.hasError,
      isLoading: state.isLoading,
      page:state.page,
  };
};

const mapDispatchToProps = {
  productsFetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leftovers);