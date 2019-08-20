import * as React from 'react';
import Criteria from './Criteria';
import uuid = require('uuid');

interface IRulesEditorComponent{
    Id: string;
    Name: string;
    Type: string;
}
interface IRulesEditorProps {
    children: JSX.Element[]
}
interface IRulesEditorStates {
    DraggableComponents: IRulesEditorComponent[];
    DraggedComponents: IRulesEditorComponent[];
}

export class RulesEditor extends React.Component<IRulesEditorProps, IRulesEditorStates> {
    constructor(props: IRulesEditorProps) {
        super(props);
        this.state = {
            DraggableComponents: [{Id: uuid.v1(), Name: "n1", Type: "t"}],
            DraggedComponents: []
        };
    }
    render() {
        let draggableComponents = this.state.DraggableComponents.map(o =>{
            return (
                <Criteria Id={o.Id} Name={o.Name} Type={o.Type} key={o.Id}></Criteria>
            )
        });
        let draggedComponents = this.state.DraggedComponents.length > 0 ? this.state.DraggedComponents.map(o =>{
            return(
                <Criteria Id={o.Id} Name={o.Name} Type={o.Type} key={o.Id}></Criteria>
            )
        }) : null;

        return (
            <div>
                <div>{draggableComponents}</div>
                <div onDragOver={e => e.preventDefault()} onDrop={e => this.dropHandle(e)}>
                    <h1>Hello</h1>
                    {draggedComponents}
                </div>
            </div>
        )
    }
    dropHandle = (e: React.DragEvent) => {
        let droppedElementId = e.dataTransfer.getData("text/plain");
        let droppedComponent = this.state.DraggableComponents.find(o => o.Id === droppedElementId) as IRulesEditorComponent;
        let newDraggableComponents = this.state.DraggableComponents.filter(o => o.Id !== droppedElementId);
        let newDraggedComponents = [...this.state.DraggedComponents, {Id: droppedComponent.Id, Name: droppedComponent.Name, Type: droppedComponent.Type}];
        this.setState({DraggableComponents: newDraggableComponents, DraggedComponents: newDraggedComponents});
    }
}