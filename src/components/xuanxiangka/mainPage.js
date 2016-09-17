import React from 'react';
var agent = require('superagent-promise')(require('superagent'), Promise);

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'MainPage';
    }
    componentDidMount() {}
    render() {
        return <div id="wrapper">
        <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: '0'}}>
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="blank.html">十六进制在线实验系统</a>
            </div>
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li><a href="http://localhost:3000/user/logout"><i className="fa fa-sign-out fa-fw"></i> 登出</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li>
                            <a href="/index.html#/"><i className="fa fa-dashboard fa-fw"></i> 我的实验</a>
                        </li>
                        <li>
                            <a href="/index.html#/arrangeExp"><i className="fa fa-table fa-fw"></i> 预约实验</a>
                        </li>
                        <li>
                            <a href="/index.html#/expGrade"><i className="fa fa-edit fa-fw"></i>实验成绩</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div id="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                          <div id="root">
                              {this.props.children}
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
    }
}

export default MainPage;
