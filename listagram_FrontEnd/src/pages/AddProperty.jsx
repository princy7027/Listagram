import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  Pagination,
} from "@windmill/react-ui";
import PageTitle from "@/components/Typography/PageTitle";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { notifySuccess } from "@/utils/toast";
const AddProperty = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("authToken");
  const [allHomeDetail, setAllHomeDetail] = useState({
    title: "sas",
    description: "sasa",
    price: "32",
    floor_no: "23",
    address: "sasas",
    country: "sasa",
    state: "sas",
    city: "sas",
    zip: "323222",
    size: "23",
    rooms: "32",
    bathrooms: "32",
    garages: "sdvsv",
    garage_size: "asdcsdv",
    basement: "asdv",
    roofing: "ad",
    available_from: "",
  });
  // const [images, setImages] = useState([]);
  // const [previewURLs, setPreviewURLs] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [selectedImgData, setSelectedImgData] = useState([]);

  useEffect(() => {
    console.log("Updated state", selectedImages);
  }, [allHomeDetail, selectedImages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAllHomeDetail({
      ...allHomeDetail,
      [name]: value,
    });
  };


  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImgData(files)
    const newSelectedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        newSelectedImages.push(e.target.result);
        // Check if all files have been processed
        if (newSelectedImages.length === files.length) {
          setSelectedImages(newSelectedImages);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  let bed = 4;
  const handleSubmit = async () => {
    let formData = new FormData();
    [...selectedImgData].forEach((file) => {
      formData.append(`photos`, file);
    });
    formData.append("title", allHomeDetail.title);
    formData.append("description", allHomeDetail.description);
    formData.append("price", allHomeDetail.price);
    formData.append("address", allHomeDetail.address);
    formData.append("country", allHomeDetail.country);
    formData.append("state", allHomeDetail.state);
    formData.append("city", allHomeDetail.city);
    formData.append("zip", allHomeDetail.zip);
    formData.append("size", allHomeDetail.size);
    formData.append("rooms", allHomeDetail.rooms);
    formData.append("bathrooms", allHomeDetail.bathrooms);
    formData.append("badrooms", bed);
    formData.append("garages", allHomeDetail.garages);
    formData.append("garage_size", allHomeDetail.garage_size);
    formData.append("basement", allHomeDetail.basement);
    formData.append("roofing", allHomeDetail.roofing);
    formData.append("floor_no", allHomeDetail.floor_no);
    formData.append("available_from", allHomeDetail.available_from);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/addHome",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notifySuccess("created");
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 my-5 p-4">
        <CardBody className="p-0 flex justify-between items-center">
          <PageTitle>{t("Add Properties Here")}</PageTitle>
          <form className=" md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex justify-end h-fit">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/Add-Property">
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button className="w-full rounded-md h-12" onClick={() => handleSubmit()}>
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t("Save  Property")}
                  </Button>
                </div>
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 my-5 p-4">
        <CardBody className="p-0 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="photos" className="mb-2 lableClass  flex">
                Photos
              </label>
              <input
                onChange={handleImageChange}
                // ref={inputFileRef}
                id="photos"
                name="photos"
                type="file"
                // className="hidden"
                multiple
              />
              <br />
              <div className=" flex">

                {selectedImages.map((image, index) => (
                  <img key={index} src={image} alt={`Selected Image ${index}`} className="mr-2 mb-2"
                    style={{ maxWidth: "70px" }} />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-2 lableClass">
                Title
              </label>
              <input
                value={allHomeDetail.title}
                onChange={(e) => handleInputChange(e)}
                id="title"
                name="title"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter Title"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 lableClass">
                Description
              </label>
              <input
                value={allHomeDetail.description}
                onChange={(e) => handleInputChange(e)}
                id="description"
                name="description"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter description"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="mb-2 lableClass">
                Price
              </label>
              <input
                value={allHomeDetail.price}
                onChange={(e) => handleInputChange(e)}
                id="price"
                name="price"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter price"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="floor_no" className="mb-2 lableClass">
                Floor No
              </label>
              <input
                value={allHomeDetail.floor_no}
                onChange={(e) => handleInputChange(e)}
                id="floor_no"
                name="floor_no"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter floor no"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="mb-2 lableClass">
                Address
              </label>
              <input
                value={allHomeDetail.address}
                onChange={(e) => handleInputChange(e)}
                id="address"
                name="address"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter address"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="mb-2 lableClass">
                Country
              </label>
              <input
                value={allHomeDetail.country}
                onChange={(e) => handleInputChange(e)}
                id="country"
                name="country"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter country"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state" className="mb-2 lableClass">
                State
              </label>
              <input
                value={allHomeDetail.state}
                onChange={(e) => handleInputChange(e)}
                id="state"
                name="state"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter state"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="mb-2 lableClass">
                City
              </label>
              <input
                value={allHomeDetail.city}
                onChange={(e) => handleInputChange(e)}
                id="city"
                name="city"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter city"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="zip" className="mb-2 lableClass">
                ZIP
              </label>
              <input
                value={allHomeDetail.zip}
                onChange={(e) => handleInputChange(e)}
                id="zip"
                name="zip"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter ZIP"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="size" className="mb-2 lableClass">
                Size
              </label>
              <input
                value={allHomeDetail.size}
                onChange={(e) => handleInputChange(e)}
                id="size"
                name="size"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter size"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rooms" className="mb-2 lableClass">
                Rooms
              </label>
              <input
                value={allHomeDetail.rooms}
                onChange={(e) => handleInputChange(e)}
                id="rooms"
                name="rooms"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter rooms"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bathrooms" className="mb-2 lableClass">
                Bathrooms
              </label>
              <input
                value={allHomeDetail.bathrooms}
                onChange={(e) => handleInputChange(e)}
                id="bathrooms"
                name="bathrooms"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter bathrooms"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="garages" className="mb-2 lableClass">
                Garages
              </label>
              <input
                value={allHomeDetail.garages}
                onChange={(e) => handleInputChange(e)}
                id="garages"
                name="garages"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter garages"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="garage_size" className="mb-2 lableClass">
                Garage Size
              </label>
              <input
                value={allHomeDetail.garage_size}
                onChange={(e) => handleInputChange(e)}
                id="garage_size"
                name="garage_size"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter garage size"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="basement" className="mb-2 lableClass">
                Basement (Yes / No)
              </label>
              <input
                value={allHomeDetail.basement}
                onChange={(e) => handleInputChange(e)}
                id="basement"
                name="basement"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter basement"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="roofing" className="mb-2 lableClass">
                Roofing (Yes / No)
              </label>
              <input
                value={allHomeDetail.roofing}
                onChange={(e) => handleInputChange(e)}
                id="roofing"
                name="roofing"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter roofing"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="available_from" className="mb-2 lableClass">
                Available From
              </label>
              <input
                value={allHomeDetail.available_from}
                onChange={(e) => handleInputChange(e)}
                id="available_from"
                name="available_from"
                className="react-tag-input__input"
                type="date"
                placeholder="Press enter available from"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default AddProperty;
