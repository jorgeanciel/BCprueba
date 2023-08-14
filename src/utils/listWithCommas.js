import React from "react";

const listWithCommas = (elements, propertyStrtipo) => {
  if (elements.length === 1) return propertyStrtipo(elements[0]);

  return elements.map((e, i) => {
    // if is the last, just return the element
    if (i === elements.length - 1) return propertyStrtipo(e);
    else propertyStrtipo(e) + ", ";
  });
};

export default listWithCommas;
