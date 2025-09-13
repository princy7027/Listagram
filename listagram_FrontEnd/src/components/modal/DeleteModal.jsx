import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { SidebarContext } from "@/context/SidebarContext";



import useToggleDrawer from "@/hooks/useToggleDrawer";
import { notifyError, notifySuccess } from "@/utils/toast";

const DeleteModal = ({ id, ids, setIsCheck, category, title, useParamId }) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    // return notifyError("This option disabled for this option!");
    try {
      setIsSubmitting(true);




    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setServiceId();
      setIsCheck([]);
      closeModal();
      setIsSubmitting(false);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            <FiTrash2 />
          </span>
          {/* <h2 className="text-xl font-medium mb-1">{t('DeleteModalH2')}</h2> */}
          <h2 className="text-xl font-medium mb-2">
            {t("DeleteModalH2")} <span className="text-red-500">{title}</span>?
          </h2>
          <p>{t("DeleteModalPtag")}</p>
        </ModalBody>

        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeModal}
          >
            {t("modalKeepBtn")}
          </Button>
          <div className="flex justify-end">
            {isSubmitting ? (
              <Button
                disabled={true}
                type="button"
                className="w-full h-12 sm:w-auto"
              >
                <img
                  src={spinnerLoadingImage}
                  alt="Loading"
                  width={20}
                  height={10}
                />{" "}
                <span className="font-serif ml-2 font-light">
                  {t("Processing")}
                </span>
              </Button>
            ) : (
              <Button onClick={handleDelete} className="w-full h-12 sm:w-auto">
                {t("modalDeletBtn")}
              </Button>
              // <button
              //   type="submit"
              //   className="text-sm mt-6 leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-400 hover:bg-emerald-500 h-10"
              // >
              //   Park Order
              // </button>
            )}
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(DeleteModal);
