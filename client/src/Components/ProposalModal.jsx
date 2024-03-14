import "../Stylesheets/ProposalModalStyle.css";
import React from 'react';
import { Modal } from 'react-bootstrap';
import ProposalsForm, { ProposalFields } from './ProposalsForm';

function ProposalsModal({ proposal, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, OnComplete, show, setShow }) {

    return (
        <Modal id='#proposal-modal-id' show={show} fullscreen onHide={() => setShow(false)}>
            <Modal.Header style={{ overflow: 'hidden' }} closeButton className="modal-header" closeVariant="white">
                <Modal.Title style={{ overflow: 'hidden' }} className="modal-title">{
                    proposal ?
                        (
                            proposal[ProposalFields.Id]
                                ? proposal[ProposalFields.Title]
                                : "Make a new proposal starting from " + proposal[ProposalFields.Title]
                        )
                        : "Add new proposal"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProposalsForm
                    proposal={proposal}
                    EnableEditing={EnableEditing}
                    EnableArchiving={EnableArchiving}
                    EnableDeleting={EnableDeleting}
                    EnableApplying={EnableApplying}
                    OnComplete={() => {
                        if (OnComplete) OnComplete();
                        setShow(false);
                    }} />
            </Modal.Body>
        </Modal >
    )
}

export default ProposalsModal;