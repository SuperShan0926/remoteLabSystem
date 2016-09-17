require('./PageDesk.less');
import Form from "react-jsonschema-form";
var agent = require('superagent-promise')(require('superagent'),Promise);
import RestReader from '../../components/rest_reader';

const schema = {
  title: "实验桌",
  type: "object",
  properties: {
    name: {type: "string", title: "桌号"},
    deviceIDs:{
          title: "实验仪器",
          type:"array",
          items:{
              type: "string",
              title: "实验仪器ID"
            }
    }
  }
};
const Viewer=({data})=><div>{data.map(d=><pre>{JSON.stringify(d,null,2)}</pre>)}</div>

class Desk extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const url="/api/desk";
        return (
            <div className="desk">
                <Form schema={schema}
                    onSubmit={({formData})=>{agent.post(url,formData).then(_=>this.forceUpdate())}}
                />
                <RestReader url={url} view={Viewer}/>
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

ReactDOM.render(<Desk/>, document.getElementById('App'));

module.exports = Desk;
