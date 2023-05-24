import React from "react";
import { useEffect } from "react";
import Razorpay from "../components/Razorpay/Razorpay";
import './DonationPage.css';

const DonationPage = (props) => {
    useEffect(() => {
        props.Sidebarrender(true);
      }, []);   

      return(
        <div style={{'width':'1270px',}} >
            <div className="feed-container overflow-y-scroll w-full">
                <div className="background-image ">
                        <h1 className="center-text pt-150 text-size-150 font-colour-white">
                            DOGS!
                        </h1>
                    </div>
                <div className="margin-20">
                    <div>
                        <div>
                            <h1 className="bold center-text">
                                That's who we are for
                            </h1>
                        </div>
                        <div>
                            <p className="justify-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
                            dolorem modi illo ipsum, est ex atque? Ex atque culpa ducimus et
                            at dolores ad facere minima eligendi quisquam, hic debitis aliquid
                            iusto quia nobis harum commodi nisi. Quia inventore eaque facere
                            excepturi facilis fuga beatae aliquam ipsam deleniti labore velit
                            totam cum iste unde suscipit impedit, dicta sed. Distinctio,
                            aspernatur incidunt dolore totam culpa, debitis placeat ratione
                            ipsa ipsum possimus eaque, cumque saepe quia non.
                            </p>
                            {/* Note: the frontend dev also loves dogs edit: he loves dogs very very much */}
                        </div>
                        <div>
                            <Razorpay/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default DonationPage;