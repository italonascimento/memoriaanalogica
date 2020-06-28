import React, { useEffect } from 'react'

export default function useClickOutsideHandler(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) {
  useEffect(() => {
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback()
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
  }, [ref, callback]);
}