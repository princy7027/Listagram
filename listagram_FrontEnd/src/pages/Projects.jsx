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

//internal import
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import TableLoading from "@/components/preloader/TableLoading";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "@/reduxStore/slice/projectSlice";
import ProjectTable from "@/components/projects/ProjectTable";

const Projects = () => {
  const { project } = useSelector((state) => state.project);
  console.log(project, "statestatestate");
  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllProject());
  }, []);

  return (
    <>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 my-5 p-4">
        <CardBody className="p-0 flex justify-between items-center">
          <PageTitle>{t("Projects")}</PageTitle>
          <form
            className=" md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex justify-end h-fit"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button
                  className="w-full rounded-md h-12 btn-gray text-gray-600"
                >
                  <span className="mr-2">
                    <FiEdit />
                  </span>
                  {t("BulkAction")}
                </Button>
              </div>
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button
                  className="w-full rounded-md h-12 bg-red-300 disabled btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {t("Delete")}
                </Button>
              </div>
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("AddProduct")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      {false ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : false ? (
        <span className="text-center mx-auto text-red-500">{"error"}</span>
      ) : project?.data?.length > 0 ? (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("Bot Name")}</TableCell>
                <TableCell>{t("Company Name")}</TableCell>
                <TableCell>{t("Is Api Enabled")}</TableCell>
                <TableCell>{t("Is Published")}</TableCell>
                <TableCell className="text-right">{t("ActionTbl")}</TableCell>
              </tr>
            </TableHeader>

            <ProjectTable project={project?.data} />
          </Table>

          <TableFooter>
            <Pagination
              totalResults={100}
              resultsPerPage={10}
              onChange={() => {}}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no orders right now." />
      )}
    </>
  );
};

export default Projects;
