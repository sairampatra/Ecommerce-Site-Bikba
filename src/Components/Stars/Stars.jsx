import React from "react";
import StarRatings from "react-star-ratings";

const StarRatingComponent = ({ rating , color = 'black'}) => {
  
  return (
    <StarRatings
      rating={rating}   // Pass any number between 0 to 10
      starRatedColor={color}
      starEmptyColor="gray"
      numberOfStars={5}  // Total stars
      starDimension="20px" // Adjust size
      starSpacing="1px" // Adjust spacing
    />
  );
};

export default StarRatingComponent;
