import { getAllCategories } from "api/APIs";
import SessionExpiredModel from "components/SessionExpiredModel";
import useFetchData from "hooks/useFetchData";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const AdminCategoryList = () => {
  const [shouldSessionModelOpen, setShouldSessionModelOpen] = useState(false);
  const { data } = useFetchData(["categories"], getAllCategories);

  return (
    <div className="admin-blog-list-container bg-light">
      <div className="d-flex justify-content-end m-3">
        <Button variant="primary">Add New</Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Date In</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.data.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>

                <td className="text-secondary">
                  {new Date(category.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {shouldSessionModelOpen && <SessionExpiredModel />}
    </div>
  );
};

export default AdminCategoryList;
