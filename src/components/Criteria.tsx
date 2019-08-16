import * as React from 'react';
import * as $ from 'jquery';
import WithDraggable from './WithDraggable';
import uuid = require('uuid');

interface CriteriaProps{
    Name: string;
    Type: string;
}

interface CriteriaState{
    Id: string;
    Name: string;
    Type: string;
}

class Criteria extends React.Component<CriteriaProps, CriteriaState>{
    constructor(props: CriteriaProps){
        super(props);
        this.state={
            Id: uuid.v1(),
            Name: props.Name,
            Type: props.Type
        };
    }
    componentDidMount(){
        let criterias = $("#" + this.state.Id  + " ~ div.dropdown-menu a");
        criterias.click((e: JQuery.ClickEvent) => {
            let targetElement = e.target as HTMLElement;
            this.setState({Type: targetElement.innerText});
        });
    }
    render(){
        return(            
            <div className="container-fluid criteria-content">
                <div className="row">
                    <div className="col-8">
                        <span>{this.state.Name}</span>
                    </div>
                    <div className="col-4">
                        <div className="dropdown">
                            <button id={this.state.Id} className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
                                {this.state.Type}
                            </button>
                            <div className="dropdown-menu" aria-labelledby={this.state.Id}>
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