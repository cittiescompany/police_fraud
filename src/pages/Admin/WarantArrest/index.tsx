import React, { useState } from 'react'
// import { Select } from 'antd';
// const { Option } = Select;
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetData } from '../../../content'
import { DatePicker, Row, Col, Button, Modal } from 'antd';
import dayjs from 'dayjs';


const BankStatement = () => {
    const [open, setOpen] = useState(false)
    return (
        <section>
            <div className='container'>
                <div className="card p-3 w-[56%] mx-auto shadow-md">

                    <strong className='text-center'>
                        Warrant for arrest
                    </strong>
                    <div>


                        <div className="inputBox mb-0"
                            style={{
                            }}  >
                            <input required={true}
                                name='firstname'
                                type="number" onWheel={(e: any) => e.target.blur()} className='text-dark'
                            />
                            <span>Account Number</span>
                        </div>
                        <span className='text-danger text-center' style={{
                            fontSize: '0.85rem',
                        }}></span>
                    </div>

                    <div className=" my-3">
                        <Row gutter={16}>
                            <Col span={12}>
                                <DatePicker
                                    placeholder="Select Start Date"
                                    style={{ width: '100%', padding: "10px" }}
                                />
                            </Col>

                            <Col span={12}>
                                <DatePicker
                                    placeholder="Select End Date"
                                    style={{ width: '100%', padding: "10px" }}
                                // onChange={handleEndDateChange}
                                />
                            </Col>
                        </Row>
                    </div>
                    <Button onClick={() => setOpen(true)} type="primary" className='mt-2 mx-auto block' size={"large"}>
                        Submit
                    </Button>

                </div >
            </div >

            <Modal
                title={`Enter OTP Sent to you`}
                open={!!open}
                closable={true}
                onCancel={() => setOpen(false)}
                footer={[
                ]}
            >

                <div className="inputBox mb-0 mt-3"  >
                    <input name='password' type="text" onWheel={(e: any) => e.target.blur()} className='text-dark'
                    />
                    <span>value</span>
                </div>
                <Button type="primary" className='mt-2 mx-auto block' size={"large"}>
                    Submit
                </Button>

            </Modal>
        </section >
    )
}

export default BankStatement