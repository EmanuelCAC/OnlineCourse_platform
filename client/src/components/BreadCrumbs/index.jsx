import React from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "components";

const BreadCrumbs = (value) => {
  const navigate = useNavigate()
  const routes = value.routes

  return (
    <div className="display: flex">
      {
        routes.map((route, i) => (
          <Text as="button" className={`mt-[5px] ml-1 !text-black-900_02 !font-medium ${i == routes.length - 1 && '!font-bold'}`} onClick={() => navigate(route.path)} key={i}>
            {route.name} {(i < routes.length - 1) ? "|" : ""}
          </Text>
        ))
      }
    </div>
  )
}

export { BreadCrumbs }