// src/components/ProposalItem.js
import React, { useContext } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { UserContext } from "../Contexts";
import { ShowRequestForm, ProfApprove, SecApprove, RejectRequest, RequestChange } from './RequestActions';

// enums
export const RequestStatus = {
  Pending: 'Pending',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
  ChangeRequested: 'ChangeRequested',
  SecretaryAccepted: 'SecretaryAccepted'

};
export const RequestFields = {
  Id: 'Id',
  Student_Id: 'Student_Id',
  Supervisor_Id: 'Supervisor_Id',
  Supervisor: 'Supervisor',
  Title: 'Title',
  Description: 'Description',
  Status: 'Status',
  Date: 'Date',
  student: 'student'
};

const RequestsTable = ({ requests, requestRefresh }) => {
  const { user } = useContext(UserContext);

  return (
    <Table striped bordered hover id='applications-table'>
      <thead>
        <tr>
          <th>Title</th>
          {
            user.role === 'Secretary' ?
              <th>Supervisor</th> : null
          }
          <th>Student</th>
          <th>Request Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          requests.length === 0 ?
            <tr>
              <td colSpan={6}>No requests found</td>
            </tr>
            :
            requests.map((request) => {
              return <tr key={request[RequestFields.Id]}>
                <td>{request[RequestFields.Title]}</td>
                {
                  user.role === 'Secretary' ?
                    <td>{request[RequestFields.Supervisor].Email}</td>
                    : null
                }
                <td>{request[RequestFields.student].Email}</td>
                <td>{request[RequestFields.Date]}</td>
                <td>{(
                  (() => {
                    switch (request[RequestFields.Status]) {
                      case RequestStatus.Accepted:
                        return <Badge bg="success">Approved</Badge>;
                      case RequestStatus.Pending:
                        return <Badge bg="warning" text="dark">Pending</Badge>;
                      case RequestStatus.Rejected:
                        return <Badge bg="danger">Rejected</Badge>;
                      case RequestStatus.ChangeRequested:
                        return <Badge bg="secondary">Change Requested</Badge>;
                      case RequestStatus.SecretaryAccepted:
                        return <Badge bg="primary">Secretary Approved</Badge>;
                      default:
                        return <Badge bg="secondary">---</Badge>;
                    }
                  })()
                )}</td>
                <td>
                  <ShowRequestForm request={request} />
                  {user.role === 'Teacher' && request[RequestFields.Status] === RequestStatus.SecretaryAccepted ?
                    <ProfApprove requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}
                  {user.role === 'Teacher' && request[RequestFields.Status] === RequestStatus.SecretaryAccepted ?
                    <RejectRequest requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}
                  {user.role === 'Teacher' && request[RequestFields.Status] === RequestStatus.SecretaryAccepted ?
                    <RequestChange requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}
                  {user.role === 'Secretary' && request[RequestFields.Status] === RequestStatus.Pending ?
                    <SecApprove requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}
                  {user.role === 'Secretary' && request[RequestFields.Status] === RequestStatus.Pending ?
                    <RejectRequest requestId={request[RequestFields.Id]} requestStatus={request[RequestFields.Status]} OnComplete={requestRefresh} /> : <></>}
                </td>
              </tr>
            })}
      </tbody>

    </Table >
  );
};
export default RequestsTable;