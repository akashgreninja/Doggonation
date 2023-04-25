import React from "react";
import PostCard from "../posts/PostCard";
const Feedtable = () => {
  return (
    <div className="" style={{ "margin-bottom": "50px", height: "vh-70" }}>
      <div>
        <div className="float-left">
          <PostCard />
        </div>
      </div>
      <div className="  float-right right-7 w-80 flex flex-wrap  fixed">
        <div className=" ">
          <div class=" block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div class="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              Featured
            </div>
            <div class="p-6">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Special title treatment
              </h5>
              <p class="">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
          </div>
        </div>

        <div className="py-10  ">
          <div class=" block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div class="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
              Featured
            </div>
            <div class="p-6">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Special title treatment
              </h5>
              <p class="">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedtable;
