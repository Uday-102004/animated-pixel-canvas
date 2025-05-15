
import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleLinkHoverOn = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't change cursor for navigation items with no-cursor-change class
      if (target.classList.contains('no-cursor-change')) return;
      setLinkHovered(true);
    };
    
    const handleLinkHoverOff = () => setLinkHovered(false);
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add event listeners to hoverable elements
    const hoverableElements = document.querySelectorAll('a, button, .hoverable');
    hoverableElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHoverOn);
      el.addEventListener('mouseleave', handleLinkHoverOff);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      hoverableElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHoverOn);
        el.removeEventListener('mouseleave', handleLinkHoverOff);
      });
    };
  }, []);

  useEffect(() => {
    // Apply hover class to elements when mouse is over them
    const addHoverClass = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if ((target.tagName === 'A' || 
          target.tagName === 'BUTTON' ||
          target.classList.contains('hoverable')) && 
          !target.classList.contains('no-cursor-change')) {
        document.body.classList.add('hover-element');
      }
    };
    
    const removeHoverClass = () => {
      document.body.classList.remove('hover-element');
    };
    
    document.addEventListener('mouseover', addHoverClass);
    document.addEventListener('mouseout', removeHoverClass);
    
    return () => {
      document.removeEventListener('mouseover', addHoverClass);
      document.removeEventListener('mouseout', removeHoverClass);
    };
  }, []);

  return (
    <>
      <div 
        className={`cursor-dot ${hidden ? 'opacity-0' : 'opacity-100'} ${clicked ? 'scale-75' : ''} ${linkHovered ? 'scale-150' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`
        }}
      />
      <div 
        className={`cursor-outline ${hidden ? 'opacity-0' : 'opacity-100'} ${clicked ? 'scale-150' : ''} ${linkHovered ? 'scale-75' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`
        }}
      />
    </>
  );
};

export default CustomCursor;
