require('./PageCourse.less');
import Form from "react-jsonschema-form";
var agent = require('superagent-promise')(require('superagent'),Promise);
import RestReader from '../../components/rest_reader';

const schema = {
  title: "课程(实验大纲)",
  type: "object",
  required: ["name"],
  properties: {
    name: {type: "string", title: "Title", default: "新课程"},
    expIDs:{
          title: "实验列表",
          type:"array",
          items:{
              type: "string",
              title: "实验ID"
            }
    }
  }
};

const Viewer=({data})=><div>{data.map(d=><pre>{JSON.stringify(d,null,2)}</pre>)}</div>

class Course extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const url="/api/course";
        return (
            <div className="course">
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

ReactDOM.render(<Course/>, document.getElementById('App'));

module.exports = Course;
