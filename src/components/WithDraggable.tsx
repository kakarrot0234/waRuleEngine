import * as React from 'react';
import * as uuid from 'uuid';

export default function WithDraggable<T>(WrappedComponent: React.ComponentType<T>) {
    return class extends React.Component<T> {
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
    let targetElement = e.target as HTMLElement;
    e.dataTransfer.setData("text", targetElement.id);
}