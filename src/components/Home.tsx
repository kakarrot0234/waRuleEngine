import * as React from 'react';
import Criteria from './Criteria';

export class Home extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row rule-area-content">
                    <div className="col-sm-12">
                        <div className="d-flex justify-content-center">
                            <p style={{color: 'red'}}>Rule areas</p>
                        </div>
                    </div>
                </div>
                <div className="row rules-content">
                    <div className="col-sm-6 criteria-content" onDragOver={e => e.preventDefault()} onDrop={(e) => this.dropHandle(e)}>
                        <Criteria Name="Age" Type="numeric"></Criteria>
                        <Criteria Name="NumberOfCredit" Type="numeric"></Criteria>
                    </div>
                    <div className="col-sm-6 rule-editor-content" onDragOver={e => e.preventDefault()} onDrop={(e) => this.dropHandle(e)}>
                    </div>
                </div>
            </div>
        );
    }
    dropHandle(e: React.DragEvent){
        let dropedElementId = e.dataTransfer.getData("text");
        let dropedElement = document.getElementById(dropedElementId) as Node;
        e.currentTarget.appendChild(dropedElement);
    }
}