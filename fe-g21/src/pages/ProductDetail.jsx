import { FaFacebookF, FaTwitter, FaInstagram, FaCartPlus, FaLinkedinIn, FaPinterest } from "react-icons/fa";

const ProductDetail = () => {
    return (
        <section>
            <div>
                <div className="right-container">
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
                <div className="left-container">
                    <div className="product-image" data-index="0">
                        <img 
                            data-image-id="" 
                            src="https://cdn.shopify.com/s/files/1/0001/5211/products/Pk-SpectrumWallCalendar-Earthy1440x1440-web_960x.gif?v=1672867572"
                        ></img>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail