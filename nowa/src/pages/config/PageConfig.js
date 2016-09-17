require('./PageConfig.less');
import Form from "react-jsonschema-form";
var agent = require('superagent-promise')(require('superagent'),Promise);
import RestReader from '../../components/rest_reader';

const schema = {
  title: "配置",
  type: "object",
  properties: {
    pre: {type: "number", title: "提前预定天数", default: 3},
    duration: {type: "number", title: "可预定跨度(天数)", default: 3}
  }
};

const Viewer=({data})=><div>{data.map(d=><pre>{JSON.stringify(d,null,2)}</pre>)}</div>
class Config extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const url="/api/config";
        return (
            <div className="config">
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

ReactDOM.render(<Config/>, document.getElementById('App'));

module.exports = Config;
