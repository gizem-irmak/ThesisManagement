import "../Stylesheets/CardManagerStyle.css";
import React, { useState } from "react";
import { Badge, Card } from "react-bootstrap";
import ProposalsModal from "./ProposalModal";


const CustomCard = ({ proposal, EnableEditing, EnableArchiving, EnableDeleting, EnableApplying, OnComplete }) => {
    const [show, setShow] = useState(false);

    const handleCardClick = () => {
        setShow(true);
    };

    return (
        <>
            <Card onClick={handleCardClick} className="card-item">
                <Card.Header>{proposal.Title}</Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">{proposal.Expiration}</Card.Subtitle>
                    <Card.Text className="truncate-text">
                        {proposal.Description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {
                        proposal.keywords.map((keyword) => (
                            <Badge key={keyword.Id} bg="rgb(252, 122, 8)" className="me-1 badge-item">{keyword.Name}</Badge>
                        ))
                    }
                </Card.Footer>
            </Card>

            <ProposalsModal proposal={proposal} EnableEditing EnableArchiving={EnableArchiving} EnableDeleting={EnableDeleting} EnableApplying={EnableApplying} OnComplete={OnComplete} show={show} setShow={setShow} />
        </>
    )
}

export default CustomCard;