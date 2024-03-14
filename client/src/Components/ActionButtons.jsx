import '../Stylesheets/ActionButtonsStyle.css';

import React from "react";
import { PencilFill, PlusSquareFill } from "react-bootstrap-icons";
import { ArchiveFill, ClipboardPlus } from "react-bootstrap-icons";
import { Trash3Fill } from "react-bootstrap-icons";
import { InfoSquareFill } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

function ActionButtons(props) {
    const handleClick = () => {
        if (props.onClick)
            props.onClick();
    };

    const actionComponents = {
        Delete: <Trash3Fill className='delete-icon' />,
        Archive: <ArchiveFill className='archive-icon' />,
        Add: (
            <Button className="add-button">
                <PlusSquareFill className='add-icon' />
                <span style={{ marginLeft: '5px' }}>New Proposal</span>
            </Button>
        ),
        Info: <InfoSquareFill className='info-icon' />,
        Update: <PencilFill className='edit-icon' />,
        Copy: <ClipboardPlus className='edit-icon' />
    };

    const overlayComponent = (
        <Tooltip>
            {props.action}
        </Tooltip>
    )

    return (
        props.action !== 'Add'
            ?
            <OverlayTrigger
                placement='top'
                overlay={overlayComponent}>
                {React.cloneElement(actionComponents[props.action], { onClick: handleClick })}
            </OverlayTrigger >
            : React.cloneElement(actionComponents[props.action], { onClick: handleClick })
    )
}
export default ActionButtons;