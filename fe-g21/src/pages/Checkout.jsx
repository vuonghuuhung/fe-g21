import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineShoppingCart, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi"
import cart from "../mocks/cartData";
import Select from 'react-select';
import { useEffect } from "react";


const Checkout = () => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, produce) => {
                return prev + (produce.amount * produce.price);
            }, 0)
            setTotal(total);
        }

        if (window.innerWidth >= 768) {
            setToogle (false);
        } else {
            setToogle (true);
        }

        getTotal();
    }, [cart])

    const options = [
        { value: 'Việt Nam', label: 'Việt Nam' }
    ]

    const [checked2, setChecked2] = useState('false');
    const [checked1, setChecked1] = useState('false');
    const [toogle, setToogle] = useState(true)
    return (
        <div className="w-full px-4 py-4 gap-x-12 md:mt-2 md:grid md:grid-cols-5">
            {
                toogle ?
                    <div className="md:col-start-4 md:col-end-6 order-2 w-full flex justify-between border-b-1 border-gray-600 md:hidden">
                        <div className="pb-4 cursor-grab" onClick={() => {
                            setToogle(!toogle);
                        }}>
                            <AiOutlineShoppingCart className="inline-block text-xl text-cyan-600 relative bottom-0.5" />
                            <h2 className="inline-block ml-3 text-cyan-600">Show order summary</h2>
                            <AiOutlineDown className="ml-2 inline-block text-cyan-600" />
                        </div>
                        <div>${total}.00</div>
                    </div>
                    :
                    <div className="order-2 md:grow-2 md:col-start-4 md:col-end-6">
                        <div className="flex justify-between border-b-1 border-gray-600 md:border-0 md:mt-12 ">
                            <div className="pb-4 cursor-grab md:hidden" onClick={() => {
                                setToogle(!toogle)
                            }}>
                                <AiOutlineShoppingCart className="inline-block text-xl text-cyan-600 relative bottom-0.5" />
                                <h2 className="inline-block ml-3 text-cyan-600">Hide order summary</h2>
                                <AiOutlineUp className="ml-2 inline-block text-cyan-600" />
                            </div>
                            <div className="md:hidden">
                                ${total}.00
                            </div>
                        </div>
                        <div className="">
                            {
                                cart.map(product => (
                                    <div className="my-4 grid grid-cols-5 gap-x-2">
                                        <div className="col-span-1 border-1.5 rounded-md relative">
                                            <img src={product.imglink} alt="" />
                                            <div className="-top-4 -right-4 border-1.5 block rounded-full absolute w-8 bg-gray-500 text-white mr-auto ml-auto h-8 px-2.5 pb-0.5 min-h-fit">
                                                <div className="inline-block">{product.amount}</div>
                                            </div>
                                        </div>
                                        <div className="col-span-3 mt-auto mb-auto text-base">{product.name}</div>
                                        <div className="col-span-1 ml-auto mt-auto mb-auto">${product.price}.00</div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className="h-0.5 bg-gray-200 "></div>
                        <div className="grid grid-cols-5 gap-x-2">
                            <input type="text" placeholder="Gift card or discount code" className="border-2 w-full py-2 pl-2 rounded-md my-4 focus:outline-none focus:border-2 focus:border-cyan-500 col-span-3" />
                            <div className="col-span-2 content-between items-center my-4 rounded-md cursor-grab bg-gray-300">
                                <HiArrowRight className="w-full text-4xl" />
                            </div>
                        </div>
                        <div className="h-0.5 bg-gray-200 "></div>
                        <div className="my-4">
                            <div className="inline-block ">Subtotal</div>
                            <div className="inline-block float-right">${total}.00</div>
                        </div>
                        <div className="my-4">
                            <div className="inline-block ">Shipping</div>
                            <div className="inline-block float-right text-sm">Calculated at next step</div>
                        </div>
                        <div className="w-full bg-gray-500 h-0 5"></div>
                    </div>


            }

            <div className="w-full order-1 md:col-start-1 md:col-end-4 md:p-8">
                <div className="inline-block text-blue-600 text-sm">Cart</div>
                <AiOutlineRight className="inline-block ml-1 relative bottom-0.5 text-xs " />
                <div className="inline-block ml-1 text-sm">Information</div>
                <AiOutlineRight className="inline-block ml-1 relative bottom-0.5 text-xs " />
                <div className="inline-block ml-1 text-sm">Shipping</div>
                <AiOutlineRight className="inline-block ml-1 relative bottom-0.5 text-xs " />
                <div className="inline-block ml-1 text-sm">Payment</div>
                <div className="px-2 relative mt-6 flex flex-col text-sm justify-center border-2 border-gray-400 border-solid">
                    <div className="flex justify-center">
                        <div className="relative -top-3 items-center px-6 bg-white text-sm flex justify-center">Express Checkout</div>
                    </div>
                    <div className="md:flex md:flex-row">
                        <div className="w-full flex justify-center">
                            <div className="py-4 rounded bg-blue-500 w-3/4 mt-2 flex justify-center items-center md:mb-4 text-white">Shop pay</div>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="md:mb-4 py-4 rounded bg-blue-500 w-3/4 mt-2 flex justify-center items-center text-white">Amazon pay</div>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="md:mb-4 py-4 rounded bg-blue-500 w-3/4 mt-2 flex justify-center items-center text-white">Paypal</div>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="py-4 rounded bg-blue-500 w-3/4 mt-2 flex justify-center items-center mb-6 md:mb-4 text-white">Google pay</div>
                        </div>
                    </div>

                </div>
                <div className="mt-8">
                    <div className="h-0.5 bg-gray-200"></div>
                    <div className="w-full flex justify-center">
                        <div className="text-gray-500 text-sm inline-block px-3 relative -top-3 bg-white">OR</div>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="text-lg">
                        Contact information
                    </div>
                    <div className="text-sm">
                        Already have an account? Log in
                    </div>
                    <input type="email" name="" id="" className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none" placeholder="Email" />
                    <div className="mt-4">
                        <input onClick={() => {
                            setChecked1(!checked1);
                        }}
                            checked={checked1} type="checkbox" name="" id="" className="text-2xl w-4 h-4 relative top-0.5" />
                        <div className="text-gray-500 text-sm inline-block ml-2">Email me with news and offers</div>
                    </div>
                    <div className="mt-8">
                        <div>Shipping address</div>
                        <Select options={options} placeholder="Country/region" className="mt-4" />
                        <div className="md:grid md:grid-cols-2 md:gap-x-4">
                            <input type="text" name="" id="" className="md:col-span-1 p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300" placeholder="First name" />
                            <input type="text" name="" id="" className="md:col-span-1 p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300" placeholder="Last name" />
                        </div>
                        <input type="text" name="" id="" className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300" placeholder="Company (option)" />
                        <input type="text" name="" id="" className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300" placeholder="Address" />
                        <input type="text" name="" id="" className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300" placeholder="Apartment, suite, etc. (optional) " />
                        <div className="md:grid md:grid-cols-3 gap-x-4">
                            <input type="text" name="" id="" className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300" placeholder="City" />
                            <Select options={options} placeholder="Province" className="mt-4 " />
                            <input type="text" name="" id="" className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300" placeholder="Postal code" />
                        </div>
                        <input type="text" name="" id="" className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300" placeholder="Phone " />
                    </div>
                    <div className="mt-4">
                        <input type="checkbox" checked={checked2} name="" id="" className="font-semibold text-2xl w-4 h-4 relative top-0.5" onClick={() => {
                            setChecked2(!checked2);
                        }} />
                        <div className="text-gray-500 text-sm inline-block ml-2">Text me with news and offers</div>
                    </div>
                    {
                        checked2 &&
                        <div>
                            <input type="text" name="" id="" className="p-2 w-full mt-4 border-gray-400 border-2 rounded-md focus:border-blue-500 focus:outline-none transition duration-300" placeholder="Mobile phone number" />
                            <p className="text-sm text-gray-500 my-4 mt-8">By signing up via text,
                                you agree to receive recurring automated marketing messages,
                                including cart reminders, at the phone number provided.
                                Consent is not a condition of purchase.
                                Reply STOP to unsubscribe. Reply HELP for help.
                                Message frequency varies. Msg & data rates may apply.
                                View our Privacy Policy and Terms of Service.
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>)
}

export default Checkout;