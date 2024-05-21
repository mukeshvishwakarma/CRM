import React, { useContext } from 'react';
import { TicketContext } from '../context/TicketContext';
import TicketCard from './TicketCard';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Dashboard.css';  // Import the CSS file

const Dashboard = () => {
  const { tickets, updateTicketStatus } = useContext(TicketContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    updateTicketStatus(parseInt(draggableId), destination.droppableId);
  };

  const statuses = ['unassigned', 'on hold', 'open', 'closed'];

  return (
    <>
      {/* <Header /> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dashboard">
          {statuses.map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  className="status-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{status.toUpperCase()}</h2>
                  {tickets.filter(ticket => ticket.status === status).map((ticket, index) => (
                    <Draggable key={ticket.id} draggableId={ticket.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`draggable ${snapshot.isDragging ? 'is-dragging' : ''}`}
                        >
                          <TicketCard ticket={ticket} className="ticket-card" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default Dashboard;
