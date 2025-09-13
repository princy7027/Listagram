import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

import { useTranslation } from "react-i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import

import Status from "@/components/table/Status";
import Tooltip from "@/components/tooltip/Tooltip";

import SelectStatus from "@/components/form/selectOption/SelectStatus";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { useState } from "react";
import MainModal from "../modal/MainModal";

const UserTable = ({ users }) => {
  // console.log('globalSetting',globalSetting)

  const [deleteModal, setDeleteModal] = useState(false);
  const { t } = useTranslation();

  // console.log('orders',orders)
  console.log(users?.data, "projectprojectproject");

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {users?.data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell className="text-xs">
            <span className="text-sm">
              {item?.name}
              </span>
            </TableCell>

            <TableCell className="text-xs">
              <span className="text-sm">
                {item?.email}
                {/* {showDateTimeFormat(order?.updatedDate)} */}
              </span>
            </TableCell>

            <TableCell className="text-xs">
              <span className="text-sm">
                {item?.role}
                {/* <Status status={item?.is_published} /> */}
              </span>
            </TableCell>
            <TableCell className="text-xs">
              {/* <span className="text-sm font-semibold"> */}
              <Status status={item?.is_verified} />
              {/* </span> */}
            </TableCell>
            <TableCell className="text-xs">
              {/* <span className="text-sm font-semibold"> */}
              <Status status={item?.is_active} />
              {/* </span> */}
            </TableCell>
            <TableCell>
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                  {" "}
                  <Link to={`/customer-order/${item.id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewOrder")}
                      bgColor="#34D399"
                    />
                  </Link>
                </div>

                <EditDeleteButton
                  title={item.bot_name}
                  id={item.id}
                  // handleUpdate={handleUpdate}
                  handleModalOpen={() => setDeleteModal(true)}
                />
              </div>
            </TableCell>

            {/* <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {getNumberTwo(order?.total)}
              </span>
            </TableCell> */}

            {/* <TableCell className="text-xs">
              <Status status={order?.status} />
            </TableCell> */}

            {/* <TableCell className="text-center">
              <SelectStatus id={order._id} order={order} />
            </TableCell> */}

            {/* <TableCell className="text-right flex justify-end">
              <div className="flex justify-between items-center">
                <PrintReceipt orderId={order._id} />

                <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                  <Link to={`/order/${order._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewInvoice")}
                      bgColor="#059669"
                    />
                  </Link>
                </span>
              </div>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      <MainModal isModalOpen={deleteModal} closeModal={()=>setDeleteModal(false)}/>
    </>
  );
};

export default UserTable;
