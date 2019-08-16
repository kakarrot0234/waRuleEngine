import React from 'react';
import uuid from 'uuid';

export default function WithDraggable<P, T, SS>(WrappedComponent: React.Component<P, T, SS>) {
    return class extends React.Component {
        render() {            
            return (
                <div id={uuid.v1()} draggable={true} onDragStart={e => onDragStartHandle(e)}>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </div>
            );
        }
    }
}

function onDragStartHandle(e: React.DragEvent<HTMLDivElement>) {
    // e.dataTransfer.setData("elementId", e.target.id);
}