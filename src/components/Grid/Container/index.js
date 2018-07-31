import React from "react";

const Container = ({ children }) => {
  if (process.env.NODE_ENV === "development") {
    React.Children.forEach(children, (child, index) => {
      if (child.type.name !== "Row") {
        console.warn(
          `Container should only have Row components as children. Element at index ${index} is not a Row`
        );
      }
    });
  }

  return <div className="container-fluid">{children}</div>;
};

export default Container;
