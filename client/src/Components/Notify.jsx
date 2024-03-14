import "../Stylesheets/NotificationStyle.css"
import React, { useState, useContext, useEffect } from 'react';
import { Navbar, OverlayTrigger, Popover, Badge, CloseButton, Col, Row } from 'react-bootstrap';
import { ArrowLeftCircle, BellFill, Dot } from 'react-bootstrap-icons';
import { UserContext } from "../Contexts";
import NotificationsAPI from '../APIs/NotificationsAPI';

const Notify = () => {
  const { user } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [visibleNotifications, setVisibleNotifications] = useState(3);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = async (index) => {
    setSelectedNotification(selectedNotification === index ? null : index);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const fetchedNotifications = await NotificationsAPI.getMyNotifications();
      if (fetchedNotifications) {
        // Sort the notifications array
        const sortedNotifications = fetchedNotifications.sort((a, b) => {
          // Unread notifications first
          if (!a.Read && b.Read) {
            return -1;
          } else if (a.Read && !b.Read) {
            return 1;
          }

          // If both are read or both are unread, sort by date in descending order
          return new Date(b.Date) - new Date(a.Date);
        });

        setNotifications(sortedNotifications);

        // Update unread count based on unread notifications
        const unreadNotifications = sortedNotifications.filter((notification) => !notification.Read);
        setUnreadCount(unreadNotifications.length);
      } else {
        console.error('Failed to fetch notifications');
      }
    };

    fetchNotifications();
  }, []);

  const showMoreNotifications = () => {
    // Show the next 3 notifications when "View More" is clicked
    setVisibleNotifications((prevVisibleNotifications) => prevVisibleNotifications + 3);
  };

  const handleToggleNotification = () => {
    setSelectedNotification(null);
    setShowNotification(!showNotification);
  };

  const handleBackNotification = async () => {
    setSelectedNotification(null);
  }

  const handleKeyDownEvent = (event, src, value) => {
    if (event.key === 'Enter') {
      if (src === 'clickable-field')
        handleNotificationClick(value);
      else if (src === 'view more')
        showMoreNotifications();
      else if (src === 'view less')
        setVisibleNotifications(3);
    }
  };

  useEffect(() => {
    if (selectedNotification !== null) {
      NotificationsAPI.setNotificationAsRead(notifications[selectedNotification].Id);

      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications];
        updatedNotifications[selectedNotification].Read = 1;
        return updatedNotifications;
      });
    }
  }, [selectedNotification])

  useEffect(() => {
    setUnreadCount(notifications.filter((notification) => !notification.Read).length);
  }, [notifications])

  const notificationPopover = (
    <Popover id="notification-popover" style={{ minWidth: '200px', maxWidth: '400px' }}>
      <Popover.Header as="h3">
        Notifications {unreadCount > 0 && <Badge pill bg="danger"> {unreadCount} </Badge>}
        <CloseButton
          id='popover-close-button'
          style={{ float: 'right' }}
          onClick={() => {
            setShowNotification(false);
          }}
        />
      </Popover.Header>
      <Popover.Body className={selectedNotification === null ? `animated-leave` : `animated`}>
        {selectedNotification === null ?
          (
            <div>
              {notifications.slice(0, visibleNotifications).map((notification, index) => (
                <div role="button" tabIndex={0} key={notification.Id} onKeyDown={(event) => handleKeyDownEvent(event, 'clickable-field', index)} onClick={() => handleNotificationClick(index)} style={{ cursor: 'pointer' }}>
                  <p>
                    {
                      notification.Read ?
                        <span>{notification.Title}</span>
                        : <strong>{notification.Title}</strong>
                    }
                    <br />
                    <small>{notification.Date}</small>
                  </p>
                  {<hr />}
                </div>
              ))}
              {notifications.length > visibleNotifications ? (
                <div style={{ textAlign: 'center', fontSize: '0.7rem' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(252, 122, 8)' }} onKeyDown={(event) => handleKeyDownEvent(event, 'view-more')} onClick={showMoreNotifications}>
                    View More
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '0.7rem' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(252, 122, 8)' }} onKeyDown={(event) => handleKeyDownEvent(event, 'view-less')} onClick={() => setVisibleNotifications(3)}>
                    View Less
                  </button>
                </div>
              )}
            </div>
          )
          : (
            <Row className="animated">
              <Col md={1} style={{ display: 'flex', justifyContent: 'center' }}>
                <ArrowLeftCircle id='arrowLeftCircle-icon-button' color="black" bg="info" size={20} onClick={() => handleBackNotification()} />
              </Col>
              <Col md={11} style={{ paddingLeft: '5px' }}>
                <p style={{ margin: 0 }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Title:</span>
                  {notifications[selectedNotification].Title}
                </p>
                <p style={{ margin: 0 }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Date:</span>
                  {notifications[selectedNotification].Date.split(' ')[0]}
                </p>
                <p >
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Time:</span>
                  {notifications[selectedNotification].Date.split(' ')[1]}
                </p>
                <p>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>Message:</span>
                  {notifications[selectedNotification].Message}
                </p>
              </Col>
            </Row>
          )
        }
      </Popover.Body>
    </Popover >
  );

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={notificationPopover}
        show={showNotification}
        onToggle={handleToggleNotification}
      >
        <Navbar.Text>
          <BellFill id='bellFill-icon-button' color="white" bg="info" onClick={handleToggleNotification} />
          {unreadCount > 0 && <Dot color="red" className="notification-dot"></Dot>}
        </Navbar.Text>
      </OverlayTrigger>
    </>

  );
};

export default Notify;
