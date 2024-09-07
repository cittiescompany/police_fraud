import React from 'react'

const Loader = () => {
    return (
        <>
        <style>
            {`
            .dots-container {
                display: flex;
                align-items: center;
                justify-content: center;
                max-height: ${window.screen.availHeight? `${window.screen.availHeight}px`:'100vh' };
                min-height:100vh;
                width: 100%;
              }
              
              .dot {
                height: 40px;
                width: 40px;
                margin-right: 10px;
                border-radius: 50%;
                background-color: #b3d4fc;
                animation: pulse 1.7s infinite ease-in-out;
              }
              
              .dot:last-child {
                margin-right: 0;
              }
              
              .dot:nth-child(1) {
                animation-delay: -0.3s;
              }
              
              .dot:nth-child(2) {
                animation-delay: -0.1s;
              }
              
              .dot:nth-child(3) {
                animation-delay: 0.1s;
              }
              
              @keyframes pulse {
                0% {
                  transform: scale(0.8);
                  background-color: #b3d4fc;
                  box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
                }
              
                50% {
                  transform: scale(1.2);
                  background-color: #6793fb;
                  box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
                }
              
                100% {
                  transform: scale(0.8);
                  background-color: #b3d4fc;
                  box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
                }
              }
            `}
        </style>

        <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </section>
        </>

    )
}

export default Loader