import React from "react";
import { useEffect } from "react";
import Razorpay from "../components/Razorpay/Razorpay";
import "./DonationPage.css";

const DonationPage = (props) => {
  useEffect(() => {
    props.Sidebarrender(true);
  }, []);

  return (
    <div style={{ width: "1270px" }}>
      <div className="feed-container overflow-y-scroll w-full">
        <div className="background-image ">
          <h1 className="center-text pt-150 text-size-150 font-colour-white">
            DOGS!
          </h1>
        </div>
        <div className="margin-20">
          <div>
            <div>
              <h1 className="bold center-text">That's who we are for</h1>
            </div>
            <div>
              <p className="justify-text">
                Doggonation is a project developed by Akash Uday, Kartik Hegde,
                and Arnab Kar. They are the original owners and creators of this
                repository. We are passionate about dogs and wanted to create a
                platform dedicated to all things dog-related. Our project is
                open-source and available on GitHub. You can find the repository
                at <a href="https://github.com/akashgreninja/Doggonation">Github</a>. Feel free to
                explore the code, contribute, or use it as a reference for your
                own projects. Doggonation is a comprehensive platform that aims
                to bring dog lovers together. Here, you can find a wealth of
                information about various dog breeds, their characteristics,
                care tips, and more. Whether you're a proud dog owner or simply
                a dog enthusiast, this platform is designed to cater to your
                needs.
              </p>
              {/* Note: the frontend dev also loves dogs edit: he loves dogs very very much */}
            </div>
            <div>
              <Razorpay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
