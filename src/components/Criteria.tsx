import * as React from 'react';
import * as $ from 'jquery';
import WithDraggable from './WithDraggable';

interface CriteriaProps{
    Name: string;
    Type: string;
}

interface CriteriaState{
    Name: string;
    Type: string;
}

class Criteria extends React.Component<CriteriaProps, CriteriaState>{
    constructor(props: CriteriaProps){
        super(props);
        this.state={
            Name: props.Name,
            Type: props.Type
        };
    }
    componentDidMount(){
        let aElements = $("div.criteria-content div.dropdown-menu a");
        aElements.click((e: JQuery.ClickEvent) => {
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
                            <button id="criteriaTypesDropDown" className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
                                {this.state.Type}
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