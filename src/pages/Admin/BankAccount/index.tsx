import React, { useState } from 'react'
import { Modal, Button } from "antd"

const BankAccount = () => {
    const [open, setOpen] = useState("")
    return (
        <section className='container'>
            <div className='text-center text-xl text-slate-950 '>
                Verify  all your bank related document here
            </div>
            <div>
                <div className="flex flex-wrap items-center justify-center mt-5 h-full space-y-2 sm:space-y-0">
                    <button
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2 w-full sm:w-auto"
                        type="button"
                        onClick={() => setOpen("account-number")}
                    >
                        Verify account number
                    </button>

                    <button
                        className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-400/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3 text-center mr-2 mb-2 w-full sm:w-auto"
                        type="button"
                        onClick={() => setOpen("bvn-Expansion")}
                    >
                        BVN Expansion
                    </button>
                </div>


            </div>

            <Modal
                title={`Verify ${open.split("-").join(" ")}`}
                open={!!open}
                closable={true}
                onCancel={() => setOpen("")}
                footer={[
                ]}
            >

                <div className="inputBox mb-0 mt-3"  >
                    <input name='password' type="number" onWheel={(e: any) => e.target.blur()} className='text-dark'
                    />
                    <span>value</span>
                </div>
                <Button type="primary" className='mt-2 mx-auto block' size={"large"}>
                    Submit
                </Button>

            </Modal>

        </section>
    )
}

export default BankAccount