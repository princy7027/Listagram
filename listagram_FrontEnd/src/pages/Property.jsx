import React from "react";
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
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { FiDelete } from "react-icons/fi";

//internal import
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";

import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "@/utils/toast";
const Property = () => {
  const { t } = useTranslation();
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Iamge",
      selector: (row) => <img src={row?.photos[0]?.url} alt="Image" width="100px" />,
      sortable: true,
    },
   
    {
      name: "Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.address,
      sortable: true,
    },

    {
      name: "Action",
      button: true,
      cell: (row) => (
        <Button onClick={()=>handleDelete(row.id)}>
          <FiTrash2 />
        </Button>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/deleteHome/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notifySuccess("deleted")
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
    console.log("//",id)
  };


  
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    getAllProperty();
  }, []);

  const [allProperty, setAllProperty] = useState();

  const getAllProperty = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/view_All_List", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("==", response.data.data);
      setAllProperty(response.data.data);
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };

  
  return (
    <>
      {" "}
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 my-5 p-4">
        <CardBody className="p-0 flex justify-between items-center">
          <PageTitle>{t("Properties")}</PageTitle>
          <form className=" md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex justify-end h-fit">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow"></div>
              <Link to="/Add-Property">
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button className="w-full rounded-md h-12">
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t("Add Property")}
                  </Button>
                </div>
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
      <DataTable columns={columns} data={allProperty} defaultSortFieldId={1} pagination />
    </>
  );
};

export default Property;
