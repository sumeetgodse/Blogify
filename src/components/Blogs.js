import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInput, setBlogData } from '../features/userSlice'
import axios from "axios"
import sad from "../sad.png";
import "../styles/blogs.css"

const Blogs = () => {

    const searchInput=useSelector(selectUserInput);
    const blog_url=`https://gnews.io/api/v4/search?q=${searchInput}&token=acac565606d9d9cff7c067c74e2ccfc0`;
    const dispatch=useDispatch();
    const [blogs,setBlogs]=useState();
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        axios
        .get(blog_url)
        .then((response)=>{
            dispatch(setBlogData(response.data))
            setBlogs(response.data)
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[searchInput]);

    return (
        <div className="blog__page">
            {loading? <h2 className="loading">Please wait, loading data ...</h2> : ""}
            <div className="blogs">
                {
                    blogs?.articles?.map(blog=>(
                        <a className="blog" target="_blank" href={blog.url}>
                            <img src={blog.image} />
                            <div>
                                <h3 className="sourceName">
                                    <span>{blog.source.name}</span>
                                    <span>{blog.publishedAt}</span>
                                </h3>
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                        </a>
                    ))
                }
                {
                    blogs?.totalArticles==0&& (
                        <div className="error">
                            <img src={sad} class="sad"/>
                            <h1>No posts available...</h1>
                            <h3>Please try using another keyword!</h3>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Blogs
