// make me a profile page that has a users image rounded and a button to update their info and below that it should display their info and follwers + following also below that their posts all this in tailwind genertae this for me github copilot

import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useParams } from "react-router-dom";
import { Getuser } from "../api/getuser";
const ProfilePage = (props) => {
  const { id } = useParams();
  const [body, setbody] = useState();
  useEffect(() => {
    props.Sidebarrender(true);

    getuser();
  }, []);

  //  const {id}=useParams()

  const getuser = async () => {
    console.log(id);

    const { data } = await Getuser(id);
    console.log(data);
    setbody(data);
    console.log(body);
  };

  return (
    <div class="col-md-5 mx-auto">
      {" "}
      <div class="bg-white shadow rounded overflow-hidden">
        {" "}
        <div class="px-4 pt-0 pb-4 cover">
          {" "}
          <div class="media align-items-end profile-head">
            {" "}
            <div class="profile mr-3 -z-10">
              <img
                src={body ? body[6] : null}
                alt="..."
                width="130"
                class="rounded mb-2 img-thumbnail "
              />
              <a href="#" class="btn btn-outline-dark btn-sm btn-block">
                Edit profile
              </a>
            </div>{" "}
            <div class="media-body mb-5 text-white">
              {" "}
              {/* <h4 class="mt-0 mb-0">{body[1]}</h4>{" "} */}
              <p class="small mb-4">
                {" "}
                <i class="fas fa-map-marker-alt mr-2"></i>Earth
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div class="bg-light p-4 d-flex justify-content-end text-center">
          {" "}
          <ul class="list-inline mb-0">
            {" "}
            <li class="list-inline-item">
              {" "}
              <h5 class="font-weight-bold mb-0 d-block">215</h5>
              <small class="text-muted">
                {" "}
                <i class="fas fa-image mr-1"></i>Photos
              </small>{" "}
            </li>{" "}
            <li class="list-inline-item">
              {" "}
              <h5 class="font-weight-bold mb-0 d-block">745</h5>
              <small class="text-muted">
                {" "}
                <i class="fas fa-user mr-1"></i>Followers
              </small>{" "}
            </li>{" "}
            <li class="list-inline-item">
              {" "}
              <h5 class="font-weight-bold mb-0 d-block">340</h5>
              <small class="text-muted">
                {" "}
                <i class="fas fa-user mr-1"></i>Following
              </small>{" "}
            </li>{" "}
          </ul>{" "}
        </div>{" "}
        <div class="px-4 py-3">
          {" "}
          <h5 class="mb-0">About</h5>{" "}
          <div class="p-4 rounded shadow-sm bg-light">
            {" "}
            <p class="font-italic mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              dolorem modi illo ipsum, est ex atque? Ex atque culpa ducimus et
              at dolores ad facere minima eligendi quisquam, hic debitis aliquid
              iusto quia nobis harum commodi nisi. Quia inventore eaque facere
              excepturi facilis fuga beatae aliquam ipsam deleniti labore velit
              totam cum iste unde suscipit impedit, dicta sed. Distinctio,
              aspernatur incidunt dolore totam culpa, debitis placeat ratione
              ipsa ipsum possimus eaque, cumque saepe quia non.
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div class="py-4 px-4">
          {" "}
          <div class="d-flex align-items-center justify-content-between mb-3">
            {" "}
            <h5 class="mb-0">Recent photos</h5>
            <a href="#" class="btn btn-link text-muted">
              Show all
            </a>{" "}
          </div>{" "}
          <div class="row">
            {" "}
            <div class="col-lg-6 mb-2 pr-lg-1">
              <img
                src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=750&amp;q=80"
                alt=""
                class="img-fluid rounded shadow-sm"
              />
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ProfilePage;
