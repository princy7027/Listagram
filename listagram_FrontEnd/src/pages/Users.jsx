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
import TableLoading from "@/components/preloader/TableLoading";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "@/reduxStore/slice/projectSlice";
import ProjectTable from "@/components/projects/ProjectTable";
import { getUsers } from "@/reduxStore/slice/authSlice";
import UserTable from "@/components/users/UserTable";
import axios from "axios";
import { getToken } from "@/helpers/utils/auth.util";
import DataTable from "react-data-table-component";

const Users = () => {
  const { users } = useSelector((state) => state.auth);
  console.log(users, "statestatestate");
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    getAllUsers();
  }, []);

  const [Users, setUsers] = useState();

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/view_All_User", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("==", response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  };
  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      cell: () => (
        <Button>
          <FiDelete />
        </Button>
      ),
    },
  ];
  

  return (
    <>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 my-5 p-4">
        <CardBody className="p-0 flex justify-between items-center">
          <PageTitle>{t("Users")}</PageTitle>
          <form className=" md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex justify-end h-fit">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button className="w-full rounded-md h-12 bg-red-300 disabled btn-red">
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {t("Delete")}
                </Button>
              </div>
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button className="w-full rounded-md h-12">
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("Add User")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <DataTable columns={columns} data={Users} defaultSortFieldId={1} pagination />

      {/* <NotFound title="Sorry, There are no orders right now." /> */}
    </>
  );
};

export default Users;
