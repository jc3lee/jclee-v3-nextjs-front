import { MouseEvent } from "react";

export const getCursorPosition = (e: MouseEvent<HTMLElement>, el: HTMLElement) => {
  let bounds = el.getBoundingClientRect()
  // get position of mouse relative to image.
  let x = e.pageX - bounds.left
  let y = e.pageY - bounds.top
  // remove eventual scroll offset values.
  x = x - window.scrollX;
  y = y - window.scrollY;
  return { x, y }
}