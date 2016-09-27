import React from 'react';
import ReactDOM from 'react-dom';
import Yuyue from './components/xuanxiangka/yuyueshiyan';
import {Router,Route,hashHistory,IndexRoute,IndexRedirect} from 'react-router';
import myExp from './components/xuanxiangka/myExp';
import newExp from './components/xuanxiangka/newExp';
import oldExp from './components/xuanxiangka/oldExp';
import mainPage from './components/xuanxiangka/mainPage';
import startExp from './components/xuanxiangka/startExp';
import expExport from './components/xuanxiangka/expExport';





/*

我的实验页面  父路由myExp，子路由2个，分别对应newExp,oldExp;
两个子路由对应同一个视图view。
－－－－－－－－－－－－－－－－－－－－－－－－－
|  myExp                                   |
|  －－－－－－－－－－－－－－－              |
|  ｜  newExp  －－－－－－   |              |
|  ｜  oldExp  | ExpView ｜ ｜              |
|  ｜           －－－－－   ｜              |
|   －－－－－－－－－－－－－－               |
|                                           |
|                                           |
|－－－－－－－－－－－－－－－－－－－－－－－－－
*/
const world=()=><div>world</div>;
const hello=()=><div>hello</div>;

//myExp:id中,暂定0为新实验，1为旧实验。

ReactDOM.render((<Router history={hashHistory}>
					<Route path='/' component={mainPage}>
						<IndexRedirect to="/myExp"/>
						<Route path='/myExp' component={myExp}>
							<IndexRoute component={newExp}/>
							<Route path='/newExp' component={newExp}/>
							<Route path='/oldExp' component={oldExp}/>
						</Route>
						<Route path='/expExport/:id' component={expExport}/>
						<Route path='/arrangeExp' component={Yuyue}/>
						<Route path='/expGrade' component={world}/>
					</Route>
					<Route path='/startExp/:id' component={startExp}/>
						{/*<IndexRoute component={dianlutu}/>
						<Route path='/circuitdia' component={dianlutu}/>
						<Route path='/equipment' component={yiqi}/>
						<Route path='/camera' component={camera}/>*/}
					</Router>),document.getElementById('root'));
