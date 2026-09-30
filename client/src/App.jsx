import { useState } from 'react';
import './App.css';
import { apiCall } from './api';
function App() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const services = [
  { name: 'Plumbing', icon: '🔧', description: 'Professional plumbing services' },
  { name: 'Electrical', icon: '⚡', description: 'Safe and reliable electrical work' },
  { name: 'Carpentry', icon: '🪚', description: 'Furniture repair and woodwork' },
  { name: 'Painting', icon: '🎨', description: 'Give your home a fresh look' },
  { name: 'Cleaning', icon: '🧹', description: 'Keep your home clean and fresh' },
];

const filteredServices = services.filter((service) =>
  service.name.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <div>
      <header>
        <h1>HomeHive</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button onClick={() => setShowLogin(true)}>
  Login
</button>
      </header>

      <main id="home">
        <h1>Your Home, Our Care</h1>

        <p>
          Find trusted professionals for all your home service needs.
        </p>

        <input
  type="text"
  placeholder="Search for a service..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

        <button>Search</button>

        <h2 id="services">Our Services</h2>

<div className="service-grid">
{filteredServices.map((service) => (
  <div className="service-card" key={service.name}>
    <span>{service.icon}</span>
    <h3>{service.name}</h3>
    <p>{service.description}</p>

    <button
      onClick={() => {
        setSelectedService(service.name);
        setShowBooking(true);
      }}
    >
      Book Now
    </button>
  </div>
))}
  


</div>
{!showBooking && (
<section className="how-it-works">

  <h2>How HomeHive Works</h2>

  <p className="section-description">
    Getting reliable home services is now easier than ever.
  </p>

  <div className="steps-container">

    <div className="step-card">
      <div className="step-icon">🔍</div>
      <h3>1. Choose a Service</h3>
      <p>
        Browse and select the home service you need.
      </p>
    </div>

    <div className="step-card">
      <div className="step-icon">📅</div>
      <h3>2. Book Your Slot</h3>
      <p>
        Select your preferred date and time.
      </p>
    </div>

    <div className="step-card">
      <div className="step-icon">🏠</div>
      <h3>3. Enjoy the Service</h3>
      <p>
        Get reliable professionals at your doorstep.
      </p>
    </div>

  </div>

</section>
)}
<section id="about">
  <h2>About HomeHive</h2>
  <p>
    HomeHive connects customers with trusted home service professionals.
    We make it easy to find, book, and manage home services in one place.
  </p>
</section>
<section id="contact">
  <h2>Contact Us</h2>

  <p>
    Need help with your booking or home services?
    We are here to help!
  </p>

  <div>
    <h3>Email Support</h3>
    <p>support@homehive.com</p>
  </div>

  <div>
    <h3>Customer Support</h3>
    <p>
      For booking enquiries and assistance,
      please contact HomeHive support.
    </p>
  </div>
</section>
{showLogin && (
  <div className="login-overlay">
    <div className="login-box">

      <h2>Welcome to HomeHive</h2>
      <p>Login to continue</p>

      <form onSubmit={async (e) => {
        e.preventDefault();
        try {
          const data = await apiCall('/auth/login', 'POST', {
            email: loginEmail,
            password: loginPassword,
          });
          localStorage.setItem('token', data.token);
          alert('Login success: ' + data.user.role);
          setShowLogin(false);
        } catch (err) {
          alert(err.message);
        }
      }}>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <button type="button" onClick={() => setShowLogin(false)}>
          Close
        </button>

      </form>
    </div>
  </div>
)}
{showBooking && (
  <div className="booking-overlay">
    <section className="booking-section" id="booking-form">

      <h2>Book Your Service</h2>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert('Booking submitted successfully!');
        setShowBooking(false);
      }}>

        <label>Customer Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          pattern="[0-9]{10}"
          title="Enter a 10-digit phone number"
          required
        />

        <label>Selected Service</label>
        <input
          type="text"
          value={selectedService}
          readOnly
        />

        <label>Preferred Date</label>
        <input
          type="date"
          min={new Date().toISOString().split('T')[0]}
          required
        />

        <label>Preferred Time</label>
        <select required defaultValue="">
          <option value="" disabled>Select a time</option>
          <option>9 AM - 11 AM</option>
          <option>11 AM - 1 PM</option>
          <option>2 PM - 4 PM</option>
          <option>4 PM - 6 PM</option>
        </select>

        <label>Address</label>
        <textarea
          placeholder="Enter your complete address"
          required
        />

        <button type="submit">Confirm Booking</button>

        <button
          type="button"
          onClick={() => setShowBooking(false)}
        >
          Cancel
        </button>

      </form>
    </section>
  </div>
)}
      </main>
    </div>
  );
}

export default App;