import React from 'react';

import { connect } from 'react-redux';

import { login, logout } from '../actions';

class LoginPage extends React.Component {
    render() {
        this.props.logout();

        const { username, password } = this.props;
        return (
            <div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (!username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {!username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (!password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {!password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
    

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { username, password } = this.props;
        if (username && password) {
            this.props.login('loginurl',username, password);//TODO add login url
        }
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username,
        password: state.password,
        loggedIn: state.loggedIn,
    };
};
  
const mapDispatchToProps = {
    login,
    logout
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);