import React, { useState, useMemo, useEffect } from "react"
import { connect } from "react-redux";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";

const PageSize = 5

const PaginationPage = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [users,setUsers] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isError,setIsError] = useState(false)
    const token = props.accessToken
    useEffect(()=>{
        setIsLoading(true)
        fetch('http://localhost:5000/getusers', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
            },
        }).then(res=>res.json()).then(users=>{
                setUsers(users)
                setIsLoading(false)
            }).catch(error => {
                setIsError(true)
            })
    
    },[])
    
    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return users.length > 0 ? users.slice(firstPageIndex, lastPageIndex) : []
    }, [currentPage,users])

    if(users && users.errorMessage) {
      return <h2>{users.errorMessage}... Refresh and Login Again</h2>
    }
    if(isError){
        return <h2>Error Loading users...</h2>
    }
    if(users.length === 0){
        return <h2>Loading users...</h2>
    }
  return (
    <>
      <h1>Pagination Page</h1>
      <h4>Passing access token to get the users list</h4>
      <Table data={currentTableData}/>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={users.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  )
};

const mapStateToProps = (state) => {
    return {
        accessToken : state.accessToken
    }
}

export default connect(mapStateToProps,null)(PaginationPage)
