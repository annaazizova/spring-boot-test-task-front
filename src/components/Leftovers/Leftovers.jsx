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
      <div className="Leftovers">
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "ID",
                accessor: "id",
              },
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "Brand",
                accessor: "brand",
              },
              {
                Header: "Price",
                accessor: "price",
              },
              {
                Header: "Quantity",
                accessor: "quantity",
              }
            ]}
            loading={isLoading}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
        <button onClick={this.backToProducts}>Back to products</button>
      </div>
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