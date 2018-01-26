import React from 'react';
import { Switch, withRouter, Route, Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Login from '../login'
import Chart from '../chart'
import Authors from '../authors'
import PrivateRoute from '../../components/PrivateRoute'
import { Layout, Menu } from 'antd';
const { Header, Footer, Content } = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null
        };
    }

    componentDidMount() {
        const storageKey = 'isAuth'

        this.props.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                window.localStorage.setItem(storageKey, user.uid);
                this.setState({uid: user.uid});
            } else {
                window.localStorage.removeItem(storageKey);
                this.setState({uid: null});
            }
        });
    }

    render() {
        return (
            <Layout className="site">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[this.props.location.pathname]}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="/"><Link to="/">Chart</Link></Menu.Item>
                        <Menu.Item key="/authors"><Link to="/authors">Authors</Link></Menu.Item>
                        {/*<Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>*/}
                    </Menu>
                </Header>
                <Layout>
                    <Content className="site-content">
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/" component={Chart} />
                            <PrivateRoute path="/authors" component={Authors} />
                        </Switch>
                    </Content>
                </Layout>
                <Footer>footer</Footer>
            </Layout>
        )
    }
}


export default withRouter(
    compose(
        firebaseConnect(),
        connect(({ firebase: { auth } }) => ({ auth }))
    )(App)
)