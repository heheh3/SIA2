import React from 'react'
import "../css/AboutUs.css";
import pic1 from "../img/image 11.png";
import pic2 from "../img/image 12.png";
import pic3 from "../img/image 13.png";
import pic4 from "../img/image 14.png";
import pic5 from "../img/image 15.png";
import pic6 from "../img/image 16.png";
import Navbar from './Navbar';

const AboutUsMain = () => {
  return (
    <div>

    <header>
        <Navbar />
    </header>
    <main class="container">
        <h1 class="main-title">CLINIC SERVICES</h1>
        <p class="main-info">To maintain dental health we provide a range of services for our patients</p> 
        <div class="grid-container">
            <article class="grid-item">
                <div class="row">
                    <h2 class="service-name">Dental Care</h2>
                    <img src={pic1} alt="Dental Care" />
                    <p class="info">Dentures must be cared for so that bacteria and plaque do not accumulate and cause oral health problems.</p>
                </div>
            </article>
            <article class="grid-item">
                <div class="row">
                    <h2 class="service-name">Dental Implant</h2>
                    <img src={pic2} alt="Dental Implant" />
                    <p class="info">Artificial tooth roots shaped like bolts that are implantedin the patient’s jaw to replace the missing tooth roots.</p>
                </div>
            </article>
            <article class="grid-item">
                <div class="row">
                    <h2 class="service-name">General Dentistry</h2>
                    <img src={pic3} alt="General Dentistry" />
                    <p class="info">The role of the general dentist is very important to ensure safe and effective dental and oral care.</p>
                </div>
            </article>
            <article class="grid-item">
                <div class="row">
                    <h2 class="service-name">Cosmetic Braces</h2>
                    <img src={pic4} alt="Cosmetic Braces" />
                    <p class="info">Braces are dental tools that help correct problems with your teeth, like crowding, crooked teeth, or teeth that are out of alignment.</p>
                </div>
            </article>
            <article class="grid-item">
                <div class="row">
                    <h2 class="service-name">Extractions</h2>
                    <img src={pic5} alt="Extraction" />
                    <p class="info">Teeth that are severely damaged by decay or injury and can no longer be repaired through corrective action.</p>
                </div>
            </article>
            <article class="grid-item">
                <div class="row">
                    <h2 class="service-name">Restorative Dentistry</h2>
                    <img src={pic6} alt="Restorative Dentistry" />
                    <p class="info">The result of dental procedures that aim to restore the shape, function, and appearance of the teeth.</p>
                </div>
            </article>
        </div>   
    </main>
</div>
    )
}

export default AboutUsMain