import { Component } from 'react'

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInUsername: '',
            signInPassword: ''
        }
    }

    // componentDidMount() {

    // }

    onUsernameChange = (event) => {
        this.setState({ signInUsername: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('https://smartbrain-api-roai.onrender.com/signin', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.signInUsername,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user._id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                                <input
                                    onChange={this.onUsernameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="username"
                                    id="username" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.onSubmitSignIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                className="f6 link dim black db pointer"
                                onClick={() => onRouteChange('register')}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Signin;
