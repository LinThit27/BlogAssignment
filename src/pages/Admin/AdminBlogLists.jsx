import { getAllBlogs } from "api/APIs";
import AdminBlogTable from "components/Admin/AdminBlogTable";
import useFetchData from "hooks/useFetchData";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

const AdminBlogLists = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, refetch } = useFetchData(["blogs", page, limit], () =>
    getAllBlogs(`skip=${page}&limit=${limit}`)
  );
  console.log(limit);
  return (
    <div className="admin-blog-list-container bg-light">
      {data && (
        <AdminBlogTable
          blogLists={data.data.content}
          refetch={refetch}
          limit={limit}
          setLimit={setLimit}
        />
      )}
      {data && (
        <div className="d-flex py-3 justify-content-between px-4">
          <Button
            disabled={page < 2}
            onClick={() => setPage(page - 1)}
            variant="primary"
          >
            Previous
          </Button>
          <Button
            disabled={page * limit >= data.data.totalCount}
            onClick={() => setPage(page + 1)}
            variant="primary"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminBlogLists;
