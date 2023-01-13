import axios from "axios"
import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
interface IUser {
    avatar: string
    first_name: string
    last_name: string
    email: string
    id: number
}

function PageScrollingInfinite() {

    const Per_Page = 2
    const [userLists, setUserLists] = useState<Array<IUser>>([])
    const [total, setTotal] = useState<Number>(0)
    const [page, setPage] = useState<number>(1)

    const getList = () => {
        // const pagecount = (Per_Page) + 1

        axios
            .get("https://reqres.in/api/users?", {
                params: {
                    page: page,
                    Per_Page: Per_Page
                }
            })
            .then((res) => {
                const apiRes = res.data.data
                const mergeData = [...userLists, ...apiRes]
                setUserLists(mergeData)
                setPage(res.data.page)
                setTotal(res.data.total)
            })
            .catch((err) => {
                console.error("Loading Error", err)
            })
    }

    useEffect(() => {
        getList()
        // eslint-disable-next-line
    }, [page])

    const fetchMoreData = () => {
        setInterval(() =>
            setPage(page + 1), 1000)
    }

    return (
        <>
            <div className='container'>
                <InfiniteScroll
                    height={"250px"}
                    dataLength={userLists.length}
                    next={fetchMoreData}
                    hasMore={userLists.length < total}
                    loader={<h4 className="loading">Loading...</h4>}>

                    {userLists?.map((key) => {
                        return (
                            <div key={key.id}>
                                <div className='cards'>
                                    <div className="image-block">
                                        <img
                                            className='userimg'
                                            src={key?.avatar}
                                            alt="test img"
                                        />
                                    </div>
                                    <div className='content-block'>
                                        <div>
                                            <h3>
                                                {key?.id}. {key?.first_name} {key?.last_name}
                                            </h3>
                                        </div>
                                        <div className="user-email">{key?.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </InfiniteScroll>
            </div>
        </>
    )
}

export default PageScrollingInfinite