import { Badge } from "@windmill/react-ui";

const Status = ({ status }) => {
  return (
    <>
      <span className="font-serif">
        {/* {(status === "Pending" || status === "Inactive") && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{status}</Badge>
        )}
        {status === "Processing" && <Badge>{status}</Badge>}
        {(status === "Delivered" || status === "Active") && (
          <Badge type="success">{status}</Badge>
        )} */}
        {/* {status === "Cancel" && <Badge type="danger">{status}</Badge>} */}
        {status === false && (
          <Badge type="danger">{"No"}</Badge>
        )}
        {status === true && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{"Yes"}</Badge>
        )}
      </span>
    </>
  );
};

export default Status;
