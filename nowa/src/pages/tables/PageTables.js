require('./PageTables.less');
var RestfulTable=require('react-restful-table');

var selectRowProp = {
          mode: "radio",
          clickToSelect: true,
          bgColor: "rgb(238, 193, 213)"
        };


class Tables extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="tables">
            <ul>
              <li><a href="/config.html">config</a></li>
              <li><a href="/course.html">course</a></li>
              <li><a href="/desk.html">desk</a></li>
              <li><a href="/exp_desc.html">exp_desc</a></li>
            </ul>
                <h2>实验</h2>
                <RestfulTable url='/api/exp' keyField="_id" 
                insertRow={true} deleteRow={true} selectRow={selectRowProp}>                
                      <TableHeaderColumn dataField="_id">id</TableHeaderColumn>
                      <TableHeaderColumn dataField="deskID" >实验桌ID</TableHeaderColumn>
                      <TableHeaderColumn dataField="date" >实验日期</TableHeaderColumn>
                      <TableHeaderColumn dataField="timeslotID" >实验时间段</TableHeaderColumn>
                      <TableHeaderColumn dataField="studentID" >学生ID</TableHeaderColumn>
                      <TableHeaderColumn dataField="data" >实验数据</TableHeaderColumn>
                      <TableHeaderColumn dataField="report" >实验报告</TableHeaderColumn>
                      <TableHeaderColumn dataField="score" >实验得分</TableHeaderColumn>
                </RestfulTable>

                <h2>时间段</h2>
                <RestfulTable url='/api/timeslot' keyField="_id" 
                insertRow={true} deleteRow={true} selectRow={selectRowProp}>                
                      <TableHeaderColumn dataField="_id" >id</TableHeaderColumn>
                      <TableHeaderColumn dataField="from" >开始时间</TableHeaderColumn>
                      <TableHeaderColumn dataField="to" >结束时间</TableHeaderColumn>
                </RestfulTable>


                <h2>仪器</h2>
                <RestfulTable url='/api/device' keyField="_id" 
                insertRow={true} deleteRow={true} selectRow={selectRowProp}>                
                      <TableHeaderColumn dataField="_id"  >id</TableHeaderColumn>
                      <TableHeaderColumn dataField="name" >仪器名称</TableHeaderColumn>
                </RestfulTable>
            </div>
        );
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillUnmount() {
    }
}

ReactDOM.render(<Tables/>, document.getElementById('App'));

module.exports = Tables;
