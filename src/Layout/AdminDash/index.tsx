import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useSwr from 'swr';
import { adminUrl } from '../../BackendUrl';
import { Outlet, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { add_admin } from '../../Redux/Admin.slice';
import Loader from '../../components/Loader';
import Style from "./Style.module.css";
import Nav from '../../components/Admin/Nav';
import { useGetWindowAvailSize } from '../../Hooks';
import LargeScreenSidebar, { Links } from '../../components/Admin/Sidebar';
import { fetcher, swrData } from '../../content';

const AdminDash = (): JSX.Element => {

    const [token] = useState(localStorage.token)
    const nav = useNavigate();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const dispatch = useDispatch()
    const [state, setState] = useState("loading");
    const [toggle, setToggle] = useState(true)
    const { height, width }: any = useGetWindowAvailSize()
    const FuncToggle = (state: boolean) => setToggle(state);
    let count = 0
    const { data }: any = useSwr(`${adminUrl}user/kunpexchange${token}`, fetcher, { ...swrData(state) });
    useEffect(() => {
        if (data) {
            if (data.status) {
                dispatch(add_admin(data?.user))
                setState('success')
            } else {
                if (count <= 3) {
                    count += 1
                } else {
                    count = 0
                    nav("/signin")
                }
            }
        }
    }, [data])
    if (state === "success")
        return (<>
            <section className={`${Style.Section} py-[5px] grid`} style={{ maxHeight: `${height}px`, minHeight: `${height}px`, height: `${height}px` }}>
                <Nav setToggle={FuncToggle} toggle={toggle} />
                <main id={Style.Main} className={` grid justify-around ${toggle ? undefined : Style.smallShow}  `}>
                    <LargeScreenSidebar toggle={toggle} />
                    <main id={Style.Outlet} className='bg-[#EEEFF4] p-[10px] h-auto min-h-full max-h-full' >
                        <Outlet />
                    </main>
                </main>
            </section>
            {width <= 1275 ? <SmallScreenSidebar /> : ""}
        </>
        )
    return (
        <>
            <Loader />
        </>
    )
}
export default AdminDash

const SmallScreenSidebar = () => {

    return (
        <div className="offcanvas offcanvas-start pt-4" tabIndex={-1} id="Smallscreensiderbar" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header  border-0 border-bottom">
                <h2 className="offcanvas-title" id="offcanvasExampleLabel">cities</h2>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className={`${Style.Navbar} w-full h-full overflow-y-scroll s offcanvas-body`}>
                <Links toggle={true} />
            </div>
        </div>
    )
}


