import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';
import './ResizeBox.css';

interface ResizeBoxProps {
  direction: 'horizontal' | 'vertical';
}

const ResizeBox: React.FC<ResizeBoxProps> = ({ direction, children }) => {
  let resizeBoxProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [resizeBoxWidth, setResizeBoxWidth] = useState(window.innerWidth * 0.75);
  useEffect(() => {
    const listener = () => {
      let timer: any;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 > resizeBoxWidth) {
          setResizeBoxWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [resizeBoxWidth]);
  if (direction === 'vertical') {
    resizeBoxProps = {
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 24],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  } else {
    resizeBoxProps = {
      className: 'resize-horizontal',
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      height: Infinity,
      width: resizeBoxWidth,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setResizeBoxWidth(data.size.width);
      },
    };
  }
  return <ResizableBox {...resizeBoxProps}>{children}</ResizableBox>;
};

export default ResizeBox;
