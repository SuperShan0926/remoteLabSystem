require('./PageExpDesc.less');
import Form from "react-jsonschema-form";
var agent = require('superagent-promise')(require('superagent'),Promise);
import RestReader from '../../components/rest_reader';

const schema = {
  title: "实验描述",
  type: "object",
  properties: {
    name: {type: "string", title: "实验名称", default: "新实验"},
    begin: {type: "string",format:"date", title: "开始日期"},
    end: {type: "string",format:"date", title: "结束日期"},
    reportTemp:{type: "string", title: "实验报告模板"},
    deskIDs:{
          title: "实验桌",
          type:"array",
          items:{
              type: "string",
              title: "实验桌ID"
            }
    }
  }
};
const Viewer=({data})=><div>{data.map(d=><pre>{JSON.stringify(d,null,2)}</pre>)}</div>



class ExpDesc extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const url="/api/expDesc";
        return (
            <div className="exp_desc">
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

ReactDOM.render(<ExpDesc/>, document.getElementById('App'));

module.exports = ExpDesc;
