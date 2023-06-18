import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaCartPlus, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import {GoTriangleLeft, GoTriangleRight} from 'react-icons/go'
import imageLinks from "../css-config/images";
import colorImages from "../css-config/colorImages";
const ProductDetail = () => {

    const [color, setColor] = useState("Dark Green");
    const [imageIndex, setImageIndex] = useState(0);
  
  
    function nextImage(){
      setImageIndex(imageIndex => ((imageIndex + 1)% imageLinks.length))
    }
  
    function prevImage(){
      if(imageIndex > 0){setImageIndex(imageIndex => ((imageIndex - 1)% imageLinks.length))}
      
    }
  
    function changColorImage(e){
      setColor(e.target.value)
      setImageIndex(colorImages[e.target.value])
    }
    console.log(imageLinks[0])
    return (
      <div>
        <div className="project-container">
          <div className="image-box">
            <img
              src={imageLinks[imageIndex]}
              alt=""
            />
            <div className="dot-container">
              <div className="dot"></div>
              <div className="change-image-container">
                <GoTriangleLeft id="prev-imgae" onClick={prevImage}/> 
                <div>{imageIndex + 1} / {imageLinks.length}</div>
                <GoTriangleRight id="next-image" onClick={nextImage}/>
              </div>
            </div>
          </div>
          <div className="desc-container">
            <h1 className="main-head">Project Planner</h1>
            <p className="price">$38.00</p>
  
            <div className="color-boxs">
              <p>Color: </p>
              <div className="color-box">
                <select name="color" id="color-select" onChange={(e) => changColorImage(e)}>
                  <option value="Dark Green">Dark Green</option>
                  <option value="Light Blue">Light Blue</option>
                  <option value="Midnight">Midnight</option>
                  <option value="Clay">Clay</option>
                  <option value="Rose">Rose</option>
                  <option value="Sand">Sand</option>
                  <option value="Lavender">Lavender</option>
                </select>
                <div className="color-content">
                  <span>{color}</span>
                  <FaAngleDown />
                </div>
              </div>
            </div>
  
            <div className="card-box">
              <div className="quantity">1</div>
              <a href="#" className="add-card">
                Add to card
              </a>
              <BsFillHeartFill />
            </div>
  
            <div className="desc-box">
              <p>
                Our powerful Project Planner is back in bold new colors and
                updated features to help you map, organize, and finish projects on
                time. It now has room for over 100 projects, each broken down into
                concise task lists and monthly timelines. Open-dated yearly,
                monthly and weekly sections encourage you to set goals and see
                them through, and a new process notes section provides space to
                jot down ideas, meeting points, to-dos, and more. Smyth Sewn
                binding lies flat when open and a durable, fabric-like cover with
                an elastic band holds it all together.
              </p>
              <b>
                Our Vibrant Sticker Tabs work perfectly with the project planner.
              </b>
            </div>
  
            <div className="details">
              <li>FSC Chain of Custody Certified paper </li>
              <li>Smyth Sewn binding</li>
              <li>
                Dimensions: 11.9" x 8.4" (21.3 cm x 30.2 cm) with 160 open-dated
                pages
              </li>
              <li>
                Yearly, monthly, weekly, project plan, process notes, and notes
                sections
              </li>
            </div>
  
            <div className="cus-review">
              <h1>Customer Review</h1>
              <p>Not review yet</p>
              <a href="">Write a review</a>
            </div>
          </div>
        </div>
  
        <div className="project-container">
          <div className="title-box">
            <h1>You may also like
            <div className="title-border"></div>
            </h1>
            <div className="title-border-container">
              
            </div>
          </div>
  
          <table className="product-container">
            <tr>
              <td>
                <div className="product-box">
                  <img id="image-product1" src="https://cdn.shopify.com/s/files/1/0001/5211/products/Pk-SpectrumWallCalendar-Gray1440x1440-web_480x.gif?v=1685545905" alt="" />
                  <h1 className="product-desc">Spectrum Wall Panner</h1>
                  <p className="product-price">$48.00</p>
                </div>
              </td>
              <td>
                <div className="product-box">
                    <img id="image-product2" src="https://cdn.shopify.com/s/files/1/0001/5211/products/PK-ObjectPlanner-LightBlue-Grid-001_480x.jpg?v=1672867360" alt="" />
                    <h1 className="product-desc">Object Notebook</h1>
                    <p className="product-price">$28.00</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="product-box">
                  <img  src="//cdn.shopify.com/s/files/1/0001/5211/products/PK-mini-ZodiacCalendar-Product-004-1_480x.gif?v=1664913906" alt="" />
                  <h1 className="product-desc">2023 Zodiac Calendar</h1>
                  <p className="product-price">On sale from $9.00</p>
                  <div className="sale">
                    SALE
                  </div>
                </div>
              </td>
              <td>
                <div className="product-box">
                    <img id="image-product4" src="//cdn.shopify.com/s/files/1/0001/5211/products/Everyday-Desk-Pad-Stop-Motion-01_480x.gif?v=1651186991" alt="" />
                    <h1 className="product-desc">Everything Desk Pad</h1>
                    <p className="product-price">$18.00</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  };
  
  export default ProductDetail;
  