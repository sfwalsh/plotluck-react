import React from "react";

import { useRouteError } from "react-router-dom";
import errorImage from '../images/whoops/error.png';

import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="container">
      <div className="d-flex flex-column align-items-center justify-content-center text-center">

        {/* Vertical Alignment in Window from center-framed-content */}

        <div className="center-framed-content mx-3">
          <img className="top-img" src={errorImage} />

          <div>
            <h4 className="poppins-bold mt-4">Oops!</h4>
            <p className="my-0">
              Sorry, an unexpected error has occurred.
            </p>
            <p>{error.statusText as string || error.message as string}</p>
          </div>

          <Link className="btn btn-primary my-3" type="button" to={`/`}>Home</Link>

        </div>

      </div>
    </div>
  );
};

export default ErrorPage;