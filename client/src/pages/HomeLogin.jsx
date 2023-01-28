import React from 'react'
import "../css/HomeLogin.css";
import fb from "../img/facebook-icon.png";
import twitter from "../img/twitter-icon.png";
import google from "../img/google-icon.png";


const HomeLogin = () => {
  return (
    <div>
        <div className='sign-in'>
          <div className="sign-in-container">
              <div className="sign-in-header">
                  <h3 className="text">TOOTHFULLY YOURS</h3>
                  <p className="text">Dental Clinic</p>
              </div>

              <div className="sign-in-body">
                  <div className="row1">
                      <h3>Sign In</h3>
                      <div className="social-media-icons">
                          <a href="https://www.facebook.com/toothfullyyoursdentalcare"><img className="facebook" src={fb}/></a>
                          <img className="twitter" src={twitter} />
                      </div>
                  </div>
                  <form >
                      <input type="text" name="email"  placeholder="Email"/>
                      <input type="password" name="password" placeholder="Password"/>
                      <button type="submit">Login</button>
                  </form>
                  <div className="row4">
                      <div className="remember-me">
                          <input className="check" type="checkbox" />
                          <p>Remember me</p>
                      </div>
                      <p className="forgotPass">Forgot Password</p>
                  </div>

                  <div className="row6">
                      <p>or</p>
                      <button type="button">
                          <img src={google}/> 
                          Sign in with Google
                      </button>
                  </div>
                  <div className="row5">
                      <p> Not a member? <a href="/register">Sign up</a></p>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default HomeLogin