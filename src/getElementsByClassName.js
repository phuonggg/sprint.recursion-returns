const getElementsByClassName = (className) => {
  // YOUR CODE HERE
  const elementsContainingClass = [];

  /* 
  declare function findElements for recursion
    base case
    recursive case: call function itself
  findElements()
  */

  const findElements = function(element) {
    // Check if the element has the target classname (use classList)

    if (element.classList && element.classList.contains(className)) {
      elementsContainingClass.push(element);
    }

    if (element.childNodes) {
      element.childNodes.forEach((item) => findElements(item));
    }
  };

  findElements(document.body);

  return elementsContainingClass;
};

module.exports = { getElementsByClassName };
