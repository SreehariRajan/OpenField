import React from 'react';

const DetailsCard = ({ userType, farmerName, farmLocation, cropInfo }) => (
  <div className="block rounded-lg bg-white text-left ">
    <div className="p-6">

      <h6 className="mb-2 mt-8 text-4xl font-medium leading-tight text-black">
        {farmerName}
      </h6>
      <p className="mb-4 text-base leading-normal text-black">
        Location: {farmLocation}
      </p>
      <p className="mb-4 text-base leading-normal text-black">
        {cropInfo}
      </p>
    </div>
  </div>
);

export default DetailsCard;
