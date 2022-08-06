import React from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../utils/config";

const SearchResult = ({ title, searchResultData }) => {
  const handleAddFavourites = async (obj) => {
    console.log(obj);
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(obj),
    };
    const res = await fetch(`${backendUrl}/favourites/add`, options);
    const data = await res.json();
    if (data.success === false) return toast.error("Something went wrong.");

    toast.success("Added to favourites.");
  };

  return (
    <>
      <h5 className="text-bold mt-4">{title} places</h5>
      <div className="recommended-places">
        <div className="places-list">
          {searchResultData &&
            searchResultData.map((item, key) => {
              return (
                <div className="place-item" key={key}>
                  <div className="image">
                    <img src={item.image} />
                  </div>
                  <div className="title">{item.name}</div>
                  <div className="description text-muted">
                    Location: {item.location}
                  </div>
                  <div className="price">NPR 250</div>
                  <div
                    className="favourites"
                    onClick={() =>
                      handleAddFavourites({
                        image: item.image,
                        name: item.name,
                        description: item.des,
                        location: JSON.stringify(item.cords),
                        visited: true,
                      })
                    }
                  >
                    <i className="bi bi-heart"></i>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SearchResult;
