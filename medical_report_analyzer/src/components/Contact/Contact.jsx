import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';
import contact_img from '../../assets/contact_img.jpg'
import done from '../../assets/Done.gif';
import './Contact.scss'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = 'service_s78vi5i';
    const templateId = 'template_pc1m6mo';
    const userId = 'mZjSepw1zsONPA4Ib';

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);  
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });  
        }, 2000);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div className="contact">
      <div className="image">
        <img src={contact_img} alt="Contact image" />
      </div>
      <div className="form-container">
      <div className="title">
        <p className='t1'>Contact Us Anytime</p>
        <p className='t2'>Reach Out at Your Convenience</p>
      </div>
        {submitted ? (
          <div className="submitted-message">
            <img src={done} alt="Submitted" />
            <p>Form submitted successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Row for name, email, and phone */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder='YOUR NAME'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='YOUR EMAIL'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder='YOUR PHONE NUMBER'
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="form-group-full">
              <label htmlFor="subject">Subject:</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="inquiry">Inquiry</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            {/* Message */}
            <div className="form-group-full">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder='YOUR MESSAGE'
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
