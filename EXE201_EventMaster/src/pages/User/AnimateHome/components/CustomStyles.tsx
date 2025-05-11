import React from 'react'

export const CustomStyles: React.FC = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 0.8; }
          100% { opacity: 0.3; }
        }
        
        @keyframes rotate3d {
          0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg); }
          100% { transform: perspective(1000px) rotateX(10deg) rotateY(10deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-40px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translate3d(40px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale3d(0.8, 0.8, 0.8);
          }
          to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes scan {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
        
        @keyframes levitate {
          0% { transform: translateY(0) rotate(0); }
          25% { transform: translateY(-10px) rotate(2deg); }
          50% { transform: translateY(0) rotate(0); }
          75% { transform: translateY(10px) rotate(-2deg); }
          100% { transform: translateY(0) rotate(0); }
        }

        @keyframes rotateCard {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes wave {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(10px) translateY(-10px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        .animate-on-scroll {
          opacity: 0;
        }
        
        .animate-on-scroll.show {
          opacity: 1;
          animation-duration: 0.8s;
          animation-fill-mode: both;
        }
        
        .animate-on-scroll[data-animation="fadeInUp"].show {
          animation-name: fadeInUp;
        }
        
        .animate-on-scroll[data-animation="fadeInLeft"].show {
          animation-name: fadeInLeft;
        }
        
        .animate-on-scroll[data-animation="fadeInRight"].show {
          animation-name: fadeInRight;
        }
        
        .animate-on-scroll[data-animation="zoomIn"].show {
          animation-name: zoomIn;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 1.5s ease-in-out infinite;
        }
        
        .animate-scan {
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.1) 100%);
          background-size: 100% 200%;
          animation: scan 3s linear infinite;
        }
        
        .animate-levitate {
          animation: levitate 10s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .hover-scale {
          transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: translateY(-5px) scale(1.03);
        }
        
        .feature-card {
          transition: transform 0.5s ease, box-shadow 0.5s ease, border-color 0.3s ease;
          transform-style: preserve-3d;
        }
        
        .feature-card:hover {
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
          transition: transform 0.5s ease;
        }
        
        .blur-3xl {
          filter: blur(64px);
        }
        
        .blur-2xl {
          filter: blur(40px);
        }
        
        .custom-cursor {
          pointer-events: none;
          position: fixed;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: rgba(59, 130, 246, 0.3);
          mix-blend-mode: lighten;
          filter: blur(5px);
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, opacity 0.2s;
        }

        .portfolio-item {
          transition: all 0.5s ease;
          transform-style: preserve-3d;
          transform: perspective(1000px);
        }

        .portfolio-item:hover {
          transform: perspective(1000px) rotateX(10deg) rotateY(10deg) translateZ(20px);
          z-index: 10;
        }

        .portfolio-item::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 15%,
            rgba(255, 255, 255, 0) 30%,
            rgba(255, 255, 255, 0) 70%,
            rgba(255, 255, 255, 0.1) 85%,
            rgba(255, 255, 255, 0.3) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .portfolio-item:hover::before {
          opacity: 1;
        }

        .portfolio-content {
          position: relative;
          z-index: 1;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        /* 3D Card Effects */
        .card-3d-wrapper {
          perspective: 1500px;
        }
        
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.8s ease, box-shadow 0.8s ease;
        }
        
        .card-3d:hover {
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.3);
        }
        
        .card-3d-front,
        .card-3d-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: inherit;
        }
        
        .card-3d-back {
          transform: rotateY(180deg);
        }
        
        .card-3d:hover .card-3d-front {
          transform: rotateY(-10deg);
        }
        
        .card-3d:hover .card-3d-back {
          transform: rotateY(170deg);
        }

        .faq-item {
          overflow: hidden;
          transition: all 0.5s ease;
        }

        .faq-content {
          transition: max-height 0.5s ease, opacity 0.3s ease;
        }
      `
      }}
    />
  )
}

export default CustomStyles
