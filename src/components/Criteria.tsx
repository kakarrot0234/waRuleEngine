import React from 'react';
import WithDraggable from './WithDraggable';

class Criteria extends React.Component<any, any>{
    constructor(props: any){
        super(props);
        this.state={
            name: props.Name,
            type: props.Type
        };
    }
    componentDidMount(){
        let aElements = $("div.criteria-content div.dropdown-menu a");
        aElements.click((e) => {
            console.log(e);
        });
    }
    render(){
        return(
            <div className="container-fluid criteria-content">
                <div className="row">
                    <div className="col-8">
                        <span>{this.state.name}</span>
                    </div>
                    <div className="col-4">
                        <div className="dropdown">
                            <button id="criteriaTypesDropDown" className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
                                {this.state.type}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="criteriaTypesDropDown">
                                <a className="dropdown-item" href="#">numeric</a>
                                <a className="dropdown-item" href="#">alphanumeric</a>
                                <a className="dropdown-item" href="#">date</a>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WithDraggable(Criteria);