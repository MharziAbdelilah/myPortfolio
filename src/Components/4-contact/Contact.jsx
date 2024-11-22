import React from "react";
import "./contact.css";
import { ValidationError, useForm } from "@formspree/react";
import Lottie from "lottie-react";
import doneAnimation from "../../animation/done.json";
import emailAnimation from "../../animation/email.json";

function Contact() {
  const [state, handleSubmit] = useForm("mnnaadez");
  return (
    <section className="contact-us">
      <h1 className="title">
        <span className="icon-envelope"> </span>
        Contact us
      </h1>
      <p className="sub-title">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius at officia
        aliquam quasi repudiandae.
      </p>

      <div className="flex left-section" style={{justifyContent:"space-between"}}>
        <form  onSubmit={handleSubmit} >
          <div className="flex">
            <label  htmlFor="email">Email Address:</label>
            <input
              autoComplete="off"
              required
              type="email"
              name="email"
              id="email"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="flex" style={{ marginTop: "24px" }}>
            <label htmlFor="message">Your message :</label>
            <textarea required name="message" id="message"></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <button type="submit" disabled={state.submitting} className="submit">
            {state.submitting ? "Submitting..." : "Submit"}
          </button>
          {state.succeeded && (
            <p className="flex" style={{ fontSize: "18px", marginTop: "1.7rem" }}>
              <Lottie loop={false} style={{height:"44px"}} animationData={doneAnimation} />
              Your message has been sent successfuly 👌
            </p>
          )}
        </form>
        <div className="right-section">
        <Lottie className="contact-animation"  style={{height:"400px"}}  animationData={emailAnimation}/>
          </div>
      </div>
    </section>
  );
}
export default Contact;
