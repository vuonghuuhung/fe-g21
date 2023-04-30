import { FaFacebookF, FaTwitter, FaInstagram, FaCartPlus, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import "./SingleProduct.scss";
import Footer from "../Footer";

const SingleProduct = () => {
    return (
        <div className="single-product-main-content">
            <div className="layout">
                <section id="section-product">
                    <div class="site-box-content flickity-enabled is-draggable" tabindex="0">
                        <div className="left flickity-viewport" >
                            <div class="flickity-slider" >
                                <div class="product-image" data-index="0" data-variant-img="38671242526935">
                                    <img data-image-id="38671242526935" src="https://cdn.shopify.com/s/files/1/0001/5211/products/PK-ProjectPlanner-LightBlue-001_480x.jpg?v=1672867147" alt="Project Planner"></img>
                                </div>
                                {/* <div class="product-image" data-index="1" data-variant-img="38671242526935">
                                    <img data-image-id="38671242526935" src="https://cdn.shopify.com/s/files/1/0001/5211/products/PK-ProjectPlanner-LightBlue-001_480x.jpg?v=1672867147" alt="Project Planner"></img>
                                </div>
                                <div class="product-image" data-index="2" data-variant-img="38671242526935">
                                    <img data-image-id="38671242526935" src="https://cdn.shopify.com/s/files/1/0001/5211/products/PK-ProjectPlanner-LightBlue-001_480x.jpg?v=1672867147" alt="Project Planner"></img>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <span className="name">Project Planner</span>
                        <span className="price"></span>
                        <span className="descrip">Description</span>
                        <div className="offer">
                            <div className="quantity-buttons">
                                <span >-</span>
                                <span>4</span>
                                <span>+</span>
                            </div>
                            <button className="add-to-cart-button" >
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>

                        </div>
                        <span className="divider" />
                        <div className="info-item">
                            <span className="text-bold">
                                Description
                            </span>
                            <div data-mce-fragment="1">
                                Our powerful Project Planner is back in bold new colors and updated features to help you map, organize, and finish projects on time. It now has room for over 100 projects, each broken down into concise task lists and monthly timelines. Open-dated yearly, monthly and weekly sections encourage you to set goals and see them through, and a new process notes section provides space to jot down ideas, meeting points, to-dos, and more. Smyth Sewn binding lies flat when open and a durable, fabric-like cover with an elastic band holds it all together.
                            </div>
                            <div data-mce-fragment="1"></div>
                            <div data-mce-fragment="1"></div>
                            <div data-mce-fragment="1"></div>

                        </div>
                    </div>
                </section>

                <section id="section-related-products" class="site-box-container">
                    <div class="site-box">
                        <div class="site-box-content box__heading">
                            <h4 class="title">You may also look like</h4>

                        </div>
                    </div>
                    <div></div>

                </section>

                <Footer/>
            </div>

        </div>
    );
};
export default SingleProduct;