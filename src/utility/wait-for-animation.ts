export const waitForAnimation = (
  element: HTMLElement,
  animationName?: string,
) => {
  return new Promise(resolve => {
    function onAnimationEnd(e: AnimationEvent) {
      if (!animationName || e.animationName === animationName) {
        element.removeEventListener("animationend", onAnimationEnd);
        resolve(null);
      }
    }

    element.addEventListener("animationend", onAnimationEnd);
  });
};
