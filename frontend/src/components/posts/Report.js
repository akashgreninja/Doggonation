import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Report.css";
import ReactLoading from "react-loading";
import React, { useState } from "react";
import { report } from "../../api/report";

const Report = (post_id) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 0.5,
  };
  const [loading, setloading] = useState(false);
  const [laodingtext, setlaodingtext] = useState("Submit");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setloading(false);
    setlaodingtext("Submit");
  };

  const [reason, setreason] = useState("");

  const [emptyWarningText, setemptyWarningText] = useState(false);

  const handleReport = async () => {
    if (reason === "") {
      setemptyWarningText(true);
      return;
    }
    try {
      setloading(true);
      let data = "";
      if (reason !== "") {
        data = await report(reason, post_id);
      }

      if (data.status === 200) {
        setlaodingtext("report submitted sucessfully");
        handleClose();
      } else {
        setloading(false);
        setlaodingtext("Retry");
      }
    } catch (e) {
      console.log(e);
      setloading(false);

      setlaodingtext("retry");
    }
  };

  const change = (e) => {
    setreason({ ...reason, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {" "}
      <a
        href="#"
        onClick={handleOpen}
        className="block px-4 py-2 text-gray-800 hover:bg-banana-100 hover:text-white"
      >
        Report
      </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-report"
        aria-describedby="modal-modal-reporting"
      >
        <Box sx={style}>
          <div className="flex flex-col">
            <input
              type="text"
              className="text-black-900 border-2 border-black-900 h-64 p-2 pb-60"
              name="reason"
              onChange={change}
              placeholder="Why are you reporting this"
            />
            {emptyWarningText ? (
              <p className="text-red-800">Please enter a reason</p>
            ) : (
              " "
            )}
            <button
              onClick={handleReport}
              id="Submit"
              className="mt-5 p-3 h-10 bg-ocean-200 hover:bg-ocean-100 text-white rounded-sm w-1/4"
            >
              {loading ? <ReactLoading /> : laodingtext}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Report;
