import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Services = () => {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [selectedPartnerServices, setSelectedPartnerServices] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState([]);

  const userDetailsString = localStorage.getItem('userData');
  const userDetails = JSON.parse(userDetailsString);
  const jwtToken = localStorage.getItem('jwtToken');

  useEffect(() => {
    fetchPartners();
    fetchUserSubscriptions();
  }, []);

  const fetchUserSubscriptions = async () => {
    try {
      const userId = userDetails.id;
      const response = await axios.get(
        `http://localhost:3001/subscription/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const userSubscriptions = response.data.filter(
        (subscription) => subscription.status !== 'unsubscribed'
      );

      const subscriptionMap = userSubscriptions.reduce((acc, item) => {
        acc[item.service.id] = 'subscribed';
        return acc;
      }, {});

      setSubscriptionStatus(subscriptionMap);
    } catch (error) {
      console.error('Error fetching user subscriptions:', error);
    }
  };


  const fetchPartners = async () => {

    try {
      const response = await axios.get('http://localhost:3001/partners/');
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  const fetchPartnerServices = async (partnerId) => {
    try {

      const response = await axios.get(`http://localhost:3001/services/partners/${partnerId}`);
      setSelectedPartnerServices(response.data);

    } catch (error) {
      console.error('Error fetching partner services:', error);
    }
  };


  const handlePartnerSelect = (event) => {
    const partnerId = event.target.value;
    setSelectedPartner(partnerId);
    fetchPartnerServices(partnerId);
  };

  const handleSubscribe = async (service) => {
    const { id: serviceId } = service;
    const partnerId = selectedPartner;
    const userId = userDetails.id;

    const requestData = {
      userId,
      serviceId,
      partnerId,
    };
    const jwtToken = localStorage.getItem('jwtToken');

    try {
      const response = await axios.post(
        'http://localhost:3001/subscription/subscribe',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log('Subscription response:', response.data);

      setSubscriptionStatus((prevStatus) => ({
        ...prevStatus,
        [serviceId]: 'subscribed',
      }));
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const handleUnsubscribe = async (service) => {
    const { id: serviceId } = service;
    const partnerId = selectedPartner;
    const userId = userDetails.id;

    const requestData = {
      userId,
      serviceId,
      partnerId,
    };
    const jwtToken = localStorage.getItem('jwtToken');

    try {
      const response = await axios.post(
        'http://localhost:3001/subscription/unsubscribe',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log('Unsubscription response:', response.data);

      setSubscriptionStatus((prevStatus) => ({
        ...prevStatus,
        [serviceId]: 'unsubscribed',
      }));
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  return (
    <div className="services-page">

      <Navbar />

      <div className="services-content">
        <h2>Subscribe The Service</h2>

        <div className="mt-3">
          Please Select Partner:<select
            className="form-select"
            value={selectedPartner}
            onChange={handlePartnerSelect}

          >
            <option value="">Select Partner</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.partnerName}
              </option>
            ))}
          </select>
        </div>
        {selectedPartner && (
          <div className="mt-4">
            {selectedPartnerServices.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th >Service Name</th>
                    <th>Subscribe</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPartnerServices.map((service) => (
                    <tr key={service.id}>
                      <td>{service.serviceName}</td>
                      <td>
                        {subscriptionStatus[service.id] === 'subscribed' ? (
                          <button
                            className="btn btn-danger logout-button"
                            onClick={() => handleUnsubscribe(service)}
                          >
                            Unsubscribe
                          </button>
                        ) : (
                          <button
                            className="btn btn-success logout-button"
                            onClick={() => handleSubscribe(service)}
                          >
                            Subscribe
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No services available for {selectedPartner}.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
