import { ProposalFields } from './ProposalsForm';
import React, { useState } from 'react';
import sweetalert from "sweetalert";
import ProposalsAPI from '../APIs/ProposalsAPI';
import ActionButtons from './ActionButtons';
import ProposalsModal from './ProposalModal';
import { Slide, toast } from 'react-toastify';

export const ShowProposalsForm = ({
    proposal, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, OnComplete
}) => {
    const [show, setShow] = useState(false);

    function ShowProposalModal() {
        setShow(true);
    }

    return <>
        {
            !proposal ?
                <ActionButtons action="Add" className="add-button" onClick={ShowProposalModal} />
                : !proposal[ProposalFields.Id] ?
                    <ActionButtons id='#copy-action-proposal' className="copy-button" action="Copy" onClick={ShowProposalModal} />
                    : EnableEditing ?
                        <ActionButtons id='#update-action-proposal' action="Update" onClick={ShowProposalModal} />
                        : <ActionButtons id='#info-action-proposal' action="Info" onClick={ShowProposalModal} />
        }

        <ProposalsModal proposal={proposal} EnableEditing={EnableEditing === undefined ? undefined : EnableEditing} EnableArchiving={EnableArchiving} EnableDeleting={EnableDeleting} EnableApplying={EnableApplying} OnComplete={OnComplete} show={show} setShow={setShow} />
    </>;
};

export const Delete = ({ proposalId, OnComplete }) => {
    const handleDelete = () => {
        sweetalert({
            title: "Are you sure you want to delete this proposal?",
            text: "Once deleted, all the related data and applications will be as well",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(confirmed => {
            if (confirmed) {
                ProposalsAPI.deleteProposal(proposalId).then((result) => {
                    if (result.status === 200) {
                        toast.success('Proposal Deleted', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                            transition: Slide,
                        });
                        if (OnComplete) OnComplete();
                    }
                    else {
                        toast.error('Proposal couldn\'t be deleted', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                            transition: Slide,
                        });
                    }
                })
            }
        });
    };
    return <>
        <ActionButtons action="Delete" onClick={() => handleDelete()} />
    </>
};

export const Archive = ({ proposalId, OnComplete }) => {
    const handleArchive = () => {
        sweetalert({
            title: "Are you sure you want to archive this proposal?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(confirmed => {
            if (confirmed) {
                ProposalsAPI.archiveProposal(proposalId).then((result) => {
                    if (result.status === 200) {
                        toast.success('Proposal Archived', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                            transition: Slide,
                        });
                        if (OnComplete) OnComplete();
                    }
                    else {
                        toast.error('Proposal couldn\'t be archived', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "colored",
                            transition: Slide,
                        });                    }
                })
            }
        });
    };

    return <>
        <ActionButtons action="Archive" onClick={handleArchive} />
    </>
};
