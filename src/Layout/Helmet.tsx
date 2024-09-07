import React from 'react';
import { Helmet } from "react-helmet-async";

const Helmetpage = ({children:child, content,url,title}:any) => {
  return (
    <>
     <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8"  name='description' content={`${content}`}/>
        <link rel="canonical" href={`${url}`} />
      </Helmet>
    {child}
    </>
  )
}

export default Helmetpage