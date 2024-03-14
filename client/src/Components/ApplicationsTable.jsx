// src/components/ProposalItem.js
import React, { useContext } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import { ShowProposalsForm, Delete, Archive } from './ProposalsActions';
import { ProposalFields } from './ProposalsForm';
import { Accept, Reject, ViewCV } from './ApplicationsActions'

// enums
export const ApplicationStatus = {
  Pending: 'Pending',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
  Canceled: 'Canceled'
};
export const ApplicationFields = {
  Application_Id: 'Application_Id',
  Student_Id: 'Student_Id',
  Proposal_Id: 'Proposal_Id',
  Proposal: 'Proposal',
  StudentName: 'StudentName',
  Title: 'Title',
  Supervisor: 'Supervisor',
  Date: 'Date',
  Status: 'Status'
};

const ApplicationsTable = ({ applications, EnableAccept, EnableReject, requestRefresh }) => {
  const { user } = useContext(UserContext);

  return (
    <Table striped bordered hover id='applications-table'>
      <thead>
        <tr>
          <th>Title</th>
          {
            user.role === 'Student' ?
              <th>Supervisor</th> : null
          }
          {
            user.role === 'Teacher' ?
              <th>Student</th> : null
          }
          <th>Application Date</th>
          <th>Expiration Date</th>
          <th>Status</th>
          <th>CV</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => {
          const proposal = application[ApplicationFields.Proposal];
          return <tr key={application[ApplicationFields.Application_Id]}>
            <td>{proposal[ProposalFields.Title]}</td>
            {
              user.role === 'Student' ?
                <td>{proposal[ProposalFields.Supervisor].Name + ' ' + proposal[ProposalFields.Supervisor].Surname}</td>
                : null
            }
            {
              user.role === 'Teacher' ?
                <td>{application[ApplicationFields.StudentName]}</td>
                : null
            }
            <td>{application[ApplicationFields.Date]}</td>
            <td>{proposal[ProposalFields.Expiration]}</td>
            <td>{(
              (() => {
                switch (application[ApplicationFields.Status]) {
                  case ApplicationStatus.Accepted:
                    return <Badge bg="success">Accepted</Badge>;
                  case ApplicationStatus.Pending:
                    return <Badge bg="warning" text="dark">Pending</Badge>;
                  case ApplicationStatus.Rejected:
                    return <Badge bg="danger">Rejected</Badge>;
                  case ApplicationStatus.Canceled:
                    return <Badge bg="danger">Canceled</Badge>;
                  default:
                    return <Badge bg="secondary">---</Badge>;
                }
              })()
            )}</td>
            <td><ViewCV cvFileName={application.Cv} studentId={application[ApplicationFields.Student_Id]} /></td>
            <td>
              <ShowProposalsForm proposal={proposal} />
              {EnableAccept && application[ApplicationFields.Status] === ApplicationStatus.Pending ?
                <Accept applicationId={application[ApplicationFields.Application_Id]} OnComplete={requestRefresh} /> : <></>}
              {EnableReject && application[ApplicationFields.Status] === ApplicationStatus.Pending ?
                <Reject applicationId={application[ApplicationFields.Application_Id]} OnComplete={requestRefresh} /> : <></>}
            </td>
          </tr>
        })}
      </tbody>
    </Table >
  );
};
export default ApplicationsTable;