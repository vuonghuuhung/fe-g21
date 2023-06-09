export const ArrowDown = ({ className = "" }) => {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={
        "icon-arrow-down inline-block mx-1 transition-all duration-500 ease-in-out " +
        className
      }
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3033 2.51037C11.4986 2.31511 11.4986 1.99852 11.3033 1.80326L10.5962 1.09615C10.401 0.900892 10.0844 0.900892 9.88913 1.09615L6.00075 4.98453L2.11095 1.09615C1.91569 0.900891 1.59911 0.900892 1.40385 1.09615L0.69674 1.80326C0.501478 1.99852 0.501477 2.3151 0.696739 2.51037L4.58653 6.39875L4.58583 6.39945L5.64649 7.46011C5.84175 7.65538 6.15833 7.65538 6.35359 7.46011L11.3033 2.51037Z"
        fill="#0085ca"
      ></path>
    </svg>
  );
};

export const PrevPointer = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.95401 16.5159L9.23818 17.2318C9.04051 17.4294 8.72003 17.4294 8.52236 17.2318L0.648253 9.35765C0.450582 9.15998 0.450582 8.83949 0.648253 8.64182L8.52236 0.767719C8.72003 0.570047 9.04051 0.570047 9.23818 0.767719L9.95401 1.48355C10.1517 1.68122 10.1517 2.0017 9.95401 2.19937L4.16768 7.98758L16.9938 7.9874C17.2734 7.9874 17.5 8.21402 17.5 8.49357V9.5059C17.5 9.78545 17.2734 10.0121 16.9938 10.0121L4.16363 10.0122L9.95401 15.8001C10.1517 15.9978 10.1517 16.3183 9.95401 16.5159Z"
        fill="white"
      ></path>
    </svg>
  );
};

export const Loading = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#74cdf3] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export const NextPointer = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rotate-180"
    >
      <path
        d="M9.95401 16.5159L9.23818 17.2318C9.04051 17.4294 8.72003 17.4294 8.52236 17.2318L0.648253 9.35765C0.450582 9.15998 0.450582 8.83949 0.648253 8.64182L8.52236 0.767719C8.72003 0.570047 9.04051 0.570047 9.23818 0.767719L9.95401 1.48355C10.1517 1.68122 10.1517 2.0017 9.95401 2.19937L4.16768 7.98758L16.9938 7.9874C17.2734 7.9874 17.5 8.21402 17.5 8.49357V9.5059C17.5 9.78545 17.2734 10.0121 16.9938 10.0121L4.16363 10.0122L9.95401 15.8001C10.1517 15.9978 10.1517 16.3183 9.95401 16.5159Z"
        fill="white"
      ></path>
    </svg>
  );
};
