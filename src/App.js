import React from 'react';
import './App.css';
import "react-table/react-table.css";
import { connect } from 'react-redux';
import logo from './logo.svg';
import Products from './components/Products/Products';
import LoginPage from './components/LoginPage/LoginPage';
import Leftovers from './components/Leftovers/Leftovers';

class App extends React.Component {
    componentDidMount() {
    }

    render() {
        const { page } = this.props;

        let Content;
        switch (page) {
            case 'LOGIN_PAGE':
                Content = LoginPage;
                break;
            case 'PRODUCTS':
                Content = Products;
                break;
            case 'LEFTOVERS':
                Content = Leftovers;
                break;
            default:
                Content = LoginPage;
        }

        return (  
            <div>
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Spring boot test task</h1>
                </div> 
                <Content />
            </div>
               
        );
    }
}
const mapStateToProps = (state) => {
    return {
        page:state.page,
    };
  };
  
  const mapDispatchToProps = {
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(App);