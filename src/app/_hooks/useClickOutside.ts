import React from "react";

const useClickOutside = (
  dialogRef: any,
  togglerRef: any,
  dialogState: boolean,
  dialogHandler: (item: any) => void
) => {
  React.useEffect(() => {
    const listener = (event: any) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        if (togglerRef?.current.contains(event.target as Node)) {
          if (dialogState) {
            return dialogHandler(false);
          }
        } else {
          dialogHandler(false);
        }
      }
    };

    /* Adding an event listener to the document. */
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      /* Removing the event listener. */
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [dialogRef]);
};

export default useClickOutside;
