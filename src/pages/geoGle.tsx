import React, { useEffect } from 'react';
import Image from 'next/image';
import '../styles/GeoGle.css';
import '../styles/Card.css';
import '../styles/Footer.css';
// import '../styles/global.css';
import { initializeGeoGle } from '../scripts/GeoGle'; // Import the logic

const GeoGle: React.FC = () => {
  useEffect(() => {
    initializeGeoGle(); // Call the logic when the component mounts
  }, []);

  return (
    <div>
      <Image
        src="https://s3-alpha-sig.figma.com/img/7275/05c2/0cbb6bf9f250731865f7b412de3385b5?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kgu7cd5QXNHfpHQbokJB-OEu5VOT9zjfEKpi6C5zJ-6odrA6dU4NytkT9TO5uZhMWAA7uoCFVLrvVSdHT6E1~vynOdQrBxXBtetxlDyGHTHypWWH3SiPWtCtHrYjkSyC9CfxmNu1uTYB8QTBHkXfYfqI3cbgg5glPL9YghpWnB01g0vEa5grBqd~X0Xxk-iiA48hlyZ0SQ4WUPKFimMMxmndTrWFVwEgna4OWieLbrQLNXJTkFWLLxwDub42mzS9yKZxR~KOb5CSQOrOkW61pOcW5yFd3d2lnEcFH-qmX-8CA9fhSgK40EbBoueTmC60JD7LkavZ7feRrFC6tPDhsg__"
        alt="Background Image"
        layout="fill"
        className="background-img"
      />
      <div className="blue-overlay"></div>

      <div className="headcontainer" id="headcontainer">
        <div className="header" id="header">
          GeoGle
        </div>

        <form className="search-container">
          <div className="search-bar">
            <button className="search-icon" type="submit">
              <span>&#128269;</span>
            </button>
            <input className="placeholder" placeholder="Search..." />
            <div className="info-icon">
              <span>&#9432;</span>
            </div>
          </div>
        </form>
      </div>

      <div className="cardcontainer" id="cardcontainer"></div>

      <div className="seemore" id="seemore">
        <button className="btn-seemore">See More</button>
      </div>

      <footer id="footer">
        <div className="footer-content">
          <p>
            &copy; 2024 - 2024 | GeoGle.co.ltd - For Theory of Computation only
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GeoGle;
