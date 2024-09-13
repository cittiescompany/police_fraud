import React, { useState } from 'react'
import { Modal, Button } from "antd"

const data = [
    {
        text: "BVN"
    },
    {
        text: "ID CARD"
    },
    {
        text: "INTERNATIONAL PASSPORT"
    },
    {
        text: "CAC"
    }
]
const Verify = () => {
    const [open, setOpen] = useState("")
    return (
        <section className='container'>
            <div className='text-center text-xl text-slate-950 '>
                Verify  all your document here
            </div>
            <div>
                {
                    data.map((val: any) => (
                        <div></div>
                    ))
                }


                <div className="flex flex-wrap items-center justify-center mt-5 h-full space-y-2 sm:space-y-0">
                    <button
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2 w-full sm:w-auto"
                        type="button"
                        onClick={() => setOpen("BVN")}
                    >
                        BVN
                    </button>
                    <button
                        className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2 w-full sm:w-auto"
                        type="button"
                        onClick={() => setOpen("ID CARD")}
                    >
                        ID CARD
                    </button>
                    <button
                        className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-400/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2 w-full sm:w-auto"
                        type="button"
                        onClick={() => setOpen("INTERNATIONAL PASSPORT")}
                    >
                        INTERNATIONAL PASSPORT
                    </button>
                    <button
                        className="text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2 w-full sm:w-auto"
                        type="button"
                        onClick={() => setOpen("CAC")}
                    >
                        CAC
                    </button>
                </div>


            </div>

            <Modal
                title={`Verify ${open}`}
                open={!!open}
                closable={true}
                onCancel={() => setOpen("")}
                footer={[
                ]}

            >

                <div className="inputBox mb-0 mt-3"  >
                    <input name='password' type="text" className='text-dark'
                    />
                    <span>value</span>
                </div>
                <Button type="primary" className='mt-2 mx-auto block' size={"large"}>
                    Verify
                </Button>

            </Modal>

        </section>
    )
}

export default Verify