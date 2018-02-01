import React from 'react';
import {Switch, withRouter, Route} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import Login from '../login'
import Chart from '../chart'
import Authors from '../authors'
import PrivateRoute from '../../components/PrivateRoute'
import {Layout, Menu} from 'antd';
const {Header, Footer, Content} = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: null,
            selectedKeys: []
        }
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

    componentWillReceiveProps() {
        this.setState({ selectedKeys: [this.props.history.location.pathname] });
    }

    linkTo = item => {
        item.key === 'logout' ? this.logOut() : this.props.history.push(item.key)
    }

    logOut = () => {
        this.props.firebase.auth().signOut().then(() => {
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <Layout className="site">
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[this.props.location.pathname]}
                        selectedKeys={this.state.selectedKeys}
                        style={{lineHeight: '64px'}}
                        onClick={this.linkTo}
                    >
                        <Menu.Item key="/">Главная</Menu.Item>
                        {this.state.uid && (<Menu.Item key="/authors">Писатели</Menu.Item>)}
                        {!this.state.uid && (<Menu.Item key="/login">Войти</Menu.Item>)}
                        {this.state.uid && (<Menu.Item key="logout">Выйти</Menu.Item>)}
                    </Menu>
                </Header>
                <Layout>
                    <Content className="site-content">
                        <Switch>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/" component={Chart}/>
                            <PrivateRoute path="/authors" component={Authors}/>
                        </Switch>
                    </Content>
                </Layout>
                <Footer></Footer>
            </Layout>
        )
    }
}


export default withRouter(
    compose(
        firebaseConnect(),
        connect(({firebase: {auth}}) => ({auth}))
    )(App)
)