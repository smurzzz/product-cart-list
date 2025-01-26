import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productList } from "../data";

const Details = () => {
  const { slug } = useParams();
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const normalizedSlug = slug ? slug.toLowerCase().replace(/\s+/g, "-") : "";
    const findDetail = productList.filter(
      (product) =>
        product.slug.toLowerCase().replace(/\s+/g, "-") === normalizedSlug
    );

    if (findDetail.length > 0) {
      setDetail(findDetail[0]);
    } else {
      navigate("/"); // Use React Router's navigate for redirection
    }
  }, [slug, navigate]);

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex mt-5 gap-5 items-center justify-center flex-col lg:flex-row">
      <img
        src={detail.image.desktop}
        className="w-[300px] drop-shadow-xl rounded-xl"
        alt={detail.name}
      />
      <div>
        <p className="text-Rose500 font-[500] text-[18px]">{detail.category}</p>
        <p className="text-Rose900 font-[600] text-[20px]">{detail.name}</p>
        <p className="mt-3 text-Rose900 font-[500]">{detail.description}</p>
      </div>
    </div>
  );
};

export default Details;
