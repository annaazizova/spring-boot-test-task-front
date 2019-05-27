import React from 'react';
import { connect } from 'react-redux';
import '../LoginPage/LoginPage.css';
import { login, usernameChanged, passwordChanged } from '../../actions';

class LoginPage extends React.Component {
    render() {
        const { username, password } = this.props;
        return (
            <div className="LoginPage">
                <h2>Login</h2>
                <form className="form" onSubmit={this.handleSubmit}>
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
                    <div>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        );
    }
    
    handleChange = event => {
        if (event.target.name === "username")
            this.props.usernameChanged(event.target.value);
        if (event.target.name === "password")
            this.props.passwordChanged(event.target.value);
    }

    handleSubmit = event => {
        event.preventDefault();

        const { username, password } = this.props;
        if (username && password) {
            this.props.login('http://localhost:8080/login',username, password);//TODO add login url
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
    usernameChanged,
    passwordChanged,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);